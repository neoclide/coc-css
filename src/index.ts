import { ExtensionContext, LanguageClient, ServerOptions, workspace, services, TransportKind, LanguageClientOptions, ProvideCompletionItemsSignature } from 'coc.nvim'
import { TextDocument, Position, CompletionContext, CancellationToken, CompletionItem, CompletionList, InsertTextFormat, CompletionTriggerKind } from 'vscode-languageserver-protocol'
import { getCustomDataPathsInAllWorkspaces, getCustomDataPathsFromAllExtensions } from './customData'

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  const config = workspace.getConfiguration().get<any>('css', {}) as any
  if (!config.enable) return
  const file = context.asAbsolutePath('./lib/server.js')
  const selector = ['css', 'less', 'scss', 'wxss']

  let serverOptions: ServerOptions = {
    module: file,
    args: ['--node-ipc'],
    transport: TransportKind.ipc,
    options: {
      cwd: workspace.root,
      execArgv: config.execArgv || []
    }
  }

  let dataPaths = [
    ...getCustomDataPathsInAllWorkspaces(),
    ...getCustomDataPathsFromAllExtensions()
  ]

  let clientOptions: LanguageClientOptions = {
    documentSelector: selector,
    synchronize: {
      configurationSection: ['css', 'less', 'scss', 'wxss']
    },
    outputChannelName: 'css',
    initializationOptions: {
      dataPaths
    },
    middleware: {
    }
  }

  let client = new LanguageClient('css', 'Css language server', serverOptions, clientOptions)

  subscriptions.push(
    services.registLanguageClient(client)
  )
}
