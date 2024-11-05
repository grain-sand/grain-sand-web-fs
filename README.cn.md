# grain-sand-web-fs
### 中文 | [English](README.md)
> 一款用于浏览器前端的针对源私有文件系统（OPFS,origin private file system）的封装
> 包含:在typescript中的类型定义,尽量兼容各浏览器的便捷读写文件的封装

## 安装
```shell
npx yarn add grain-sand-web-fs
```
或直接引用
```ts
// import {} from 'https://cdn.jsdelivr.net/npm/grain-sand-web-fs/lib/index.web.js'
import {} from 'https://cdn.jsdmirror.cn/npm/grain-sand-web-fs/lib/index.web.js'
```

## 使用
### 浏览器兼容的API
```ts

//打开图片文件
const imageFile:File = await openFile({description:'图片文件',access:'.png'})

//读取图片
const image:HTMLImageElement = await readFile(BlobTypes.Image)

//从桌面读取字符串
const {content} = await readFile(BlobTypes.Text,{description:'文本文件',access:'.txt'},'desktop')

//将文本保存到下载
await saveFile('保存.txt',content,'downloads')

//将图片文件保存到下载
await saveFile('保存.png',imageFile,'downloads')
```

### 使用新式API,仅兼容Chrome、Edge、Opera
```ts
//从桌面打开目录
const dirHandler:FileSystemDirectoryHandle = await openDirectoryHandler('desktop')

//打开图片文件
const imageFile:FileSystemFileHandle = await openFileHandler({description:'图片文件',access:'.png'})

//读取图片
const image:HTMLImageElement = await readFileHandler(BlobTypes.Image)

//从桌面读取字符串
const {content} = await readFileHandler(BlobTypes.Text,{description:'文本文件',access:'.txt'},'desktop')

//将文本保存到下载
await saveFileHandler('保存.txt',text,'downloads')

//将图片文件保存到下载
await saveFileHandler('保存.png',await imageFile.getFile(),'downloads')

```

### 在typescript中强制启用《源私文件API》中文提示
```typescript
/// <reference types="grain-sand-web-fs" />
```