import { Ref } from 'vue'

/**
 * 基础类型
 */
export type IBaseObj = {
  [key: string]: any
}

/**
 * 通用请求
 */
export type IFetch<T> = {
  // 查询数据的方法，入参和返回格式固定
  (data?: any): Promise<T | null> | T
}

/**
 * 基础的类型
 */
export type IBaseType<T> = T | Ref<T> | ((data?: any, data2?: any) => T)

/**
 * 通用基础回调
 */
export interface IBaseCallBack {
  data: IBaseObj
  callBack: (time?: number) => void
}

/**
 * 表单回调
 */
export interface IFormBack extends IBaseCallBack {
  response?: IBaseObj
}

/**
 * 按钮回调data
 */
export interface IBtnBack extends IBaseCallBack {
  field?: string
  rowIndex?: number
}

/**
 * option描述
 */
export interface IBaseOptionItem {
  l?: string
  v?: string | number
  label?: string
  value?: string | number
  children?: Array<IBaseOptionItem>
}

/**
 * 基础内部使用对象
 */
export interface IBaseDescItemIn {
  // 内部使用属性
  _vif?: boolean
  // 内部接口
  _type?: string
  _tip?: string
  _disabled?: boolean
  _attrs?: IBaseObj
  _label?: string
  _prop?: IBaseObj
  _options?: Array<IBaseOptionItem>
}

/**
 * 基础描述对象
 */
export interface IBaseDescItem {
  prop?: string
  type?: string
  label?: IBaseType<string>
  format?: IBaseType<string>
  vif?: IBaseType<boolean>
  width?: string
  style?: IBaseType<IBaseObj>
  attrs?: IBaseType<IBaseObj>
  // 事件
  on?: { [key: string]: Function }
  // 权限
  auth?: IBaseType<string>
}
