<template>
  <div class="el-button el-plus-form-up-btn">
    <el-upload class="upload-demo" style="display: flex" v-bind="attrs" :disabled="isLoading || attrs.disabled" v-model="currentValue">
      <el-button type="primary" :icon="Upload" :loading="isLoading"> {{ btnShowText }}</el-button>
      <template #file>
        <div></div>
      </template>
    </el-upload>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormUpbtn',
  inheritAttrs: false,
  typeName: 'upbtn',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, onBeforeMount, useAttrs, watch } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAttrs } from '../mixins'
import { IBtnBack } from '../../../../types'

const props = defineProps<{
  field?: string
  rowIndex?: number
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const isLoading = ref(!!props.loading)
const currentValue = ref([] as any[])
const attrs = ref({} as any)
const isInit = ref(false)

const uploadAttr = {
  name: 'file',
  showFileList: false,
  listType: 'text',
  accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
  beforeUpload: async (file: any) => {
    isLoading.value = true
    let confirmText = props.desc?.confirm || ''
    if (confirmText && typeof props.desc?.confirm === 'function') {
      confirmText = props.desc.confirm()
    }
    if (confirmText) {
      return new Promise((resolve) => {
        ElMessageBox.confirm(confirmText, '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => resolve(true))
          .catch(() => {
            resolve(false)
            isLoading.value = false
          })
      })
    } else {
      return await handelBeforeUpload(file)
    }
  },
  onError: () => {
    ElMessage.error('文件上传出错，请检查文件格式及内容是否正确！')
    isLoading.value = false
  }
}

const btnShowText = computed(() => {
  if (props.desc.btnLabel) {
    if (typeof props.desc.btnLabel === 'function') {
      return props.desc.btnLabel(props.formData || {})
    }
    return props.desc.btnLabel
  }
  if (props.desc.label) {
    if (typeof props.desc.label === 'function') {
      return props.desc.label(props.formData || {})
    }
    return props.desc.label
  }
  return ''
})

/**
 * 文件上传前的处理
 * @param file
 */
function handelBeforeUpload(file: any) {
  return new Promise((resolve, reject) => {
    isLoading.value = true
    const suffix = file.name.substring(file.name.lastIndexOf('.'))
    // 校验文件类型
    const accept = props.desc.accept || props.desc.attrs.accept || ['.xlsx', '.xls']
    if (accept.indexOf(suffix) < 0) {
      ElMessage.warning(`请上传后缀为${accept.join(',')}格式的文件!`)
      isLoading.value = false
      reject(false)
      return false
    }
    // 校验文件大小
    if (file.size > 20 * 1024 * 1024) {
      ElMessage.warning('超出文件大小限制(最大为20M)!')
      isLoading.value = false
      reject(false)
      return false
    }
    resolve(true)
  })
}

watch(
  () => props.loading,
  (data) => {
    isLoading.value = data
  },
  { immediate: true }
)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...uploadAttr, ...useAttrs() })
  if (!attrs.value.action) {
    console.warn('上传组件未填写action...')
  }
  attrs.value.onSuccess = (response: any) => {
    if (props.desc?.on?.success) {
      props.desc.on.success({
        row: response,
        callBack: () => {
          setTimeout(() => (isLoading.value = false), 500)
        },
        field: props.field,
        rowIndex: props.rowIndex
      } as IBtnBack)
    }
  }
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.el-plus-form-up-btn {
  display: flex;
  flex-direction: column;
  padding: 0;
}
</style>
