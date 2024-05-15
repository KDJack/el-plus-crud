<template>
  <div :style="formLayout">
    <slot name="top" :formData="props.modelValue"></slot>
    <div :style="{ display: 'flex', justifyContent: isDialog ? 'center' : '' }">
      <el-form class="el-plus-form-panel" ref="refElPlusForm" :model="props.modelValue" @submit.prevent="handleSubmitForm" v-bind="computedFormAttrs">
        <el-row :gutter="10" v-for="(formList, index) in attrMapToTableList" :key="index" :style="{ marginRight: isTable ? '20px' : 0 }">
          <el-col v-for="(formItem, y) in formList" :key="index + '-' + y + '-' + formItem.field" :xs="24" :sm="24" :md="formItem.colspan && formItem.colspan >= column ? 24 : column >= 2 ? 12 : 24" :lg="formItem.colspan && formItem.colspan >= column ? 24 : Math.floor((24 / column) * (formItem.colspan || 1))" :xl="formItem.colspan && formItem.colspan >= column ? 24 : Math.floor((24 / column) * (formItem.colspan || 1))">
            <div v-if="formItem._vif" class="el-plus-form-column-panel" :style="{ 'justify-content': isTable ? 'flex-end' : 'flex-start' }">
              <el-form-item style="min-height: 40px; display: flex" :prop="formItem.field" :style="{ width: formItem._attrs?.width || formItem.width || (isTable ? '150px' : '100%'), marginBottom: itemMB }">
                <template #label>
                  <div v-if="showLabel && formItem.showLabel !== false" class="crud-form-label" :style="{ width: formItem.labelWidth || computedFormAttrs._labelWidth || (isDialog ? '100px' : '120px') }">
                    <span :class="{ required: formItem.required }">
                      {{ formItem._label }}
                    </span>
                  </div>
                </template>
                <component style="min-width: 80px; width: 100%; flex: 1" :is="formItem._type" :formData="props.modelValue" :disabled="formItem._disabled ?? disabled ?? false" v-bind="formItem._attrs" :desc="formItem" :ref="setComponentRef" :field="formItem.field" v-model="props.modelValue[formItem.field || '']" :isTable="isTable" @validateThis="() => handelValidateThis(formItem.field || '')"></component>
                <div class="el-plus-form-tip" v-if="formItem._tip" v-html="formItem._tip" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <slot name="row"></slot>
      </el-form>
    </div>
    <slot name="default"></slot>
    <el-form>
      <slot :data="props.modelValue" name="form-btn">
        <div v-if="btnList && btnList.length > 0" style="display: flex; justify-content: center">
          <template v-for="(btn, index) of btnList" :key="index">
            <ElPlusFormBtn v-bind="btn"></ElPlusFormBtn>
          </template>
        </div>
      </slot>
      <slot name="bottom" :formData="props.modelValue"></slot>
    </el-form>
    <slot name="form-footer" :formData="props.modelValue"></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusForm',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, useAttrs, nextTick, onMounted, watch, inject, Ref, useSlots } from 'vue'
import { castArray, isMobile, time, isPromiseLike } from '../../util'
import * as validates from './util/validate'
import { typeList } from './components/index'
import ElPlusFormBtn from './components/ElPlusFormBtn.vue'
import { ICRUDConfig, IFormBack, IFormDesc, IFormDescItem } from '../../../types'

// IFormProps定义
export interface IFormProps {
  // form的ID-主要针对group时使用
  fid?: string
  // 表单描述
  formDesc?: IFormDesc | null
  // group的desc列表-主要针对group表单最后一个表单使用
  groupFormDesc?: IFormDesc | null
  // 表单数据
  modelValue?: { [key: string]: any }
  // 表单自身属性
  formAttrs?: { [key: string]: any }
  // 校检规则
  rules?: { [key: string]: any } | null
  // 提交状态
  isLoading?: boolean
  // 提交函数
  requestFn?: Function | null
  // 表单更新的函数
  updateFn?: Function | null
  // 是否显示底部按钮组
  showBtns?: boolean
  // 是否显示submit按钮
  showSubmit?: boolean
  // 提交按钮文本
  submitBtnText?: string
  // 是否显示 cancel 取消按钮
  // 默认值: isDialog = true 时, 默认值为 true
  showCancel?: boolean
  // 取消按钮文本
  cancelBtnText?: string
  // 是否显示重置按钮
  showReset?: boolean
  // 重置按钮文本
  resetBtnText?: string
  // 是否显示label
  showLabel?: boolean
  // label宽度
  labelWidth?: number | string
  // 全局禁用表单
  disabled?: boolean
  // 是否为弹窗
  isDialog?: boolean
  // 表单全局size
  size?: string
  // 表单列 默认1
  column?: number
  // 是否是列表头部的表单
  isTable?: boolean
  // 唯一标识符。默认为id
  idKey?: string
  // 最大宽度
  maxWidth?: string
  // 是否是group的Form
  isGroupForm?: boolean
  // 是否禁用最后一个元素的tab
  disabledTab?: boolean
  // item的底部边距
  itemMB?: string
  // 比如 beforeValidate, beforeRequest, success, requestError, requestEnd
  // 其他钩子 直接放到attrs里面去了
}

