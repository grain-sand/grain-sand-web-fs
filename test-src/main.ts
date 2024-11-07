import {createApp} from 'vue'
import './style/index.scss'

import App from './App.vue'
import {addRouter, defineRouters} from "./lib/helpers";

createApp(App).use(defineRouters([
	addRouter('Test-readFileHandler.vue','/readFileHandler'),
	addRouter('Test-readFile.vue','/'),
	addRouter('Test-saveFileHandler','/Test-saveFileHandler'),
	addRouter('Test-saveFile','/Test-saveFile'),
	addRouter('Test-storeFile','/Test-storeFile'),
])).mount('#app')