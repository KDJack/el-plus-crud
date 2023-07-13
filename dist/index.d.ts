import { App } from 'vue'
declare const _default: {
  install: (
    app: App,
    config: ICRUDConfig,
    format?:
      | {
          [key: string]: Function
        }
      | undefined,
    globalData?:
      | {
          [key: string]: Function
        }
      | undefined
  ) => void
}
export default _default