const lodash = inject('lodash') as any
const defaultConf = inject('defaultConf') as ICRUDConfig

const emits = defineEmits(['request', 'reset', 'cancel'])
const props = withDefaults(defineProps<IFormProps>(), {
  // 表单描述
  formDesc: null,
  // 表单数据
  modelValue: () => {
    return {}
  },
  // 表单自身属性
  formAttrs: () => {
    return {}
  },
  // 校检规则
  rules: null,
  // 提交状态
  isLoading: false,
  // 提交函数
  requestFn: null,
  // 表单更新的函数
  updateFn: null,
  // 是否显示按钮
  showBtns: true,
  // 是否显示submit按钮
  showSubmit: true,
  // 提交按钮文本
  submitBtnText: '提交',
  // 是否显示 cancel 取消按钮
  // 默认值: isDialog = true 时, 默认值为 true
  showCancel: false,
  // 取消按钮
  cancelBtnText: '取消',
  // 是否显示重置按钮
  showReset: false,
  // 重置按钮
  resetBtnText: '重置',
  // 是否显示标签
  showLabel: true,
  // 标签宽度
  labelWidth: 'auto',
  // 全局禁用表单
  disabled: false,
  // 是否为弹窗
  isDialog: false,
  // 表单全局size
  size: 'default',
  // 表单列 默认1
  column: 1,
  // 是否是列表头部的表单
  isTable: false,
  // 唯一标识符。默认为id
  idKey: 'id',
  // 是否禁用最后一个元素的tab
  disabledTab: false,
  // item的底部边距
  itemMB: '18px'
  // 其他钩子 直接放到attrs里面去了
  // 比如 beforeValidate, beforeRequest, success, requestError, requestEnd
})

const refElPlusForm = ref()

// 是否开启全局监听
const isOpenListen = ref(false)

const tempAttr = useAttrs()

// 每个表单项的ref
const fieldRefs_ = ref([] as Array<any>)

// loading
const innerIsLoading = ref(false)

let oldFormData = null as any

const indexList = ref([] as number[])

const size = computed(() => props.size || defaultConf.size)
// 组件名称列表
const compTypeList = [...typeList, ...(defaultConf.form?.comList || [])]

// 整体的布局方式
const formLayout = computed(() => ({ display: 'flex', flexDirection: props.isTable ? 'row' : 'column' })) as any

// 表单的Attrs
const computedFormAttrs = computed(() => {
  return {
    ...props.formAttrs,
    _labelWidth: props.isTable ? 'auto' : props.labelWidth === 'auto' ? (props.isDialog ? '100px' : '120px') : parseInt(props.labelWidth + '') + 'px',
    // validateOnRuleChange: false,
    disabled: props.disabled || innerIsLoading.value,
    rules: computedRules,
    labelPosition: isMobile() ? 'top' : 'right',
    style: {
      width: props.maxWidth || (props.isTable ? '100%' : props.isDialog ? '80%' : '1000px'),
      paddingRight: props.isTable ? '0' : '20px'
    }
  }
})

