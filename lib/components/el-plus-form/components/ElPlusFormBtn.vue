<template>
  <template v-if="vif">
    <!-- text 模式使用 el-link -->
    <template v-if="isTextBtn">
      <template v-if="props.desc?.confirm">
        <el-popconfirm @confirm="onEvents.click" :title="props.desc?.confirm">
          <template #reference>
            <el-link :underline="'never'" :type="linkType" v-bind="linkAttrs" :disabled="localLoading || linkAttrs.disabled" :style="{ pointerEvents: desc?.isTag ? 'none' : 'all' }" :class="{ 'no-label': !props.desc?.label }">
              <el-icon v-if="localLoading" class="is-loading"><Loading /></el-icon>
              <slot name="default">
                <template v-if="!!props.desc?.label">{{ btnShowText }}</template>
              </slot>
            </el-link>
          </template>
        </el-popconfirm>
      </template>
      <el-link v-else :underline="'never'" :type="linkType" v-bind="linkAttrs" v-on="onEvents" :disabled="localLoading || linkAttrs.disabled" :style="{ pointerEvents: desc?.isTag ? 'none' : 'all' }" :class="{ 'no-label': !props.desc?.label }">
        <el-icon v-if="localLoading" class="is-loading"><Loading /></el-icon>
        <slot name="default">
          <template v-if="!!props.desc?.label">{{ btnShowText }}</template>
        </slot>
      </el-link>
    </template>
    <!-- 非 text 模式保持原有 el-button -->
    <template v-else>
      <template v-if="props.desc?.confirm">
        <el-popconfirm @confirm="onEvents.click" :title="props.desc?.confirm">
          <template #reference>
            <el-button :loading="localLoading" :size="props.desc?.size || 'default'" v-bind="attrs">
              <slot name="default">
                <template v-if="!!props.desc?.label">{{ btnShowText }}</template>
              </slot>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
      <el-button v-else :loading="localLoading" :size="props.desc?.size || 'default'" v-bind="attrs" v-on="onEvents" :style="{ pointerEvents: desc?.isTag ? 'none' : 'all' }" :class="{ 'no-label': !props.desc?.label }">
        <slot name="default">
          <template v-if="!!props.desc?.label">{{ btnShowText }}</template>
        </slot>
      </el-button>
    </template>
  </template>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormBtn',
  inheritAttrs: false,
  typeName: 'btn',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, useAttrs, watch, inject } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { IBtnBack, ICRUDConfig } from '../../../../types'

const lodash = inject('lodash') as any
const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  field?: string
  rowIndex?: number
  loading?: boolean
  desc?: { [key: string]: any }
  formData?: { [key: string]: any }
}>()

const localLoading = ref(props.loading ?? false)

const vif = computed(() => {
  // 这里最终处理一下auth权限问题
  if (props.desc?.auth) {
    if (!defaultConf.auth) {
      console.warn('使用auth属性，请在crud注册时传入auth校验方法~')
    } else {
      return defaultConf.auth(props.desc.auth)
    }
  }
  return true
})

/** 是否为文字按钮模式 */
const isTextBtn = computed(() => !!props.desc?.text)

/** el-link 不支持的属性列表 */
const LINK_UNSUPPORTED_KEYS = new Set([
  'text', 'plain', 'bg', 'loading', 'round', 'circle', 'dashed',
  'native-type', 'autofocus', 'auto-insert-space', 'tag', 'size',
  'btnType', 'btnLabel', 'mask', 'confirm', 'auth', 'isTag',
  'label', 'on', '_attrs', 'type'
])

/** 为 el-link 准备的属性，过滤掉不支持的属性 */
const linkAttrs = computed(() => {
  const result: Record<string, any> = {}
  for (const key in attrs.value) {
    if (!LINK_UNSUPPORTED_KEYS.has(key)) {
      result[key] = (attrs.value as any)[key]
    }
  }
  return result
})

/** el-link 的 type 属性，从 btnType 逻辑中获取 */
const linkType = computed(() => {
  const a = attrs.value as any
  if (a.btnType) {
    if (typeof a.btnType === 'function') {
      return a.btnType(props.formData || {}) || 'primary'
    }
    return a.btnType || 'primary'
  }
  return a.type || 'primary'
})

const attrs = computed(() => {
  const attrs = Object.assign({}, useAttrs(), props.desc, props.desc?._attrs)
  if (attrs.btnType) {
    if (typeof attrs.btnType == 'function') {
      attrs.type = attrs.btnType(props.formData || {})
    } else {
      attrs.type = attrs.btnType
    }
    if (!attrs.type) {
      attrs.type = 'primary'
    }
  }
  return attrs
})

const onEvents = computed(() => {
  const events = {} as any
  if (props.desc && props.desc.on) {
    for (const key in props.desc.on) {
      if (key === 'click' && props.desc.mask) {
        events[key] = function () {
          localLoading.value = true
          props.desc?.on[key]({
            row: props.formData || {},
            callBack: (time: number) => {
              setTimeout(() => (localLoading.value = false), time || 50)
            },
            field: props.field,
            rowIndex: props.rowIndex
          } as IBtnBack)
        }
      } else {
        events[key] = function () {
          props.desc?.on[key]({ row: lodash.cloneDeep(props.formData || {}), field: props.field, rowIndex: props.rowIndex } as IBtnBack)
        }
      }
    }
  }
  return events
})

const btnShowText = computed(() => {
  if (props.desc?.btnLabel) {
    if (typeof props.desc.btnLabel === 'function') {
      return props.desc.btnLabel(props.formData || {})
    }
    return props.desc.btnLabel
  }
  if (props.desc?.label) {
    if (typeof props.desc.label === 'function') {
      return props.desc.label(props.formData || {})
    }
    return props.desc.label
  }
  return ''
})

watch(
  () => props.loading,
  (val: any) => {
    localLoading.value = val
  }
)
</script>
<style lang="scss">
.el-button.no-label > span {
  margin-left: 0 !important;
}
.el-link.no-label {
  font-size: var(--el-font-size-base);
}
</style>
