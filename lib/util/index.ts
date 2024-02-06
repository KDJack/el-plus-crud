import { cloneDeep } from 'lodash'
import { useDateFormat } from '@vueuse/core'
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

/**
 * 如果 value 不是数组, 那么强制转为数组
 * 空转为空数组 undefined | null | '' => []
 * 1 => [1], false => [false], {} => [{}]
 * @param value
 * @returns
 */
export function castArray(value: any) {
  if (Array.isArray(value)) {
    return value
  } else if (value === undefined || value === null || value === '') {
    return []
  } else {
    return value.split(',')
  }
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
    let tempObj = cloneDeep(obj) as any
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
 * 处理是否显示问题
 * @param vif
 * @param param
 * @returns
 */
export function getVIf(vif: boolean | string | number | Function | undefined, param?: any) {
  if (typeof vif === 'function') return vif(param)
  if (typeof vif === 'boolean') return vif
  if (typeof vif === 'string') return vif === 'true' || vif === '是' || vif === '1'
  if (typeof vif === 'number') return vif >= 1
  return true
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
  return navigator.userAgent.match(/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i)
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
    if (excludeList && Array.isArray(excludeList) && excludeList.length > 0 && excludeList.indexOf(key) >= 0) continue
    if (map[key] !== undefined && map[key] !== null && map[key] !== '') {
      if (queryStr !== '') queryStr += '&'
      queryStr += `${key}=${map[key]}`
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
  if (valueFormat) _valueFormat = typeof valueFormat === 'string' ? valueFormat : (valueFormat(value) as string)
  return useDateFormat(new Date(value), _valueFormat)
}
