import { ExtensionContext, LanguageClient, ServerOptions, workspace, services, TransportKind, LanguageClientOptions, ProvideCompletionItemsSignature } from 'coc.nvim'
import { TextDocument, Position, CompletionContext, CancellationToken, CompletionItem, CompletionList, InsertTextFormat } from 'vscode-languageserver-protocol'
import { ProviderResult } from 'coc.nvim/lib/provider'

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  const config = workspace.getConfiguration().get('css', {}) as any
  if (!config.enable) return
  const file = context.asAbsolutePath('./lib/server/cssServerMain.js')
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

  let clientOptions: LanguageClientOptions = {
    documentSelector: selector,
    synchronize: {
      configurationSection: ['css', 'less', 'scss', 'wxss']
    },
    outputChannelName: 'css',
    initializationOptions: config.initializationOptions || {},
    middleware: {
      provideCompletionItem: (
        document: TextDocument,
        position: Position,
        context: CompletionContext,
        token: CancellationToken,
        next: ProvideCompletionItemsSignature
      ): ProviderResult<CompletionItem[] | CompletionList> => {
        return Promise.resolve(next(document, position, context, token)).then((res: CompletionItem[] | CompletionList) => {
          let doc = workspace.getDocument(document.uri)
          if (!doc) return []
          let items: CompletionItem[] = res.hasOwnProperty('isIncomplete') ? (res as CompletionList).items : res as CompletionItem[]
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
  item.data = item.data || {}
  item.data.abbr = item.label
  item.label = item.label.slice(1)
  item.textEdit = null
  item.insertTextFormat = InsertTextFormat.PlainText
}