// 合并校验规则
const computedRules = computed(() => {
  // 首先拿到表单总体传入的rules
  const tempRules = props.rules || {}
  // 遍历属性描述对象，看看里面有没有校验规则
  if (props.formDesc) {
    Object.keys(props.formDesc).map((field: any) => {
      if (!tempRules[field]) tempRules[field] = []
      let required = false as boolean | ((data?: any) => boolean) | Ref<boolean>
      if (props.formDesc && props.formDesc[field]) {
        required = (props.formDesc && props.formDesc[field].required) || false
      }
      if (typeof required === 'function') {
        required = required(lodash.cloneDeep(props.modelValue))
      }
      if (props.formDesc) {
        if (props.formDesc[field].rules) {
          if (typeof props.formDesc[field].rules === 'string') {
            // string的话，就行默认校验规则中取
            tempRules[field].push(...(validates as any)[props.formDesc[field].rules as string])
          } else {
            // 查看总体规则中是否已经含有了该属性的校验
            castArray(props.formDesc[field].rules).map((item: any) => {
              tempRules[field].push(item)
            })
          }
          // 这里判断一下rules中是否有required
          if (tempRules[field].find((item: any) => item.required)) {
            // 设置必填
            props.formDesc[field].required = true
          }
        } else if (required) {
          let rules = 'notAllBlank'
          switch (props.formDesc[field].type) {
            case 'upload':
            case 'select':
            case 'password':
            case 'textarea':
            case 'editor':
              rules = props.formDesc[field].type || ''
              break
            case 'cascader':
            case 'tselect':
            case 'linkuser':
            case 'link':
            case 'radio':
            case 'checkbox':
            case 'tree':
              rules = 'select'
              break
            case 'daterange':
              rules = 'cascader'
              break
          }
          tempRules[field].push(...(validates as any)[rules])
        }
      }
    })
  }
  // 清空校验
  nextTick(() => {
    setTimeout(() => {
      clearValid()
    }, 50)
  })
  return tempRules
})

// 属性对象转数组
const attrMapToTableList = computed(() => {
  const formLayoutRows = [] as Array<Array<IFormDescItem>>
  if (props.formDesc) {
    initFormAttrs()
    const tempFormDesc = lodash.cloneDeep(props.formDesc)
    let tempData = [] as Array<IFormDescItem>
    for (const key in tempFormDesc) {
      tempData.push({ ...tempFormDesc[key], field: key })
    }
    // 这里处理一下layout的布局-渲染
    let rowItemList = [] as Array<IFormDescItem>
    let tempCount = 0
    tempData.map((item) => {
      if (item._vif) {
        rowItemList.push(item)
        tempCount++
        if (item.colspan) {
          tempCount += item.colspan - 1
        }
        if (tempCount >= props.column) {
          // 一行结束
          formLayoutRows.push(rowItemList)
          rowItemList = [] as Array<IFormDescItem>
          tempCount = 0
          return
        }
      }
    })
    if (rowItemList.length > 0) {
      formLayoutRows.push(rowItemList)
    }
  }

  // 这里处理下是否禁用最后一个元素的tab
  if (formLayoutRows?.length && props.disabledTab && (!props.isGroupForm || (props.isGroupForm && props.groupFormDesc))) {
    for (let i = formLayoutRows[formLayoutRows.length - 1].length - 1; i >= 0; i--) {
      const type = formLayoutRows[formLayoutRows.length - 1][i].type || ''
      if (['image', 'link', 'rate', 'status', 'tag', 'text'].indexOf(type) < 0) {
        const eventOn = formLayoutRows[formLayoutRows.length - 1][i].on || {}
        const oldFocus = eventOn.focus
        const oldBlur = eventOn.blur
        eventOn.focus = function () {
          document.onkeydown = (event) => {
            if (event.keyCode == 9) return false
          }
          oldFocus && oldFocus()
        }
        eventOn.blur = function () {
          document.onkeydown = function () {}
          oldBlur && oldBlur()
        }
        formLayoutRows[formLayoutRows.length - 1][i].on = eventOn
        break
      }
    }
  }
  return formLayoutRows
})

