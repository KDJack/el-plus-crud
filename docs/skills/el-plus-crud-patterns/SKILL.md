---
name: el-plus-crud-patterns
description: Proven patterns and recipes for common CRUD scenarios — complete CRUD page, search-reset workflow, master-detail, custom components, and permission control
version: 1.0.0
origin: el-plus-crud
tags: [vue3, element-plus, patterns, recipes, crud-workflow]
---

# Best Practices — Common CRUD Patterns & Recipes

Practical patterns for building real-world CRUD applications with el-plus-crud. Each pattern provides a complete, copy-pasteable solution with configuration and code.

## When to Activate

- Building a complete CRUD page (list + add + edit + delete)
- Implementing master-detail or one-to-many editing
- Integrating custom form components
- Solving cross-component coordination problems
- Asking "how to implement X with el-plus-crud"

## Pattern 1: Standard CRUD Page

The most common pattern: `ElPlusTable` (list) + `ElPlusFormDialog` (add/edit) + toolbar search.

```html
<template>
  <div class="crud-page">
    <ElPlusTable ref="tableRef" :tableConfig="tableConfig" />
    <ElPlusFormDialog
      v-model:show="showDialog"
      v-model="formData"
      :formDesc="formDesc"
      :requestFn="api.create"
      :updateFn="api.update"
      :tableRef="tableRef"
      :title="formData.id ? '编辑' : '新增'"
    />
  </div>
</template>
```

**Key points:**
- Same `formDesc` for add and edit
- `formData.id` presence determines `requestFn` vs `updateFn`
- `tableRef` enables automatic table reload after submit

## Pattern 2: Grouped Form Dialog (formGroup mode)

Use `ElPlusFormDialog` with `formGroup` prop for multi-section form dialogs. Same dialog lifecycle as formDesc mode, but organizes fields into titled groups.

```html
<template>
  <ElPlusTable ref="tableRef" :tableConfig="tableConfig" />
  <ElPlusFormDialog
    v-model:show="showDialog"
    v-model="formData"
    :formGroup="formGroupConfig"
    title="编辑用户信息"
    :tableRef="tableRef"
  />
</template>

<script setup lang="ts">
import type { IFormGroupConfig } from 'el-plus-crud'

const formGroupConfig: IFormGroupConfig = {
  column: 2,
  requestFn: api.saveUser,
  successTip: '保存成功!',
  group: [
    {
      title: '基本信息',
      formDesc: {
        name:  { type: 'input', label: '姓名', required: true },
        phone: { type: 'input', label: '手机号', rules: 'phone' }
      }
    },
    {
      title: '地址信息',
      formDesc: {
        province: { type: 'area', label: '地区', required: true },
        address:  { type: 'input', label: '详细地址' }
      }
    }
  ]
}
</script>
```

**Key points:**
- Pass `formGroup` instead of `formDesc` to switch to grouped mode
- `tableRef` auto-reload works identically to formDesc mode
- Success callback priority: `props.success` → `formGroup.success` → default (reload + close)
- Same dialog configuration (width, draggable, etc.) applies

## Pattern 3: Search-Reset-Pagination Workflow

```typescript
const tableConfig: ITableConfig = {
  fetch: api.getList,
  toolbar: {
    collapsible: true,
    formConfig: {
      formDesc: {
        keyword: { type: 'input', label: '关键词', width: '180px' },
        status: { type: 'select', label: '状态', width: '150px', options: [{ l: '启用', v: 1 }, { l: '禁用', v: 0 }] },
        dateRange: { type: 'daterange', label: '时间范围', width: '280px', startTimeKey: 'startDate', endTimeKey: 'endDate' }
      },
      column: 3,
      collapsedRows: 1,
      beforeRequest: (data) => {
        // Transform search params
        if (data.keyword) { data.name = data.keyword; delete data.keyword }
        return data
      }
    },
    btns: [{ label: '新增', type: 'primary', icon: 'Plus', on: { click: handleAdd } }]
  },
  column: [...]
}
```

**Key points:**
- `collapsible: true` + `collapsedRows: 1` shows first row of search fields with expand button
- `beforeRequest` transforms search params before API call
- `daterange` auto-splits into `startDate`/`endDate`
- Set fixed `width` on each search field for consistent layout

## Pattern 4: Delete with Confirmation

```typescript
// In column btns array:
{
  type: 'btns', label: '操作', width: '200', fixed: 'right',
  btns: [
    {
      label: '编辑', type: 'primary', text: true,
      on: { click: (row: any) => { formData.value = { ...row }; showDialog.value = true } }
    },
    {
      label: '删除', type: 'danger', text: true,
      confirm: '确定删除该记录？',
      on: { click: async (row: any) => {
        await api.deleteById(row.id)
        tableRef.value.reload()
      }}
    }
  ]
}
```

**Key point:** `confirm` property shows confirmation dialog before executing `on.click`.

## Pattern 5: Batch Selection + Batch Operations

```html
<ElPlusTable
  type="selection"
  ref="tableRef"
  :tableConfig="tableConfig"
  :selectList="selectedRows"
  @selection="onSelectionChange"
/>
```

