/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable, Emitter, extensions, Uri, workspace } from 'coc.nvim'
import path from 'path'
import { resolvePath } from './requests'

export function getCustomDataSource(toDispose: Disposable[]): any {
  let pathsInWorkspace = getCustomDataPathsInAllWorkspaces()
  let pathsInExtensions = getCustomDataPathsFromAllExtensions()

  const onChange = new Emitter<void>()

  toDispose.push(extensions.onDidActiveExtension(_ => {
    const newPathsInExtensions = getCustomDataPathsFromAllExtensions()
    if (newPathsInExtensions.length !== pathsInExtensions.length || !newPathsInExtensions.every((val, idx) => val === pathsInExtensions[idx])) {
      pathsInExtensions = newPathsInExtensions
      onChange.fire()
    }
  }))
  toDispose.push(workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('css.customData')) {
      pathsInWorkspace = getCustomDataPathsInAllWorkspaces()
      onChange.fire()
    }
  }))

  return {
    get uris() {
      return pathsInWorkspace.concat(pathsInExtensions)
    },
    get onDidChange() {
      return onChange.event
    }
  }
}

function getCustomDataPathsInAllWorkspaces(): string[] {
  const workspaceFolders = workspace.workspaceFolders

  const dataPaths: string[] = []

  if (!workspaceFolders) {
    return dataPaths
  }

  const collect = (paths: string[] | undefined, rootFolder: Uri) => {
    if (Array.isArray(paths)) {
      for (const path of paths) {
        if (typeof path === 'string') {
          dataPaths.push(resolvePath(rootFolder, path).toString())
        }
      }
    }
  }

  for (let i = 0; i < workspaceFolders.length; i++) {
    const folderUri = workspaceFolders[i].uri
    const allCssConfig = workspace.getConfiguration('css', folderUri)
    const customDataInspect = allCssConfig.inspect<string[]>('customData')
    if (customDataInspect) {
      collect(customDataInspect.workspaceValue, Uri.parse(folderUri))
      if (i === 0) {
        collect(customDataInspect.globalValue, Uri.parse(folderUri))
      }
    }

  }
  return dataPaths
}

function getCustomDataPathsFromAllExtensions(): string[] {
  const dataPaths: string[] = []
  for (const extension of extensions.all) {
    const customData = extension.packageJSON?.contributes?.css?.customData
    if (Array.isArray(customData)) {
      for (const rp of customData) {
        dataPaths.push(path.join(extension.extensionPath, rp).toString())
      }
    }
  }
  return dataPaths
}
