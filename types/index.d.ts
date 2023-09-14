// 基础类型
export type IBaseObj = IBaseObj

/**
 * 表单回调
 */
export interface IFormBack {
  response?: any
  formData?: IBaseObj
  callBack: Function
}

/**
 * 按钮回调data
 */
export interface IBtnBack {
  row: IBaseObj
  callBack?: Function
  field: string
  rowIndex: number
  files?: Array<any>
}

/**
 * 通用请求
 */
export interface IFetch<T> {
  // 查询数据的方法，入参和返回格式固定
  (data?: any): Promise<T | null>
}

/**
 *  表单描述
 */
export interface IFormDesc {
  [key: string]: IFormDescItem
}

/**
 * 基础的descItem
 */
export type IDescItem = {
  type?: string
  label?: string | ((data?: any) => string)
  prop?: string | ((data?: any) => string)
  width?: string
  format?: string | ((data?: any) => string)
  vif?: boolean | ((data?: any) => boolean)
  vshow?: boolean | ((data?: any) => boolean)
  limit?: number
  required?: boolean | ((data?: any) => boolean)
  style?: IBaseObj | ((data?: any) => IBaseObj)
  // 事件
  on?: { [key: string]: Function }
  // 查看详情
  linkId?: string | ((val: any, formData: any) => string)
  linkType?: string | ((val: any, formData: any) => string)
  linkLabel?: string | ((val: any, formData: any) => string)
  // 内部使用属性
  _vif?: boolean
  // 权限
  auth?: string
}

/**
 * 表单项描述
 */
export interface IFormDescItem extends IDescItem {
  field?: string
  disabled?: boolean | ((data?: any) => boolean)
  showLabel?: boolean
  labelWidth?: string | number
  tip?: string | ((data?: any) => string)
  size?: string
  placeholder?: string
  attrs?: IBaseObj | ((data?: any) => IBaseObj)
  options?: Array<IFormDescItemOptionItem> | IFetch<Array<IFormDescItemOptionItem>> | string
  default?: string | boolean | number
  defaultItem?: { value: string | number; label: string; dataItem?: IBaseObj }
  rules?: string | Array<any>
  valueFormat?: Function
  isBlank?: boolean
  colspan?: number
  upType?: string
  multiple?: boolean
  noTip?: boolean
  maxSize?: number
  remote?: Function
  // 如果是列表
  tableConfig?: ITableConfig
  tableAttr?: IBaseObj
  tableEvent?: IBaseObj

  // 内部接口
  _type?: string
  _tip?: string
  _disabled?: boolean
  _attrs?: IBaseObj
  _label?: string
  _prop?: IBaseObj
  _options?: Array<IFormDescItemOptionItem>
  // 其他属性
  // 级联下拉是否只选中最后一级
  checkStrictly?: boolean
  // key的前缀-方便同一个表单中，存在多个daterange等组件
  propPrefix?: string
}

/**
 * option描述
 */
export interface IFormDescItemOptionItem {
  l?: string
  v?: string | number
  label?: string
  value?: string | number
  children?: Array<IFormDescItemOptionItem>
}

/**
 * 表单配置
 */
export interface IFormConfig {
  // 表单描述对象
  formDesc: IFormDesc
  // 表单的列数，默认是1
  column?: number
  // 提交前执行
  beforeRequest?: (data?: any) => any
  // 请求地址
  requestFn?: (data?: any) => Promise<T>
  // 更新的函数
  updateFn?: (data?: any) => Promise<T>
  // 请求成功时
  success?: (data?: IFormBack) => any
  // 成功时的提醒文本
  successTip?: string | ((data?: any) => string)
  // 列表的ref
  tableRef?: any
}

/**
 * group表单配置
 */
export interface IFormGroupConfig {
  // 表单的列数，默认是1
  column?: number
  // 提交前执行
  beforeRequest?: (data: T) => T
  // 请求地址
  requestFn?: (data?: any) => Promise<T>
  // 更新的函数
  updateFn?: (data?: any) => Promise<T>
  // 请求成功时
  success?: (data: IFormBack) => any
  // 成功时的提醒文本
  successTip?: string | ((data?: any) => string)
  // 列表的ref
  tableRef?: any
  // 分组配置信息
  group: Array<{
    // 小标题
    title?: string
    // 表单的列数，默认是1
    column?: number
    // 表单描述对象
    formDesc: IFormDesc
    // 是否显示
    vif?: boolean | ((data?: any) => boolean)
  }>
}

/************************************列表************************************ */

/**
 * 表格项
 */
export interface IColumnItem extends IDescItem {
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
}

/**
 * 导出项
 */
export interface IExportConfig {
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
  // 导出文件的后缀
  suffix?: string
  // 请求类型
  method?: 'get' | 'post'
  // 请求数据处理
  beforeRequest?: Function
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
  prop: string
  tabs: Array<ITableTabItem>
  attrs?: IBaseObj | Function
  // 远程拉取数量信息
  fetch?: IFetch<any>
  // 查询条件
  queryMap?: any
  // 默认选中的下标
  default?: number
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
  debug?: boolean
  size?: 'default' | 'small' | 'large'
  storagePrefix?: string
  form?: {
    leng?: {
      input?: number
      textare?: number
      nbinput?: {
        min: number
        max: number
        precision: number
        controlsPosition: 'right' | ''
      }
    }
    linkUser?: {
      getUserList: IFetch<any>
      deptListKey: string
    }
    // 用户自定义form组件的名称,使用这个，全局注册的名字为el-plus-form-xxx，form中就可以使用xxx进行引入
    comList?: string[]
  }
  upload?: {
    type: 'minio' | 'quniu'
    action?: string | ((data?: any) => string)
    maxISize?: number
    maxFSize?: number
    minio?: {
      getUploadUrl: (fileName?: string) => Promise<any>
      doElUpload: (fileName?: string) => Promise<any>
      getObjectAuthUrl: (fileName?: string) => Promise<any>
    }
  }
  token?: string | ((data?: any) => string)
  // 按钮权限方法
  auth?: (data?: any) => boolean
}
