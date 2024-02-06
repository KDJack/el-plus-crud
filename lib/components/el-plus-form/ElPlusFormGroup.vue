<template>
  <div class="el-plus-form-group">
    <template v-for="(group, i) in groupFormLayout" :key="i + group.formProps?.fid">
      <template v-if="useSlots()['top' + indexList[i]]">
        <slot :name="'top' + indexList[i]"> </slot>
      </template>
      <template v-if="useSlots()['title' + indexList[i]]">
        <slot :name="'title' + indexList[i]">
          <div class="title-line" v-if="group.title">{{ group.title }}</div>
        </slot>
      </template>
      <ElPlusForm v-model="currentValue" v-bind="group.formProps" isGroupForm :ref="formRefs.set" @reset="handleReset(group.formProps?.fid || '')">
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
import { ref, useSlots } from 'vue'
import { useVModel, computedWithControl, useTemplateRefsList } from '@vueuse/core'
import { getVIf, isPromiseLike } from '../../util'
import ElPlusForm, { IFormProps } from './ElPlusForm.vue'
import { IFormGroupConfig, IFormConfig, IFormDesc } from '../../../types'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: { [key: string]: any } | {}
  // 表单Group项
  formGroup: IFormGroupConfig
  // 提交状态
  isLoading?: boolean
}>()

// 重新定义当前值
const currentValue = useVModel(props, 'modelValue', emits)
// 定义refs
const formRefs = useTemplateRefsList<InstanceType<typeof ElPlusForm>>()

// 主要记录原来groupFowmLayout下标和group下标的对应
const indexList = ref([] as number[])

/**
 * 获取布局，且初始化
 * @param groupItem
 */
const groupFormLayout = computedWithControl([() => props.formGroup], () => {
  const formConfigList = [] as Array<{ title?: string; formProps?: IFormProps }>
  indexList.value = []

  const { column, group, ...otherAttrs } = props.formGroup
  // 临时ID
  const tempId = new Date().getTime()

  // 首先编译一遍数据
  const tempGroupList = group
    .map((item: any, i: number): IFormDesc => ({ ...item, fid: item.fid || `${tempId + i}`, _vif: getVIf(item.vif) }) as IFormDesc)
    .filter((item: any, i: number) => {
      // 这里单独存储下index 的对应关系
      if (item._vif) indexList.value.push(i)
      return item._vif
    })

  // 表单校验
  otherAttrs.beforeValidate = async (postData: any) => {
    // 这里处理自带的 beforeValidate
    if (otherAttrs.beforeValidate) {
      const result = (otherAttrs.beforeValidate as Function)(postData)
      if (!(isPromiseLike<any>(result) ? await result : result)) return false
    }
    return await Promise.all(formRefs.value.map((tempRef) => tempRef.validate()))
  }

  // tempFormConfig.groupFormDesc = {} as IFormDesc
  const lastFormConf = otherAttrs as IFormConfig
  tempGroupList.map((item: any) => Object.assign(lastFormConf.groupFormDesc, item.formDesc))
  // 遍历
  tempGroupList.map((groupItem, i: number) => {
    formConfigList.push({
      title: groupItem.title as any,
      formProps: Object.assign({ column: groupItem.column || column }, i === tempGroupList.length - 1 ? lastFormConf : { showBtns: false }, groupItem || {}) as IFormProps
    })
  })
  return formConfigList
})

/**
 * 重置
 * @param fid
 */
async function handleReset(fid: string) {
  await Promise.all(formRefs.value.map((tempRef) => tempRef.fid !== fid && tempRef.clearValid()))
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
  return formRefs.value.map((tempRef) => tempRef.getData())
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
