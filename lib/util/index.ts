import { ICRUDConfig, IColumnItem } from '../../types'

/**
 * 裁剪长度
 * @param str
 * @param len
 * @param isTransHz 是否转换汉字长度为2个英文字母长度
 */
export const cutString = (str: string = '', len: number, isTransHz: boolean = false) => {
  if (!str) return ''
  const length = isTransHz ? getStrLength(str) : str.length
  if (length > len) {
    return str.substring(0, len - 2) + '...' + str.substring(len - 2, len)
  }
  return str
}

// 如果 value 不是数组, 那么强制转为数组
// 空转为空数组 undefined | null | '' => []
// 1 => [1], false => [false], {} => [{}]
export function castArray(value: any) {
  if (Array.isArray(value)) {
    return value
  } else if (value === undefined || value === null || value === '') {
    return []
  } else {
    return value.split(',')
  }
}

// 数据转移为cascade的category
export function castCategory(value: any, formData: any) {
  if (Array.isArray(value)) {
    return value
  } else {
    const tempList = []
    if (formData.categoryId1) tempList.push(formData.categoryId1)
    if (formData.categoryId2) tempList.push(formData.categoryId2)
    if (formData.categoryId3) tempList.push(formData.categoryId3)
    return tempList
  }
}

// 如果 value 不是数组, 那么强制转为数组
export function castFileList(value: any) {
  if (Array.isArray(value)) {
    return value
  } else if (value === undefined || value === null || value === '') {
    return []
  } else {
    return value.split(',')
  }
}

// 如果 value 不是字符串, 那么强制转为字符串
export function castString(value: any) {
  if (typeof value === 'string') {
    return value
  } else if (value === undefined || value === null) {
    return ''
  } else if (value.toString) {
    return value.toString()
  } else {
    return value + ''
  }
}

// 如果 value 不是Boolean, 那么强制转为Boolean
export function castBoolean(value: any) {
  if (typeof value === 'boolean') {
    return value
  } else {
    return Boolean(value)
  }
}

// 如果 value 不是Number, 那么强制转为Number
export function castNumber(value: any): number {
  if (typeof value === 'number') {
    return value
  } else {
    return Number(value) || 0
  }
}

/**
 * 格式化日期
 * @param date
 * @param format
 * @returns
 */
