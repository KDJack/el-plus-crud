# El-Plus-Curd 采用Vue3 + TS，封装的element-plus数据驱动表单、列表组件

# By K.D.Jack

# 项目环境要求

-NodeJs 版本：16.18.1

-代码格式化插件：prettier

# demo运行

```
yarn && yarn start
```

# 使用

## 1.安装依赖

```
npm i el-plus-crud -S
(or)
yarn add el-plus-crud -S
```

## 2.全局引入 (main.js)

```
...
import ElPlusCrud from 'el-plus-crud'
...

const crudConfig = {
// 全局配置...
}

// 全局Data数据
const globalData = reactive({

})

const formatData = reactive({
  // 全局format
})

...
app.use(ElPlusCrud, crudConfig, readonly(formatData), readonly(globalData))
...
```

## 3.vue引用

```
...
<ElPlusTable ref="listTableRef" :tableConfig="tableConfig"></ElPlusTable>
...

...
const listTableRef = ref()
const tableConfig = ref({
  // 远程列表查询
  fetch: () => {},
  // 列表-列配置
  column: [
    { prop: 'username', label: '账号' },
    { prop: 'nickname', label: '名称' },
    { prop: 'phone', label: '联系电话' },
    { prop: 'deptName', label: '所属部门' },
    { prop: 'remark', label: '备注' },
    { prop: 'createTime', label: '创建时间' },
    { prop: 'createBy', label: '创建人' },
    {
      label: '操作',
      fixed: 'right',
      type: 'btns',
      btns: [
        { label: '查看详情', on: {} },
        { label: '编辑', on: {} },
        {
          label: '删除',
          confirm: '确定要删除?',
          btnType: 'danger',
          on: {}
        }
      ]
    }
  ],
  // 固定查询条件
  queryMap: {},
  // 顶部工具栏
  toolbar: {
    // 功能按钮列表
    btns: [
      {
        label: '新增人员',
        type: 'add',
        on: {}
      }
    ],
    // 顶部查询表单
    formConfig: {
      beforeRequest: (data: any) => {
        if (data.deptId) {
          data.deptId = data.deptId[data.deptId.length - 1]
        }
        return data
      },
      formDesc: {
        nickname: { type: 'input', label: '输入查询', placeholder: '人员名称' },
        deptId: { type: 'cascader', label: '所属部门', options: deptOptions, attrs: { props: { value: 'id', label: 'name', children: 'children', checkStrictly: true } } },
        enabled: {
          type: 'select',
          label: '状态',
          options: [
            { label: '已禁用', value: 0 },
            { label: '已启用', value: 1 }
          ]
        }
      }
    }
  }
})
...
```

# TODO 接口文档
