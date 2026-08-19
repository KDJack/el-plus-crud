# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.125](https://github.com/KDJack/el-plus-crud/compare/v0.1.124...v0.1.125) (2026-08-19)


### Bug Fixes

* **form:** suffix 归一化补点（normalizeSuffix 单一来源），dotless 后缀（"png"）不再退化 FILE 图标、点击预览不再误判（file/upload 的 getFileType 与 isImageItem 三处）
* **form:** textSuffixes 中 html 补前导点，与全表口径一致（.html 此前不在 fileSuffixes 内）

### [0.1.124](https://github.com/KDJack/el-plus-crud/compare/v0.1.123...v0.1.124) (2026-08-15)


### Features

* **form:** file 组件附件卡片增加下载按钮 ([4c4dcc5](https://github.com/KDJack/el-plus-crud/commit/4c4dcc5090ea5b81bba804d790ff0acd0c080e1e))


### Bug Fixes

* **form:** 修复上传成功后仍误报「请上传」的校验时序问题 ([a4601a3](https://github.com/KDJack/el-plus-crud/commit/a4601a3b794d7f2b0cde9723554be16c8634c534))

### [0.1.123](https://github.com/KDJack/el-plus-crud/compare/v0.1.122...v0.1.123) (2026-08-15)


### Bug Fixes

* **form:** 修复 upload 父级 modelValue 为字符串时组件卸载报错 ([2ec5ada](https://github.com/KDJack/el-plus-crud/commit/2ec5ada477941c6748e9a952330522c0b0bad71a))
* **table:** size 默认不再硬编码 default，未配置时继承 EP 全局 size ([803760c](https://github.com/KDJack/el-plus-crud/commit/803760cb7b135887c63bdfd208eeaadd95acbf02))

### [0.1.122](https://github.com/KDJack/el-plus-crud/compare/v0.1.121...v0.1.122) (2026-08-14)


### Features

* **form:** 文件卡片支持横向排列并支持限宽配置 ([151d6c6](https://github.com/KDJack/el-plus-crud/commit/151d6c672d57bc1ab55dd436497087b2c5680ff3))

### [0.1.121](https://github.com/KDJack/el-plus-crud/compare/v0.1.120...v0.1.121) (2026-08-13)


### Bug Fixes

* **form:** 表单项内容默认顶部对齐 ([058873c](https://github.com/KDJack/el-plus-crud/commit/058873ca9abd852d370cbf7223bba4b2e35e1fef))

### [0.1.120](https://github.com/KDJack/el-plus-crud/compare/v0.1.119...v0.1.120) (2026-08-13)

### [0.1.119](https://github.com/KDJack/el-plus-crud/compare/v0.1.118...v0.1.119) (2026-08-12)


### Bug Fixes

* **form:** 修复 tree 组件 checkStrictly 模式下的全选/半选缺陷 ([bdcd0a8](https://github.com/KDJack/el-plus-crud/commit/bdcd0a805c52b01ce382b1626fde63aab4d07a16))

### [0.1.118](https://github.com/KDJack/el-plus-crud/compare/v0.1.117...v0.1.118) (2026-08-12)


### Bug Fixes

* **form:** 修复仅带 previewUrl 的图片/文件预览缺陷 ([6742553](https://github.com/KDJack/el-plus-crud/commit/6742553aa3bcda0c16913eab7a21702f40ef4d98))

### [0.1.117](https://github.com/KDJack/el-plus-crud/compare/v0.1.116...v0.1.117) (2026-08-12)


### Features

* **form:** file 组件改为圆角卡片样式，与 upload 卡片统一 ([9109043](https://github.com/KDJack/el-plus-crud/commit/9109043a62dc992e87744731749492e784c3e04b))

### [0.1.116](https://github.com/KDJack/el-plus-crud/compare/v0.1.115...v0.1.116) (2026-08-12)

### [0.1.115](https://github.com/KDJack/el-plus-crud/compare/v0.1.114...v0.1.115) (2026-08-12)


### Features

* **form:** textarea quickFill 支持函数式动态返回候选词 ([baba7b3](https://github.com/KDJack/el-plus-crud/commit/baba7b3aaea1a35d27e2d17d05a89c646563e6bc))
* **table:** 表头默认居中并支持左/右对齐 ([845ad80](https://github.com/KDJack/el-plus-crud/commit/845ad80a356d8b059adcc05d00b5f114021f76b2))

### [0.1.114](https://github.com/KDJack/el-plus-crud/compare/v0.1.113...v0.1.114) (2026-08-11)


### Bug Fixes

* **form:** daterange 支持 monthrange/yearrange 的起止时间与显示格式 ([d1a588d](https://github.com/KDJack/el-plus-crud/commit/d1a588daf64ad4b3dfc29621b0a43fb7126105e3))
* **form:** 修复上传组件图片预览与 base64 data URL 判定 ([7907779](https://github.com/KDJack/el-plus-crud/commit/79077793623169f64eaf7495eb35e5333c9461c8))

### [0.1.113](https://github.com/KDJack/el-plus-crud/compare/v0.1.112...v0.1.113) (2026-08-09)

### [0.1.112](https://github.com/KDJack/el-plus-crud/compare/v0.1.111...v0.1.112) (2026-08-08)

### [0.1.111](https://github.com/KDJack/el-plus-crud/compare/v0.1.110...v0.1.111) (2026-08-08)


### Bug Fixes

* **upload:** OSS 私有桶图片缩略图改取 objectUrl 修复裂图 ([364826a](https://github.com/KDJack/el-plus-crud/commit/364826a2a25697f896385e5ac028e2f24c3064ae))

### [0.1.110](https://github.com/KDJack/el-plus-crud/compare/v0.1.109...v0.1.110) (2026-08-08)

### [0.1.109](https://github.com/KDJack/el-plus-crud/compare/v0.1.108...v0.1.109) (2026-08-08)


### Features

* **upload:** 上传组件重设计为胶囊按钮+文件卡片式回显 ([3180125](https://github.com/KDJack/el-plus-crud/commit/318012577d75f2d8638c3c37e7145ad7482fb691))

### [0.1.108](https://github.com/KDJack/el-plus-crud/compare/v0.1.107...v0.1.108) (2026-08-08)


### Bug Fixes

* **form:** 弹窗表单宽度铺满父容器 ([03130c7](https://github.com/KDJack/el-plus-crud/commit/03130c7333ad39168cf6cef9d48ee22b2b1c1566))

### [0.1.107](https://github.com/KDJack/el-plus-crud/compare/v0.1.106...v0.1.107) (2026-08-07)


### Bug Fixes

* **form:** 修复 ElPlusFormBtn 默认插槽文字被隐藏 ([bd2f6c7](https://github.com/KDJack/el-plus-crud/commit/bd2f6c72e7c3819e1cc861807588a37527551ef1))
* **form:** 消除 el-checkbox label-as-value 弃用告警 ([9dbd79c](https://github.com/KDJack/el-plus-crud/commit/9dbd79c51e4d6559eae65be4011b86caef726cf8))

### [0.1.106](https://github.com/KDJack/el-plus-crud/compare/v0.1.105...v0.1.106) (2026-08-04)


### Bug Fixes

* **form:** transfer 保留原始字段以兼容自定义 key/label 字段名 ([ec0f1df](https://github.com/KDJack/el-plus-crud/commit/ec0f1dfcf5bf4e42580951d99c57621902a86abc))

### [0.1.105](https://github.com/KDJack/el-plus-crud/compare/v0.1.104...v0.1.105) (2026-08-04)


### Bug Fixes

* **form:** 修复 ElPlusFormTransfer 关闭弹框报错与 el-checkbox 弃用告警 ([6c89683](https://github.com/KDJack/el-plus-crud/commit/6c896837f480bd833f0d8544a1ce888dd0874932))

### [0.1.104](https://github.com/KDJack/el-plus-crud/compare/v0.1.103...v0.1.104) (2026-08-04)


### Bug Fixes

* **form:** 修复弹窗表单窄屏(<768)宽度未铺满问题 ([9bc9795](https://github.com/KDJack/el-plus-crud/commit/9bc979528ecb06688913d5b567a0d4e14f533b99))

### [0.1.103](https://github.com/KDJack/el-plus-crud/compare/v0.1.102...v0.1.103) (2026-08-03)


### Features

* **form:** 新增表单项 rowspan 纵向跨行支持 ([a2ac9d2](https://github.com/KDJack/el-plus-crud/commit/a2ac9d2212d8ed8942cf357c1c3ee7543a4a6596))

### [0.1.102](https://github.com/KDJack/el-plus-crud/compare/v0.1.101...v0.1.102) (2026-08-01)

### [0.1.101](https://github.com/KDJack/el-plus-crud/compare/v0.1.100...v0.1.101) (2026-08-01)

### [0.1.100](https://github.com/KDJack/el-plus-crud/compare/v0.1.99...v0.1.100) (2026-08-01)


### Bug Fixes

* **image:** 图片组件回显增加候选 URL 回退，修复 signUrl 失效破图 ([6f8bb31](https://github.com/KDJack/el-plus-crud/commit/6f8bb31dda2d5b7943f6d662a51f2d75c42955e7))

### [0.1.99](https://github.com/KDJack/el-plus-crud/compare/v0.1.98...v0.1.99) (2026-08-01)


### Features

* **textarea:** 新增可选快捷填充 quickFill 配置 ([efe63eb](https://github.com/KDJack/el-plus-crud/commit/efe63eb0f5dcb98b9d774d44ab7d8ad445b8254f))

### [0.1.98](https://github.com/KDJack/el-plus-crud/compare/v0.1.97...v0.1.98) (2026-07-23)

### [0.1.97](https://github.com/KDJack/el-plus-crud/compare/v0.1.96...v0.1.97) (2026-07-17)

### [0.1.96](https://github.com/KDJack/el-plus-crud/compare/v0.1.95...v0.1.96) (2026-07-17)

### [0.1.95](https://github.com/KDJack/el-plus-crud/compare/v0.1.94...v0.1.95) (2026-07-17)

### [0.1.94](https://github.com/KDJack/el-plus-crud/compare/v0.1.93...v0.1.94) (2026-07-16)


### Bug Fixes

* 表单校验失败时滚动到首个错误项 ([a6373f2](https://github.com/KDJack/el-plus-crud/commit/a6373f2b5fe2cc138030c9aaee366651d654292c))

### [0.1.93](https://github.com/KDJack/el-plus-crud/compare/v0.1.92...v0.1.93) (2026-07-15)

### [0.1.92](https://github.com/KDJack/el-plus-crud/compare/v0.1.91...v0.1.92) (2026-07-15)

### [0.1.91](https://github.com/KDJack/el-plus-crud/compare/v0.1.90...v0.1.91) (2026-07-13)

### [0.1.90](https://github.com/KDJack/el-plus-crud/compare/v0.1.89...v0.1.90) (2026-07-13)

### [0.1.89](https://github.com/KDJack/el-plus-crud/compare/v0.1.88...v0.1.89) (2026-07-13)

### [0.1.88](https://github.com/KDJack/el-plus-crud/compare/v0.1.87...v0.1.88) (2026-07-13)

### [0.1.87](https://github.com/KDJack/el-plus-crud/compare/v0.1.86...v0.1.87) (2026-07-13)

### [0.1.86](https://github.com/KDJack/el-plus-crud/compare/v0.1.85...v0.1.86) (2026-07-13)

### [0.1.85](https://github.com/KDJack/el-plus-crud/compare/v0.1.84...v0.1.85) (2026-07-06)

### [0.1.84](https://github.com/KDJack/el-plus-crud/compare/v0.1.83...v0.1.84) (2026-07-06)

### [0.1.83](https://github.com/KDJack/el-plus-crud/compare/v0.1.82...v0.1.83) (2026-07-06)

### [0.1.82](https://github.com/KDJack/el-plus-crud/compare/v0.1.81...v0.1.82) (2026-07-06)

### [0.1.81](https://github.com/KDJack/el-plus-crud/compare/v0.1.80...v0.1.81) (2026-07-06)

### [0.1.80](https://github.com/KDJack/el-plus-crud/compare/v0.1.79...v0.1.80) (2026-07-06)

### [0.1.79](https://github.com/KDJack/el-plus-crud/compare/v0.1.78...v0.1.79) (2026-07-06)

### [0.1.78](https://github.com/KDJack/el-plus-crud/compare/v0.1.77...v0.1.78) (2026-07-06)

### [0.1.77](https://github.com/KDJack/el-plus-crud/compare/v0.1.76...v0.1.77) (2026-07-06)

### [0.1.76](https://github.com/KDJack/el-plus-crud/compare/v0.1.75...v0.1.76) (2026-07-06)

### [0.1.75](https://github.com/KDJack/el-plus-crud/compare/v0.1.74...v0.1.75) (2026-07-06)

### [0.1.74](https://github.com/KDJack/el-plus-crud/compare/v0.1.73...v0.1.74) (2026-07-06)

### [0.1.73](https://github.com/KDJack/el-plus-crud/compare/v0.1.72...v0.1.73) (2026-07-06)

### [0.1.72](https://github.com/KDJack/el-plus-crud/compare/v0.1.71...v0.1.72) (2026-06-30)

### [0.1.71](https://github.com/KDJack/el-plus-crud/compare/v0.1.70...v0.1.71) (2026-06-30)

### [0.1.70](https://github.com/KDJack/el-plus-crud/compare/v0.1.69...v0.1.70) (2026-06-17)

### [0.1.69](https://github.com/KDJack/el-plus-crud/compare/v0.1.68...v0.1.69) (2026-06-17)

### [0.1.68](https://github.com/KDJack/el-plus-crud/compare/v0.1.67...v0.1.68) (2026-06-11)

### 0.1.67 (2026-06-11)


### Features

* ElPlusFormTree 组件增加搜索过滤功能 ([34fceba](https://github.com/KDJack/el-plus-crud/commit/34fceba836d54c41320a47e25a6a1331f26624fa))
* 使用 el-link 替代已废弃的 el-button type='text' ([1fdea8d](https://github.com/KDJack/el-plus-crud/commit/1fdea8d9e6dfcd8dcc52a6949c29f398f9ce8b05))
* 表单筛选区增加收起/展开功能 ([1293887](https://github.com/KDJack/el-plus-crud/commit/1293887ecf995e2bd96ef0feaa0466c601eecc5e))


### Bug Fixes

* 阻止 Tree 搜索框回车键触发表单提交 ([7b16d45](https://github.com/KDJack/el-plus-crud/commit/7b16d4589b6ab1a111652d7428474c56c86b4692))

### [0.1.66](https://github.com/KDJack/el-plus-crud/compare/v0.1.65...v0.1.66) (2026-01-20)

### [0.1.65](https://github.com/KDJack/el-plus-crud/compare/v0.1.64...v0.1.65) (2026-01-20)

### [0.1.64](https://github.com/KDJack/el-plus-crud/compare/v0.1.63...v0.1.64) (2026-01-20)

### [0.1.63](https://github.com/KDJack/el-plus-crud/compare/v0.1.62...v0.1.63) (2025-11-06)

### [0.1.62](https://github.com/KDJack/el-plus-crud/compare/v0.1.61...v0.1.62) (2025-06-03)

### [0.1.61](https://github.com/KDJack/el-plus-crud/compare/v0.1.60...v0.1.61) (2025-03-28)

### [0.1.60](https://github.com/KDJack/el-plus-crud/compare/v0.1.59...v0.1.60) (2025-01-20)

### [0.1.59](https://github.com/KDJack/el-plus-crud/compare/v0.1.52...v0.1.59) (2025-01-20)

### 0.1.58 (2024-10-16)

### [0.1.57](https://github.com/KDJack/el-plus-crud/compare/v0.1.56...v0.1.57) (2024-09-23)

### [0.1.56](https://github.com/KDJack/el-plus-crud/compare/v0.1.55...v0.1.56) (2024-09-18)

### [0.1.55](https://github.com/KDJack/el-plus-crud/compare/v0.1.54...v0.1.55) (2024-09-05)

### [0.1.54](https://github.com/KDJack/el-plus-crud/compare/v0.1.53...v0.1.54) (2024-08-30)

### [0.1.53](https://github.com/KDJack/el-plus-crud/compare/v0.1.52...v0.1.53) (2024-08-22)

### [0.1.52](https://github.com/KDJack/el-plus-crud/compare/v0.1.51...v0.1.52) (2024-08-22)

### [0.1.51](https://github.com/KDJack/el-plus-crud/compare/v0.1.50...v0.1.51) (2024-07-05)

### [0.1.50](https://github.com/KDJack/el-plus-crud/compare/v0.1.49...v0.1.50) (2024-07-04)

### [0.1.49](https://github.com/KDJack/el-plus-crud/compare/v0.1.48...v0.1.49) (2024-06-27)

### [0.1.46](https://github.com/KDJack/el-plus-crud/compare/v0.1.45...v0.1.46) (2024-06-16)

### [0.1.45](https://github.com/KDJack/el-plus-crud/compare/v0.1.14...v0.1.45) (2024-06-16)

### [0.1.44](https://github.com/KDJack/el-plus-crud/compare/v0.1.43...v0.1.44) (2024-05-24)

### [0.1.43](https://github.com/KDJack/el-plus-crud/compare/v0.1.42...v0.1.43) (2024-05-22)

### [0.1.42](https://github.com/KDJack/el-plus-crud/compare/v0.1.41...v0.1.42) (2024-05-16)

### [0.1.41](https://github.com/KDJack/el-plus-crud/compare/v0.1.40...v0.1.41) (2024-05-15)

### [0.1.40](https://github.com/KDJack/el-plus-crud/compare/v0.1.39...v0.1.40) (2024-05-15)

### [0.1.39](https://github.com/KDJack/el-plus-crud/compare/v0.1.38...v0.1.39) (2024-04-28)

### [0.1.38](https://github.com/KDJack/el-plus-crud/compare/v0.1.37...v0.1.38) (2024-04-26)

### [0.1.37](https://github.com/KDJack/el-plus-crud/compare/v0.1.36...v0.1.37) (2024-04-26)

### [0.1.36](https://github.com/KDJack/el-plus-crud/compare/v0.1.35...v0.1.36) (2024-04-26)

### [0.1.35](https://github.com/KDJack/el-plus-crud/compare/v0.1.34...v0.1.35) (2024-04-23)

### [0.1.34](https://github.com/KDJack/el-plus-crud/compare/v0.1.33...v0.1.34) (2024-04-23)

### [0.1.33](https://github.com/KDJack/el-plus-crud/compare/v0.1.32...v0.1.33) (2024-04-23)

### [0.1.32](https://github.com/KDJack/el-plus-crud/compare/v0.1.31...v0.1.32) (2024-04-23)

### [0.1.31](https://github.com/KDJack/el-plus-crud/compare/v0.1.30...v0.1.31) (2024-04-23)

### [0.1.30](https://github.com/KDJack/el-plus-crud/compare/v0.1.29...v0.1.30) (2024-04-23)

### [0.1.29](https://github.com/KDJack/el-plus-crud/compare/v0.1.28...v0.1.29) (2024-04-18)

### [0.1.28](https://github.com/KDJack/el-plus-crud/compare/v0.1.27...v0.1.28) (2024-04-17)

### [0.1.27](https://github.com/KDJack/el-plus-crud/compare/v0.1.26...v0.1.27) (2024-04-16)

### [0.1.26](https://github.com/KDJack/el-plus-crud/compare/v0.1.25...v0.1.26) (2024-04-16)

### [0.1.25](https://github.com/KDJack/el-plus-crud/compare/v0.1.24...v0.1.25) (2024-04-10)

### [0.1.24](https://github.com/KDJack/el-plus-crud/compare/v0.1.23...v0.1.24) (2024-04-08)

### [0.1.23](https://github.com/KDJack/el-plus-crud/compare/v0.1.22...v0.1.23) (2024-04-08)

### [0.1.22](https://github.com/KDJack/el-plus-crud/compare/v0.1.21...v0.1.22) (2024-04-03)

### [0.1.21](https://github.com/KDJack/el-plus-crud/compare/v0.1.20...v0.1.21) (2024-04-03)

### [0.1.20](https://github.com/KDJack/el-plus-crud/compare/v0.1.19...v0.1.20) (2024-03-28)

### [0.1.19](https://github.com/KDJack/el-plus-crud/compare/v0.1.18...v0.1.19) (2024-03-28)

### [0.1.18](https://github.com/KDJack/el-plus-crud/compare/v0.1.17...v0.1.18) (2024-03-27)

### [0.1.17](https://github.com/KDJack/el-plus-crud/compare/v0.1.16...v0.1.17) (2024-03-25)

### [0.1.16](https://github.com/KDJack/el-plus-crud/compare/v0.1.15...v0.1.16) (2024-03-21)

### [0.1.15](https://github.com/KDJack/el-plus-crud/compare/v0.1.14...v0.1.15) (2024-03-20)

### [0.1.14](https://github.com/KDJack/el-plus-crud/compare/v0.1.7...v0.1.14) (2024-03-16)

### [0.1.13](https://github.com/KDJack/el-plus-crud/compare/v0.1.12...v0.1.13) (2024-03-12)

### [0.1.12](https://github.com/KDJack/el-plus-crud/compare/v0.1.11...v0.1.12) (2024-03-06)

### [0.1.11](https://github.com/KDJack/el-plus-crud/compare/v0.1.10...v0.1.11) (2024-02-20)

### [0.1.10](https://github.com/KDJack/el-plus-crud/compare/v0.1.9...v0.1.10) (2024-02-02)

### [0.1.9](https://github.com/KDJack/el-plus-crud/compare/v0.1.8...v0.1.9) (2024-02-02)

### [0.1.8](https://github.com/KDJack/el-plus-crud/compare/v0.1.5...v0.1.8) (2024-02-02)

### [0.1.7](https://github.com/KDJack/el-plus-crud/compare/v0.1.6...v0.1.7) (2024-02-01)

### [0.1.6](https://github.com/KDJack/el-plus-crud/compare/v0.0.110...v0.1.6) (2024-02-01)

### [0.1.5](https://github.com/KDJack/el-plus-crud/compare/v0.1.4...v0.1.5) (2024-01-29)

### [0.1.4](https://github.com/KDJack/el-plus-crud/compare/v0.1.3...v0.1.4) (2024-01-26)

### [0.1.3](https://github.com/KDJack/el-plus-crud/compare/v0.1.2...v0.1.3) (2024-01-26)

### [0.1.2](https://github.com/KDJack/el-plus-crud/compare/v0.0.119...v0.1.2) (2024-01-25)

### [0.0.119](https://github.com/KDJack/el-plus-crud/compare/v0.0.118...v0.0.119) (2024-01-18)

### 0.0.118 (2024-01-18)

### [0.0.117](https://github.com/KDJack/el-plus-crud/compare/v0.0.116...v0.0.117) (2024-01-15)

### [0.0.116](https://github.com/KDJack/el-plus-crud/compare/v0.0.115...v0.0.116) (2024-01-04)

### [0.0.115](https://github.com/KDJack/el-plus-crud/compare/v0.0.114...v0.0.115) (2024-01-03)

### [0.0.114](https://github.com/KDJack/el-plus-crud/compare/v0.0.113...v0.0.114) (2024-01-02)

### [0.0.113](https://github.com/KDJack/el-plus-crud/compare/v0.0.112...v0.0.113) (2023-12-22)

### [0.0.112](https://github.com/KDJack/el-plus-crud/compare/v0.0.111...v0.0.112) (2023-12-21)

### [0.0.111](https://github.com/KDJack/el-plus-crud/compare/v0.0.109...v0.0.111) (2023-12-21)

### [0.0.110](https://github.com/KDJack/el-plus-crud/compare/v0.0.107...v0.0.110) (2023-12-05)

### [0.0.109](https://github.com/KDJack/el-plus-crud/compare/v0.0.108...v0.0.109) (2023-12-05)

### [0.0.108](https://github.com/KDJack/el-plus-crud/compare/v0.0.106...v0.0.108) (2023-12-01)

### [0.0.107](https://github.com/KDJack/el-plus-crud/compare/v0.0.104...v0.0.107) (2023-11-27)

### [0.0.106](https://github.com/KDJack/el-plus-crud/compare/v0.0.105...v0.0.106) (2023-11-27)

### [0.0.105](https://github.com/KDJack/el-plus-crud/compare/v0.0.103...v0.0.105) (2023-11-27)

### 0.0.104 (2023-11-23)

### [0.0.103](https://github.com/KDJack/el-plus-crud/compare/v0.0.102...v0.0.103) (2023-11-23)

### [0.0.102](https://github.com/KDJack/el-plus-crud/compare/v0.0.101...v0.0.102) (2023-11-23)

### [0.0.101](https://github.com/KDJack/el-plus-crud/compare/v0.0.100...v0.0.101) (2023-11-22)

### [0.0.100](https://github.com/KDJack/el-plus-crud/compare/v0.0.99...v0.0.100) (2023-11-15)

### [0.0.99](https://github.com/KDJack/el-plus-crud/compare/v0.0.98...v0.0.99) (2023-11-13)

### [0.0.98](https://github.com/KDJack/el-plus-crud/compare/v0.0.97...v0.0.98) (2023-11-10)

### [0.0.97](https://github.com/KDJack/el-plus-crud/compare/v0.0.96...v0.0.97) (2023-10-31)

### [0.0.96](https://github.com/KDJack/el-plus-crud/compare/v0.0.95...v0.0.96) (2023-10-17)

### [0.0.95](https://github.com/KDJack/el-plus-crud/compare/v0.0.94...v0.0.95) (2023-10-08)

### [0.0.94](https://github.com/KDJack/el-plus-crud/compare/v0.0.93...v0.0.94) (2023-09-28)

### [0.0.93](https://github.com/KDJack/el-plus-crud/compare/v0.0.92...v0.0.93) (2023-09-28)

### [0.0.92](https://github.com/KDJack/el-plus-crud/compare/v0.0.91...v0.0.92) (2023-09-27)

### [0.0.91](https://github.com/KDJack/el-plus-crud/compare/v0.0.90...v0.0.91) (2023-09-26)

### [0.0.90](https://github.com/KDJack/el-plus-crud/compare/v0.0.88...v0.0.90) (2023-09-26)

### [0.0.89](https://github.com/KDJack/el-plus-crud/compare/v0.0.88...v0.0.89) (2023-09-26)

### [0.0.88](https://github.com/KDJack/el-plus-crud/compare/v0.0.87...v0.0.88) (2023-09-25)

### [0.0.87](https://github.com/KDJack/el-plus-crud/compare/v0.0.86...v0.0.87) (2023-09-24)

### [0.0.86](https://github.com/KDJack/el-plus-crud/compare/v0.0.85...v0.0.86) (2023-09-24)

### [0.0.85](https://github.com/KDJack/el-plus-crud/compare/v0.0.84...v0.0.85) (2023-09-24)

### [0.0.84](https://github.com/KDJack/el-plus-crud/compare/v0.0.83...v0.0.84) (2023-09-22)

### [0.0.83](https://github.com/KDJack/el-plus-crud/compare/v0.0.82...v0.0.83) (2023-09-22)

### [0.0.82](https://github.com/KDJack/el-plus-crud/compare/v0.0.81...v0.0.82) (2023-09-19)

### [0.0.81](https://github.com/KDJack/el-plus-crud/compare/v0.0.80...v0.0.81) (2023-09-14)

### [0.0.80](https://github.com/KDJack/el-plus-crud/compare/v0.0.79...v0.0.80) (2023-09-14)

### [0.0.79](https://github.com/KDJack/el-plus-crud/compare/v0.0.78...v0.0.79) (2023-09-07)

### [0.0.78](https://github.com/KDJack/el-plus-crud/compare/v0.0.77...v0.0.78) (2023-09-06)

### [0.0.77](https://github.com/KDJack/el-plus-crud/compare/v0.0.76...v0.0.77) (2023-09-05)

### [0.0.76](https://github.com/KDJack/el-plus-crud/compare/v0.0.75...v0.0.76) (2023-09-05)

### [0.0.75](https://github.com/KDJack/el-plus-crud/compare/v0.0.74...v0.0.75) (2023-09-04)

### [0.0.74](https://github.com/KDJack/el-plus-crud/compare/v0.0.73...v0.0.74) (2023-09-04)

### [0.0.73](https://github.com/KDJack/el-plus-crud/compare/v0.0.72...v0.0.73) (2023-09-04)

### [0.0.72](https://github.com/KDJack/el-plus-crud/compare/v0.0.71...v0.0.72) (2023-09-01)

### [0.0.71](https://github.com/KDJack/el-plus-crud/compare/v0.0.70...v0.0.71) (2023-09-01)

### [0.0.70](https://github.com/KDJack/el-plus-crud/compare/v0.0.69...v0.0.70) (2023-09-01)

### [0.0.69](https://github.com/KDJack/el-plus-crud/compare/v0.0.68...v0.0.69) (2023-09-01)

### [0.0.68](https://github.com/KDJack/el-plus-crud/compare/v0.0.67...v0.0.68) (2023-09-01)

### [0.0.67](https://github.com/KDJack/el-plus-crud/compare/v0.0.65...v0.0.67) (2023-09-01)

### [0.0.66](https://github.com/KDJack/el-plus-crud/compare/v0.0.65...v0.0.66) (2023-09-01)

### [0.0.65](https://github.com/KDJack/el-plus-crud/compare/v0.0.64...v0.0.65) (2023-09-01)

### [0.0.64](https://github.com/KDJack/el-plus-crud/compare/v0.0.63...v0.0.64) (2023-08-31)

### [0.0.63](https://github.com/KDJack/el-plus-crud/compare/v0.0.62...v0.0.63) (2023-08-31)

### [0.0.62](https://github.com/KDJack/el-plus-crud/compare/v0.0.61...v0.0.62) (2023-08-29)

### [0.0.61](https://github.com/KDJack/el-plus-crud/compare/v0.0.60...v0.0.61) (2023-08-29)

### [0.0.60](https://github.com/KDJack/el-plus-crud/compare/v0.0.59...v0.0.60) (2023-08-28)

### [0.0.59](https://github.com/KDJack/el-plus-crud/compare/v0.0.58...v0.0.59) (2023-08-28)

### [0.0.58](https://github.com/KDJack/el-plus-crud/compare/v0.0.57...v0.0.58) (2023-08-28)

### [0.0.57](https://github.com/KDJack/el-plus-crud/compare/v0.0.54...v0.0.57) (2023-08-28)

### [0.0.56](https://github.com/KDJack/el-plus-crud/compare/v0.0.55...v0.0.56) (2023-08-27)

### [0.0.55](https://github.com/KDJack/el-plus-crud/compare/v0.0.52...v0.0.55) (2023-08-26)

### [0.0.54](https://github.com/KDJack/el-plus-crud/compare/v0.0.53...v0.0.54) (2023-08-25)

### [0.0.53](https://github.com/KDJack/el-plus-crud/compare/v0.0.52...v0.0.53) (2023-08-25)

### 0.0.52 (2023-08-25)

### [0.0.51](https://github.com/KDJack/el-plus-crud/compare/v0.0.50...v0.0.51) (2023-08-24)

### [0.0.50](https://github.com/KDJack/el-plus-crud/compare/v0.0.38...v0.0.50) (2023-08-21)

### [0.0.49](https://github.com/KDJack/el-plus-crud/compare/v0.0.48...v0.0.49) (2023-08-18)

### [0.0.48](https://github.com/KDJack/el-plus-crud/compare/v0.0.47...v0.0.48) (2023-08-18)

### [0.0.47](https://github.com/KDJack/el-plus-crud/compare/v0.0.46...v0.0.47) (2023-08-17)

### [0.0.46](https://github.com/KDJack/el-plus-crud/compare/v0.0.45...v0.0.46) (2023-08-17)

### [0.0.45](https://github.com/KDJack/el-plus-crud/compare/v0.0.44...v0.0.45) (2023-08-17)

### [0.0.44](https://github.com/KDJack/el-plus-crud/compare/v0.0.43...v0.0.44) (2023-08-16)

### [0.0.43](https://github.com/KDJack/el-plus-crud/compare/v0.0.42...v0.0.43) (2023-08-16)

### [0.0.42](https://github.com/KDJack/el-plus-crud/compare/v0.0.41...v0.0.42) (2023-08-16)

### 0.0.41 (2023-08-10)

### [0.0.40](https://github.com/KDJack/el-plus-crud/compare/v0.0.39...v0.0.40) (2023-08-08)

### [0.0.39](https://github.com/KDJack/el-plus-crud/compare/v0.0.35...v0.0.39) (2023-08-07)

### [0.0.38](https://github.com/KDJack/el-plus-crud/compare/v0.0.37...v0.0.38) (2023-08-05)

### 0.0.37 (2023-08-05)

### 0.0.36 (2023-08-05)

### [0.0.35](https://github.com/KDJack/el-plus-crud/compare/v0.0.34...v0.0.35) (2023-08-04)

### [0.0.34](https://github.com/KDJack/el-plus-crud/compare/v0.0.33...v0.0.34) (2023-08-03)

### [0.0.33](https://github.com/KDJack/el-plus-crud/compare/v0.0.32...v0.0.33) (2023-08-03)

### [0.0.32](https://github.com/KDJack/el-plus-crud/compare/v0.0.31...v0.0.32) (2023-08-03)

### [0.0.31](https://github.com/KDJack/el-plus-crud/compare/v0.0.30...v0.0.31) (2023-08-02)

### [0.0.30](https://github.com/KDJack/el-plus-crud/compare/v0.0.29...v0.0.30) (2023-08-02)

### [0.0.29](https://github.com/KDJack/el-plus-crud/compare/v0.0.28...v0.0.29) (2023-08-01)

### [0.0.28](https://github.com/KDJack/el-plus-crud/compare/v0.0.27...v0.0.28) (2023-07-28)

### [0.0.27](https://github.com/KDJack/el-plus-crud/compare/v0.0.26...v0.0.27) (2023-07-28)

### [0.0.26](https://github.com/KDJack/el-plus-crud/compare/v0.0.25...v0.0.26) (2023-07-27)

### [0.0.25](https://github.com/KDJack/el-plus-crud/compare/v0.0.24...v0.0.25) (2023-07-26)

### [0.0.24](https://github.com/KDJack/el-plus-crud/compare/v0.0.23...v0.0.24) (2023-07-20)

### [0.0.23](https://github.com/KDJack/el-plus-crud/compare/v0.0.22...v0.0.23) (2023-07-14)

### [0.0.22](https://github.com/KDJack/el-plus-crud/compare/v0.0.21...v0.0.22) (2023-07-14)

### [0.0.21](https://github.com/KDJack/el-plus-crud/compare/v0.0.20...v0.0.21) (2023-07-13)

### [0.0.20](https://github.com/KDJack/el-plus-crud/compare/v0.0.19...v0.0.20) (2023-07-13)

### [0.0.19](https://github.com/KDJack/el-plus-crud/compare/v0.0.18...v0.0.19) (2023-07-13)

### [0.0.18](https://github.com/KDJack/el-plus-crud/compare/v0.0.17...v0.0.18) (2023-07-13)

### [0.0.17](https://github.com/KDJack/el-plus-crud/compare/v0.0.16...v0.0.17) (2023-07-13)

### [0.0.16](https://github.com/KDJack/el-plus-crud/compare/v0.0.15...v0.0.16) (2023-07-13)

### [0.0.15](https://github.com/KDJack/el-plus-crud/compare/v0.0.14...v0.0.15) (2023-07-11)

### [0.0.14](https://github.com/KDJack/el-plus-crud/compare/v0.0.13...v0.0.14) (2023-07-11)

### 0.0.13 (2023-07-11)

### [0.0.12](https://github.com/KDJack/el-plus-crud/compare/v0.0.11...v0.0.12) (2023-07-10)

### [0.0.11](https://github.com/KDJack/el-plus-crud/compare/v0.0.10...v0.0.11) (2023-07-10)

### [0.0.10](https://github.com/KDJack/el-plus-crud/compare/v0.0.9...v0.0.10) (2023-07-10)

### [0.0.9](https://github.com/KDJack/el-plus-crud/compare/v0.0.8...v0.0.9) (2023-07-10)

### [0.0.8](https://github.com/KDJack/el-plus-crud/compare/v0.0.7...v0.0.8) (2023-07-10)

### [0.0.7](https://github.com/KDJack/el-plus-crud/compare/v0.0.6...v0.0.7) (2023-07-10)

### [0.0.6](https://github.com/KDJack/el-plus-crud/compare/v0.0.5...v0.0.6) (2023-07-10)

### [0.0.5](https://github.com/KDJack/el-plus-crud/compare/v0.0.4...v0.0.5) (2023-07-10)

### [0.0.4](https://github.com/KDJack/el-plus-crud/compare/v0.0.3...v0.0.4) (2023-07-10)

### [0.0.3](https://github.com/KDJack/el-plus-crud/compare/v0.0.2...v0.0.3) (2023-07-10)

### 0.0.2 (2023-07-10)
