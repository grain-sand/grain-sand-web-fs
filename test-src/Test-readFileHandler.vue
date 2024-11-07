<template>
  <h2>Test-ReadFileHandler</h2>
  <div class="Test-ReadFileHandler">
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
        <button>{{ data.bitmap?.name }}</button>
        <button>{{ data.bitmap?.content?.width }}</button>
        <button>{{ data.bitmap?.content?.height }}</button>
      </div>
    </fieldset>
    <fieldset>
      <button
          @click="readSvg()"
      >读取Svg
      </button>
      <div ref="svgDiv">
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {readFile, readFileHandler, BlobTypes} from "../dist";

const imgDiv = ref<HTMLDivElement>(null);
const svgDiv = ref<HTMLDivElement>(null);

const data = reactive({
  txt: '',
  b64: '',
  bitmap: undefined
})

async function showReadFile(type: BlobTypes, filed: string) {
  data[filed] = await readFileHandler(type as any) as any;
}

async function readImage() {
  const imgData = await readFileHandler(BlobTypes.Image, {description: '图片', accept: '.jpg,.png,.png'},2000000);
  imgDiv.value.innerText = imgData.name
  imgDiv.value.appendChild(imgData.content);
}


async function readSvg() {
  const svgData = await readFileHandler(BlobTypes.Svg);
  svgDiv.value.innerHTML = `<button>${svgData.name}</button><button>${svgData.content.width} X ${svgData.content.height}</button>`
  svgDiv.value.appendChild(svgData.content);

  console.log(svgData.content.getAttribute('width'))
  console.log(svgData.content.getAttribute('height'))
  console.log(svgData.content.viewBox.baseVal.width)
  console.log(svgData.content.viewBox.baseVal.height)
}

</script>