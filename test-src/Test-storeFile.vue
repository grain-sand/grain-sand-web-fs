<template>
  <h4>saveFile</h4>
  <div class="Test-saveFile">
    <hr/>
    <button @click="selectFileWrite">测试写入</button>
    <button @click="testRead">测试读取</button>
    <hr/>
    <button @click="selectFileWriteImage">测试写入图片</button>
    <button @click="readImage">测试读取图片</button>
    <img ref="imgEl" alt="测试">
  </div>
</template>

<script lang="ts" setup>
import {BlobTypes, openFile, readStoreFile, saveStoreFile} from "../dist";
import {ref} from "vue";

const imgEl = ref<HTMLImageElement>();

let file: FileSystemFileHandle, imageFile: FileSystemFileHandle;

async function selectFileWrite() {
  file = await saveStoreFile('测试文件写入到store.txt', '测试文件写入到store\r\n测试文件写入到store');
}

async function testRead() {
  console.log((await readStoreFile(BlobTypes.Text, file || '测试文件写入到store.txt')))
}

async function selectFileWriteImage() {
  const blob = await openFile({description: '图片文件', accept: '.png;.jpg;.gif'});
  imageFile = await saveStoreFile('测试文件写入到store.png', blob);
}

async function readImage() {
  imgEl.value.src = (await readStoreFile(BlobTypes.Base64, imageFile || '测试文件写入到store2.png')).content;
}

</script>