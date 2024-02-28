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

/************************************列表************************************ */
/**
 * 设定如何解析列表数据的请求结果
 */
export interface IAnalyzeTable {
  // 结果列表key-默认records
  list?: string
  // 总数key-默认total
  total?: string
  // 当前页key-默认current
  current?: string
}

/**
 * 表格项
 */
export interface IColumnItem extends IBaseDescItem {
  minWidth?: string
  color?: string | Array<string>
  align?: string
  headerAlign?: string
  btns?: Array<IColumnItem>
  isBatch?: Boolean
  fixed?: 'left' | 'right'
  count?: number
  nodes?: Array<any>
  inline?: Boolean
  text?: Boolean
  children?: Array<IColumnItem>
  scShow?: boolean
  showOverflowTooltip?: boolean
  content?: any
  hstyle?: any
  noHide?: boolean | ((data?: any) => boolean)
  // 真正的vif
  __vif?: boolean
  // 是否合并行
  isRowSpan?: boolean
  // 是否合并列
  isColSpan?: boolean
  // 判断合并行的prop数组
  rsProps?: Array<string>
}

/**
 * 导出项
 */
export interface IExportConfig {
  // 导出的URL接口地址
  url?: string
  // 查询导出URL的fetch
  fetch?: IFetch<string>
  // 如何去解析数据结果获取url
  urlKey?: string | Array<string>
  // 请求夹带的数据
  data?: Object
  // 文件名
  name?: string
  // 是否增加token权限
  isAuth?: Boolean
  // token名称
  tokenKey?: string
  // 是否需要拼接查询条件
  noQuery?: Boolean
  // 导出文件的后缀
  suffix?: string
  // 请求类型
  method?: 'get' | 'post'
  // 请求数据处理
  beforeRequest?: Function
  // 启用禁用状态
  disabled?: boolean
}

/**
 * 列表工具
 */
export interface ITableToolbar {
  // 列表顶部的功能按钮
  btns?: Array<any>
  // btn靠右显示, 只有当formConfig为null，可设置改属性
  btnRight?: boolean
  // 顶部查询条件的form
  formConfig?: IFormConfig
  // 顶部导出excel配置
  export?: IExportConfig
}

/**
 * 表单数解析
 */
export interface ITreeProps {
  // 子集的key字段
  children: string
  // 是否拥有子集的key
  hasChildren?: boolean
}

/**
 * 展开配置
 */
export interface IExpConfig {
  // 是否自动展开
  isAutoLoadData?: Boolean
  // 展开自身的查询主键的Id名称
  idName?: string
  // 渲染嵌套数据的配置选项
  treeProps?: ITreeProps
  // 需要查询的父类ID-展开类型的列表时采用;;
  queryId?: string
}

/**
 * 统计项
 */
export interface IStatisticConfig {
  // 数据库对应字段
  dbKeys: Array<string>
  // 需要统计的字段信息
  keys: Array<Object>
}

/**
 * 列表的选项卡配置
 */
export interface ITableTabConf {
  prop?: string
  tabs: Array<ITableTabItem>
  attrs?: IBaseObj | Function
  // 远程拉取数量信息
  fetch?: IFetch<any>
  // 查询条件
  queryMap?: any
  // 默认选中的下标
  default?: number
  // 默认选中的值
  defaultVal?: string | number
}

/**
 * 列表的选项配置
 */
export interface ITableTabItem {
  label: string | ((data?: any) => string)
  value: string | number
  key?: string
}

/**
 * 尾行合计配置
 */
export interface ISummaryConf {
  // 尾行合计的属性名, 多个用逗号分割
  prop: string
  // 尾行合计的显示名称, 多个用逗号分割
  label?: string
  // 格式化
  format?: string
  // 尾行合计的合并方法
  sumFn?: (tableData: any[], allSelectRowList?: any[]) => string
  //尾行合计的样式
  hstyle?: any
  vif?: boolean | ((data?: any) => boolean)
}

/**
 * 列表配置
 */
