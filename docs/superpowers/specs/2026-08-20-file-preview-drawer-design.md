# file/upload 附件预览抽屉化设计

日期：2026-08-20
状态：已批准（方案评审通过）

## 背景与决策

`ElPlusFormFile` 与 `ElPlusFormUpload` 的非图片附件预览目前是 `window.open(previewUrl)` 新开浏览器窗口（previewUrl 通常指向 kkFileView）。改为抽屉（rtl）内嵌 iframe。

架构结论：**库内内置，无耦合问题**。`el-drawer` 是 Element Plus 自带组件，本库已依赖 element-plus 且已在用 `el-image-viewer`/`ElMessage` 等，不引入新依赖、不绑定业务实现。

已确认决策：

1. 抽屉内容 = iframe 嵌 previewUrl，库完全内置（不做业务侧接管钩子）
2. 图片维持全屏 `el-image-viewer` 不变
3. file + upload 同步改，逻辑收编公共子组件
4. 配置：`desc.previewDrawer?: boolean | { size?: string; title?: string }`，不传默认抽屉（size 40%），`false` 回退 `window.open`

## 实现

### 新组件 `lib/components/el-plus-form/components/FilePreviewDrawer.vue`

内部子组件，不进 components-list 全局注册。`el-drawer`（rtl、`with-header: false`、append-to-body、destroy-on-close）内嵌 iframe，无标题栏；iframe 全幅铺满抽屉（body 零内边距）；右上角悬浮操作条：文件名 + 「新窗口打开」按钮（iframe 被拒绝嵌套时的手动兜底，不做自动检测）+ 关闭按钮。

暴露 `openPreview(item, cfg)`：取址 `item.raw?.previewUrl || item.previewUrl`，缺失 `ElMessage.warning('暂无预览地址')`；`cfg === false` 回退 `window.open(url, '_blank', 'noopener,noreferrer')`；对象取 `size/title` 覆盖默认（size 默认 `40%`，title 默认文件名，再兜底「附件预览」）。

### 接入

- `ElPlusFormFile.handleCardClick` 非图片分支 → `previewDrawerRef.value?.openPreview(item, props.desc.previewDrawer)`
- `ElPlusFormUpload.handelPreview` 非图片分支同样替换（覆盖 el-upload 原生 onPreview 与 card 点击两个入口）

### 类型

`types/index.d.ts` `IDescItem` 增加 `previewDrawer?: boolean | { size?: string; title?: string }`。

## 验证

example 手动验证（非图片→抽屉、图片→viewer、false→新窗口、对象→size/title 生效、无 url→提示）+ `pnpm build` + `pnpm lint-fix`。