// 整体初始化属性
const initFormAttrs = lodash.debounce(
  () => {
    if (props.formDesc) {
      Object.keys(props.formDesc).forEach((field) => {
        if (props.formDesc) {
          const formItem = props.formDesc[field]
          if (formItem && formItem.type) {
            // 设置 _type
            formItem._type = compTypeList.includes(formItem.type.toLowerCase()) ? 'el-plus-form-' + formItem.type : formItem.type
            // 触发 v-if 显示 / 隐藏 设置_vif
            formItem._vif = handelKeyValue(formItem, 'vif', field, !formItem.isBlank ?? true)
            // 触发 disabled 禁用 / 启用 设置_disabled
            formItem._disabled = handelKeyValue(formItem, 'disabled', field, props.disabled ?? false)
            // 动态属性 attrs
            const tempAttr = {} as any
            // if ((typeof formItem.attrs === 'object' && formItem.attrs?.options) || formItem.options) {
            //   tempAttr.options = (formItem.attrs as any)?.options || formItem.options
            // }
            formItem._attrs = Object.assign({}, handelKeyValue(formItem, 'attrs', field), tempAttr)
            // 动态options
            // formItem._options = handelKeyValue(formItem, 'options', field)
            // 动态 _label
            formItem._label = handelKeyValue(formItem, 'label', field)
            if (typeof formItem.label !== 'string') formItem.label = formItem._label
            // 动态 prop
            // formItem._prop = handelKeyValue(formItem, 'prop', field);
            // 动态 _tip
            formItem._tip = handelKeyValue(formItem, 'tip', field)
            // 单独处理下上传
            if (!formItem._tip && !formItem.noTip && formItem.type === 'upload') {
              formItem._tip = `最多上传${formItem.multiple ? formItem.limit || 20 : 1}${formItem.upType === 'file' ? '个文件' : '张图片'}`
            }
            // 这里初始化一下默认值
            if (formItem.default !== undefined && formItem.default !== null && props.modelValue[field] === undefined) {
              props.modelValue[field] = formItem.default
            }
            // 这里格式化一下数据
            // if (formItem.format) {
            // if (typeof formItem.format === 'string') {
            //   props.modelValue[field] = elPlusFormFormat[formItem.format](props.modelValue[field], props.modelValue)
            // } else if (typeof formItem.format === 'function') {
            //   props.modelValue[field] = (formItem as any).format(props.modelValue[field], props.modelValue)
            // } else {
            //   // console.log('未知的格式化类型:', formItem.format)
            // }
            // }
            // 这里最终处理一下auth权限问题
            if (formItem.auth) {
              if (!defaultConf.auth) {
                console.warn('使用auth属性，请在crud注册时传入auth校验方法~')
              } else {
                formItem._vif = defaultConf.auth(formItem.auth)
              }
            }
          } else if (formItem && formItem.isBlank) {
            // 触发 v-if 显示 / 隐藏 设置_vif
            formItem._vif = handelKeyValue(formItem, 'vif', '', true)
          }
        }
      })
    }
  },
  100,
  { leading: true, trailing: false }
)

// 表单底部按钮
const btnList = computed(() => {
  let btnList_ = [] as any[]
  if (!props.showBtns) {
    return btnList_
  }
  // 取消按钮
  if (props.showCancel) {
    btnList_.push({
      field: '_reset_btn',
      desc: {
        label: props.cancelBtnText || '取消',
        size: size.value,
        disabled: innerIsLoading.value,
        on: { click: () => emits('cancel') }
      }
    })
  }
  // 重置按钮
  if (props.showReset) {
    btnList_.push({
      field: '_reset_btn',
      desc: {
        label: props.resetBtnText || '重置',
        confirm: `确定要${props.resetBtnText || '重置'}?`,
        size: size.value,
        disabled: innerIsLoading.value,
        on: { click: reset }
      }
    })
  }
  // 提交按钮
  if (props.showSubmit) {
    btnList_.push({
      field: '_reset_btn',
      desc: {
        label: props.submitBtnText || '提交',
        size: size.value,
        type: 'primary',
        disabled: props.disabled,
        loading: props.isLoading || innerIsLoading.value,
        on: { click: handleSubmitForm }
      }
    })
  }
  return btnList_
})

// 处理属性
const handelKeyValue = (formItem: IFormDescItem, key: string, field: string, defVal: number | boolean | string | null = null) => {
  if (typeof formItem[key] === 'function') {
    // 如果有方法类型的判断，则需要启用动态监测
    isOpenListen.value = true
    return formItem[key](props.modelValue, props.modelValue[field])
  } else if (typeof formItem[key] === 'boolean') {
    return formItem[key] ?? false
  } else if (typeof formItem[key] === 'string') {
    return formItem[key] ?? ''
  } else {
    return formItem[key] ?? defVal
  }
}

// 验证表单
const validateForm = () => {
  return new Promise((resolve: any, reject: any) => {
    if (computedRules.value) {
      // 当传递了验证规则
      refElPlusForm.value.validate((valid: Boolean, invalidFields: any) => {
        if (valid) {
          // 验证通过
          resolve()
        } else {
          // 显示错误
          reject(invalidFields)
        }
      })
    } else {
      resolve()
    }
  })
}