function formatTime(date: Date, format: string) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+|D+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+|M+': date.getMinutes(), // 分
    's+|S+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
    A: date.getHours() < 12 ? 'AM' : 'PM' // AM/PM
  }
  if (/(y+|Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/**
 * 获取字符串长度
 * @type {(p1?:*)}
 */
export const getStrLength = (str: any) => {
  // <summary>获得字符串实际长度，中文2，英文1</summary>
  // <param name='str'>要获得长度的字符串</param>
  if (!str) return 0
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1
    else realLength += 2
  }
  return realLength
}

/**
 * 获取随机字符串
 * @returns {string}
 */
export function getUID(): string {
  let str = ''
  const arr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  for (let i = 0; i < 32; i++) {
    let index = Math.floor(arr.length * Math.random())
    if (index < 0) index = 0
    str += arr[index]
  }
  return str
}

/**
 * 根据key或者keyList获取对应值
 * @param keys
 * @param obj
 */
export function getValue(keys: string | Array<string>, obj: any) {
  if (!obj || !keys || keys.length <= 0) return null
  if (Array.isArray(keys)) {
    let tempObj = JSON.parse(JSON.stringify(obj)) as any
    for (let i = 0; i < keys.length; i++) {
      tempObj = tempObj[Array.isArray(tempObj) ? parseInt(keys[i]) : keys[i]]
      if (tempObj === undefined || tempObj === null) return null
      if (tempObj === '') return ''
    }
    return tempObj
  } else {
    return obj[keys] || null
  }
}

/**
 * 处理按钮类型
 * @param item
 */
export function handelBtnType(item: any): Object {
  switch (item.type) {
    case undefined:
      item.type = 'primary'
      break
    case 'add':
      item.type = 'primary'
      item.title = item.title || '新增'
      item.icon = 'ele-Plus'
      break
    case 'edit':
      item.type = 'primary'
      item.title = item.title || '编辑'
      item.icon = 'ele-EditPen'
      break
    case 'delete':
    case 'del':
      item.type = 'danger'
      item.title = item.title || '删除'
      item.icon = 'ele-Delete'
      break
  }
  return item
}

/**
 * 处理列表表头，list转Map
 */
export function handelListColumn(columnList: Array<IColumnItem> | undefined, defaultConf: ICRUDConfig, tbName: string, headerAlign?: string, minWidth?: string): any[] {
  const tempColumnList = [] as any[]
  if (columnList && columnList.length > 0) {
    // 不影响原有的对象，这里进行拷贝
    JSON.parse(JSON.stringify(columnList)).map((item: IColumnItem) => {
      // 如果有子集
      if (item.children) {
        // 表头居中
        item.headerAlign = item.headerAlign || 'center'
        item.children = handelListColumn(item.children, defaultConf, tbName, 'center', minWidth)
      } else {
        // 表头居中
        item.headerAlign = item.headerAlign || headerAlign || 'left'
      }

      // 处理下一个单元格显示多个数据
      // if (item.nodes) {
      //   const tempList = (handelListColumn(item.nodes, minWidth) as any)[0].children
      //   item.nodes = tempList || item.nodes
      // }
      // 检查type属性,没有type属性的自动补一个text类型
      if (!item.type) {
        item.type = 'text'
      }
      // 这里判断下type类型，然后进行一下表头和表格的对齐方式
      switch (item.type) {
        case 'image':
          item.width = item.width || '110px'
          item.align = item.align || 'left'
          item.headerAlign = item.headerAlign || headerAlign || 'left'
          break
        case 'btns':
          if (!item.minWidth && item.btns && item.btns.length >= 2) {
            let labelLength = 0
            // 这里判断最多按钮数量
            for (let i = 0; i < item.btns.length && i < (item.limit || 3); i++) {
              if (item.btns[i] && typeof item.btns[i].label === 'string') {
                labelLength += (item.btns[i].label as string).length
              } else {
                labelLength += 4
              }
            }
            item.width = item.width || labelLength * 24 + 'px'
          }
          item.align = item.align || 'left'
          item.headerAlign = item.headerAlign || headerAlign || 'left'
          item.text = true
          break
      }
      // item.minWidth = item.minWidth || 'auto'
      item.minWidth = item.minWidth || (item.label !== '操作' ? minWidth : 'auto')

      // 处理下‘操作’
      item.showOverflowTooltip = item.label !== '操作'

      // 处理vif
      handelVIf(item, defaultConf, tbName)

      tempColumnList.push(item)
    })
  }
  return tempColumnList
}

/**
 * 处理item的vif
 * @param item
 * @param defaultConf
 * @param tbName
 */
export function handelVIf(item: IColumnItem, defaultConf: ICRUDConfig, tbName: string) {
  if (item.vif !== undefined && item.vif !== null) {
    if (typeof item.vif === 'function') {
      item._vif = item.vif(item)
    } else {
      item._vif = !!item.vif
    }
  } else {
    item._vif = true
  }
  // 这里最终处理一下auth权限问题
  if (item.auth) {
    if (!defaultConf.auth) {
      console.warn('使用auth属性，请在crud注册时传入auth校验方法~')
    } else {
      item._vif = defaultConf.auth(item.auth)
    }
  }
  item.__vif = tbName ? item.scShow && item._vif : item._vif
  // 这里要判断下下级显示状态, 如果下级全部隐藏了，那么本级也应该隐藏
  if (item.children && item.children.every((info) => !info.__vif)) {
    item.__vif = false
  }
}

// 判断类型
export function is(val: any, type: any) {
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some((type) => `[object ${type}]` === valType)
}

// 是否定义
export function isDef(val: any) {
  return !isUnDef(val)
}

// 判断是否为函数
export function isFunction(val: any) {
  return typeof val === 'function'
}

// 是否没定义
export function isUnDef(val: any) {
  return val === null || val === undefined
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
  if (navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i)) {
    return true
  } else {
    return false
  }
}

/**
 * 两个对象是否相等
 * @param obj1
 * @param obj2
 */
export function isEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

/**
 * 判断是否是Promise
 * @param it
 * @returns
 */
export function isPromiseLike<T>(it: unknown): it is PromiseLike<T> {
  return it instanceof Promise || typeof (it as any)?.then === 'function'
}

/**
 * map转string
 * @param map
 * @param excludeList
 * @returns {string}
 */
export const mapToUrlStr = (map: any, excludeList?: any) => {
  let queryStr = ''
  for (const key in map) {
    if (excludeList && Array.isArray(excludeList) && excludeList.length > 0) {
      if (excludeList.indexOf(key) >= 0) {
        continue
      }
    }
    if (map[key] !== undefined && map[key] !== null && map[key] !== '') {
      if (queryStr !== '') {
        queryStr += '&'
      }
      queryStr += key + '=' + map[key]
    }
  }
  return queryStr
}

/**
 * 格式化指定时间格式
 * @param value
 * @param valueFormat
 * @returns {*}
 */
export const time = (value: any, valueFormat?: Function | string) => {
  if (value === '' || value === null || value === undefined) return ''
  let _valueFormat = 'YYYY-MM-DD HH:mm:ss'
  if (valueFormat) {
    if (typeof valueFormat === 'string') {
      _valueFormat = valueFormat
    } else {
      _valueFormat = valueFormat(value) as string
    }
  }
  return formatTime(new Date(value), _valueFormat)
}
