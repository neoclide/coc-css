const assert = require('node:assert/strict')
const Module = require('node:module')
const path = require('node:path')
const { test } = require('node:test')
const esbuild = require('esbuild')
const { CancellationToken } = require('vscode-languageserver')

const serverFile = path.join(__dirname, '..', 'server', 'cssServer.ts')
const [{ text }] = esbuild.buildSync({
  entryPoints: [serverFile],
  bundle: true,
  format: 'cjs',
  packages: 'external',
  platform: 'node',
  target: 'node22',
  write: false,
}).outputFiles

const serverModule = new Module(serverFile, module)
serverModule.filename = serverFile
serverModule.paths = module.paths
serverModule._compile(text, serverFile)
const { startServer } = serverModule.exports

test('an older custom-data load cannot replace a newer one', async t => {
  const oldUri = 'file:///old.css-data.json'
  const newUri = 'file:///new.css-data.json'
  let resolveOld
  const oldContent = new Promise(resolve => {
    resolveOld = resolve
  })
  const handlers = new Map()
  const disposable = { dispose() {} }
  const connection = new Proxy({
    console: { error() {}, log() {} },
    languages: {
      diagnostics: {
        on(handler) {
          handlers.set('diagnostics', handler)
          return disposable
        },
        refresh() {
          return Promise.resolve()
        },
      },
    },
    onNotification(type, handler) {
      handlers.set(type.method, handler)
      return disposable
    },
    listen() {},
    sendDiagnostics() {},
    sendRequest() {
      throw new Error('unexpected client request')
    },
  }, {
    get(target, property) {
      if (property in target) return target[property]
      if (typeof property === 'string' && property.startsWith('on')) {
        return (...args) => {
          handlers.set(property, args.at(-1))
          return disposable
        }
      }
      return undefined
    },
  })
  const runtime = {
    file: {
      getContent(uri) {
        if (uri === oldUri) return oldContent
        if (uri === newUri) return Promise.resolve(customData('x-new-property'))
        throw new Error(`unexpected URI: ${uri}`)
      },
      readDirectory() {
        return Promise.resolve([])
      },
      stat() {
        return Promise.resolve({ type: 0, ctime: -1, mtime: -1, size: -1 })
      },
    },
    timer: {
      setImmediate(callback, ...args) {
        const handle = setImmediate(callback, ...args)
        return { dispose: () => clearImmediate(handle) }
      },
      setTimeout(callback, ms, ...args) {
        const handle = setTimeout(callback, ms, ...args)
        return { dispose: () => clearTimeout(handle) }
      },
    },
  }

  startServer(connection, runtime)
  t.after(() => handlers.get('onShutdown')?.())
  handlers.get('onInitialize')({
    capabilities: {
      textDocument: {
        completion: { completionItem: { snippetSupport: true } },
      },
    },
    initializationOptions: { handledSchemas: ['file'] },
    rootPath: '/',
    workspaceFolders: [{ name: 'root', uri: 'file:///' }],
  })

  const documentUri = 'file:///test.css'
  handlers.get('onDidOpenTextDocument')({
    textDocument: {
      uri: documentUri,
      languageId: 'css',
      version: 1,
      text: '.a { x }',
    },
  })

  handlers.get('css/customDataChanged')([oldUri])
  handlers.get('css/customDataChanged')([newUri])
  assertCompletion(await complete(handlers, documentUri), 'x-new-property', true)

  resolveOld(customData('x-old-property'))
  await oldContent
  await new Promise(resolve => setImmediate(resolve))

  const completion = await complete(handlers, documentUri)
  assertCompletion(completion, 'x-new-property', true)
  assertCompletion(completion, 'x-old-property', false)
})

function customData(name) {
  return JSON.stringify({ version: 1, properties: [{ name }] })
}

function complete(handlers, uri) {
  return handlers.get('onCompletion')({
    textDocument: { uri },
    position: { line: 0, character: 7 },
  }, CancellationToken.None)
}

function assertCompletion(completion, label, expected) {
  assert.equal(completion.items.some(item => item.label === label), expected)
}
