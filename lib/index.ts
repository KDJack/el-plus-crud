import { App } from 'vue'
import components from './components-list'
import ElPlusForm from './components/el-plus-form/ElPlusForm.vue'
import ElPlusFormDialog from './components/el-plus-form/ElPlusFormDialog.vue'
import ElPlusFormGroup from './components/el-plus-form/ElPlusFormGroup.vue'
import ElPlusTable from './components/el-plus-table/ElPlusTable.vue'
import defaultConf from './config'
import * as all from '../types'
import { cloneDeep, debounce } from 'lodash-es'

export default {
  install: (app: App, config?: all.ICRUDConfig, format?: { [key: string]: Function }, globalData?: { [key: string]: Function }) => {
    // 合并配置
    deepMerge(defaultConf, config || {})
    defaultConf.debug && console.log('initConfig: ', defaultConf)

    // 这里注入format对象
    app.provide('format', format)
    app.provide('globalData', globalData)

    // 这里注入defaultConf
    app.provide('defaultConf', defaultConf)

    // 这里注入lodash
    app.provide('lodash', { cloneDeep, debounce })

    // 循环注册表单组件
    components.unshift(ElPlusForm)
    components.unshift(ElPlusFormDialog)
    components.unshift(ElPlusFormGroup)

    // 注册列表组件
    components.push(ElPlusTable)

    defaultConf.debug && console.log('components: ', components)

    components.map((component: any) => {
      app.component(component.name, component)
    })
  }
}

/**
 * 深度合并对象
 * @param obj1
 * @param obj2
 * @returns
 */
function deepMerge(obj1: any, obj2: any) {
  let key
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key])
  }
  return obj1
}
