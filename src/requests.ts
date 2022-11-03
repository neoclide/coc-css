/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Uri, LanguageClient, RequestType } from 'coc.nvim'
import path from 'path'
import type { Runtime } from './index'

export interface RequestService {
  getContent(uri: string, encoding?: string): Promise<string>

  stat(uri: string): Promise<FileStat>
  readDirectory(uri: string): Promise<[string, FileType][]>
}

export namespace FsContentRequest {
  export const type: RequestType<{ uri: string; encoding?: string }, string, any> = new RequestType('fs/content')
}
export namespace FsStatRequest {
  export const type: RequestType<string, FileStat, any> = new RequestType('fs/stat')
}

export namespace FsReadDirRequest {
  export const type: RequestType<string, [string, FileType][], any> = new RequestType('fs/readDir')
}

export function serveFileSystemRequests(client: LanguageClient, runtime: Runtime) {
  client.onRequest(FsContentRequest.type, (param: { uri: string; encoding?: string }) => {
    const uri = Uri.parse(param.uri)
    if (uri.scheme === 'file' && runtime.fs) {
      return runtime.fs.getContent(param.uri)
    }
    // return promisify(workspace.fs.readFile(uri).then(buffer => {
    //   return new runtime.TextDecoder(param.encoding).decode(buffer)
    // })
    return undefined
  })
  client.onRequest(FsReadDirRequest.type, (uriString: string) => {
    const uri = Uri.parse(uriString)
    if (uri.scheme === 'file' && runtime.fs) {
      return runtime.fs.readDirectory(uriString)
    }
    return undefined
  })
  client.onRequest(FsStatRequest.type, (uriString: string) => {
    const uri = Uri.parse(uriString)
    if (uri.scheme === 'file' && runtime.fs) {
      return runtime.fs.stat(uriString)
    }
    return undefined
  })
}

export enum FileType {
  /**
   * The file type is unknown.
   */
  Unknown = 0,
  /**
   * A regular file.
   */
  File = 1,
  /**
   * A directory.
   */
  Directory = 2,
  /**
   * A symbolic link to a file.
   */
  SymbolicLink = 64
}

export interface FileStat {
  /**
   * The type of the file, e.g. is a regular file, a directory, or symbolic link
   * to a file.
   */
  type: FileType
  /**
   * The creation timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
   */
  ctime: number
  /**
   * The modification timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
   */
  mtime: number
  /**
   * The size in bytes.
   */
  size: number
}

export interface RequestService {
  getContent(uri: string, encoding?: string): Promise<string>

  stat(uri: string): Promise<FileStat>
  readDirectory(uri: string): Promise<[string, FileType][]>
}

const Dot = '.'.charCodeAt(0)

export function resolvePath(uri: Uri, p: string): Uri {
  if (path.isAbsolute(p)) {
    return uri.with({ path: normalizePath(p.split('/')) })
  }
  return joinPath(uri, p)
}

export function normalizePath(parts: string[]): string {
  const newParts: string[] = []
  for (const part of parts) {
    if (part.length === 0 || part.length === 1 && part.charCodeAt(0) === Dot) {
      // ignore
    } else if (part.length === 2 && part.charCodeAt(0) === Dot && part.charCodeAt(1) === Dot) {
      newParts.pop()
    } else {
      newParts.push(part)
    }
  }
  if (parts.length > 1 && parts[parts.length - 1].length === 0) {
    newParts.push('')
  }
  let res = newParts.join('/')
  if (parts[0].length === 0) {
    res = '/' + res
  }
  return res
}

export function joinPath(uri: Uri, ...paths: string[]): Uri {
  const parts = uri.path.split('/')
  for (let path of paths) {
    parts.push(...path.split('/'))
  }
  return uri.with({ path: normalizePath(parts) })
}
