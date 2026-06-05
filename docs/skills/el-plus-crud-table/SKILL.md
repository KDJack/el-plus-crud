---
name: el-plus-crud-table
description: Data-driven table component with multi-level headers, pagination, tabs, row selection, export, summary rows, and tree expansion
version: 1.0.0
origin: el-plus-crud
tags: [vue3, element-plus, table, data-driven, pagination, multi-level-header]
---

# ElPlusTable — Data-Driven Table

ElPlusTable is the core table component. Configure columns, data fetching, toolbar, pagination, tabs, tree expansion, and summary rows through `ITableConfig`. Supports multi-level headers, row/column merging, cross-page row selection, Excel export, and column visibility persistence.

## When to Activate

- Using `<ElPlusTable>` component
- Writing or modifying `ITableConfig` / `IColumnItem` configuration
- Configuring multi-level headers, toolbar search, pagination, or tabs
- Implementing Excel export, row selection, summary rows, or tree expansion
- Calling expose methods: `reload` / `changeSelect` / `resetSelect` / `resetQuery`

## Core Concepts

### ITableConfig Structure

```typescript
interface ITableConfig {
  tbName?: string              // Unique name for column persistence (localStorage)
  fetch?: IFetch<any>          // Data request function (required for auto-loading)
  fetchMap?: IFetchTableMap    // Response data mapping (overrides global)
  column?: Array<IColumnItem>  // Column definitions
  toolbar?: ITableToolbar      // Search bar + action buttons + export
  tabConf?: ITableTabConf      // Tab radio-group at top
  queryMap?: any               // Extra query conditions (static or async function)
  explan?: IExplanConfig       // Tree expansion config
  summaryConf?: ISummaryConf   // Summary row at bottom
  statistic?: IStatisticConfig // Statistics info
  maxHeight?: number           // Table max height
  tableAttr?: any              // Pass-through to el-table
}
```

### fetch and fetchMap

The `fetch` function must return a Promise. The response is parsed using `fetchMap`:

```typescript
// Default fetchMap (if not configured):
// list: 'records', total: 'total', current: 'current', size: 'size'

// If your API returns { data: { list: [...], totalCount: 100 } }:
const tableConfig: ITableConfig = {
  fetch: api.getList,
  fetchMap: {
    list: 'data.list',
    page: { total: 'data.totalCount', current: 'data.pageNum' }
  }
}
```

### Multi-Level Headers

Use `children` for recursive nested headers. `ElPlusTableColumn` renders recursively.

```typescript
const columns: Array<IColumnItem> = [
  { prop: 'name', label: '姓名', width: '120' },
  {
    label: '联系信息',
    children: [
      { prop: 'phone', label: '手机号', width: '130' },
      { prop: 'email', label: '邮箱', width: '180' }
    ]
  }
]
```

### Column Types

| type | Description | Use Case |
|---|---|---|
| (default) | Text display | Regular data columns |
| `btns` | Action buttons | Edit, delete, view operations |
| `image` | Image preview | Avatar, photo columns |
| `tag` | Tag display (el-tag) | Status columns with color-coded labels |
| `status` | Status indicator | Active/inactive status |
| `link` | Clickable link | External links, detail links |

### Column Type: tag

Tag columns render an `el-tag` per cell. Controlled by three key properties:

**tagType** — el-tag color theme (`'primary'` | `'success'` | `'warning'` | `'danger'` | `'info'`):

```typescript
// Function: dynamic color per row value
tagType: (value) => value === 1 ? 'success' : 'danger'

// String: references global format function
tagType: 'statusColor'  // calls format.statusColor(value, row, field)
```

**format** — Display text inside the tag:

```typescript
// Function: dynamic text per row value
format: (value) => ({ 0: '禁用', 1: '启用' }[value] || '未知')

// String: references global format function
format: 'statusLabel'  // calls format.statusLabel(value, row, field)
```

**color** — Custom color (overrides tagType color, table column only):

```typescript
// String: fixed custom color
color: '#67C23A'

// Function: dynamic color per row
color: (value, row, field) => value === 1 ? '#67C23A' : '#F56C6C'

// Array: color per value index (for multi-prop columns: prop: 'a,b')
color: ['#67C23A', '#F56C6C']
```

**attrs** — Pass-through to el-tag:

```typescript
attrs: { effect: 'dark', round: true, size: 'small' }
```

### Toolbar (ITableToolbar)

