---
name: el-plus-crud
description: Vue 3 + Element Plus data-driven CRUD component library — entry skill for all components and configuration
version: 1.0.0
origin: el-plus-crud
tags: [vue3, element-plus, crud, data-driven, typescript]
---

# el-plus-crud — Data-Driven CRUD Component Library

el-plus-crud is a Vue 3 + TypeScript + Element Plus library for building CRUD interfaces through declarative configuration. Replace template code with `IFormDesc` / `ITableConfig` objects. Core idea: **data drives UI, configuration is code**.

## When to Activate

- User mentions "el-plus-crud", "ElPlusForm", "ElPlusTable", "ElPlusFormDialog", "ElPlusFormGroup"
- Building CRUD pages in a Vue 3 + Element Plus project
- User imports from `'el-plus-crud'`
- Writing IFormDesc, ITableConfig, ICRUDConfig types

## Core Concepts

### Data-Driven Architecture

Write JavaScript/TypeScript objects to describe UI — components render automatically. No template code needed for standard CRUD operations.

### Component Registration

```typescript
// main.ts
import elPlusCrud from 'el-plus-crud'
app.use(elPlusCrud, config, formatObj, globalDataObj)
```

Registers all components globally and injects four dependencies via `provide`:

| Inject Key | Type | Purpose |
|---|---|---|
| `defaultConf` | ICRUDConfig | Global configuration |
| `format` | `{ [key: string]: Function }` | Format functions for table columns |
| `globalData` | `{ [key: string]: Function }` | Global data for form options |
| `lodash` | `{ cloneDeep, debounce }` | Utility functions |

### Component Overview

| Component | Purpose | Core Prop | Typical Use |
|---|---|---|---|
| `ElPlusForm` | Data-driven form | `formDesc` (IFormDesc) | Create/edit forms, search bars |
| `ElPlusTable` | Data-driven table | `tableConfig` (ITableConfig) | List pages, data tables |
| `ElPlusFormDialog` | Dialog + form (supports both modes) | `formDesc` / `formGroup` + `tableRef` | Add/edit modals (flat or grouped) |
| `ElPlusFormGroup` | Multi-section form | `formGroup` (IFormGroupConfig) | Complex detail/edit pages |

### 40+ Form Field Types

Input (`input`, `number`, `password`, `textarea`), Selection (`select`, `radio`, `checkbox`, `switch`), Date (`date`, `daterange`, `datetime`), Upload (`upload`, `image`, `file`), Tree (`tree`, `tselect`, `cascader`), Display (`text`, `tag`, `status`, `link`), Advanced (`area`, `autocomplete`, `lkuser`, `formula`), and custom components.

## Code Examples

### Installation and Setup

```bash
npm install el-plus-crud
# or
pnpm add el-plus-crud
```

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import elPlusCrud from 'el-plus-crud'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(elPlusCrud, {
  debug: import.meta.env.DEV,
  size: 'default',
  upload: { type: 'minio', action: getUploadUrl, token: getToken }
}, {
  yuan: (val) => '¥' + (val / 100).toFixed(2)
}, {
  statusOptions: () => [{ l: '启用', v: 1 }, { l: '禁用', v: 0 }]
})
app.mount('#app')
```

### Complete CRUD Page

```html
<template>
  <div class="user-page">
    <ElPlusTable ref="tableRef" :tableConfig="tableConfig" />
    <ElPlusFormDialog
      v-model:show="showDialog"
      v-model="formData"
      :formDesc="formDesc"
      :requestFn="api.createUser"
      :updateFn="api.updateUser"
      :tableRef="tableRef"
      :title="formData.id ? '编辑用户' : '新增用户'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IFormDesc, ITableConfig } from 'el-plus-crud'
import * as api from './api'

const tableRef = ref()
const showDialog = ref(false)
const formData = ref({})

const formDesc: IFormDesc = {
  name:   { type: 'input', label: '姓名', required: true },
  phone:  { type: 'input', label: '手机号', rules: 'phone' },
  email:  { type: 'input', label: '邮箱', rules: 'email' },
  role:   { type: 'select', label: '角色', required: true, options: 'roleOptions' },
  status: { type: 'switch', label: '状态', default: 1 }
}

