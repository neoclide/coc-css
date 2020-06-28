/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Uri} from 'coc.nvim'
import path from 'path'

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
    return uri.with({path: normalizePath(p.split('/'))})
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
  return uri.with({path: normalizePath(parts)})
}
