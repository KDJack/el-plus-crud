import { cloneDeep } from 'lodash'
import { IColumnItem } from 'types/formList'

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

// 判断类型
export function is(val: any, type: any) {
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some((type) => `[object ${type}]` === valType)
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
export function handelListColumn(columnList: Array<IColumnItem>, minWidth?: string): any[] {
  const tempColumnList = [] as any[]
  if (columnList && columnList.length > 0) {
    // 不影响原有的对象，这里进行拷贝
    cloneDeep(columnList).map((item: IColumnItem) => {
      // 处理下一个单元格显示多个数据
      if (item.nodes) {
        const tempList = (handelListColumn(item.nodes, minWidth) as any)[0].children
        item.nodes = tempList || item.nodes
      }
      // 检查type属性,没有type属性的自动补一个text类型
      if (!item.type) {
        item.type = 'text'
      }
      // 这里判断下type类型，然后进行一下表头和表格的对齐方式
      switch (item.type) {
        case 'image':
          item.width = item.width || '110px'
          item.align = item.align || 'left'
          item.headerAlign = item.headerAlign || 'left'
          break
        case 'btns':
          if (!item.minWidth && item.btns && item.btns.length >= 2) {
            let labelLength = 0
            item.btns.map((item: any) => (labelLength += typeof item.label === 'string' ? item.label.length : 4))
            item.width = item.width || labelLength * 20 + 'px'
          }
          item.align = item.align || 'left'
          item.headerAlign = item.headerAlign || 'left'
          item.text = true
          break
      }
      // item.minWidth = item.minWidth || 'auto'
      item.minWidth = item.minWidth || (item.label !== '操作' ? minWidth : 'auto')

      // 处理下‘操作’
      item.showOverflowTooltip = item.label !== '操作'

      if (item.parent) {
        let isExists = false
        tempColumnList.forEach((colum: any) => {
          if (colum.label === item.parent) {
            colum.children.push(item)
            isExists = true
          }
        })
        if (!isExists) {
          tempColumnList.push({ label: item.parent, children: [item] })
        }
      } else {
        tempColumnList.push(item)
      }
    })
  }
  return tempColumnList
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