const tableConfig: ITableConfig = {
  tbName: 'user-list',
  fetch: api.getUserList,
  toolbar: {
    collapsible: true,
    formConfig: {
      formDesc: {
        keyword: { type: 'input', label: '关键词' },
        status:  { type: 'select', label: '状态', options: [{ l: '启用', v: 1 }, { l: '禁用', v: 0 }] }
      },
      column: 3,
      collapsedRows: 1
    },
    btns: [{ label: '新增', type: 'primary', on: { click: () => { formData.value = {}; showDialog.value = true } } }]
  },
  column: [
    { prop: 'name', label: '姓名', width: '120' },
    { prop: 'phone', label: '手机号', width: '130' },
    { prop: 'email', label: '邮箱' },
    { prop: 'role', label: '角色', width: '100' },
    { prop: 'status', label: '状态', width: '80', type: 'status' },
    {
      type: 'btns', label: '操作', width: '180', fixed: 'right',
      btns: [
        { label: '编辑', type: 'primary', text: true, on: { click: (row) => { formData.value = { ...row }; showDialog.value = true } } },
        { label: '删除', type: 'danger', text: true, confirm: '确定删除？', on: { click: (row) => api.deleteUser(row.id).then(() => tableRef.value.reload()) } }
      ]
    }
  ]
}
</script>
```

### Component Quick Reference

| Task | Component | Key Config |
|---|---|---|
| Simple form | `<ElPlusForm>` | `formDesc` + `requestFn` |
| Search bar | `<ElPlusForm isTable>` | `formDesc` + fixed `width` per field |
| Data table | `<ElPlusTable>` | `tableConfig.fetch` + `column` |
| Add/Edit dialog | `<ElPlusFormDialog>` | `formDesc` + `tableRef` |
| Grouped form dialog | `<ElPlusFormDialog>` | `formGroup` + `tableRef` |
| Multi-section form | `<ElPlusFormGroup>` | `formGroup.group[]` |

## Anti-Patterns

### FAIL: Manually register individual components

```typescript
// FAIL: Don't manually import and register
import ElPlusForm from 'el-plus-crud/lib/components/el-plus-form/ElPlusForm.vue'
app.component('ElPlusForm', ElPlusForm)
```

### PASS: Use plugin global registration

```typescript
import elPlusCrud from 'el-plus-crud'
app.use(elPlusCrud, config, formatObj, globalDataObj)
```

### FAIL: Hard-code form fields in template

```html
<!-- FAIL: Defeats the purpose of data-driven forms -->
<el-form-item label="姓名"><el-input v-model="form.name" /></el-form-item>
<el-form-item label="手机"><el-input v-model="form.phone" /></el-form-item>
```

### PASS: Use formDesc data-driven approach

```html
<ElPlusForm v-model="formData" :formDesc="formDesc" />
```

## Best Practices

1. Always register via `app.use()` with `ICRUDConfig` for global configuration
2. Use TypeScript — import types from `'el-plus-crud'` for full type safety
3. Extract `formDesc` and `tableConfig` into separate `.ts` files for reusability
4. Load the specific sub-skill for the component you're working with:
   - Form details → `el-plus-crud-form`
   - Table details → `el-plus-crud-table`
   - Dialog details → `el-plus-crud-dialog`
   - Group form details → `el-plus-crud-form-group`
   - Config/type details → `el-plus-crud-config`
   - Validation details → `el-plus-crud-validation`
   - Full CRUD patterns → `el-plus-crud-patterns`

## Related Skills

- `el-plus-crud-form` — form component details (indirect)
- `el-plus-crud-table` — table component details (indirect)
- `el-plus-crud-dialog` — dialog form details (indirect)
- `el-plus-crud-form-group` — grouped form details (indirect)
- `el-plus-crud-config` — configuration and type system (indirect)
- `el-plus-crud-validation` — validation rules (indirect)
- `el-plus-crud-patterns` — CRUD patterns and recipes (indirect)
