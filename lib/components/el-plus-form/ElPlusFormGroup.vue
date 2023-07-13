<template>
  <div class="el-plus-form-group">
    <template v-for="(group, i) in getGroupFowmLayout" :key="i">
      <div class="title-line" v-if="group.title">{{ group.title }}</div>
      <ElPlusForm v-model="formData" v-bind="group.formProps" :ref="(el) => setComponentRef(el, 'form' + i)"> </ElPlusForm>
    </template>
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
import { computed, reactive, ref } from 'vue'
import ElPlusForm, { IFormProps } from './ElPlusForm.vue'

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
let formData = reactive({} as any)

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
  const tempFormConfig = cloneDeep(props.formGroup) as any
  const column = props.formGroup.column || 1
  // 移除无用
  delete tempFormConfig.group
  delete tempFormConfig.column

  // 表单校验
  tempFormConfig.beforeValidate = async (formData: any) => {
    return await Promise.all(formRefs.value.map((tempRef) => tempRef.validate()))
  }
  // 遍历
  props.formGroup.group.map((groupItem, i) => {
    formConfigList.push({
      title: groupItem.title,
      column: groupItem.column || column,
      formProps: Object.assign({}, i === props.formGroup.group.length - 1 ? tempFormConfig : { showBtns: false }, groupItem || {}) as IFormProps
    })
  })
  return formConfigList
})

// 设置子组件的ref-重置form的时候需要用到
function setComponentRef(el: any, key: string) {
  if (!el) return
  if (formRefsKeys.indexOf(key) < 0) {
    formRefsKeys.push(key)
    formRefs.value.push(el)
  }
}
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
      background-color: #1890ff;
    }
  }
}
</style>
