<template>
  <div class="el-plus-form-group">
    <template v-for="(group, i) in getGroupFowmLayout" :key="i">
      <template v-if="useSlots()['top' + i]">
        <slot :name="'top' + i"> </slot>
      </template>
      <div class="title-line" v-if="group.title">{{ group.title }}</div>
      <ElPlusForm v-model="currentValue" v-bind="group.formProps" :ref="(el) => setComponentRef(el, 'form' + i)" @reset="handleReset">
        <template v-if="useSlots()['default' + i]">
          <slot :name="'default' + i"> </slot>
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
import { cloneDeep } from 'lodash'
import { computed, ref, useSlots } from 'vue'
import ElPlusForm, { IFormProps } from './ElPlusForm.vue'
import { IFormDesc, IFormGroupConfig } from 'types'

const emits = defineEmits(['update:show', 'update:modelValue', 'before-validate', 'before-request', 'request-success', 'request-error', 'request-end', 'request'])
const props = defineProps<{
  modelValue: { [key: string]: any } | {}
  // 表单Group项
  formGroup: IFormGroupConfig
  // 提交状态
  isLoading?: boolean
}>()

const formRefs = ref([] as any[])
const formRefsKeys = [] as string[]

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

  // 这里首先遍历一遍vif
  const tempGroupList = props.formGroup.group.filter((item) => getVIf.value(item.vif))

  const tempFormConfig = cloneDeep(props.formGroup) as any
  const column = props.formGroup.column || 1
  // 移除无用
  delete tempFormConfig.group
  delete tempFormConfig.column

  // 表单校验
  tempFormConfig.beforeValidate = async () => {
    return await Promise.all(formRefs.value.map((tempRef) => tempRef.validate()))
  }

  tempFormConfig.groupFormDesc = {} as IFormDesc
  tempGroupList.map((item) => {
    Object.assign(tempFormConfig.groupFormDesc, item.formDesc)
  })

  // 遍历
  tempGroupList.map((groupItem, i) => {
    if (getVIf.value(groupItem.vif)) {
      formConfigList.push({
        title: groupItem.title,
        formProps: Object.assign({ column: groupItem.column || column }, i === tempGroupList.length - 1 ? tempFormConfig : { showBtns: false }, groupItem || {}) as IFormProps
      })
    }
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
function setComponentRef(el: any, key: string) {
  if (!el) return
  if (formRefsKeys.indexOf(key) < 0) {
    formRefsKeys.push(key)
    formRefs.value.push(el)
  }
}

//重置
function handleReset() {
  formRefs.value.map((item, index, arr) => {
    index === arr.length - 1 ? '' : item.clearValid()
  })
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
    color: #222222;
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
