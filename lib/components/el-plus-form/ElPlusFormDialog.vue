<template>
  <el-dialog class="el-plus-form-dialog" v-model="currentShow" :title="props.title" v-bind="dialogAttrs" destroy-on-close>
    <!-- title 插槽 -->
    <template #header>
      <slot name="header" />
    </template>
    <ElPlusForm ref="refElPlusDialogForm" style="padding: 20px" :isDialog="true" v-model="currentValue" v-bind="attrs" :success="dialogSuccess" @cancel="close">
      <template #top>
        <slot name="top" />
      </template>
      <template #default>
        <slot name="default" />
      </template>
    </ElPlusForm>
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
import { ref, computed, useAttrs, nextTick } from 'vue'
import ElPlusForm from './ElPlusForm.vue'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['update:show', 'update:modelValue'])
const props = withDefaults(defineProps<{ modelValue?: { [key: string]: any } | {}; show?: boolean; title?: string; tableRef?: any; success?: Function; successTip?: string }>(), {
  title: '',
  modelValue: () => {
    return {}
  },
  show: false,
  successTip: '操作成功!'
})

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
    // 打开时，清空一下校验
    if (props.show) {
      nextTick(() => {
        setTimeout(() => {
          refElPlusDialogForm.value?.clearValid()
        }, 10)
      })
    }
    return props.show
  },
  set(val: boolean) {
    val ? open() : close()
  }
})
const refElPlusDialogForm = ref(null as any)

// 合并属性
const { width, top, modal, appendToBody, showClose, draggable, closeOnClickModal, ...attrs } = Object.assign({ width: '700px', draggable: true, top: '15vh', closeOnClickModal: false, showCancel: true }, useAttrs())
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
      ElMessage.success(props.successTip)
      props.tableRef.reload()
      close()
      setTimeout(() => {
        formBack.callback()
      }, 200)
    }
  }
}

/**
 * 打开弹框
 */
function open() {
  emits('update:show', true)
}

/**
 * 关闭弹框
 */
function close() {
  emits('update:show', false)
  // 这里清空一下表单
  refElPlusDialogForm.value?.clear()
}

defineExpose({ open, close })
</script>