export interface ITableConfig {
  // 列表的名称，全局唯一，且固定，方便存储列表设置
  tbName?: string
  tabConf?: ITableTabConf
  // 调用接口
  fetch?: IFetch<any>
  // 如何去解析数据结果
  fetchMap?: IFetchMap
  // 列表配置，包含表头，每列信息等
  column?: Array<IColumnItem>
  // 查询条件
  queryMap?: any
  // 列表顶部的工具栏
  toolbar?: ITableToolbar
  // 每行自身展开配置项
  explan?: IExplanConfig
  // 针对每行的class进行单独控制
  formatRowClass?: Function
  // 如果数据返回有多级，那么这里就是解析的地方 比如 ['res', 'data', 'list'] 这说明，要获取的是请求返回数据中，rea.data.list 这个数据
  dataListModel?: Array<string>
  // 统计信息
  statistic?: IStatisticConfig
  // 最大高度
  maxHeight?: number
  // 表格属性
  tableAttr?: any
  // 显示选中项的名称Key
  showSelectNameKey?: String
  // 配置通用的合计行
  summaryConf?: ISummaryConf
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

/**
 * 注册curd配置
 */
export interface ICRUDConfig {
  // 是否开始debug调试模式,目前主要时一些console信息打印
  debug?: boolean
  // element plus组件的size
  size?: 'default' | 'small' | 'large'
  // 本地存储的key前缀
  storagePrefix?: string
  // 表单相关配置
  form?: {
    // 输入长度限制
    leng?: {
      // input长度限制
      input?: number
      // 文本域长度限制
      textare?: number
      // 数字输入框限制信息
      nbinput?: {
        // 最小数值
        min?: number
        // 最大数值
        max?: number
        // 小数位数
        precision?: number
        // 是左右加减，还是 右侧的上下箭头 element plus number组件的属性
        controlsPosition?: 'right' | ''
      }
    }
    // 用户选择组件设置
    linkUser?: {
      // 获取用户列表的查询接口
      getUserList: IFetch<any>
      // 部门列表key
      deptListKey: string
    }
    // 用户自定义form组件的名称,使用这个，全局注册的名字为el-plus-form-xxx，form中就可以使用xxx进行引入
    comList?: string[]
  }
  // 上传组件配置
  upload?: {
    // 类型 minio 或者 七牛 / 阿里云 或者不填，不填则完全依赖 action
    type?: 'minio' | 'quniu' | 'aliyun'
    // 上传路径，也可以单独配置到子组件desc中
    action?: string | ((data?: any) => string | Promise<any>)
    // 如果action返回的值是对象的话，则按照以下map进行解析
    actionMap?: {
      // 获取文件上传地址的对象key，如果不在根级，则需使用数组的形式。如：data.xxx.action 就需要写为 ['data', 'xxx', 'action']
      actionKey?: string | Array<string>
      // 获取文件对象的名称key，如果不在根级，则需使用数组的形式。如：data.xxx.name 就需要写为 ['data', 'xxx', 'name']
      nameKey?: string | Array<string>
      // 获取文件上传id对象key，如果不在根级，则需使用数组的形式。如：data.xxx.uploadId 就需要写为 ['data', 'xxx', 'uploadId']
      uploadIdKey?: string | Array<string>
      // 获取文件对象的地址key，如果不在根级，则需使用数组的形式。如：data.xxx.objectUrl 就需要写为 ['data', 'xxx', 'objectUrl']
      objectUrlKey?: string | Array<string>
    }
    // 上传图片最大限制
    maxISize?: number
    // 上传文件最大限制
    maxFSize?: number
    // 真正的上传方法
    uploadFn?: (data?: Object) => Promise<any>
    // 获取上传的token信息
    token?: string | Object | ((data?: Object) => Promise<Object>)
    // 获取文件上传的token对象key，如果不在根级，则需使用数组的形式。如：data.xxx.token 就需要写为 ['data', 'xxx', 'token']
    tokenKey?: string | Array<string>
    // 获取文件访问签名-私有云或私有minio时必填
    sign?: (uploadId: string) => Promise<any>
    // 解析签名数据Map
    signMap?: {
      // 获取文件对象的地址key，如果不在根级，则需使用数组的形式。如：data.xxx.objectUrl 就需要写为 ['data', 'xxx', 'objectUrl']
      objectUrlKey?: string | Array<string>
      // 获取文件上传地址的对象key，如果不在根级，则需使用数组的形式。如：data.xxx.previewUrl 就需要写为 ['data', 'xxx', 'previewUrl']
      previewUrlKey?: string | Array<string>
    }
    // 分片配置
    sharding?: {
      // TODO
    }
  }
  // token 或者是 获取token 的方法
  token?: string | ((data?: any) => string)
  // 校验按钮权限方法
  auth?: (data?: any) => boolean
}
