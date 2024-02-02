<template>
  <el-input-number v-if="isInit" class="ElPlusFormNumber-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue" @focus="handelFocus" @blur="handelBlur" onkeypress="return( /[-\d\.]/.test(String.fromCharCode(event.keyCode)))" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormNumber',
  inheritAttrs: false,
  typeName: 'number',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, useAttrs, onBeforeMount, nextTick, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ElMessage } from 'element-plus'
import { ICRUDConfig } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  modelValue?: number | string | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  rowIndex?: number
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
const currentValue = ref(typeof props.modelValue === 'string' ? +props.modelValue : props.modelValue)

emits('update:modelValue', currentValue)
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

const isDoChange = ref(false)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...defaultConf.form?.leng?.nbinput, ...useAttrs() })
  delete attrs.value.min
  delete attrs.value.max
  isInit.value = true
})

/**
 * 获取焦点
 */
function handelFocus() {
  isDoChange.value = false
}

/**
 * 处理失去焦点
 * @param event
 */
function handelBlur() {
  if (!isDoChange.value) {
    if (currentValue.value !== 0 && !currentValue.value) {
      nextTick(() => {
        // currentValue.value = props.desc?.required ? numBindAttr.value.min : 0
        currentValue.value = 0
        if (currentValue.value === 0) {
          // 查看了源码，这里需要二次赋不一样的值，这里才会真正重新渲染
          nextTick(() => {
            currentValue.value = null
            change && change()
          })
        }
      })
    } else {
      handelValChange(currentValue.value, 0)
    }
  }
  nextTick(() => {
    emits('validateThis')
  })
}

/**
 * 绑定属性
 */
const numBindAttr = computed(() => {
  let { min = 0, max = 999999999, precision = 0, controlsPosition = 'right' } = defaultConf.form?.leng?.nbinput || {}
  let tempAttrs = props.desc?.attrs || props.desc
  if (props.desc?.attrs && typeof props.desc.attrs === 'function') {
    tempAttrs = props.desc.attrs(props.formData || {})
  }

  const { min: min_, max: max_, precision: precision_, controlsPosition: controlsPosition_ } = (tempAttrs || {}) as any
  if (min_ !== undefined && min_ !== null && min_ !== '') min = min_
  if (max_ !== undefined && max_ !== null && max_ !== '') max = max_
  if (precision_ !== undefined && precision_ !== null && precision_ !== '') precision = precision_
  if (controlsPosition_ !== undefined && controlsPosition_ !== null && controlsPosition_ !== '') controlsPosition = controlsPosition_

  // 这里判断一下，最小和最大值的大小
  if (min > max) {
    min = max
  } else if (max < min) {
    max = min
  }
  return { min, max, precision, controlsPosition }
})

// 判断一下初始值
if (currentValue.value !== undefined && currentValue.value !== null) {
  if (currentValue.value < numBindAttr.value.min) {
    currentValue.value = numBindAttr.value.min
  } else if (currentValue.value > numBindAttr.value.max) {
    currentValue.value = numBindAttr.value.max
  }
}

const change = onEvents.value.change
if (change) {
  onEvents.value.change = (val: any, oldVal: any) => {
    handelValChange(val, oldVal)
  }
} else {
  onEvents.value.change = handelValChange
}

/**
 * 监听值改变
 * @param val
 */
function handelValChange(val: any, oldVal: any) {
  isDoChange.value = true
  if (val !== oldVal) {
    if (val < numBindAttr.value.min) {
      ElMessage.warning(`${props.desc?.label || ''}最少不能低于${numBindAttr.value.min}`)
      nextTick(() => {
        currentValue.value = numBindAttr.value.min
        change && change()
      })
    } else if (val > numBindAttr.value.max) {
      ElMessage.warning(`${props.desc?.label || ''}最多不能大于${numBindAttr.value.max}`)
      nextTick(() => {
        currentValue.value = numBindAttr.value.max
        change && change()
      })
    } else {
      change && change()
    }
  }
}
</script>
<style lang="scss" scoped>
.ElPlusFormNumber-panel {
  width: 100% !important;
  max-width: 100%;
  :deep(.el-input__wrapper) {
    // padding-left: 11px !important;
    input {
      text-align: left !important;
    }
  }
}
</style>
