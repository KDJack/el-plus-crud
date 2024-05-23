<template>
  <div class="el-plus-form-formula">
    <div class="formula-text-panel">
      <el-button style="width: 100%" @click="isShowDialog = true">请点击进行编辑</el-button>
    </div>

    <!-- 弹框 -->
    <el-dialog class="el-plus-form-formula-dialog" :width="desc.dialogWidth || '800px'" :title="desc.title || desc.placeholder || '请编辑' + desc.label" draggable :closeOnClickModal="false" showCancel v-model="isShowDialog" append-to-body destroy-on-close>
      <div class="title-tip">{{ desc.tip || '请在下面输入框中输入您的公式，输入@符号，可以调出引用项' }}</div>
      <div ref="formulaRef" class="formula-input" :contenteditable="disabled ? 'false' : 'plaintext-only'" v-bind="attrs" style="ime-mode: disabled" @keydown.stop="onKeydown" @keyup="onKeyup" @blur="setValue"></div>
      <!-- 联想提示词 -->
      <div class="formula-input-selection" v-show="showSelection" ref="selection" @click.stop>
        <el-input v-model="filter" ref="inputRef" placeholder="输入关键字筛选"></el-input>
        <div class="options" v-if="displayOptions.length">
          <span class="option" v-for="(item, i) in displayOptions" :key="i" @click="handelOptionClick(item)">
            {{ item.label }}
          </span>
        </div>
        <div class="empty" v-else>暂无数据</div>
      </div>
      <template #footer>
        <div>
          <el-button type="primary">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormFormula',
  inheritAttrs: false,
  typeName: 'formula',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, watch, useAttrs, onBeforeMount, inject, computed, reactive } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { isEqual, isPromiseLike } from '../../../util'
import { ICRUDConfig } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig
const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: string | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
const options = reactive([] as any[])
const attrs = ref({} as any)
const isInit = ref(false)
const isShowDialog = ref(false)
const onEvents = ref(getEvents(props))
const showSelection = ref(false)
const filter = ref('')
const formulaRef = ref()
const inputRef = ref()

const currentValue = ref()
emits('update:modelValue', currentValue)

const displayOptions = computed(() => {
  return options.filter(({ label }) => label.includes(filter.value))
})

/**
 * 处理选项点击
 * @param item
 */
function handelOptionClick(item: any) {
  const { label, value } = item
  showSelection.value = false
  const res = `<div contenteditable="false">${label}<span>${value}</span></div>`
  resetDisplay('@', res)
}

/**
 * 重新渲染
 * @param from
 * @param to
 */
function resetDisplay(from: any, to = '') {
  let text = formulaRef.value.innerHTML
  if (text.includes(from)) {
    text = text.replace(new RegExp(from, 'g'), to)
    formulaRef.value.innerHTML = text
  }
  // this.setValue()
}

function onKeydown(e: any) {
  const { key } = e
  switch (key) {
    // 禁止回车
    case 'Enter':
      e.preventDefault()
      break
    case '@':
    case 'Process': // 中文输入法的 @
      openSelection()
      break
    default:
  }
}

function onKeyup() {
  const target = formulaRef.value
  const originStr = target.innerHTML
  let list = str2dom(originStr)
  list = list.map((v: any) =>
    isHTML(v)
      ? dom2str(v)
      : v.data
          .split('')
          .filter((i: any) => '0123456789+-*/@.()'.includes(i))
          .join('')
  )
  const filteredStr = list.join('')
  if (originStr !== filteredStr) {
    const index = getDiffIndex(originStr, filteredStr)
    formulaRef.value.innerHTML = filteredStr
    setFocus(formulaRef.value, index)
  }
}

function isHTML(v: any) {
  return Object.prototype.toString.call(v) === '[object HTMLDivElement]'
}

function setFocus(el: HTMLElement, index: number) {
  const range = document.createRange()
  const sel = window.getSelection() as any
  let nodeIndex = 0
  let offsetIndex = 0

  const list = str2dom(el.innerHTML)
  for (let i = 0; i < list.length; i++) {
    const v = list[i] as any
    if (isHTML(v)) {
      index -= dom2str(v).length
    } else {
      if (index > v.length) {
        index -= v.length
      } else {
        offsetIndex = index
        break
      }
    }
    nodeIndex++
  }

  range.selectNodeContents(el)
  range.collapse(false)
  el.childNodes[nodeIndex] && range.setStart(el.childNodes[nodeIndex], offsetIndex)
  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
}

function str2dom(v: any) {
  const objE = document.createElement('div')
  objE.innerHTML = v
  return [...objE.childNodes]
}

function dom2str(node: any) {
  let tmpNode = document.createElement('div') as any
  tmpNode.appendChild(node)
  let str = tmpNode.innerHTML
  tmpNode = node = null
  return str
}

function getDiffIndex(s1: any, s2: any) {
  const l1 = s1.split('')
  const l2 = s2.split('')
  const max = Math.max(l1.length, l2.length)
  let index = 0
  for (let i = 0; i < max; i++) {
    if (l1[i] == l2[i]) {
      index++
    } else {
      break
    }
  }
  return index
}

function getHTMLList({ text, prefix, suffix }: any) {
  return text
    .replace(new RegExp(prefix, 'g'), ',')
    .replace(new RegExp(suffix, 'g'), ',')
    .split(',')
    .filter((v: any) => !!v)
}