```typescript
const selectedRows = ref([])

const onSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleBatchDelete = async () => {
  if (!selectedRows.value.length) return ElMessage.warning('请先选择记录')
  const ids = selectedRows.value.map(r => r.id)
  await api.batchDelete({ ids })
  ElMessage.success('删除成功')
  tableRef.value.reload()
  tableRef.value.resetSelect()
}
```

**Key point:** Cross-page selection is maintained automatically in `allSelectRowList`.

## Pattern 6: Form Field Linking

Field A changes → Field B's options/visibility updates.

```typescript
const formDesc: IFormDesc = {
  province: {
    type: 'select', label: '省份', required: true,
    options: provinceList,
    on: {
      change: (val: any, formData: any) => {
        // Clear city and load new options
        formData.city = null
        loadCityOptions(val)
      }
    }
  },
  city: {
    type: 'select', label: '城市', required: true,
    options: () => cityOptions.value,
    vif: (formData) => !!formData.province
  }
}
```

**Key points:**
- Use `on.change` to respond to field value changes
- Set `vif` as function to show/hide dependent fields
- Use function-form `options` for dynamically loaded data

## Pattern 7: Custom Form Component

```typescript
// 1. Register in ICRUDConfig
app.use(elPlusCrud, {
  form: { comList: ['mapselector'] }  // registers el-plus-form-mapselector
})

// 2. Create component file with standard interface
// ElPlusFormMapselector.vue
<script setup lang="ts">
const props = defineProps<{
  modelValue?: any
  field?: string
  desc?: any
  formData?: any
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
</script>

// 3. Use in formDesc
{ type: 'mapselector', label: '选择位置' }
```

**Key points:**
- Component name must be `ElPlusForm{TypeName}` (PascalCase)
- Must accept standard props: `modelValue`, `field`, `desc`, `formData`, `disabled`
- Must emit `update:modelValue`

## Pattern 8: Permission Control

```typescript
// 1. Configure auth function
app.use(elPlusCrud, {
  auth: (perm: string) => useUserStore().permissions.includes(perm)
})

// 2. Use auth on form fields (hides field if no permission)
const formDesc: IFormDesc = {
  name: { type: 'input', label: '姓名', auth: 'user:name' },
  salary: { type: 'nbinput', label: '薪资', auth: 'user:salary' }
}

// 3. Use auth on table columns (hides column if no permission)
const columns: Array<IColumnItem> = [
  { prop: 'name', label: '姓名', auth: 'user:name' },
  { prop: 'salary', label: '薪资', auth: 'user:salary' }
]

// 4. Use auth on action buttons
btns: [
  { label: '编辑', auth: 'user:edit', on: { click: handleEdit } },
  { label: '删除', auth: 'user:delete', on: { click: handleDelete } }
]
```

## Pattern 9: Extract Config to Separate Files

```
views/user/
├── UserPage.vue          # Component template only
├── config/
│   ├── formDesc.ts       # Form field descriptors
│   ├── tableConfig.ts    # Table configuration
│   └── api.ts            # API functions
└── composables/
    └── useUserCrud.ts    # Composable for CRUD logic
```

```typescript
// composables/useUserCrud.ts
export function useUserCrud() {
  const tableRef = ref()
  const showDialog = ref(false)
  const formData = ref({})

  const handleAdd = () => { formData.value = {}; showDialog.value = true }
  const handleEdit = (row: any) => { formData.value = { ...row }; showDialog.value = true }
  const handleDelete = async (id: string) => {
    await api.deleteById(id)
    tableRef.value.reload()
  }

  return { tableRef, showDialog, formData, handleAdd, handleEdit, handleDelete }
}
```

## Anti-Patterns

### FAIL: Rebuild formDesc on every render

```typescript
// FAIL: Creating new object every render triggers unnecessary re-computation
const getFormDesc = () => ({ name: { type: 'input', label: '名称' } })
```

### PASS: Define once, use reactive properties for dynamics

```typescript
const formDesc: IFormDesc = {
  name: { type: 'input', label: '名称', disabled: () => isEdit.value }
}
```

### FAIL: Put complex logic in template

```html
<!-- FAIL: Template should be declarative -->
<ElPlusForm v-if="mode === 'add' && !loading && hasPermission" ... />
```

### PASS: Control via configuration properties

```typescript
formDesc.name.vif = (formData) => mode.value === 'add' && hasPermission.value
```

## Best Practices

1. Extract `formDesc` / `tableConfig` into independent `.ts` files, import in component
2. Use composable functions (`useCrud.ts`) to encapsulate standard CRUD logic
3. Complex forms → use `ElPlusFormGroup` for sections; simple forms → use `ElPlusForm` directly
4. Decouple search from listing: `toolbar.formConfig` handles query, `tableConfig.fetch` handles request
5. Configure `ICRUDConfig` globally once in `main.ts` — never repeat upload/auth/format config per component
6. Use `tbName` on all business tables for column visibility persistence

## Related Skills

- `el-plus-crud-form` — all patterns involve formDesc configuration (indirect)
- `el-plus-crud-table` — all patterns involve tableConfig configuration (indirect)
- `el-plus-crud-config` — global configuration is prerequisite for all patterns (indirect)
