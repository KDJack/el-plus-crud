<template>
  <div class="el-plus-table-bottom-statistic-info">
    <template v-for="(item, i) in props.statisticSetting.keys" :key="i">
      <div class="statistic-info-item" v-if="props.statisticData && props.statisticData[item.key] !== undefined">
        {{ item.label }}:
        <span v-if="item.type && item.type === 'text'">
          {{ props.statisticData[item.key] || 0 }}
        </span>
        <span v-else>
          {{ formatMoney(props.statisticData[item.key] || 0) }}
        </span>
        {{ item.aftLabel }}
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {} from 'vue'

const props = defineProps<{
  statisticSetting: { [key: string]: any }
  statisticData: { [key: string]: any }
}>()

const formatMoney = (s: any, n?: any) => {
  if (s && (s + '').indexOf('~') >= 0) {
    return s
  }
  n = n > 0 && n <= 20 ? n : 2
  if (!s || s === '' || typeof s === 'undefined') {
    s = 0
  }
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  let isNegative = false
  if (s.indexOf('-') === 0) {
    isNegative = true
    s = s.substr(1)
  }
  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  return (isNegative ? '-' : '') + t.split('').reverse().join('') + '.' + r
}
</script>
