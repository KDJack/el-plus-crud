import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Shell from './Shell.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import ListDemo from './ListDemo.vue'
import DetailDemo from './DetailDemo.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ElPlusCurd from '@/index'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: App },
    { path: '/demo-list', component: ListDemo },
    { path: '/demo-detail', component: DetailDemo }
  ]
})

const app = createApp(Shell)

// import(/* webpackChunkName: "ElPlusCurd" */ '@/index').then((components) => {
//   app.use(components.default)
// })

app.use(ElPlusCurd)

app.use(router)

app.use(ElementPlus).mount('#app')