```typescript
interface ITableToolbar {
  btns?: Array<any>           // Action buttons (add, batch delete, etc.)
  btnRight?: boolean          // Align buttons right (only when no formConfig)
  formConfig?: IFormConfig    // Search form configuration
  export?: IExportConfig | Array<IExportConfig>  // Excel export
  collapsible?: boolean       // Enable search form collapse/expand
}
```

The toolbar search form uses `ElPlusForm` in `isTable` mode internally.

### Row Selection (type='selection')

```html
<ElPlusTable type="selection" :selectList="defaultSelected" @selection="onSelectionChange" />
```

- Cross-page selection: `allSelectRowList` accumulates selections across pages
- `changeSelect(items, isSelect)`: Programmatically select/deselect rows
- `resetSelect()`: Reset to initial `selectList`
- Auto-refreshes checkbox state on page load

### Tabs (ITableTabConf)

```typescript
const tabConf: ITableTabConf = {
  prop: 'status',      // Query parameter name
  tabs: [
    { label: '全部', value: '' },
    { label: '启用', value: 1, key: 'activeCount' },
    { label: '禁用', value: 0, key: 'inactiveCount' }
  ],
  fetch: api.getTabCounts,    // Remote count statistics
  queryMap: { type: 'user' }  // Extra query for count fetch
}
```

### Excel Export (IExportConfig)

```typescript
const exportConfig: IExportConfig = {
  label: '导出Excel',
  url: '/api/export/users',
  name: '用户列表',
  method: 'post',
  isAuth: true,
  tokenKey: 'Authorization',
  noQuery: false,              // Include current search conditions
  beforeRequest: (data) => ({ ...data, extra: 'value' })
}
```

### Summary Row (ISummaryConf)

```typescript
const summaryConf: ISummaryConf = {
  prop: 'amount,count',           // Columns to sum (comma-separated)
  label: '合计,总数',              // Labels (comma-separated)
  format: 'yuan',                 // Format function key from formatObj
  sumFn: (tableData, selectedRows) => '¥1,234.56',  // Custom calculation
  hstyle: { fontWeight: 'bold' }, // Row style
  vif: () => tableData.value.length > 0  // Conditional display
}
```

### Row/Column Merging

```typescript
const columns: Array<IColumnItem> = [
  { prop: 'department', label: '部门', isRowSpan: true, rsProps: ['department'] },
  { prop: 'name', label: '姓名' },
  { prop: 'monday', label: '周一', isColSpan: true },
  { prop: 'tuesday', label: '周二', isColSpan: true }
]
```

### Column Visibility Persistence

When `tbName` is set, column show/hide settings are persisted to localStorage with key `{storagePrefix}{tbName}`.

### Expose Methods

```typescript
const tableRef = ref()

await tableRef.value.reload()           // Reload data (reset to page 1)
tableRef.value.tableData               // Current page data
tableRef.value.changeSelect(items, true)  // Select rows
tableRef.value.resetSelect()           // Reset selection
tableRef.value.initCol()               // Re-init column visibility
tableRef.value.resetQuery()            // Reset search form
tableRef.value.nextPage()              // Go to next page
tableRef.value.hasNextPage()           // Check if next page exists
```

### Events

| Event | Payload | Description |
|---|---|---|
| `selection` | `selectedRows[]` | Selection changed (cross-page accumulated) |
| `select` | `selection[], row` | Single row selected/deselected |
| `selectAll` | `selection[], isRemove` | Select all on current page |
| `tabChange` | `tabValue, initColFn` | Tab switched |
| `queryChange` | `queryData` | Search conditions changed |
| `expandChange` | `row, expanded` | Row expanded/collapsed |
| `inited` | `tableData[]` | Data loaded (debounced 400ms) |
| `headerReset` | `formData` | Search form reset |
| `loadDataEnd` | `rawResponse` | Raw API response received |

## Code Examples

### Basic Table

```html
<ElPlusTable :tableConfig="tableConfig" />
```

```typescript
const tableConfig: ITableConfig = {
  fetch: api.getUserList,
  column: [
    { prop: 'name', label: '姓名', width: '120' },
    { prop: 'phone', label: '手机号', width: '130' },
    { prop: 'email', label: '邮箱' },
    {
      type: 'btns', label: '操作', width: '180', fixed: 'right',
      btns: [
        { label: '编辑', on: { click: (row) => handleEdit(row) } },
        { label: '删除', confirm: '确定删除？', on: { click: (row) => handleDelete(row) } }
      ]
    }
  ]
}
```

