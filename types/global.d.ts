import type { DefineComponent } from 'vue'

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明 ref
declare type RefType<T = any> = T | null

// 声明 HTMLElement
declare type HtmlType = HTMLElement | string | undefined | null
