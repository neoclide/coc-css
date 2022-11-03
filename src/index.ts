import { ExtensionContext, languages, NotificationType, LanguageClient, LanguageClientOptions, ServerOptions, services, TransportKind, workspace, ServiceStat, Disposable, TextDocument, Range, FormattingOptions, CancellationToken, ProviderResult, TextEdit, commands, window } from 'coc.nvim'
import { getCustomDataSource } from './customData'
import { RequestService, serveFileSystemRequests } from './requests'
import { TextDecoder } from 'util'
import { getNodeFSRequestService } from './nodeFs'
import { DocumentRangeFormattingParams, DocumentRangeFormattingRequest } from 'vscode-languageserver-protocol'

namespace CustomDataChangedNotification {
  export const type: NotificationType<string[]> = new NotificationType('css/customDataChanged')
}

export interface Runtime {
  TextDecoder: { new(encoding?: string): { decode(buffer: ArrayBuffer): string } }
  fs?: RequestService
}

interface FormatterRegistration {
  readonly languageId: string
  readonly settingId: string
  provider: Disposable | undefined
}

interface CSSFormatSettings {
  newlineBetweenSelectors?: boolean
  newlineBetweenRules?: boolean
  spaceAroundSelectorSeparator?: boolean
  braceStyle?: 'collapse' | 'expand'
  preserveNewLines?: boolean
  maxPreserveNewLines?: number | null
}

const cssFormatSettingKeys: (keyof CSSFormatSettings)[] = ['newlineBetweenSelectors', 'newlineBetweenRules', 'spaceAroundSelectorSeparator', 'braceStyle', 'preserveNewLines', 'maxPreserveNewLines']

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  const config = workspace.getConfiguration().get<any>('css', {}) as any
  const serverModule = context.asAbsolutePath('./lib/server.js')
  const documentSelector = ['css', 'scss', 'less']
  const customDataSource = getCustomDataSource(context.subscriptions)
  const formatterRegistrations: FormatterRegistration[] = documentSelector.map(languageId => ({
    languageId, settingId: `${languageId}.format.enable`, provider: undefined
  }))

  const runtime: Runtime = { fs: getNodeFSRequestService(), TextDecoder }
  const debugOptions = { execArgv: ['--nolazy', '--inspect=' + (7000 + Math.round(Math.random() * 999))] }
  // If the extension is launch in debug mode the debug server options are use
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        cwd: workspace.root,
        execArgv: config.execArgv || []
      }
    },
    debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: documentSelector,
    synchronize: {
      configurationSection: ['css', 'less', 'scss']
    },
    outputChannelName: 'css',
    initializationOptions: {
      handledSchemas: ['file'],
      provideFormatter: false, // tell the server to not provide formatting capability
      customCapabilities: { rangeFormatting: { editLimit: 10000 } }
    },
    middleware: {
    }
  }

  let client = new LanguageClient('css', 'Css language server', serverOptions, clientOptions)

  await client.start()

  if (client.serviceState === ServiceStat.Running) {
    client.sendNotification(CustomDataChangedNotification.type, customDataSource.uris)
    customDataSource.onDidChange(() => {
      client.sendNotification(CustomDataChangedNotification.type, customDataSource.uris)
    })
  }

  subscriptions.push(
    services.registerLanguageClient(client)
  )

  // manually register / deregister format provider based on the `css/less/scss.format.enable` setting avoiding issues with late registration. See #71652.
  for (const registration of formatterRegistrations) {
    updateFormatterRegistration(registration)
    context.subscriptions.push({ dispose: () => registration.provider?.dispose() })
    context.subscriptions.push(workspace.onDidChangeConfiguration(e => e.affectsConfiguration(registration.settingId) && updateFormatterRegistration(registration)))
  }
  serveFileSystemRequests(client, runtime)

  commands.registerCommand('_css.applyCodeAction', applyCodeAction)

  function applyCodeAction(uri: string, documentVersion: number, edits: TextEdit[]) {
    const textEditor = window.activeTextEditor
    if (textEditor && textEditor.document.uri.toString() === uri) {
      if (textEditor.document.version !== documentVersion) {
        window.showInformationMessage(`CSS fix is outdated and can't be applied to the document.`)
      }
      textEditor.document.applyEdits(edits).catch(err => {
        window.showErrorMessage(`Failed to apply CSS fix to the document. ${err.message}`)
      })
    }
  }


  function updateFormatterRegistration(registration: FormatterRegistration) {
    const formatEnabled = workspace.getConfiguration().get(registration.settingId)
    if (!formatEnabled && registration.provider) {
      registration.provider.dispose()
      registration.provider = undefined
    } else if (formatEnabled && !registration.provider) {
      registration.provider = languages.registerDocumentRangeFormatProvider([registration.languageId], {
        provideDocumentRangeFormattingEdits(document: TextDocument, range: Range, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
          const filesConfig = workspace.getConfiguration('files', document)
          const fileFormattingOptions = {
            trimTrailingWhitespace: filesConfig.get<boolean>('trimTrailingWhitespace'),
            trimFinalNewlines: filesConfig.get<boolean>('trimFinalNewlines'),
            insertFinalNewline: filesConfig.get<boolean>('insertFinalNewline'),
          }

          const params: DocumentRangeFormattingParams = {
            textDocument: {
              uri: document.uri
            },
            range,
            options: Object.assign({}, fileFormattingOptions, options) as any
          }
          // add the css formatter options from the settings
          const formatterSettings = workspace.getConfiguration(registration.languageId, document).get<CSSFormatSettings>('format')
          if (formatterSettings) {
            for (const key of cssFormatSettingKeys) {
              const val = formatterSettings[key]
              if (val !== undefined && val !== null) {
                params.options[key] = val
              }
            }
          }
          return client.sendRequest(DocumentRangeFormattingRequest.type as any, params, token).then(
            edits => edits as TextEdit[],
            (error) => {
              client.handleFailedRequest(DocumentRangeFormattingRequest.type as any, undefined, error, [])
              return Promise.resolve([])
            }
          )
        }
      })
    }
  }
}
