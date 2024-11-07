<template>
  <h4>Test-ReadFile</h4>
  <div class="Test-ReadFile">
    <fieldset>
      <button
          @click="showReadFile(BlobTypes.Text,'txt')"
      >读取文本
      </button>
      <textarea readonly v-text="data.txt"></textarea>
    </fieldset>
    <fieldset>
      <button
          @click="showReadFile(BlobTypes.Base64,'b64')"
      >读取base64
      </button>
      <textarea readonly v-text="data.b64"></textarea>
    </fieldset>
    <fieldset>
      <button
          @click="readImage()"
      >读取图片
      </button>
      <div ref="imgDiv"></div>
    </fieldset>
    <fieldset>
      <button
          @click="showReadFile(BlobTypes.Bitmap,'bitmap')"
      >读取位图
      </button>
      <div>
        <button>{{data.bitmap?.name}}</button>
        <button>{{data.bitmap?.content?.width}}</button>
        <button>{{data.bitmap?.content?.height}}</button>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import { readFile,BlobTypes} from "../dist";

const imgDiv = ref<HTMLDivElement>(null);

const data = reactive({
  txt: '',
  b64:'',
  bitmap:undefined
})

async function showReadFile(type: BlobTypes, filed: string) {
  data[filed] = await readFile(type as any) as any;
}

async function readImage() {
  const imgData = await readFile(BlobTypes.Image,{description:'图片',accept:'.jpg,.png,.png'});
  imgDiv.value.innerText = imgData.name
  imgDiv.value.appendChild(imgData.content);
}


</script>