# grain-sand-web-fs

### English | [中文](README.cn.md)

> A wrapper for the origin private file system (OPFS) in the browser's frontend.
> Includes: Type definitions in TypeScript, and a simplified file read-write wrapper compatible with multiple browsers.

## Installation

```shell
npx yarn add grain-sand-web-fs
```

## Usage

### Browser-compatible API

```ts

import {openFile,readFile,saveFile} from 'https://cdn.jsdelivr.net/npm/grain-sand-web-fs/lib/index.web.js'

// Open an image file
const imageFile: File = await openFile({description: 'Image file', access: '.png'})

// Read the image
const image: HTMLImageElement = await readFile(BlobTypes.Image)

// Read text from the desktop
const {content} = await readFile(BlobTypes.Text, {description: 'Text file', access: '.txt'}, 'desktop')

// Save text to downloads
await saveFile('save.txt', content, 'downloads')

// Save the image file to downloads
await saveFile('save.png', imageFile, 'downloads')

```

### Using the new API (compatible only with Chrome, Edge, Opera)

```ts

import {openDirectoryHandler,readFileHandler,saveFileHandler} from 'https://cdn.jsdelivr.net/npm/grain-sand-web-fs/lib/index.web.js'

// Open a directory from the desktop
const dirHandler: FileSystemDirectoryHandle = await openDirectoryHandler('desktop')

// Open an image file
const imageFile: FileSystemFileHandle = await openFileHandler({description: 'Image file', access: '.png'})

// Read the image
const image: HTMLImageElement = await readFileHandler(BlobTypes.Image)

// Read text from the desktop
const {content} = await readFileHandler(BlobTypes.Text, {description: 'Text file', access: '.txt'}, 'desktop')

// Save text to downloads
await saveFileHandler('save.txt', text, 'downloads')

// Save the image file to downloads
await saveFileHandler('save.png', await imageFile.getFile(), 'downloads')

```

### Enable "Origin Private File API" type hints in TypeScript

```typescript
/// <reference types="grain-sand-web-fs" />
```