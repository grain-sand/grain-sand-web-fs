<template>
  <h4>saveFileHandler</h4>
  <div class="Test-saveFileHandler">
    <button @click="writeToDir">测试写入到目录</button>
    <button @click="writeToFile">测试写入到文件</button>
    <button @click="selectFileWrite">测试选择文件写入</button>
    <button @click="selectFileWriteGBK">测试GBK写入</button>
  </div>
</template>

<script lang="ts" setup>
import {saveFileHandler} from "../dist";
import {encode} from 'iconv-lite-umd';

let file: FileSystemFileHandle, dir: FileSystemDirectoryHandle;

async function readDir(): Promise<FileSystemDirectoryHandle> {
  return dir || (dir = await window.showDirectoryPicker());
}

async function readFile(): Promise<FileSystemFileHandle> {
  return file || (file = await window.showSaveFilePicker());
}

async function writeToDir() {
  await saveFileHandler('test.txt', '可以有内容', await readDir());
}

async function writeToFile() {
  await saveFileHandler(await readFile(), '可以有内容在文件中');
}

async function selectFileWrite() {
  await saveFileHandler(file || '测试文件写入到下载.txt', '可以有内容在文件中\r\n测试文件写入到下载', 'downloads');
}

async function selectFileWriteGBK() {
  const str = '可以有内容在文件中\r\n测试文件写入到下载GBK'
  file = await saveFileHandler(file || '测试文件写入到下载GBK.txt', encode(str, 'GBK'), 'downloads');
}

</script>