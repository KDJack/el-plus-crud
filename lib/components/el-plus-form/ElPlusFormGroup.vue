<template>
  <div class="el-plus-form-group">
    <template v-for="(group, i) in getGroupFowmLayout" :key="i + group.formProps?.fid">
      <template v-if="useSlots()['top' + indexList[i]]">
        <slot :name="'top' + indexList[i]"> </slot>
      </template>
      <slot :name="'title' + indexList[i]">
        <div class="title-line" v-if="group.title">{{ group.title }}</div>
      </slot>
      <ElPlusForm v-model="currentValue" v-bind="group.formProps" isGroupForm :ref="setComponentRef" @reset="handleReset(group.formProps?.fid || '')">
        <template v-if="useSlots()['default' + indexList[i]]">
          <slot :name="'default' + indexList[i]"> </slot>
        </template>
      </ElPlusForm>
    </template>
    <!-- 默认的插槽 -->
    <slot name="default"> </slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormGroup',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { isPromiseLike } from '../../util'
import { computed, inject, ref, useSlots } from 'vue'
import ElPlusForm, { IFormProps } from './ElPlusForm.vue'
import { IFormDesc, IFormGroupConfig } from '../../../types'

const lodash = inject('lodash') as any

const emits = defineEmits(['update:show', 'update:modelValue', 'before-validate', 'before-request', 'request-success', 'request-error', 'request-end', 'request'])
const props = defineProps<{
  modelValue: { [key: string]: any } | {}
  // 表单Group项
  formGroup: IFormGroupConfig
  // 提交状态
  isLoading?: boolean
  // 是否禁用最后一个元素的tab
  disabledTab?: boolean
}>()

const formRefs = ref([] as any[])

// 主要记录原来groupFowmLayout下标和group下标的对应
const indexList = ref([] as number[])

// 重新定义当前值
const currentValue = computed({
  get: () => props.modelValue,
  set(val: any) {
    emits('update:modelValue', val)
  }
})

/**
 * 获取布局，且初始化
 * @param groupItem
 */
const getGroupFowmLayout = computed(() => {
  const formConfigList = [] as Array<{
    title?: string
    column?: number
    formProps?: IFormProps
  }>
  // 清空refs列表
  formRefs.value = []
  indexList.value = []

  const tempId = new Date().getTime()
  props.formGroup.group.map((item, i): any => {
    item.fid = item.fid || `${tempId + i}`
    item._vif = getVIf.value(item.vif)
  })

  // 这里首先遍历一遍_vif
  const tempGroupList = props.formGroup.group.filter((item, i) => {
    // 这里单独存储下index 的对应关系
    if (item._vif) indexList.value.push(i)
    return item._vif
  })

  const tempFormConfig = lodash.cloneDeep(props.formGroup) as any
  const column = props.formGroup.column || 1
  // 移除无用
  delete tempFormConfig.group
  delete tempFormConfig.column

  // 表单校验
  tempFormConfig.beforeValidate = async (postData: any) => {
    // 这里处理自带的 beforeValidate
    if (props.formGroup.beforeValidate) {
      const result = (props.formGroup.beforeValidate as Function)(postData)
      if (!(isPromiseLike<any>(result) ? await result : result)) return false
    }
    return await Promise.all(formRefs.value.map((tempRef) => tempRef.validate()))
  }

  tempFormConfig.groupFormDesc = {} as IFormDesc
  tempGroupList.map((item) => {
    Object.assign(tempFormConfig.groupFormDesc, item.formDesc)
  })
  tempFormConfig.disabledTab = props.disabledTab

  // 遍历
  tempGroupList.map((groupItem, i) => {
    formConfigList.push({
      title: groupItem.title,
      formProps: Object.assign({ column: groupItem.column || column }, i === tempGroupList.length - 1 ? tempFormConfig : { showBtns: false }, groupItem || {}) as IFormProps
    })
  })
  return formConfigList
})

/**
 * 获取vif
 */
const getVIf = computed(() => (vif: boolean | Function | undefined) => {
  if (typeof vif === 'function') {
    return vif(props.modelValue)
  } else if (typeof vif === 'boolean') {
    return vif
  }
  return true
})

// 设置子组件的ref-重置form的时候需要用到
function setComponentRef(el: any) {
  if (!el) return
  if (!formRefs.value.find((item) => item.fid === el.fid)) {
    formRefs.value.push(el)
  }
}

//重置
function handleReset(fid: string) {
  setTimeout(() => {
    formRefs.value.map((item) => {
      if (item.fid !== fid) {
        item.clearValid()
      }
    })
  }, 100)
}

/**
 * 校验
 */
async function validate() {
  return await Promise.all(formRefs.value.map((tempRef) => tempRef.validate()))
}

/**
 * 清理校验
 */
async function clearValid() {
  return await Promise.all(formRefs.value.map((tempRef) => tempRef.clearValid()))
}

/**
 * 获取数据
 */
function getData() {
  const tempData = {} as any
  formRefs.value.map((tempRef) => {
    Object.assign(tempData, tempRef.getData())
  })
  return tempData
}

defineExpose({ validate, getData, clearValid })
</script>
<style lang="scss">
.el-plus-form-group {
  // Todo
  /* 通用的标题-短线线 */
  .title-line {
    width: 100%;
    height: 22px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color);
    line-height: 22px;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
    &::before {
      position: absolute;
      content: '';
      width: 3px;
      height: 16px;
      left: 0;
      top: 1px;
      background-color: var(--el-color-primary);
    }
  }
}
</style>
./util/aaaaa
