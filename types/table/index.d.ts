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
