import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ElPlusCurd from '@/index'

const app = createApp(App)

// import(/* webpackChunkName: "ElPlusCurd" */ '@/index').then((components) => {
//   app.use(components.default)
// })

app.use(ElPlusCurd)

app.use(ElementPlus).mount('#app')
