/**
 *  表单描述
 */
declare interface IFormDesc {
  [key: string]: IFormDescItem
}

/**
 * 表单项描述
 */
declare interface IFormDescItem {
  type: string
  field?: string
  label?: string | Function
  prop?: string | Function
  disabled?: boolean | Function
  width?: string
  format?: string | Function
  showLabel?: boolean
  labelWidth?: string | number
  vif?: Function
  tip?: string | Function
  size?: string
  placeholder?: string
  attrs?: { [key: string]: any } | Function
  options?: Array<IFormDescItemOptionItem> | IFetch<Array<IFormDescItemOptionItem>> | string
  default?: string | boolean | number
  defaultItem?: { value: string | number; label: string; dataItem?: { [key: string]: any } }
  rules?: string | Array<any>
  require?: boolean
  required?: boolean
  valueFormat?: Function
  isBlank?: boolean
  colspan?: number
  upType?: string
  multiple?: boolean
  noTip?: boolean
  limit?: number
  maxSize?: number
  remote?: Function
  // 如果是列表
  tableConfig?: ITableConfig
  tableAttr?: { [key: string]: any }
  tableEvent?: { [key: string]: any }
  // 查看详情
  linkId?: string | ((val: any, formData: any) => string)
  linkType?: string | ((val: any, formData: any) => string)
  linkLabel?: string | ((val: any, formData: any) => string)
  // 内部接口
  _type?: string
  _vif?: boolean
  _tip?: string
  _disabled?: boolean
  _attrs?: { [key: string]: any }
  _label?: null
  _prop?: { [key: string]: any }
  _options?: Array<IFormDescItemOptionItem>
  // 其他属性
  // 级联下拉是否只选中最后一级
  checkStrictly?: boolean
}

/**
 * option描述
 */
declare interface IFormDescItemOptionItem {
  l?: string
  v?: string | number
  label?: string
  value?: string | number
  children?: Array<IFormDescItemOptionItem>
}

/**
 * 按钮回调data
 */
declare interface IBtnBack {
  row: { [key: string]: any }
  callBack?: Function
  field: string
  rowIndex: number
}

/**
 * 表单配置
 */
declare interface IFormConfig {
  // 表单描述对象
  formDesc: IFormDesc
  // 表单里面item的顺序
  order?: Array<string>
  // 表单的列数，默认是1
  column?: number
  // 请求地址
  beforeRequest?: Function
  // 请求地址
  requestFn?: Function
  // 更新的函数
  updateFn?: Function
  // 请求成功时
  success?: Function
  // 成功时的提醒文本
  successTip?: string
  // 列表的ref
  tableRef?: any
}

/**
 * 表单回调
 */
declare interface IFormBack {
  response?: any
  formData?: { [key: string]: any }
  callback: Function
}

/************************************列表************************************ */

declare interface IFetch<T> {
  // 查询数据的方法，入参和返回格式固定
  (data?: any): Promise<T | null>
}

/**
 * 表格项
 */
declare interface IColumnItem {
  label: string | ((data?: any) => string)
  prop?: string
  type?: string | Array<string>
  width?: string
  minWidth?: string
  format?: string | Array<string>
  color?: string | Array<string>
  align?: string
  headerAlign?: string
  btns?: Array<Object>
  isBatch?: Boolean
  style?: Object
  fixed?: 'left' | 'right'
  limit?: number
  count?: number
  nodes?: Array<any>
  inline?: Boolean
  text?: Boolean
  parent?: string
  vif?: boolean | 0 | 1 | Function
  _vif?: boolean
  vshow?: boolean | 0 | 1 | Function
  scShow?: boolean
  showOverflowTooltip?: boolean
  content?: any
  hstyle?: any
}

/**
 * 导出项
 */
declare interface IExportConfig {
  // 导出的URL接口地址
  url?: string
  // 查询导出URL的fetch
  fetch?: IFetch<string>
  // 请求夹带的数据
  data?: Object
  // 文件名
  name?: string
  // 是否增加token权限
  isAuth?: Boolean
  // 是否需要拼接查询条件
  noQuery?: Boolean
}

/**
 * 列表工具
 */
declare interface ITableToolbar {
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
declare interface ITreeProps {
  // 子集的key字段
  children: string
  // 是否拥有子集的key
  hasChildren?: string
}

/**
 * 展开配置
 */
declare interface IExpConfig {
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
declare interface IStatisticConfig {
  // 数据库对应字段
  dbKeys: Array<string>
  // 需要统计的字段信息
  keys: Array<Object>
}

/**
 * 列表的选项卡配置
 */
declare interface ITableTabConf {
  prop: string
  tabs: Array<ITableTabItem>
  attrs?: { [key: string]: any } | Function
  // 远程拉取数量信息
  fetch?: IFetch<PageObject<any>>
  // 查询条件
  queryMap?: any
}

/**
 * 列表的选项配置
 */
declare interface ITableTabItem {
  label: string | Function
  value: string | number
  key?: string
}

/**
 * 尾行合计配置
 */
declare interface ISummaryConf {
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
declare interface ITableConfig {
  // 列表的名称，全局唯一，且固定，方便存储列表设置
  tbName?: string
  tabConf?: ITableTabConf
  // 调用接口
  fetch?: IFetch<any>
  // 列表配置，包含表头，每列信息等
  column: Array<IColumnItem>
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
declare interface IOssInfo {
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
declare interface IFInfoGroupItem {
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
declare interface IFiles {
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
declare interface IDownInfo {
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
declare interface IDownFile {
  // 文件名
  name: string
  // 文件夹名
  folder: string
  // 文件地址
  url: string
  // 上传进度
  percent?: number
}

declare interface ICRUDConfig {
  debug: boolean
  size?: 'default' | 'small' | 'large'
  storagePrefix?: string
  form?: {
    leng: {
      input: number
      textare: number
      nbinput: {
        min: number
        max: number
        precision: number
        controlsPosition: 'right' | ''
      }
    }
  }
  upload?: {
    type: 'minio' | 'quniu'
    action: string | ((data?: any) => string)
    maxISize: number
    maxFSize: number
    minio?: {
      action: string | ((data?: any) => string)
      getUploadUrl: (fileName?: string) => Promise<any>
      doElUpload: (fileName?: string) => Promise<any>
      getObjectAuthUrl: (fileName?: string) => Promise<any>
    }
  }
  token?: string | ((data?: any) => string)
}