function addEventListener() {
  // 添加全局click监听
  window.addEventListener('click', removeSelection)
  // 监听滚定事件 定位下拉框
  if (attrs.value.scrollWrapperClassName) {
    const el = getParentNode(formulaRef.value, attrs.value.scrollWrapperClassName)
    el && el.addEventListener('scroll', attrs.value.throttleSetSelectionStyle)
  }
}

function removeEventListener() {
  // 解绑全局click监听关闭选项弹框
  window.removeEventListener('click', removeSelection)
  // 解绑全局滚动监听
  if (attrs.value.scrollWrapperClassName) {
    const el = getParentNode(formulaRef.value, attrs.value.scrollWrapperClassName)
    el && el.addEventListener('scroll', attrs.value.throttleSetSelectionStyle)
  }
}

// 更新 v-model
function setValue() {
  console.log('formulaRef.value: ', formulaRef.value.innerHTML)

  const vars = {}
  let tempVal = ''
  const text = formulaRef.value.innerHTML.replace(/\sdata-spm-anchor-id=".*?"/g, '')
  const list = getHTMLList({
    text,
    prefix: '<div contenteditable="false">',
    suffix: '</div>'
  })
  list.forEach((item: any) => {
    const [v1, v2] = getHTMLList({
      text: item,
      prefix: '<span>',
      suffix: '</span>'
    })
    if (v2) {
      tempVal += v2
      vars[v2] = v1
    } else {
      tempVal += v1
    }
  })
  emits('update:modelValue', tempVal)
}

/**
 * 获取父类节点
 * @param el
 * @param className
 */
function getParentNode(el: any, className: string) {
  if (!el) return null
  do {
    el = el.parentNode
  } while (el && !el.className.includes(className))
  return el
}

/**
 * 移出选项
 * @param e
 */
function removeSelection(e: any) {
  showSelection.value = false
  e && resetDisplay('@')
}

/**
 * 打开选项栏
 */
function openSelection() {
  filter.value = ''
  showSelection.value = true
  setTimeout(() => {
    // append to body
    // document.body.appendChild(this.$refs.selection)
    // setSelectionStyle()
    // 绑定监听
    addEventListener()
    // 焦点到下拉框filter input中
    inputRef.value.focus()
  }, 0)
}

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { autocomplete: 'new-password', maxlength: defaultConf.form?.leng?.input || 0, clearable: true, ...useAttrs() })
  isInit.value = true
})

watch(
  () => props.desc.options,
  async (data) => {
    if (typeof data === 'string') {
      // 从全局数据中获取options
      options.splice(0, options.length, ...(globalData[data] || []))
    } else if (typeof data === 'function') {
      const result = data(props.formData || {})
      if (isPromiseLike<any>(result)) {
        options.splice(0, options.length, ...(await result))
      } else {
        options.splice(0, options.length, ...result)
      }
    } else if (Array.isArray(data)) {
      if (data && options && !isEqual(data, options)) {
        options.splice(0, options.length, ...data)
      }
    } else {
      options.splice(0, options.length)
    }
  },
  { immediate: true }
)

watch(
  () => currentValue.value,
  (val: any) => {
    if (attrs.value.allowCreate) {
      if (val && Array.isArray(val) && (val as Array<any>).some((item) => typeof item === 'string' && item.length > (defaultConf.form?.leng?.input || 20))) {
        currentValue.value = (val as Array<string>).filter((item) => typeof item !== 'string' || item.length <= (defaultConf.form?.leng?.input || 20))
      }
    }
  },
  { immediate: true }
)
</script>
<style lang="scss">
.el-plus-form-formula-dialog {
  .title-tip {
    margin-bottom: 20px;
  }
  .formula-input {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 10px 15px;
    white-space: nowrap;
    outline: none;
    transition: border 0.3s;
    overflow: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &[contenteditable='false'] {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.error {
      border: 1px solid #f24f18;
    }

    &:empty::before {
      content: attr(placeholder);
      color: #c0c4cc;
    }

    br {
      display: none;
    }

    & * {
      display: inline;
      white-space: nowrap;
    }

    &:focus {
      border: 1px solid #f24f18;
    }

    div {
      color: #f24f18;
      padding: 0 3px;

      span {
        display: none;
      }
    }
  }
  .formula-input-selection {
    position: relative;
    font-size: 12px;
    width: 100%;
    z-index: 10000;
    background: #fff;
    border: 1px solid #dcdfe6;
    margin-top: -1px;
    box-sizing: border-box;
    border-radius: 4px;
    transition:
      top 300ms,
      left 300ms;

    .el-input {
      &__inner {
        border-radius: 0 0 0 0;
        border: none;
        border-bottom: 1px solid #dcdfe6;

        &:focus {
          border-bottom: 1px solid #dcdfe6;
        }
      }
    }

    .options {
      max-height: 200px;
      overflow-y: scroll;

      .option {
        background-color: #f5f7fa;
        padding: 5px 15px;
        border-radius: 100px;
        margin: 5px;
        white-space: nowrap;
        cursor: pointer;
        display: inline-block;
      }
    }

    .empty {
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-plus-form-formula {
  width: 100%;

  .formula-text-panel {
    display: flex;
  }

  .input {
  }

  > .hint {
    color: #f24f18;
    font-size: 12px;
  }
}
</style>
