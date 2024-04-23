<template>
  <el-dialog class="el-plus-form-dialog" v-model="currentShow" :title="props.title" v-bind="dialogAttrs" @close="handelClosed" @opened="handelOpen">
    <!-- title 插槽 -->
    <template #header>
      <slot name="header" />
    </template>
    <ElPlusForm ref="refElPlusDialogForm" style="padding: 20px" :isLoading="props.isLoading" :isDialog="true" v-model="currentValue" :formDesc="formDesc" v-bind="attrs" :success="dialogSuccess" @cancel="currentShow = false">
      <template #top>
        <slot name="top" />
      </template>
      <template #default>
        <slot name="default" />
      </template>
    </ElPlusForm>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormDialog',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, useAttrs } from 'vue'
import ElPlusForm from './ElPlusForm.vue'
import { ElMessage } from 'element-plus'
import { IFormBack, IFormDesc } from '../../../types'

const emits = defineEmits(['update:show', 'update:modelValue'])
const props = withDefaults(
  defineProps<{
    modelValue?: { [key: string]: any } | {}
    formDesc: IFormDesc
    show?: boolean
    title?: string
    tableRef?: any
    success?: Function
    isLoading?: boolean
    successTip?: string | ((data?: any) => string)
  }>(),
  {
    title: '',
    modelValue: () => {
      return {}
    },
    show: false,
    successTip: '操作成功!'
  }
)

// 重新定义当前值
const currentValue = computed({
  get: () => props.modelValue,
  set(val: any) {
    emits('update:modelValue', val)
  }
})

// 是否显示弹框
const currentShow = computed({
  get() {
    refElPlusDialogForm.value?.refresh()
    return props.show
  },
  set(val: boolean) {
    emits('update:show', val)
  }
})
const refElPlusDialogForm = ref(null as any)

// 合并属性
const { width, top, modal, appendToBody, showClose, draggable, closeOnClickModal, destroyOnClose, ...attrs } = Object.assign({ width: '700px', draggable: true, top: '15vh', closeOnClickModal: false, showCancel: true, destroyOnClose: true }, useAttrs())
// 弹框属性
const dialogAttrs = { width, top, modal, appendToBody, showClose, draggable, closeOnClickModal }

/**
 * 这里重新定义一下成功事件
 * @param formBack
 */
function dialogSuccess(formBack: IFormBack) {
  if (props.success) {
    props.success(formBack)
  } else {
    if (props.tableRef) {
      ElMessage.success(typeof props.successTip === 'function' ? props.successTip() : props.successTip)
      typeof props.tableRef?.reload === 'function' && props.tableRef?.reload()
      currentShow.value = false
      setTimeout(() => {
        formBack.callBack()
      }, 200)
    }
  }
}

/**
 * 处理弹框关闭
 */
function handelClosed() {
  refElPlusDialogForm.value?.clear()
}

/**
 * 打开弹框
 */
function handelOpen() {
  refElPlusDialogForm.value?.init()
}
</script>
