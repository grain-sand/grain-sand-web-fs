<template>
  <h4>saveFile</h4>
  <div class="Test-saveFile">
    <button @click="selectFileWrite">测试选择文件写入</button>
    <button @click="selectFileWriteGBK">测试GBK写入</button>
  </div>
</template>

<script lang="ts" setup>
import {saveFile} from "../dist";
import {encode} from 'iconv-lite-umd';

let file: FileSystemFileHandle, dir: FileSystemDirectoryHandle;


async function selectFileWrite() {
  console.log('abc')
  await saveFile(file || '测试文件写入到下载.txt', '可以有内容在文件中\r\n测试文件写入到下载', 'downloads');
}

async function selectFileWriteGBK() {
  const str = '可以有内容在文件中\r\n测试文件写入到下载GBK'
  file = await saveFile(file || '测试文件写入到下载GBK.txt', encode(str, 'GBK'), 'downloads') as any;
}

</script>