import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'

// 是否定义
export function isDef(val: any) {
  return !isUnDef(val)
}

// 是否没定义
export function isUnDef(val: any) {
  return val === null || val === undefined
}

// 判断是否为函数
export function isFunction(val: any) {
  return typeof val === 'function'
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
 * 判断是否是移动端
 */
export function isMobile() {
  if (navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i)) {
    return true
  } else {
    return false
  }
}

// 判断类型
export function is(val: any, type: any) {
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some((type) => `[object ${type}]` === valType)
}

// 获取 display: none 的节点宽度和高度
export function getSize(elem: any) {
  const noneNodes: any[] = []
  const nodeStyle: any[] = []

  getNoneNode(elem) // 获取多层display：none;的元素
  setNodeStyle()
  const width = elem.clientWidth
  const height = elem.clientHeight
  resumeNodeStyle()

  return {
    width: width,
    height: height
  }

  function getNoneNode(node: any) {
    const display = getStyles(node).getPropertyValue('display')
    const tagName = node.nodeName.toLowerCase()
    if (display !== 'none' && tagName !== 'body') {
      getNoneNode(node.parentNode)
    } else {
      noneNodes.push(node)
      if (tagName !== 'body') getNoneNode(node.parentNode)
    }
  }

  // 这方法才能获取最终是否有display属性设置，不能style.display。
  function getStyles(elem: any) {
    // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    let view = elem.ownerDocument.defaultView

    if (!view || !view.opener) {
      view = window
    }
    return view.getComputedStyle(elem)
  }

  function setNodeStyle() {
    let i = 0
    for (; i < noneNodes.length; i++) {
      const visibility = noneNodes[i].style.visibility
      const display = noneNodes[i].style.display
      const style = noneNodes[i].getAttribute('style')
      // 覆盖其他display样式
      noneNodes[i].setAttribute('style', 'visibility:hidden;display:block !important;' + style)
      nodeStyle[i] = {
        visibility: visibility,
        display: display
      }
    }
  }

  function resumeNodeStyle() {
    let i = 0
    for (; i < noneNodes.length; i++) {
      noneNodes[i].style.visibility = nodeStyle[i].visibility
      noneNodes[i].style.display = nodeStyle[i].display
    }
  }
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

// 判断是否为空
// 空数组 / null / undefined / 空字符串
export function isEmpty(val: any) {
  if (Array.isArray(val) && val.length === 0) {
    return true
  } else if (isUnDef(val)) {
    return true
  } else if (typeof val === 'string' && val === '') {
    return true
  } else {
    return false
  }
}

/**
 * 格式化表单字段
 * @param formData
 * @param formDesc
 */
export function valueFormat(formData: any, formDesc: any) {
  for (const field in formData) {
    const formItem = formDesc[field]
    if (formItem && formItem.valueFormat) {
      if (typeof formItem.valueFormat === 'function') {
        formData[field] = formItem.valueFormat(formData[field], formData)
      }
      switch (formItem.valueFormat) {
        case 'arrayToStr':
          formData[field] = arrayToStr(formData[field])
          break
        default:
          throw Error('无效的 valueFormat 类型')
      }
    }
  }
}

/**
 *
 * @param val 数组转字符串
 */
export function arrayToStr(val: any) {
  if (Array.isArray(val)) {
    return val.join(',')
  } else {
    return val + ''
  }
}

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
  return dayjs(value).format(_valueFormat)
}

function checkTen(val: any) {
  if (val * 1 < 10) {
    return '0' + val
  }
  return val
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
 * 节流
 * @param fn
 * @param delay
 * @returns
 */
export function throttle(cb: Function, delay: number) {
  var timer = null as any
  return function (this: any) {
    var _this = this
    var _arguments = arguments
    if (!timer) {
      timer = setTimeout(function () {
        cb.apply(_this, _arguments)
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
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
 * 根据key或者keyList获取对应值
 * @param keys
 * @param obj
 */
export function getValue(keys: string | Array<string>, obj: Object) {
  if (!obj || !keys || keys.length <= 0) return null
  if (Array.isArray(keys)) {
    let tempObj = cloneDeep(obj)
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
 * 获取值（方法）
 * @param val
 * @param prams
 * @returns
 */
export function getFnValue<T>(val: any | Function, param?: any) {
  if (typeof val === 'function') {
    return val(param)
  }
  return val
}
