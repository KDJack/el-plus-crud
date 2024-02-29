/**
 *  表单描述
 */
export interface IFormDesc {
  [key: string]: IFormDescItem
}

/**
 * 表单项描述
 */
export interface IFormDescItem extends IBaseDescItem, IBaseDescItemIn {
  colspan?: number
  size?: string
  disabled?: IBaseType<boolean>

  isBlank?: boolean
  // 是否必填
  required?: IBaseType<boolean>
  // 数量限制：对于 btn 来说 限制按钮显示个数，对于 文件上传 来说限制文件上传个数
  limit?: number
  vshow?: IBaseType<boolean>
  showLabel?: boolean
  labelWidth?: string | number
  tip?: string | ((data?: any) => string)
  placeholder?: string
  options?: IBaseType<Array<IBaseOptionItem>> | IFetch<Array<IBaseOptionItem>> | string
  remote?: Function
  default?: string | boolean | number
  defaultItem?: { value: string | number; label: string; dataItem?: IBaseObj }
  rules?: string | Array<any>
  valueFormat?: IBaseType<string>

  // 查看详情
  linkId?: IBaseType<string>
  linkType?: IBaseType<string>
  linkLabel?: IBaseType<string>

  // 文件上传
  upType?: string
  multiple?: boolean
  noTip?: boolean
  maxSize?: number

  // 如果是列表
  tableConfig?: ITableConfig
  tableAttr?: IBaseObj
  tableEvent?: IBaseObj

  // 其他表单属性
  // 级联下拉是否只选中最后一级
  checkStrictly?: boolean
  // key的前缀-方便同一个表单中，存在多个daterange等组件
  propPrefix?: string
  // 开始时间key
  startTimeKey?: string
  // 结束时间key
  endTimeKey?: string

  // 其他字符串
  [key: string]: any
}

/**
 * 表单配置
 */
export interface IFormConfig {
  // 表单描述对象
  formDesc: IFormDesc
  // 表单描述对象
  groupFormDesc: IFormDesc
  // 表单的列数，默认是1
  column?: number
  // 提交前执行
  beforeRequest?: IFetch<T>
  // 校验前执行
  beforeValidate?: IFetch<T>
  // 请求地址
  requestFn?: IFetch<T>
  // 更新的函数
  updateFn?: IFetch<T>
  // 请求成功时
  success?: (data: IFormBack) => any
  // 成功时的提醒文本
  successTip?: IBaseType<string>
  // 列表的ref
  tableRef?: Ref<any>
}

/**
 * group表单配置
 */
export interface IFormGroupConfig extends Omit<IFormConfig, 'formDesc'> {
  // 分组配置信息
  group: Array<{
    // 小标题
    title?: string
    // 是否显示showBtns
    showBtns?: boolean
    // 最大宽度
    maxWidth?: string
    // label宽度
    labelWidth?: string
    // 表单的列数，默认是1
    column?: number
    // 表单描述对象
    formDesc: IFormDesc
    // 是否显示
    vif?: boolean | ((data?: any) => boolean)
    // 是否显示-内部使用
    _vif?: boolean
    // 表单的ID
    fid?: string
  }>
}

/**
 * 对象存储Info
 */
export interface IOssInfo {
  id?: string
  name?: string
  furl?: string
  mimeType?: string
  fsize?: number
  suffix?: string
  busId?: string
  busType?: number
  // upload组件需要的字段
  url?: string
  uid?: number
  previewUrl?: string
  shareUrl?: string
  uploadId?: string
}

/************************************表单详情************************************ */
export interface IFormGroupItem {
  title?: string
  // 表单描述对象
  formDesc: IFormDesc
  // 表单的列数，默认是1
  column?: number
  // 最大宽度
  maxWidth?: string
  // 是否是表格
  isTable?: boolean
  // labelWidth
  labelWidth?: string
}

/************************************批量下载************************************ */
/**
 * 文件（夹）信息
 */
export interface IFiles {
  id: string
  // 是否是文件夹
  folder?: 0 | 1
  // 文件(夹)名称
  name: string
  // 文件地址
  url?: string
  // 文件夹中的文件列表
  files?: Array<IFiles>
}

/**
 * 下载信息
 */
export interface IDownInfo {
  // 文件名
  name: string
  // 到期时间
  endData?: string
  // 来源
  sc?: string
  // 状态：1可下载；2已过期；3已删除；4无权限; 5无效
  status: 1 | 2 | 3 | 4 | 5
  // 是否zip压缩，如果不是压缩，则默认下载files[0]
  zip: 0 | 1
  // 文件列表
  files: Array<IFiles>
}

/**
 * 下载文件信息
 */
export interface IDownFile {
  // 文件名
  name: string
  // 文件夹名
  folder: string
  // 文件地址
  url: string
  // 上传进度
  percent?: number
}
