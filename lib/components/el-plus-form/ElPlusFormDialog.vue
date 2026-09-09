<template>
  <el-dialog class="el-plus-form-dialog" v-model="currentShow" :title="props.title" v-bind="dialogAttrs" @close="handelClosed" @opened="handelOpen">
    <!-- title 插槽 -->
    <template #header v-if="useSlots().header">
      <slot name="header" />
    </template>

    <!-- 分组表单模式 -->
    <ElPlusFormGroup v-if="props.formGroup" ref="refForm" style="padding: 20px" :isLoading="props.isLoading" v-model="currentValue" :formGroup="computedFormGroup" @cancel="currentShow = false" />

    <!-- 原有普通表单模式（完全兼容） -->
    <ElPlusForm v-else ref="refForm" style="padding: 20px" :isLoading="props.isLoading" :isDialog="true" v-model="currentValue" :formDesc="formDesc" v-bind="attrs" :success="dialogSuccess" @cancel="currentShow = false">
      <template #top>
        <slot name="top" />
      </template>
      <template #default>
        <slot name="default" />
      </template>
    </ElPlusForm>

    <template #footer v-if="useSlots().footer">
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
import { ref, computed, useAttrs, useSlots } from 'vue'
import ElPlusForm from './ElPlusForm.vue'
import ElPlusFormGroup from './ElPlusFormGroup.vue'
import { ElMessage } from 'element-plus'
import { IFormBack, IFormDesc, IFormGroupConfig } from '../../../types'

const emits = defineEmits(['update:show', 'update:modelValue'])
const props = withDefaults(
  defineProps<{
    modelValue?: { [key: string]: any } | {}
    formDesc?: IFormDesc
    formGroup?: IFormGroupConfig
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
    refForm.value?.refresh?.()
    return props.show
  },
  set(val: boolean) {
    emits('update:show', val)
  }
})
const refForm = ref(null as any)

// 合并属性
const { width, top, modal, appendToBody, showClose, draggable, closeOnClickModal, destroyOnClose, ...attrs } = Object.assign({ width: '700px', draggable: true, top: '15vh', closeOnClickModal: false, showCancel: true, destroyOnClose: true }, useAttrs())
// 弹框属性
const dialogAttrs = { width, top, modal, appendToBody, showClose, draggable, closeOnClickModal }

/**
 * 包装 formGroup 配置，注入弹框的成功回调逻辑
 * 如果用户传了 formGroup.success 则使用用户的回调，否则使用默认的弹框关闭逻辑
 */
const computedFormGroup = computed(() => {
  if (!props.formGroup) return {} as IFormGroupConfig
  const originSuccess = props.formGroup.success
  return {
    ...props.formGroup,
    success: (formBack: IFormBack) => {
      if (props.success) {
        props.success(formBack)
      } else if (originSuccess) {
        originSuccess(formBack)
      } else {
        if (props.tableRef) {
          ElMessage.success(typeof props.successTip === 'function' ? props.successTip() : props.successTip)
          typeof props.tableRef?.reload === 'function' && props.tableRef?.reload()
        }
        currentShow.value = false
        setTimeout(() => {
          formBack.callBack()
        }, 200)
      }
    }
  } as IFormGroupConfig
})

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
  refForm.value?.clear()
}

/**
 * 打开弹框
 */
function handelOpen() {
  refForm.value?.init()
}

function handelSubmit() {
  if (props.formGroup) {
    // formGroup 模式下 ElPlusFormGroup 没有暴露 submit 方法，提交由内部 ElPlusForm 处理
    // 外部调用 submit 时仅做校验
    refForm.value?.validate?.()
  } else {
    refForm.value?.submit()
  }
}

defineExpose({
  submit: handelSubmit,
  validate: () => refForm.value?.validate(),
  getData: () => refForm.value?.getData(),
  clearValid: () => refForm.value?.clearValid(),
  clear: () => refForm.value?.clear(),
  init: () => refForm.value?.init()
})
</script>
<style lang="scss">
// 窄屏兜底：固定 700px 宽的弹窗在手机上不超出视口（width 仍由用户/默认值控制，仅做上限钳制；
// 只在窄屏生效，不钳制桌面刻意配置的超宽弹窗。断点与 util 的 MOBILE_BREAKPOINT 对齐，两处需同步改）
@media (max-width: 991.98px) {
  .el-plus-form-dialog {
    // 24px = 视口两侧各 12px 呼吸边距
    max-width: calc(100vw - 24px);
  }
}
</style>
