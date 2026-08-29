import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, describe, it } from 'node:test'
import {
  CancellationToken,
  CodeActionKind,
  commands,
  diagnosticManager,
  languages,
  Range,
  ServiceStat,
  services,
  Uri,
  workspace,
  type Diagnostic,
  type Document,
} from 'coc.nvim'
import * as extension from '../src/index'

const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'coc-css-test-'))

after(() => {
  fs.rmSync(fixtureRoot, { recursive: true, force: true })
})

describe('coc-css extension', () => {
  it('loads the source entry and registers the language service', () => {
    assert.equal(typeof extension.activate, 'function')
    assert.ok(services.getService('css'))
  })

  it('reports CSS diagnostics through the running language client', async () => {
    const file = path.join(fixtureRoot, 'diagnostics.css')
    const uri = Uri.file(file).toString()
    const tracker = trackDiagnostics(uri)
    try {
      const document = await openCss(file, '.a { colr: red; }\n')
      const diagnostics = await waitForDiagnostics(tracker, items => items.some(item => item.code === 'unknownProperties'))
      assert.equal(document.languageId, 'css')
      assert.ok(diagnostics.some(item => item.message === "Unknown property: 'colr'"))
      const client = await getCssClient()
      assert.equal(client.started, true)
    } finally {
      tracker.dispose()
    }
  })

  it('applies a native quick-fix workspace edit', async () => {
    const file = path.join(fixtureRoot, 'quickfix.css')
    const uri = Uri.file(file).toString()
    const tracker = trackDiagnostics(uri)
    try {
      const document = await openCss(file, '.a { colr: red; }\n')
      const diagnostics = await waitForDiagnostics(tracker, items => items.some(item => item.code === 'unknownProperties'))
      const actions = await (languages as any).getCodeActions(
        document.textDocument,
        Range.create(0, 5, 0, 9),
        { diagnostics, only: [CodeActionKind.QuickFix] },
        CancellationToken.None,
      )
      const action = actions.find(item => item.title === "Rename to 'color'")
      assert.ok(action)
      assert.equal(action.kind, CodeActionKind.QuickFix)
      assert.ok(action.edit)
      assert.equal(action.command, undefined)

      await commands.executeCommand('editor.action.doCodeAction', action)
      assert.equal((await document.buffer.getLines({ start: 0, end: 1, strictIndexing: true }))[0], '.a { color: red; }')
    } finally {
      tracker.dispose()
    }
  })

  it('formats a CSS range through the client-owned formatter', async () => {
    const document = await openCss(path.join(fixtureRoot, 'format.css'), '.a,.b{color:red;}\n')
    const edits = await (languages as any).provideDocumentRangeFormattingEdits(
      document.textDocument,
      Range.create(0, 0, 0, 18),
      { tabSize: 2, insertSpaces: true },
      CancellationToken.None,
    )
    assert.ok(edits.length > 0)
    await document.applyEdits(edits)
    assert.deepEqual(await document.buffer.getLines({ start: 0, end: -1, strictIndexing: false }), [
      '.a,',
      '.b {',
      '  color: red;',
      '}',
    ])
  })
})

async function openCss(file: string, content: string): Promise<Document> {
  fs.writeFileSync(file, content)
  const escaped = await workspace.nvim.call('fnameescape', [file]) as string
  await workspace.nvim.command('filetype on')
  await workspace.nvim.command(`edit ${escaped}`)
  const document = await waitForCurrentDocument()
  await workspace.nvim.command('setf css')
  await waitForDocumentLanguageId(document, 'css')
  await getCssClient()
  return document
}

async function getCssClient() {
  const deadline = Date.now() + 15000
  let service = services.getService('css')
  while (!service && Date.now() < deadline) {
    await new Promise<void>(resolve => setImmediate(resolve))
    service = services.getService('css')
  }
  assert.ok(service, 'CSS language service was not registered')
  if (service.state !== ServiceStat.Running) {
    await new Promise<void>((resolve, reject) => {
      let subscription: { dispose(): void } | undefined
      const timer = setTimeout(() => {
        subscription?.dispose()
        reject(new Error('CSS language service did not become ready'))
      }, 15000)
      const done = () => {
        clearTimeout(timer)
        subscription?.dispose()
        resolve()
      }
      subscription = service.onServiceReady(done)
      if (service.state === ServiceStat.Running) done()
    })
  }
  assert.ok(service.client, 'CSS language client is unavailable')
  return service.client
}

function waitForCurrentDocument(timeoutMs = 15000): Promise<Document> {
  const current = workspace.getDocument(workspace.bufnr)
  if (current) return Promise.resolve(current)
  return new Promise<Document>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('current document did not open in time')), timeoutMs)
    const disposable = workspace.onDidOpenTextDocument(() => {
      const document = workspace.getDocument(workspace.bufnr)
      if (!document || document.bufnr !== workspace.bufnr) return
      clearTimeout(timer)
      disposable.dispose()
      resolve(document)
    })
  })
}

function waitForDocumentLanguageId(document: Document, expected: string, timeoutMs = 15000): Promise<void> {
  if (document.languageId === expected) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`document languageId did not become ${expected}`)), timeoutMs)
    const disposable = workspace.onDidOpenTextDocument(() => {
      if (document.languageId !== expected) return
      clearTimeout(timer)
      disposable.dispose()
      resolve()
    })
  })
}

function trackDiagnostics(uri: string) {
  let current: Diagnostic[] = []
  const disposable = diagnosticManager.onDidRefresh(params => {
    if (params.uri === uri) current = params.diagnostics.slice()
  })
  return {
    get: () => current.slice(),
    dispose: () => disposable.dispose(),
  }
}

function waitForDiagnostics(
  tracker: ReturnType<typeof trackDiagnostics>,
  predicate: (diagnostics: Diagnostic[]) => boolean,
  timeoutMs = 20000,
): Promise<Diagnostic[]> {
  const current = tracker.get()
  if (predicate(current)) return Promise.resolve(current)
  return new Promise<Diagnostic[]>((resolve, reject) => {
    const poll = setInterval(() => {
      const diagnostics = tracker.get()
      if (!predicate(diagnostics)) return
      clearInterval(poll)
      clearTimeout(timer)
      resolve(diagnostics)
    }, 100)
    const timer = setTimeout(() => {
      clearInterval(poll)
      reject(new Error(`diagnostics did not match in time: ${JSON.stringify(tracker.get())}`))
    }, timeoutMs)
  })
}
