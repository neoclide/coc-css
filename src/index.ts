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
      provideCompletionItem: (
        document: TextDocument,
        position: Position,
        context: CompletionContext,
        token: CancellationToken,
        next: ProvideCompletionItemsSignature
      ) => {
        return Promise.resolve(next(document, position, context, token)).then((res: CompletionItem[] | CompletionList) => {
          let doc = workspace.getDocument(document.uri)
          if (!doc) return []
          let items: CompletionItem[] = res.hasOwnProperty('isIncomplete') ? (res as CompletionList).items : res as CompletionItem[]
          let option = (context as any).option
          if (context.triggerKind == CompletionTriggerKind.Invoked && option.input) {
            let character = option.input[0]
            items = items.filter(o => o.label.startsWith(character))
          }
          let pre = doc.getline(position.line).slice(0, position.character)
          // searching for class name
          if (/(^|\s)\.\w*$/.test(pre)) {
            items = items.filter(o => o.label.startsWith('.'))
            items.forEach(fixItem)
          }
          if (context.triggerCharacter == ':'
            || /\:\w*$/.test(pre)) {
            items = items.filter(o => o.label.startsWith(':'))
            items.forEach(fixItem)
          }
          return items
        })
      }
    }

  }

  let client = new LanguageClient('css', 'Css language server', serverOptions, clientOptions)

  subscriptions.push(
    services.registLanguageClient(client)
  )
}

function fixItem(item: CompletionItem): void {
  item.insertText = item.label.slice(1) // tslint:disable-line
  item.textEdit = null
  item.insertTextFormat = InsertTextFormat.PlainText
}
