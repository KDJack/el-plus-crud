<template>
  <div class="layout-padding">
    <h3>cacheQuery 演示：返回恢复筛选/分页/Tab/折叠状态并重查最新数据</h3>
    <p style="color: #909399; font-size: 12px">操作流：筛选、切Tab、展开筛选条件、翻页 → 点「详情」进入详情页 → 用浏览器返回或详情页「返回(恢复)」按钮回来 → 全部状态保留、数据为最新；用「菜单式进入(重置)」或刷新则重置。</p>
    <p style="font-size: 12px">
      本次请求参数：<code>{{ lastQuery }}</code> · 数据生成时间：<code>{{ loadedAt }}</code>
    </p>
    <ElPlusTable ref="tableRef" cacheQuery="demo-list" :tableConfig="tableConfig" />
  </div>
</template>

<script setup lang="ts" name="listDemo">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ITableConfig } from 'types'

const router = useRouter()
const tableRef = ref()
const lastQuery = ref('{}')
const loadedAt = ref('')

// 模拟接口：87 条数据，按关键词/类型/Tab状态过滤 + 分页，返回结构使用默认 fetchMap（records/total/current）
const mockFetch = (query: any) => {
  lastQuery.value = JSON.stringify({ keyword: query.keyword || '', type: query.type ?? '', status: query.status ?? '', current: query.current, size: query.size })
  loadedAt.value = new Date().toLocaleTimeString()
  const all = Array.from({ length: 87 }, (_, i) => ({
    id: i + 1,
    name: `商品-${String(i + 1).padStart(3, '0')}`,
    type: i % 2,
    status: i % 3 === 0 ? 1 : 0,
    updatedAt: loadedAt.value
  }))
    .filter((item) => !query.keyword || item.name.includes(query.keyword))
    .filter((item) => query.type === undefined || query.type === '' || item.type === query.type)
    .filter((item) => query.status === undefined || query.status === '' || item.status === query.status)
  return new Promise((resolve) => {
    setTimeout(() => {
      const current = query.current || 1
      const size = query.size || 10
      resolve({
        records: all.slice((current - 1) * size, current * size),
        total: all.length,
        current
      })
    }, 300)
  })
}

const tableConfig = ref({
  fetch: mockFetch,
  tabConf: {
    prop: 'status',
    tabs: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  toolbar: {
    collapsible: true,
    formConfig: {
      collapsedRows: 1,
      column: 3,
      formDesc: {
        keyword: { type: 'input', label: '关键词' },
        type: {
          type: 'select',
          label: '类型',
          options: [
            { l: '类型A', v: 0 },
            { l: '类型B', v: 1 }
          ]
        },
        code: { type: 'input', label: '编码' },
        code2: { type: 'input', label: '编码' }
      }
    }
  },
  column: [
    { prop: 'id', label: 'ID', width: '80' },
    { prop: 'name', label: '名称' },
    { prop: 'type', label: '类型', width: '100' },
    { prop: 'updatedAt', label: '数据生成时间', width: '180' },
    {
      type: 'btns',
      label: '操作',
      width: '100',
      fixed: 'right',
      btns: [{ label: '详情', on: { click: (row: any) => router.push({ path: '/demo-detail', query: { id: row.id, name: row.name } }) } }]
    }
  ]
} as ITableConfig)
</script>
