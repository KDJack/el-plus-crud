<template>
  <el-config-provider :locale="zhCn">
    <div class="layout-padding">
      <ElPlusTable ref="listTableRef" :tableConfig="tableConfig" colMinWidth="100px" :isIndex="false" headerAlign="center"></ElPlusTable>

      <ElPlusFormGroup v-model="formData" :formGroup="formGroupConfig">
        <template #default0>default0插槽</template>
        <template #default1>default1插槽</template>
        <template #default2>default2插槽</template>
      </ElPlusFormGroup>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts" name="systemUser">
import { reactive, ref, onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElMessage } from 'element-plus'
import { IFormBack, IFormDesc, IFormGroupConfig, ITableConfig } from 'types'

let formData = reactive({
  name: ''
} as any)
const formGroupConfig = ref({
  column: 2,
  // requestFn: () => {},
  beforeRequest: (data: any) => {
    return data
  },
  success: (formBack: IFormBack) => {
    ElMessage.success('保存成功~')
    // 表单回调
    formBack.callBack && formBack.callBack()
  },
  group: [
    {
      title: '基本信息',
      formDesc: {
        name: { type: 'input', label: '名称', require: true, attrs: { maxlength: 30 } },
        contactsName: { type: 'input', label: '联系人', require: true, attrs: { maxlength: 20 } },
        contactsPhone: { type: 'input', label: '联系电话', rules: 'phone', require: true }
      } as IFormDesc
    },
    {
      title: '地址信息',
      formDesc: {
        // _area: { type: 'area', label: '所在地区', require: true },
        address: { type: 'input', label: '详细地址', require: true, attrs: { maxlength: 50 } }
      } as IFormDesc
    },
    // {
    //   title: '文件上传',
    //   formDesc: {
    //     businessLicense: { type: 'upload', label: '营业执照', require: true, colspan: 2 },
    //     appendix: { type: 'upload', upType: 'file', label: '附件', multiple: true, require: true, colspan: 2 }
    //   } as IFormDesc
    // },
    {
      title: '备注信息',
      formDesc: {
        remark: { type: 'textarea', label: '备注', colspan: 2, require: true }
      } as IFormDesc
    }
  ]
} as IFormGroupConfig)

const tableConfig = ref({
  // fetch: queryDistributorPage,
  // tbName: 'goodsList',
  column: [
    { prop: 'distributorName', label: '二级企业名称', width: '120px', fixed: 'left' },
    { prop: 'distributorName', label: '经营主体', width: '160px', fixed: 'left' },
    {
      label: '合同执行',
      children: [
        {
          label: '采购业务',
          children: [
            {
              label: '本月发生',
              children: [
                { prop: 'goodsName', label: '数量（万吨）' },
                { prop: 'goodsName', label: '金额（万元）' }
              ]
            },
            {
              label: '本年累计数',
              children: [
                {
                  label: '上游供应',
                  children: [
                    { prop: 'goodsName', label: '区域' },
                    { prop: 'goodsName', label: '供应方性质' }
                  ]
                },
                {
                  label: '数量（万吨）',
                  children: [
                    { prop: 'goodsName', label: '数值' },
                    { prop: 'goodsName', label: '去年金额' },
                    { prop: 'goodsName', label: '同比' }
                  ]
                },
                {
                  label: '金额（万元）',
                  children: [
                    { prop: 'goodsName', label: '数值' },
                    { prop: 'goodsName', label: '去年金额' },
                    { prop: 'goodsName', label: '同比' }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '销售业务',
          children: [
            {
              label: '本月发生',
              children: [
                { prop: 'goodsName', label: '数量（万吨）' },
                { prop: 'goodsName', label: '金额（万元）' }
              ]
            },
            {
              label: '本年累计数',
              children: [
                {
                  label: '上游供应',
                  children: [
                    { prop: 'goodsName', label: '区域' },
                    { prop: 'goodsName', label: '供应方性质' }
                  ]
                },
                {
                  label: '数量（万吨）',
                  children: [
                    { prop: 'goodsName', label: '数值' },
                    { prop: 'goodsName', label: '去年金额' },
                    { prop: 'goodsName', label: '同比' }
                  ]
                },
                {
                  label: '金额（万元）',
                  children: [
                    { prop: 'goodsName', label: '数值' },
                    { prop: 'goodsName', label: '去年金额' },
                    { prop: 'goodsName', label: '同比' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: '财务数据',
      children: [
        {
          label: '营业收入',
          children: [
            {
              label: '本月发生',
              children: [
                { prop: 'goodsName', label: '数量（万吨）' },
                { prop: 'goodsName', label: '金额（万元）' }
              ]
            },
            {
              label: '本年累计数',
              children: [
                { prop: 'goodsName', label: '数量（万吨）' },
                { prop: 'goodsName', label: '金额（万元）' },
                { prop: 'goodsName', label: '去年金额' },
                { prop: 'goodsName', label: '同比' }
              ]
            }
          ]
        },
        {
          label: '营业成本',
          children: [
            {
              label: '本月发生',
              children: [
                { prop: 'goodsName', label: '数量（万吨）' },
                { prop: 'goodsName', label: '金额（万元）' }
              ]
            },
            {
              label: '本年累计数',
              children: [
                { prop: 'goodsName', label: '数量（万吨）' },
                { prop: 'goodsName', label: '金额（万元）' },
                { prop: 'goodsName', label: '去年金额' },
                { prop: 'goodsName', label: '同比' }
              ]
            }
          ]
        },
        {
          label: '业务毛利率',
          children: [
            { prop: 'goodsName', label: '数值' },
            { prop: 'goodsName', label: '去年数值' },
            { prop: 'goodsName', label: '同比' }
          ]
        },
        {
          label: '营业利润',
          children: [
            { prop: 'goodsName', label: '金额（万元）' },
            { prop: 'goodsName', label: '去年金额' },
            { prop: 'goodsName', label: '同比' }
          ]
        }
      ]
    },
    {
      label: '操作',
      fixed: 'right',
      type: 'btns',
      btns: []
    }
  ],
  queryMap: {},
  toolbar: {
    // 功能按钮列表
    btns: [{ label: '新增商品', type: 'add', on: { click: () => {} } }],
    formConfig: {
      beforeRequest: (data: any) => {
        if (data.goodsKinds) {
          data.goodsKinds = data.goodsKinds[data.goodsKinds.length - 1]
        }
        return data
      },
      formDesc: {
        searchKey: { type: 'input', label: '输入查询', placeholder: '物料编码、商品条码、商品名称、自编码、属性' }
        // enabled: { type: 'select', label: '状态', options: 'enabledList' }
      }
    }
    // 导出信息
    // export: { url: exportUrl, name: '商品信息导出' }
  }
} as ITableConfig)

onMounted(async () => {
  // 初始化部门列表
})
</script>
