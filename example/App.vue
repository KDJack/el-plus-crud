<template>
  <el-config-provider :locale="zhCn">
    <div class="layout-padding">
      <!-- <ElPlusTable ref="listTableRef" :tableConfig="tableConfig" colMinWidth="100px" :isIndex="false" headerAlign="center"></ElPlusTable> -->

      <ElPlusFormGroup v-model="formData" :formGroup="formGroupConfig">
        <template #default0>default0插槽</template>
        <template #default1>default1插槽</template>
        <template #default2>default2插槽</template>
      </ElPlusFormGroup>
      {{ formData }}
    </div>
  </el-config-provider>
</template>

<script setup lang="ts" name="systemUser">
import { reactive, ref, onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElMessage } from 'element-plus'
import { IFormBack, IFormDesc, IFormGroupConfig, ITableConfig } from 'types'

let formData = reactive({
  name: '',
  transferField: [] as Array<string | number>,
  // ===== 上传字段初始回显数据（IOssInfo[]，用于演示卡片式回显）=====
  logo: [{ name: '企业Logo.png', url: 'https://picsum.photos/200/200', furl: 'https://picsum.photos/200/200', suffix: '.png', fsize: 524288, uid: 101 }],
  photos: [
    { name: '现场照片-01.jpg', url: 'https://picsum.photos/320/200', furl: 'https://picsum.photos/320/200', suffix: '.jpg', fsize: 1048576, uid: 102 },
    { name: '现场照片-02.jpg', url: 'https://picsum.photos/320/200', furl: 'https://picsum.photos/320/200', suffix: '.jpg', fsize: 819200, uid: 103 }
  ],
  contract: [{ name: '中标通知书.pdf', furl: 'https://example.com/中标通知书.pdf', suffix: '.pdf', fsize: 2411724, uid: 201 }],
  report: [{ name: '季度工作报告.docx', furl: 'https://example.com/季度工作报告.docx', suffix: '.docx', fsize: 1572864, uid: 202 }],
  budget: [{ name: '年度预算表.xlsx', furl: 'https://example.com/年度预算表.xlsx', suffix: '.xlsx', fsize: 655360, uid: 203 }],
  slides: [{ name: '项目汇报.pptx', furl: 'https://example.com/项目汇报.pptx', suffix: '.pptx', fsize: 3145728, uid: 204 }],
  archive: [{ name: '历史资料包.zip', furl: 'https://example.com/历史资料包.zip', suffix: '.zip', fsize: 11534336, uid: 205 }],
  readme: [{ name: '使用说明.txt', furl: 'https://example.com/使用说明.txt', suffix: '.txt', fsize: 2048, uid: 206 }],
  pdfDoc: [{ name: '合同正本.pdf', furl: 'https://example.com/合同正本.pdf', suffix: '.pdf', fsize: 8912896, uid: 207 }],
  oldImg: [{ name: '示例图.png', url: 'https://picsum.photos/200/200', furl: 'https://picsum.photos/200/200', suffix: '.png', fsize: 307200, uid: 301 }],
  oldFile: [{ name: '老风格文件.pdf', furl: 'https://example.com/老风格文件.pdf', suffix: '.pdf', fsize: 524288, uid: 302 }],
  // ===== file 只读展示字段初始数据（演示新圆角卡片样式：图片直接显示缩略图 + 非图片彩色类型徽标）=====
  fileImgs: [
    { name: '产品主图.jpg', url: 'https://picsum.photos/200/200', furl: 'https://picsum.photos/200/200', suffix: '.jpg', fsize: 102400, uid: 401 },
    { name: '细节图.png', url: 'https://picsum.photos/240/240', furl: 'https://picsum.photos/240/240', suffix: '.png', fsize: 204800, uid: 402 },
    { name: '场景图.jpeg', url: 'https://picsum.photos/280/280', furl: 'https://picsum.photos/280/280', suffix: '.jpeg', fsize: 153600, uid: 403 }
  ],
  fileMixed: [
    { name: '封面.jpg', url: 'https://picsum.photos/300/200', furl: 'https://picsum.photos/300/200', suffix: '.jpg', fsize: 51200, uid: 411 },
    { name: '设计方案.pdf', furl: 'https://example.com/设计方案.pdf', previewUrl: 'https://example.com/设计方案.pdf', suffix: '.pdf', fsize: 1843200, uid: 412 },
    { name: '报价单.xlsx', furl: 'https://example.com/报价单.xlsx', previewUrl: 'https://example.com/报价单.xlsx', suffix: '.xlsx', fsize: 327680, uid: 413 }
  ],
  fileDocs: [
    { name: '合同正本.pdf', furl: 'https://example.com/合同正本.pdf', previewUrl: 'https://example.com/合同正本.pdf', suffix: '.pdf', fsize: 1048576, uid: 421 },
    { name: '服务协议.docx', furl: 'https://example.com/服务协议.docx', previewUrl: 'https://example.com/服务协议.docx', suffix: '.docx', fsize: 262144, uid: 422 },
    { name: '物料清单.xlsx', furl: 'https://example.com/物料清单.xlsx', previewUrl: 'https://example.com/物料清单.xlsx', suffix: '.xlsx', fsize: 131072, uid: 423 },
    { name: '项目汇报.pptx', furl: 'https://example.com/项目汇报.pptx', previewUrl: 'https://example.com/项目汇报.pptx', suffix: '.pptx', fsize: 2097152, uid: 424 },
    { name: '源码包.zip', furl: 'https://example.com/源码包.zip', previewUrl: 'https://example.com/源码包.zip', suffix: '.zip', fsize: 5242880, uid: 425 },
    { name: 'README.txt', furl: 'https://example.com/README.txt', previewUrl: 'https://example.com/README.txt', suffix: '.txt', fsize: 4096, uid: 426 }
  ],
  fileEmpty: [],
  // 日期范围测试初始值（时间戳数组，组件 valueFormat 默认 'x'）
  dateRange: [new Date(2026, 1, 1).getTime(), new Date(2026, 1, 15).getTime()],
  monthRange: [new Date(2026, 0, 1).getTime(), new Date(2026, 5, 1).getTime()],
  yearRange: [new Date(2025, 0, 1).getTime(), new Date(2026, 0, 1).getTime()],
  // Tree 测试：独立模式预勾根节点 '1'（复现「全选→取消全选」后根节点残留），级联模式预勾两个叶子
  treeStrict: ['1'],
  treeCascade: ['1-1-1', '1-1-2']
} as any)

