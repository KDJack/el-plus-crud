---
name: el-plus-crud-config
description: Configuration system and TypeScript types for el-plus-crud — ICRUDConfig, IFormDesc, ITableConfig, provide/inject dependency injection
version: 1.0.0
origin: el-plus-crud
tags: [vue3, element-plus, config, typescript, types, ioc]
---

# Configuration System & Types

el-plus-crud uses a three-layer configuration architecture: **Global Config** (`ICRUDConfig`, injected via `app.use`) → **Instance Props** (component-level) → **Descriptor Config** (`IFormDesc` / `ITableConfig`). All TypeScript types are defined in `types/index.d.ts`. Global config is propagated through Vue's `provide/inject` mechanism.

## When to Activate

- Configuring `ICRUDConfig` (the second argument of `app.use`)
- Importing TypeScript types (`IFormDesc`, `ITableConfig`, `IColumnItem`, etc.)
- Understanding what `provide/inject` injects globally
- Configuring global upload, auth, format, or globalData settings

## Core Concepts

### Three-Layer Configuration

```
┌─────────────────────────────────────────────┐
│ ICRUDConfig (Global, app.use)               │
│   debug, size, upload, auth, token, form... │
├─────────────────────────────────────────────┤
│ Component Props (Instance)                  │
│   modelValue, column, disabled, isDialog... │
├─────────────────────────────────────────────┤
│ Descriptor Config (Per-field/column)        │
│   IFormDesc / ITableConfig.column           │
└─────────────────────────────────────────────┘
```

### ICRUDConfig — Global Configuration

Injected via `app.use(elPlusCrud, config, format, globalData)`. Merge strategy: `deepMerge(defaultConf, config)`.

```typescript
interface ICRUDConfig {
  // Debug mode — enables console logging
  debug?: boolean
  // Element Plus component size
  size?: 'default' | 'small' | 'large'
  // localStorage key prefix (default: 'el-plus-crud_')
  storagePrefix?: string
  // Form settings
  form?: {
    leng?: {
      input?: number       // max input length (default: 20)
      textare?: number     // max textarea length (default: 500)
      nbinput?: { min?: number; max?: number; precision?: number; controlsPosition?: 'right' | '' }
    }
    linkUser?: { getUserList: IFetch<any>; deptListKey: string }
    // Custom component registration — register 'xxx' to use type: 'xxx'
    comList?: string[]
  }
  // Global fetchMap for all tables
  table?: IFetchTableMap
  // Upload configuration
  upload?: {
    type?: 'minio' | 'quniu' | 'aliyun'
    action?: string | ((data?: any) => string | Promise<any>)
    actionMap?: { actionKey?: string | string[]; nameKey?: string | string[]; uploadIdKey?: string | string[]; objectUrlKey?: string | string[] }
    maxISize?: number      // max image size (default: 20MB)
    maxFSize?: number      // max file size (default: 20MB)
    uploadFn?: (data?: Object) => Promise<any>
    token?: string | Object | ((data?: Object) => Promise<Object>)
    tokenKey?: string | string[]
    sign?: (uploadId: string) => Promise<any>
    signMap?: { objectUrlKey?: string | string[]; previewUrlKey?: string | string[] }
    sharding?: {}
  }
  // Auth token or getter
  token?: string | ((data?: any) => string)
  // Permission check function
  auth?: (data?: any) => boolean
}
```

### IFormDesc — Form Field Descriptors

Key = field name, value = `IFormDescItem`. This is the core of the data-driven form system.

```typescript
interface IFormDesc {
  [fieldName: string]: IFormDescItem
}

interface IFormDescItem {
  type?: string             // Component type: 'input', 'select', 'date', 'upload', etc.
  label?: string | ((data?) => string)
  default?: any             // Default value
  required?: boolean | Ref<boolean> | ((data?) => boolean)
  disabled?: boolean | Ref<boolean> | ((data?) => boolean)
  vif?: boolean | ((data?) => boolean)
  vshow?: boolean | ((data?) => boolean)
  rules?: string | Array<any>
  attrs?: object | ((data?) => object)
  options?: Array | Ref<Array> | (() => Array) | IFetch<Array> | string
  colspan?: number          // Span columns (24-grid)
  tip?: string | ((data?) => string)
  width?: string            // Fixed width (isTable mode)
  auth?: string             // Permission key
  style?: object | ((data?) => object)
  on?: { [event: string]: Function }
  // Date range keys
  propPrefix?: string
  startTimeKey?: string
  endTimeKey?: string
  // Other props pass through to underlying Element Plus component
  [key: string]: any
}
```

### ITableConfig — Table Configuration

```typescript
interface ITableConfig {
  tbName?: string            // Unique table name for column persistence
  fetch?: IFetch<any>        // Data request function
  fetchMap?: IFetchTableMap  // Response data mapping
  column?: Array<IColumnItem>
  toolbar?: ITableToolbar    // Search bar + action buttons + export
  tabConf?: ITableTabConf    // Tab radio-group
  queryMap?: any             // Extra query conditions
  explan?: IExplanConfig     // Row expand config
  summaryConf?: ISummaryConf // Summary row
  statistic?: IStatisticConfig
  maxHeight?: number
  tableAttr?: any            // Pass-through to el-table
}
```

### IColumnItem — Column Definition

```typescript
interface IColumnItem {
  prop?: string
  label?: string | ((data?) => string)
  type?: string              // 'btns' | 'image' | 'tag' | 'status' | 'link' | custom
  width?: string
  minWidth?: string
  fixed?: 'left' | 'right'
  align?: string
  format?: string | ((val?, row?) => string)
  vif?: boolean | ((data?) => boolean)
  children?: Array<IColumnItem>  // Multi-level headers
  btns?: Array<IColumnItem>      // Action buttons
  isRowSpan?: boolean
  isColSpan?: boolean
  rsProps?: Array<string>
  auth?: string
  [key: string]: any
}
```

