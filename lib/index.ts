import { App } from 'vue'
import components from './components-list'
import ElPlusForm from './components/el-plus-form/ElPlusForm.vue'
import ElPlusFormDialog from './components/el-plus-form/ElPlusFormDialog.vue'
import ElPlusFormGroup from './components/el-plus-form/ElPlusFormGroup.vue'
import ElPlusTable from './components/el-plus-table/ElPlusTable.vue'
import defaultConf from './config'

export default {
  install: (app: App, config: ICRUDConfig, format?: { [key: string]: Function }, globalData?: { [key: string]: Function }) => {
    // 合并配置
    Object.assign(defaultConf, config)
    defaultConf.debug && console.log('initConfig: ', defaultConf)

    // 这里注入format对象
    app.provide('format', format)
    app.provide('globalData', globalData)

    // 这里注入defaultConf
    app.provide('defaultConf', defaultConf)

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