// 设置子组件的ref-重置form的时候需要用到
const setComponentRef = (el: any) => {
  if (!el) return
  if (!fieldRefs_.value.some((item: any) => item.field === el.field)) {
    fieldRefs_.value.push(el)
  }
}

/**
 * 处理单个表单值
 * @param val
 */
const handelValToForm = (desc: IFormDescItem, field: string, val: any) => {
  const result = {} as { [key: string]: any }
  if (!desc) return { [field]: val }
  if (!desc._vif || val === undefined || val === null) return result
  if (desc.type === 'category') {
    if (val === null) val = []
    // 如果是直接显示结果
    if (desc.checkStrictly === true) {
      result.categoryId = val[2] ?? val[1] ?? val[0] ?? ''
    } else {
      for (let i = 0; i < 3; i++) {
        result['categoryId' + (i + 1)] = val[i] ?? ''
      }
    }
  } else if (desc.type === 'area') {
    if (val === null) val = [null, null, null, null]
    const [pid, cid, zid, sid] = val
    if (desc.checkStrictly) {
      result[field] = sid || zid || cid || pid || null
    } else {
      result[desc.propPrefix ? desc.propPrefix + 'ProvinceId' : 'provinceId'] = pid || -1
      result[desc.propPrefix ? desc.propPrefix + 'CityId' : 'cityId'] = cid || -1
      result[desc.propPrefix ? desc.propPrefix + 'ZoneId' : 'zoneId'] = zid || -1
      result[desc.propPrefix ? desc.propPrefix + 'StreetId' : 'streetId'] = sid || -1
    }
  } else if (desc.type === 'daterange') {
    if (val && val.length === 2) {
      const startTimeKey = desc.startTimeKey ? desc.startTimeKey : desc.propPrefix ? desc.propPrefix + 'StartTime' : 'startTime'
      const endTimeKey = desc.endTimeKey ? desc.endTimeKey : desc.propPrefix ? desc.propPrefix + 'EndTime' : 'endTime'
      // 获取0点数据
      result[startTimeKey] = new Date(new Date(val[0]).setHours(0, 0, 0, 0))
      // 获取每天结束时间
      result[endTimeKey] = new Date(new Date(val[1]).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1)
      // 再处理一下时间戳
      result[startTimeKey] = time(result[startTimeKey], desc.valueFormat)
      result[endTimeKey] = time(result[endTimeKey], desc.valueFormat)
    }
  } else if (desc.type === 'datetimerange') {
    if (val && val.length === 2) {
      const startTimeKey = desc.startTimeKey ? desc.startTimeKey : desc.propPrefix ? desc.propPrefix + 'StartTime' : 'startTime'
      const endTimeKey = desc.endTimeKey ? desc.endTimeKey : desc.propPrefix ? desc.propPrefix + 'EndTime' : 'endTime'
      // 处理一下时间戳
      result[startTimeKey] = time(val[0], desc.valueFormat)
      result[endTimeKey] = time(val[1], desc.valueFormat)
    }
  } else if (desc.type === 'timerange') {
    if (val && val.length === 2) {
      const startTimeKey = desc.startTimeKey ? desc.startTimeKey : desc.propPrefix ? desc.propPrefix + 'StartTime' : 'startTime'
      const endTimeKey = desc.endTimeKey ? desc.endTimeKey : desc.propPrefix ? desc.propPrefix + 'EndTime' : 'endTime'
      // 处理一下时间戳
      result[startTimeKey] = time(val[0], desc.valueFormat || 'HH:mm:ss')
      result[endTimeKey] = time(val[1], desc.valueFormat || 'HH:mm:ss')
    }
  } else if (desc.type === 'linkuser') {
    const [userIds, deptIds, userNames, deptNames] = val
    result[desc.propPrefix ? desc.propPrefix + 'UserIds' : 'userIds'] = userIds
    result[desc.propPrefix ? desc.propPrefix + 'DeptIds' : 'deptIds'] = deptIds
    result[desc.propPrefix ? desc.propPrefix + 'UserNames' : 'userNames'] = userNames
    result[desc.propPrefix ? desc.propPrefix + 'DeptNames' : 'deptNames'] = deptNames
  }
  // else if (desc.type === 'upload') {
  //   // 如果是上传
  //   // const [userIds, deptIds, userNames, deptNames] = val
  //   // result[desc.propPrefix ? desc.propPrefix + 'UserIds' : 'userIds'] = userIds
  //   // result[desc.propPrefix ? desc.propPrefix + 'DeptIds' : 'deptIds'] = deptIds
  //   // result[desc.propPrefix ? desc.propPrefix + 'UserNames' : 'userNames'] = userNames
  //   // result[desc.propPrefix ? desc.propPrefix + 'DeptNames' : 'deptNames'] = deptNames
  // }
  else {
    // 这里处理下通用表单的数据类型
    switch (desc.type) {
      case 'checkbox':
        if (Array.isArray(val)) {
          val = val.join(',')
        }
        break
    }
    result[field] = val
  }
  return result
}

