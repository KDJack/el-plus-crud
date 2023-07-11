<template>
  <el-config-provider :locale="zhCn">
    <div class="layout-padding">
      <ElPlusTable ref="listTableRef" :tableConfig="tableConfig"></ElPlusTable>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts" name="systemUser">
import { reactive, ref, onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const listTableRef = ref()

const deptOptions = reactive([] as any[])
const tableConfig = ref({
  fetch: () => {},
  tbName: 'systemUserList',
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
  queryMap: {},
  toolbar: {
    // 功能按钮列表
    btns: [
      {
        label: '新增人员',
        type: 'add',
        on: {}
      }
    ],
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

onMounted(async () => {
  // 初始化部门列表
})
</script>