// Tree 测试数据：三层结构（根 → 子 → 叶），便于验证勾选/半选/全选
const treeOptions = [
  {
    id: '1',
    label: '系统管理',
    children: [
      {
        id: '1-1',
        label: '用户管理',
        children: [
          { id: '1-1-1', label: '新增用户' },
          { id: '1-1-2', label: '编辑用户' },
          { id: '1-1-3', label: '删除用户' }
        ]
      },
      {
        id: '1-2',
        label: '角色管理',
        children: [
          { id: '1-2-1', label: '新增角色' },
          { id: '1-2-2', label: '分配权限' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '内容管理',
    children: [
      { id: '2-1', label: '文章列表' },
      { id: '2-2', label: '分类管理' }
    ]
  }
]

// 示例无后端：模拟上传进度（每 200ms +20%，约 1s 完成），便于观察进度条与成功/失败状态
const mockUpload = (param: any) =>
  new Promise((resolve, reject) => {
    let percent = 0
    const timer = setInterval(() => {
      percent += 20
      param.onProgress?.({ percent })
      if (percent >= 100) {
        clearInterval(timer)
        // 演示失败态可改为：reject(new Error('mock fail'))
        resolve({})
      }
    }, 200)
  })
const formGroupConfig = ref({
  column: 2,
  // requestFn: () => {},
  beforeRequest: (data: any) => {
    // 打印日期范围拆分结果，验证 monthrange/yearrange 结束时间是否为当月/当年最后一秒
    console.log('[日期范围提交数据]', {
      date: [data.dateStartTime, data.dateEndTime],
      month: [data.monthStartTime, data.monthEndTime],
      year: [data.yearStartTime, data.yearEndTime]
    })
    console.log(data)
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
        name: { type: 'input', label: '名项目劳资负责资负责资负责人称', require: true, attrs: { maxlength: 30 } },
        contactsName: { type: 'input', label: '联系人', require: true, attrs: { maxlength: 20 } },
        contactsPhone: { type: 'select', label: '项目劳资负责资负责资负责人', options: [], tip: '带企业劳资负责人信息可修改' },
        _tempDelBtns: {
          type: 'btns',
          showLabel: false,
          btns: [
            {
              type: 'success',
              label: '成功',
              showLabel: false
            },
            {
              type: 'danger',
              label: '删除',
              showLabel: false,
              confirm: '确定要删除该点位？'
            }
          ]
        }
      } as IFormDesc
    },
    {
      title: '地址信息',
      formDesc: {
        // _area: { type: 'area', label: '所在地区', require: true },
        address: { type: 'input', label: '详细地址', require: true, attrs: { maxlength: 50 } }
      } as IFormDesc
    },
    {
      // column:3 —— 每个 group 可独立设列数（见 ElPlusFormGroup），一行排 3 个单图字段
      title: '图片上传（胶囊按钮 + 卡片回显）',
      column: 3,
      formDesc: {
        logo: { type: 'upload', label: '企业Logo', require: true, tip: '默认 card 新风格', uploadFn: mockUpload },
        banner: { type: 'upload', label: '横幅图', uploadFn: mockUpload, addText: '上传横幅', formatHint: '建议尺寸200*300 16:9 最大2M' },
        qrcode: { type: 'upload', label: '二维码', uploadFn: mockUpload },
        // colspan:3 跨满整行，演示多图 + 自定义按钮文案
        photos: { type: 'upload', label: '现场照片', multiple: true, limit: 5, colspan: 3, uploadFn: mockUpload, addText: '继续添加照片', formatHint: '最多 5 张' }
      } as IFormDesc
    },
    {
      title: '文件上传（多文件 + 跨列）',
      column: 2,
      formDesc: {
        contract: { type: 'upload', upType: 'file', label: '中标通知书', require: true },
        // colspan:2 跨满整行，演示多文件上传
        appendix: { type: 'upload', upType: 'file', label: '附件材料', multiple: true, limit: 5, colspan: 2, uploadFn: mockUpload, addText: '添加附件', formatHint: '单个不超过 10MB' }
      } as IFormDesc
    },
    {
      // 预设回显 + disabled：演示各类型彩色卡片图标，只读无删除按钮
      title: '文件类型图标全覆盖（彩色卡片图标）',
      column: 3,
      formDesc: {
        report: { type: 'upload', upType: 'file', label: 'Word 文档', disabled: true },
        budget: { type: 'upload', upType: 'file', label: 'Excel 表格', disabled: true },
        slides: { type: 'upload', upType: 'file', label: 'PPT 幻灯片', disabled: true },
        archive: { type: 'upload', upType: 'file', label: 'ZIP 压缩包', disabled: true },
        readme: { type: 'upload', upType: 'file', label: 'TXT 文本', disabled: true },
        pdfDoc: { type: 'upload', upType: 'file', label: 'PDF 文档', disabled: true }
      } as IFormDesc
    },
    {
      // listType 回退老风格，与上面 card 新风格同页对比
      title: '老风格对比（desc.listType 回退）',
      column: 2,
      formDesc: {
        oldImg: { type: 'upload', label: 'picture-card 缩略图', listType: 'picture-card', uploadFn: mockUpload },
        oldFile: { type: 'upload', upType: 'file', label: 'text 文件列表', listType: 'text' }
      } as IFormDesc
    },
    {
      // type:'file' 只读展示组件 —— 新圆角卡片样式（图片直接显示缩略图，非图片显示彩色类型徽标，点击图片可预览/文档可预览）
      title: '文件只读展示（file 圆角卡片样式）',
      column: 2,
      formDesc: {
        fileImgs: { type: 'file', label: '产品图片', colspan: 2 },
        fileMixed: { type: 'file', label: '图文混合', colspan: 2 },
        fileDocs: { type: 'file', label: '文档合集', colspan: 2 },
        fileEmpty: { type: 'file', label: '空数据示例' }
      } as IFormDesc
    },
    {
      title: '备注信息',
      formDesc: {
        remark: { type: 'textarea', label: '备注', colspan: 2, require: true }
      } as IFormDesc
    },
    {
      title: '穿梭框测试',
      formDesc: {
        // 用 {value, label} 数据结构：原本 el-transfer 读 item.key 会 undefined → 触发 label-as-value 告警
        // 验证 transferData 的 key 兜底（key: item.value）是否消除告警
        transferField: {
          type: 'transfer',
          label: '数据权限',
          colspan: 2,
          options: [
            { value: '1', label: '选项一' },
            { value: '2', label: '选项二' },
            { value: '3', label: '选项三' },
            { value: '4', label: '选项四' },
            { value: '5', label: '选项五' }
          ],
          attrs: { titles: ['全部', '已选'] }
        }
      } as IFormDesc
    },
    {
      title: '跨行布局(rowspan)',
      formDesc: {
        intro: { type: 'textarea', label: '简介', rowspan: 2, require: true },
        nick: { type: 'input', label: '昵称', require: true },
        mobile: { type: 'input', label: '手机', require: true }
      } as IFormDesc
    },
    {
      // 日期范围测试：验证 daterange / monthrange / yearrange 的显示格式与结束时间（最后一秒）
      title: '日期范围测试（daterange / monthrange / yearrange）',
      formDesc: {
        dateRange: { type: 'daterange', label: '日期范围', colspan: 2, require: true, propPrefix: 'date' },
        monthRange: { type: 'daterange', elType: 'monthrange', label: '月份范围', colspan: 2, require: true, propPrefix: 'month' },
        yearRange: { type: 'daterange', elType: 'yearrange', label: '年份范围', colspan: 2, require: true, propPrefix: 'year' }
      } as IFormDesc
    },
    {
      // Tree 测试：左侧独立模式（checkStrictly，父/子独立、无半选），右侧级联模式（默认）对比
      title: 'Tree 测试（勾选 / 半选 / 全选）',
      column: 2,
      formDesc: {
        treeStrict: {
          type: 'tree',
          label: '独立模式(checkStrictly)',
          colspan: 2,
          options: treeOptions,
          attrs: { checkStrictly: true, showCascadeSwitch: true, enableSearch: true, defaultExpandAll: true }
        },
        treeCascade: {
          type: 'tree',
          label: '级联模式(默认)',
          colspan: 2,
          options: treeOptions,
          attrs: { showCascadeSwitch: true, enableSearch: true, defaultExpandAll: true }
        }
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