### IFetchTableMap — Response Mapping

```typescript
interface IFetchTableMap {
  list?: string              // Data list key (default: 'records')
  page?: {
    total?: string           // Total count key (default: 'total')
    current?: string         // Current page key (default: 'current')
    pageSize?: string        // Page size key (default: 'pageSize')
  }
}
```

### Provide/Inject Dependencies

When `app.use(elPlusCrud, config, format, globalData)` is called, four values are provided:

| Inject Key | Type | Description |
|---|---|---|
| `'defaultConf'` | `ICRUDConfig` | Merged global configuration |
| `'format'` | `{ [key: string]: Function }` | Global format functions — referenced by `column.format` string |
| `'globalData'` | `{ [key: string]: Function }` | Global data — used when `options` is a string key |
| `'lodash'` | `{ cloneDeep, debounce }` | Utility functions |

### IOssInfo — Upload File Structure

```typescript
interface IOssInfo {
  id?: string; name?: string; furl?: string; mimeType?: string
  fsize?: number; suffix?: string; busId?: string; busType?: number
  url?: string; uid?: number; previewUrl?: string
  signUrl?: string; shareUrl?: string; uploadId?: string
}
```

## Code Examples

### Complete ICRUDConfig Setup

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import elPlusCrud from 'el-plus-crud'
import App from './App.vue'

// Global format functions — used by column.format = 'yuan'
const formatObj = {
  yuan: (val: number) => '¥' + (val / 100).toFixed(2),
  dateFormat: (val: string) => new Date(val).toLocaleDateString(),
  statusLabel: (val: number) => ['禁用', '启用'][val] || '未知'
}

// Global data — options referenced by string key
const globalDataObj = {
  statusOptions: () => [{ l: '启用', v: 1 }, { l: '禁用', v: 0 }],
  typeOptions: () => [{ l: '类型A', v: 'a' }, { l: '类型B', v: 'b' }]
}

const crudConfig: ICRUDConfig = {
  debug: import.meta.env.DEV,
  size: 'default',
  upload: {
    type: 'minio',
    action: () => api.getUploadUrl(),
    token: () => api.getToken(),
    sign: (uploadId) => api.getSignUrl(uploadId)
  },
  auth: (perm: string) => useUserStore().permissions.includes(perm),
  form: {
    leng: { input: 50, textare: 1000 },
    comList: ['custompicker']  // registers el-plus-form-custompicker
  }
}

const app = createApp(App)
app.use(ElementPlus)
app.use(elPlusCrud, crudConfig, formatObj, globalDataObj)
app.mount('#app')
```

### Using format in Table Columns

```typescript
// In tableConfig, column.format as string references formatObj keys
const columns: Array<IColumnItem> = [
  { prop: 'amount', label: '金额', format: 'yuan' },
  { prop: 'createTime', label: '日期', format: 'dateFormat' },
  { prop: 'status', label: '状态', format: 'statusLabel' }
]
```

### Using globalData for Options

```typescript
// options as string → fetched from globalData
const formDesc: IFormDesc = {
  status: { type: 'select', label: '状态', options: 'statusOptions' },
  type: { type: 'select', label: '类型', options: 'typeOptions' }
}
```

### TypeScript Type Imports

```typescript
import type {
  ICRUDConfig, IFormDesc, IFormDescItem, IFormConfig,
  IFormGroupConfig, ITableConfig, IColumnItem, ITableToolbar,
  IExportConfig, IFetch, IFetchTableMap, IOssInfo, IFormBack
} from 'el-plus-crud'
```

## Anti-Patterns

### FAIL: Skip ICRUDConfig entirely

```typescript
// FAIL: Upload, auth and other global features need ICRUDConfig
app.use(elPlusCrud)
```

### PASS: Provide at least basic configuration

```typescript
app.use(elPlusCrud, {
  debug: process.env.NODE_ENV === 'development',
  size: 'default',
  upload: { type: 'minio', action: getUploadUrl, token: getToken, sign: getSignUrl },
  auth: (perm) => store.getters.permissions.includes(perm)
}, formatObj, globalDataObj)
```

### FAIL: Repeat upload action in every field

```typescript
avatar: { type: 'upload', label: '头像', /* FAIL: repeated action */ action: '/api/upload', token: getToken },
logo: { type: 'upload', label: 'Logo', /* FAIL: repeated action */ action: '/api/upload', token: getToken }
```

### PASS: Configure once in ICRUDConfig.upload

```typescript
// main.ts — one-time global config
app.use(elPlusCrud, { upload: { action: '/api/upload', token: getToken } })

// formDesc — no repeated upload config
const formDesc = {
  avatar: { type: 'upload', label: '头像', upType: 'image' },
  logo: { type: 'upload', label: 'Logo', upType: 'image' }
}
```

## Best Practices

1. Extract `ICRUDConfig` into a dedicated file (e.g., `config/crud.ts`), differentiate by environment
2. Always use TypeScript type imports for complete type checking
3. Include common format functions in `formatObj` (currency, date, status labels) — referenced by `column.format` string keys
4. Store global dropdown options in `globalDataObj` — referenced by `options` string keys in formDesc
5. Configure `auth` function to enable field-level and button-level permission control via `auth` attribute

## Related Skills

This is a foundational skill — referenced directly by:
- `el-plus-crud-form` — uses IFormDesc, IFormDescItem types
- `el-plus-crud-table` — uses ITableConfig, IColumnItem, IFetchTableMap types
