import { ICRUDConfig } from 'types'

export default {
  // 是否开始debug调试模式,目前主要时一些console信息打印
  debug: false,
  // element plus组件的size
  size: 'default',
  // 本地存储的key前缀
  storagePrefix: 'el-plus-crud_',
  // 表单相关配置
  form: {
    // 输入长度限制
    leng: {
      // input长度限制
      input: 20,
      // 文本域长度限制
      textare: 500,
      // 数字输入框限制信息
      nbinput: {
        // 最小数值
        min: 0,
        // 最大数值
        max: 999999999,
        // 小数位数
        precision: 0,
        // 是左右加减，还是 右侧的上下箭头 element plus number组件的属性
        controlsPosition: 'right'
      }
    },
    // 用户自定义form组件的名称,使用这个，全局注册的名字为el-plus-form-xxx，form中就可以使用xxx进行引入
    comList: [] as string[]
  },
  // 上传组件配置
  upload: {
    // 类型 minio 或者 七牛
    type: 'minio',
    // 上传路径
    action: '',
    // 上传图片最大限制
    maxISize: 1024 * 1024 * 20,
    // 上传文件最大限制
    maxFSize: 1024 * 1024 * 20,
    // minio配置 - 主要是私有部署的minio
    minio: {
      // 获取上传链接
      getUploadUrl: () => new Promise(() => {}),
      // 执行上传的方法
      doElUpload: () => new Promise(() => {}),
      // 获取上传文件的访问地址
      getObjectAuthUrl: () => new Promise(() => {})
    }
  }
} as ICRUDConfig
