import { nextTick } from 'vue'

export interface IMixinsProps {
  modelValue?: any
  field?: string
  rowIndex?: number
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  isMobile?: boolean
  defineEmits?: any
}

/**
 * 获取属性
 * @param props
 * @param customAttrs
 * @returns
 */
export const getAttrs = async (props: IMixinsProps, customAttrs?: { [key: string]: any }) => {
  // 合并属性
  const attrs = Object.assign({}, customAttrs, props.desc?._attrs, props.desc, props.desc?.attrs, getPlaceholder(props.desc))

  // delete attrs.remote

  // 处理多选
  if (props.desc.multiple) {
    attrs.multiple = true
    attrs.showCheckbox = true
    if (['select'].indexOf(props.desc.type) >= 0) {
      attrs.collapseTags = props.desc.attrs?.collapseTags ?? props.desc?.collapseTags ?? false
      attrs.collapseTagsTooltip = props.desc.attrs?.collapseTagsTooltip ?? props.desc?.collapseTagsTooltip ?? false
    }
  }

  // if (['area'].indexOf(props.desc.type) >= 0) {
  //   delete attrs.options
  // }

  // 处理下elType
  if (props.desc.elType) {
    if (typeof props.desc.elType === 'function') {
      attrs.type = props.desc.elType(props.formData)
    } else {
      attrs.type = props.desc.elType
    }
  }
  return attrs
}

/**
 * 获取事件
 * @returns
 */
export const getEvents = (props: IMixinsProps) => {
  const tempOn = {} as any
  if (props.desc?.on) {
    Object.keys(props.desc.on).map((key: string) => {
      tempOn[key] = (val: any) => {
        nextTick(() => {
          props.desc.on[key](props.formData, props.rowIndex, val)
        })
      }
    })
  }
  return tempOn
}

/**
 * 根据类型获取属性 placeholder
 * @param desc
 * @returns
 */
function getPlaceholder(desc: { [key: string]: any }) {
  if (desc?.placeholder) return { placeholder: desc?.placeholder }
  if (!desc || !desc.type) return ''
  switch (desc.type) {
    case 'input':
    case 'nbinput':
    case 'password':
    case 'number':
    case 'validCode':
    case 'tag':
    case 'textarea':
    case 'percentinput':
      return { placeholder: desc?.placeholder || '请输入' + (desc?._label || '') }
    case 'switch':
      return {}
    case 'area':
    case 'select':
    case 'category':
    case 'cascader':
      return { placeholder: desc?.placeholder || '请选择' + (desc.remote ? '（可输入进行搜索）' : desc?._label || '') }
    case 'data':
    case 'datetime':
    case 'datas':
    case 'date':
      return { placeholder: '请选择日期' }
    case 'daterange':
    case 'datetimerange':
    case 'timerange':
    case 'monthrange':
      return {
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      }
    case 'dates':
      return { placeholder: '请选择一个或多个日期' }
    case 'month':
      return { placeholder: '请选择月' }
    case 'time':
    case 'timsPicker':
      return { placeholder: '请选择时间' }
    case 'week':
      return { placeholder: '请选择周' }
    case 'year':
      return { placeholder: '请选择年' }
    case 'upimg':
      return { placeholder: '请上传' }
    case 'upfile':
      return { placeholder: '点击上传' }
  }
}