### Toolbar with Search Form

```typescript
const tableConfig: ITableConfig = {
  fetch: api.getUserList,
  toolbar: {
    collapsible: true,
    formConfig: {
      formDesc: {
        keyword: { type: 'input', label: '关键词' },
        status: { type: 'select', label: '状态', options: [{ l: '启用', v: 1 }, { l: '禁用', v: 0 }] }
      },
      column: 3,
      collapsedRows: 1,
      beforeRequest: (data) => {
        // Transform search params before API call
        if (data.keyword) data.name = data.keyword
        delete data.keyword
        return data
      }
    },
    btns: [{ label: '新增', type: 'primary', on: { click: handleAdd } }]
  },
  column: [...]
}
```

### Row Selection with Batch Operations

```html
<ElPlusTable
  type="selection"
  :tableConfig="tableConfig"
  :selectList="selectedRows"
  @selection="onSelection"
/>
```

```typescript
const selectedRows = ref([])
const onSelection = (rows: any[]) => { selectedRows.value = rows }
const batchDelete = async () => {
  const ids = selectedRows.value.map(r => r.id)
  await api.batchDelete({ ids })
  tableRef.value.reload()
}
```

### Action Column with Quick Button Types

```typescript
{
  type: 'btns', label: '操作', width: '200', fixed: 'right',
  btns: [
    { label: '查看', type: 'primary', text: true, on: { click: (row) => viewDetail(row) } },
    { label: '编辑', type: 'warning', text: true, on: { click: (row) => editRow(row) } },
    { label: '删除', type: 'danger', text: true, confirm: '确定删除该记录？', on: { click: (row) => deleteRow(row) } }
  ]
}
```

### Remote Data for Tabs with Counts

```typescript
const tableConfig: ITableConfig = {
  fetch: api.getOrders,
  tabConf: {
    prop: 'status',
    tabs: [
      { label: '全部', value: '' },
      { label: (d) => `待付款(${d.pending || 0})`, value: 0, key: 'pending' },
      { label: (d) => `已付款(${d.paid || 0})`, value: 1, key: 'paid' }
    ],
    fetch: api.getOrderCounts
  },
  column: [...]
}
```

### Excel Export

```typescript
toolbar: {
  export: {
    label: '导出',
    url: '/api/users/export',
    name: '用户数据',
    method: 'post',
    isAuth: true,
    tokenKey: 'token'
  }
}
```

## Anti-Patterns

### FAIL: Manually manage pagination

```typescript
// FAIL: ElPlusTable handles pagination internally
const page = ref(1)
const fetchData = () => api.getList({ current: page.value, size: 10 })
```

### PASS: Let ElPlusTable manage pagination

```typescript
const tableConfig: ITableConfig = {
  fetch: api.getList
  // ElPlusTable handles current/size automatically
}
```

### FAIL: Ignore fetchMap causing empty data

```typescript
// FAIL: API returns { data: { list: [...] } } but default fetchMap looks for 'records'
fetch: api.getList  // data shows as empty
```

### PASS: Configure fetchMap or set global default in ICRUDConfig.table

```typescript
// Per-table:
fetch: api.getList,
fetchMap: { list: 'data.list', page: { total: 'data.total' } }

// Global (main.ts):
app.use(elPlusCrud, { table: { list: 'data.list', page: { total: 'data.total' } } })
```

### FAIL: Use v-for to render columns manually

```html
<!-- FAIL: Don't manually iterate columns -->
<el-table-column v-for="col in columns" :prop="col.prop" :label="col.label" />
```

### PASS: Configure via ITableConfig.column

```typescript
const tableConfig: ITableConfig = { column: columns }
```

## Best Practices

1. Configure `fetchMap` globally in `ICRUDConfig.table` — avoid repeating in every table
2. Fix action columns to the right: `fixed: 'right'` with `type: 'btns'`
3. Set `tbName` on business tables to enable column visibility persistence
4. Use `toolbar.collapsible` + `formConfig.collapsedRows` for forms with many search fields
5. `fetch` must return data matching `fetchMap` structure, or data won't render
6. Use `queryMap` for static extra conditions, `beforeRequest` for dynamic transformations

## Related Skills

- `el-plus-crud-config` — ITableConfig, IColumnItem, IFetchTableMap type definitions (direct)
- `el-plus-crud-form` — toolbar search form uses ElPlusForm isTable mode (indirect)