/**
 * 获取处理过后的表单数据
 */
const getFormData = () => {
  const tempData = {} as { [key: string]: any }
  if (props.groupFormDesc || props.formDesc) {
    // 循环获取表单数据
    Object.keys(props.modelValue).map((key) => {
      if (['provinceId', 'cityId', 'zoneId', 'streetId', 'startTime', 'endTime'].indexOf(key) >= 0) return
      if (props.groupFormDesc || props.formDesc) {
        Object.assign(tempData, handelValToForm((props.groupFormDesc || props.formDesc || {})[key], key, props.modelValue[key]))
      }
    })
  }
  return tempData
}

/**
 * 刷新验证码图片
 */
const changeValidImg = () => {
  fieldRefs_.value.map((item) => {
    if (item.CID) {
      item.changeValidImg()
    }
  })
}

/**
 * 提交表单
 */
const handleSubmitForm = async () => {
  let postData = getFormData()
  try {
    // 校验表单事件处理
    if (tempAttr.beforeValidate) {
      const result = (tempAttr.beforeValidate as Function)(postData)
      if (!(isPromiseLike<any>(result) ? await result : result)) return
    }
    if (!props.groupFormDesc) {
      await validateForm()
    }
    for (const field in postData) {
      // 去除下划线开头的参数
      if (field.indexOf('_') === 0) {
        delete postData[field]
        continue
      }
      if (props.formDesc) {
        const formItem = props.formDesc[field]
        // valueFormatter的处理
        if (formItem && formItem.valueFormat && typeof formItem.valueFormat === 'function') {
          postData[field] = formItem.valueFormat(postData[field], postData)
        }
        // 处理带有true或者false值
        if (postData[field] === true || postData[field] === false) {
          postData[field] = +postData[field]
        }
      }
    }

    // 提交数据前的通知
    if (tempAttr.beforeRequest) {
      const result = (tempAttr.beforeRequest as Function)(postData)
      const beforeRequestData = isPromiseLike<any>(result) ? await result : result
      if (beforeRequestData === false) return
      if (typeof beforeRequestData === 'object') {
        postData = beforeRequestData
      }
    }
    // if (props.requestFn) {
    // 在内部调用请求
    if (innerIsLoading.value) return
    innerIsLoading.value = true
    try {
      let response = {}
      if (props.requestFn) {
        if (props.updateFn && postData && (postData as any)[props.idKey]) {
          response = await props.updateFn(postData)
        } else {
          response = await props.requestFn(postData)
        }
      }
      nextTick(() => {
        if (tempAttr.success && typeof tempAttr.success === 'function') {
          tempAttr.success({
            response,
            formData: postData,
            callBack: () => (innerIsLoading.value = false)
          } as IFormBack)
        }
      })
    } catch (error) {
      // eslint-disable-next-line
      console.log('error: ', error)
      // 如果用户有处理异常的方法了
      if (tempAttr.requestError && typeof tempAttr.requestError === 'function') {
        tempAttr.requestError(error)
      } else {
        // 处理异常情况
        if (error instanceof Error) {
          // 返回的是Error类型, 则进行解析
          try {
            const msg = JSON.parse(error.message)
            if (msg instanceof Object) {
              // innerFormError.value = msg;
            }
            // eslint-disable-next-line
          } catch {}
        } else if (error instanceof Object) {
          // 返回的是对象类型, 则直接设置
          // innerFormError = error;
        }
        if (tempAttr.requestError && typeof tempAttr.requestError === 'function') {
          tempAttr.requestError()
        }
      }
      // 报错了这里恢复
      innerIsLoading.value = false
    } finally {
      if (!props.isDialog) {
        innerIsLoading.value = false
      }
      if (tempAttr.requestEnd && typeof tempAttr.requestEnd === 'function') {
        tempAttr.requestEnd()
      }
    }
    // } else {
    //   // 在外部用户自己处理请求
    //   if (props.isLoading) return
    //   emits('request', postData)
    // }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error)
  }
}

