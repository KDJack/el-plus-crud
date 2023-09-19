import { cloneDeep } from 'lodash'
import { ICRUDConfig, IColumnItem } from 'types'

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
export function handelListColumn(columnList: Array<IColumnItem> | undefined, defaultConf: ICRUDConfig, tbName: string, headerAlign?: string, minWidth?: string): any[] {
  const tempColumnList = [] as any[]
  if (columnList && columnList.length > 0) {
    // 不影响原有的对象，这里进行拷贝
    cloneDeep(columnList).map((item: IColumnItem) => {
      // 如果有子集
      if (item.children) {
        item.children = handelListColumn(item.children, defaultConf, tbName, headerAlign, minWidth)
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
            item.btns.map((item: any) => (labelLength += typeof item.label === 'string' ? item.label.length : 4))
            item.width = item.width || labelLength * 20 + 'px'
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

      // 表头居中
      if (item.children?.length) {
        item.headerAlign = item.headerAlign || headerAlign || 'center'
      }

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
  if (tbName) {
    if (item.vif !== undefined && item.vif !== null) {
      if (typeof item.vif === 'function') {
        item._vif = item.vif(item)
      } else {
        item._vif = !!item.vif
      }
    } else {
      item._vif = true
    }
    item.__vif = item.scShow && item._vif
  } else {
    // 这里初始化一下vif
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
    item.__vif = item._vif
  }

  // 这里要判断下下级显示状态, 如果下级全部隐藏了，那么本级也应该隐藏
  if (item.children && item.children.every((info) => !info.__vif)) {
    item.__vif = false
  }
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
