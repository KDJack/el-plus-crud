<template>
  <el-input style="display: flex" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentText" @focus="handelFocus" @blur="handelBlur" onkeypress="return event.target.value === '' || event.target.value === undefined || event.target.value?.indexOf('.') >= 0 ? /[-\d]/.test(String.fromCharCode(event.keyCode)): /[-\d\.]/.test(String.fromCharCode(event.keyCode))">
    <template v-for="(item, key, index) of slots" #[key] :key="index">
      <slot :name="key" />
    </template>
    <template #append>%</template>
  </el-input>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormPercentinput',
  inheritAttrs: false,
  typeName: 'percentinput',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, useSlots, onBeforeMount, nextTick, computed, watch } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue?: number | null
  field: string
  desc: { [key: string]: any }
  disabled?: boolean
  formData: { [key: string]: any }
}>()
const emits = defineEmits(['update:modelValue', 'change', 'input', 'validateThis'])
const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

const isDoChange = ref(false)

const currentText = ref()
const currentValue = ref()
emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { autocomplete: 'new-password', maxlength: 10, clearable: true, ...useAttrs() })
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
    if (currentText.value !== 0 && !currentText.value) {
      nextTick(() => {
        // currentText.value = props.desc?.required ? numBindAttr.value.min : 0
        currentText.value = 0
        if (currentText.value === 0) {
          // 查看了源码，这里需要二次赋不一样的值，这里才会真正重新渲染
          nextTick(() => {
            currentText.value = null
            currentValue.value = null
            emits('change', currentValue.value)
          })
        }
      })
    } else {
      handelValChange(currentText.value, 0)
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
  let min = 0
  let max = 100
  let precision = 5

  let tempAttrs = props.desc?.attrs || props.desc
  if (props.desc?.attrs && typeof props.desc.attrs === 'function') {
    tempAttrs = props.desc.attrs(props.formData || {})
  }

  const { min: min_, max: max_, precision: precision_ } = (tempAttrs || {}) as any
  if (min_ !== undefined && min_ !== null && min_ !== '') min = min_
  if (max_ !== undefined && max_ !== null && max_ !== '') max = max_
  if (precision_ !== undefined && precision_ !== null && precision_ !== '' && precision_ >= 2) precision = precision_

  // 这里判断一下，最小和最大值的大小
  if (min > max) {
    min = max
  } else if (max < min) {
    max = min
  }
  return { min, max, precision }
})

// 判断一下初始值
if (currentText.value !== undefined && currentText.value !== null) {
  if (currentText.value < numBindAttr.value.min) {
    currentText.value = numBindAttr.value.min
  } else if (currentText.value > numBindAttr.value.max) {
    currentText.value = numBindAttr.value.max
  }
}

if (onEvents.value.change) {
  const tempChange = onEvents.value.change
  onEvents.value.change = (val: any, oldVal: any) => {
    handelValChange(val, oldVal)
    tempChange(val)
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
        currentText.value = numBindAttr.value.min
        currentValue.value = +(currentText.value / 100).toFixed(numBindAttr.value.precision)
        emits('change', currentValue.value)
      })
    } else if (val > numBindAttr.value.max) {
      ElMessage.warning(`${props.desc?.label || ''}最多不能大于${numBindAttr.value.max}`)
      nextTick(() => {
        currentText.value = numBindAttr.value.max
        currentValue.value = +(currentText.value / 100).toFixed(numBindAttr.value.precision)
        emits('change', currentValue.value)
      })
    } else {
      if (val.indexOf('.') > 0 && val.length - val.indexOf('.') > numBindAttr.value.precision - 2) {
        currentText.value = (+val).toFixed(numBindAttr.value.precision - 2)
      } else {
        currentText.value = val
      }
      currentValue.value = +(val / 100).toFixed(numBindAttr.value.precision)
      emits('change', currentValue.value)
    }
  }
}

/**
 * 清空数据
 */
function clear() {
  currentText.value = null
  currentValue.value = null
  isDoChange.value = false
}

watch(
  () => props.modelValue,
  (val: any) => {
    if (val !== undefined && val !== null && val !== '') {
      handelValChange((val * 100).toFixed(numBindAttr.value.precision - 2), null)
    }
  }
)

defineExpose({ clear, field: props.field })
</script>