/**
 * 重置，并清除校验
 */
const reset = () => {
  // refElPlusForm.value.resetFields();
  // 重置
  if (props.modelValue) {
    Object.keys(props.modelValue).map((key) => {
      if (oldFormData && oldFormData[key] !== undefined && oldFormData[key] !== null) {
        props.modelValue[key] = oldFormData[key]
      } else {
        if (props.groupFormDesc) {
          props.modelValue[key] = props.groupFormDesc && props.groupFormDesc[key] ? props.groupFormDesc[key].default || null : null
        } else {
          props.modelValue[key] = props.formDesc && props.formDesc[key] ? props.formDesc[key].default || null : null
        }
      }
    })
  }
  setTimeout(() => {
    // 清空校验
    clearValid()
  }, 100)
  emits('reset')
}

/**
 * 清空校验
 */
const clearValid = () => {
  refElPlusForm.value?.clearValidate()
}

/**
 * 清理
 */
const clear = () => {
  // 这里进行数据清空
  if (props.modelValue) {
    Object.keys(props.modelValue).map((key) => {
      if (props.formDesc && props.formDesc[key]) {
        props.modelValue[key] = props.formDesc[key].default ?? null
      } else {
        props.modelValue[key] = null
      }
    })
    // 清空组件
    fieldRefs_.value?.map((item) => {
      if (item?.clear && typeof item?.clear === 'function') item.clear()
    })
  }
  // 重置校验
  nextTick(() => {
    setTimeout(() => {
      clearValid()
    }, 50)
  })
}

/**
 * 初始化组件
 */
function init() {
  // 清空组件
  fieldRefs_.value?.map((item) => {
    if (item?.init && typeof item?.init === 'function') item.init()
  })
}

/**
 * 单独校验一下字段
 * @param field
 */
function handelValidateThis(field: string) {
  refElPlusForm.value?.validateField(field, (err: any) => {
    // console.log('err: ', err)
  })
}

/**
 * 刷新表单
 */
function refresh() {
  // 重新刷新表单
  initFormAttrs()
  // 重置校验
  nextTick(() => {
    clearValid()
  })
}

// 监听Desc改变
watch(
  () => props.formDesc,
  (formDesc) => {
    if (formDesc) {
      // 检查联动
      initFormAttrs()
    }
  }
)

// 深度监听data改变
watch(
  () => props.modelValue,
  (data) => {
    // && JSON.stringify(data) !== JSON.stringify(oldFormData)
    if (!oldFormData || (isOpenListen.value && data)) {
      // 检查联动
      // if (JSON.stringify(data) !== JSON.stringify(oldFormData)) {
      if (!oldFormData) {
        oldFormData = lodash.cloneDeep(data)
      }
      initFormAttrs()
      // }
    }
  },
  { deep: true }
)

onMounted(async () => {
  // 检查联动
  if (!isOpenListen.value) {
    initFormAttrs()
  }
  nextTick(() => {
    clearValid()
  })
})

// 暴露对外方法
defineExpose({ fid: props.fid, formRef: refElPlusForm, submit: handleSubmitForm, getData: getFormData, validate: validateForm, reset, clearValid, clear, changeValidImg, refresh, init })
</script>
<style lang="scss">
.el-plus-form-panel {
  .el-plus-form--inline .el-plus-form-btns {
    width: auto;
  }

  .el-form--inline .el-form-item {
    margin-right: 12px !important;
  }

  .el-plus-form-col--break {
    clear: both;
  }

  .el-plus-form-tip {
    color: #909399;
    line-height: 1.5em;
    margin-top: 3px;
    margin-left: 12px;
  }

  .el-plus-form-tip code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }
  .el-plus-form-column-panel {
    & > .el-form-item {
      // & > .el-form-item__label-wrap {
      & > .el-form-item__label {
        line-height: 40px;
        margin-bottom: 0;
        width: auto !important;
        &::before {
          content: '' !important;
        }
        .crud-form-label {
          text-align: right;
          .required {
            &::before {
              content: '*';
              color: var(--el-color-danger);
              margin-right: 4px;
            }
          }
        }
      }
      // }
    }
  }
}
</style>
./util/aaaaa
