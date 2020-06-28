import {ExtensionContext, LanguageClient, LanguageClientOptions, ServerOptions, services, TransportKind, workspace} from 'coc.nvim'
import {getCustomDataSource} from './customData'
import {NotificationType} from 'vscode-languageserver-protocol'

namespace CustomDataChangedNotification {
  export const type: NotificationType<string[]> = new NotificationType('css/customDataChanged')
}

export async function activate(context: ExtensionContext): Promise<void> {
  let {subscriptions} = context
  const config = workspace.getConfiguration().get<any>('css', {}) as any
  if (!config.enable) return
  const file = context.asAbsolutePath('./lib/server.js')
  const selector = ['css', 'less', 'scss', 'wxss']
  const customDataSource = getCustomDataSource(context.subscriptions)

  let serverOptions: ServerOptions = {
    module: file,
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
    initializationOptions: {
      handledSchemas: ['file']
    },
    middleware: {
    }
  }

  let client = new LanguageClient('css', 'Css language server', serverOptions, clientOptions)

  // tslint:disable-next-line: no-floating-promises
  client.onReady().then(() => {
    client.sendNotification(CustomDataChangedNotification.type, customDataSource.uris)
    customDataSource.onDidChange(() => {
      client.sendNotification(CustomDataChangedNotification.type, customDataSource.uris)
    })
  })

  subscriptions.push(
    services.registLanguageClient(client)
  )
}
