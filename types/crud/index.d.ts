/**
 * 注册curd配置
 */
export interface ICRUDConfig {
  // 是否开始debug调试模式,目前主要时一些console信息打印
  debug?: boolean
  // element plus组件的size
  size?: 'default' | 'small' | 'large'
  // 本地存储的key前缀
  storagePrefix?: string
  // 表单相关配置
  form?: {
    // 输入长度限制
    leng?: {
      // input长度限制
      input?: number
      // 文本域长度限制
      textare?: number
      // 数字输入框限制信息
      nbinput?: {
        // 最小数值
        min?: number
        // 最大数值
        max?: number
        // 小数位数
        precision?: number
        // 是左右加减，还是 右侧的上下箭头 element plus number组件的属性
        controlsPosition?: 'right' | ''
      }
    }
    // 用户选择组件设置
    linkUser?: {
      // 获取用户列表的查询接口
      getUserList: IFetch<any>
      // 部门列表key
      deptListKey: string
    }
    // 用户自定义form组件的名称,使用这个，全局注册的名字为el-plus-form-xxx，form中就可以使用xxx进行引入
    comList?: string[]
  }
  // 上传组件配置
  upload?: {
    // 类型 minio 或者 七牛 / 阿里云 或者不填，不填则完全依赖 action
    type?: 'minio' | 'quniu' | 'aliyun'
    // 上传路径，也可以单独配置到子组件desc中
    action?: string | ((data?: any) => string | Promise<any>)
    // 如果action返回的值是对象的话，则按照以下map进行解析
    actionMap?: {
      // 获取文件上传地址的对象key，如果不在根级，则需使用数组的形式。如：data.xxx.action 就需要写为 ['data', 'xxx', 'action']
      actionKey?: string | Array<string>
      // 获取文件对象的名称key，如果不在根级，则需使用数组的形式。如：data.xxx.name 就需要写为 ['data', 'xxx', 'name']
      nameKey?: string | Array<string>
      // 获取文件上传id对象key，如果不在根级，则需使用数组的形式。如：data.xxx.uploadId 就需要写为 ['data', 'xxx', 'uploadId']
      uploadIdKey?: string | Array<string>
      // 获取文件对象的地址key，如果不在根级，则需使用数组的形式。如：data.xxx.objectUrl 就需要写为 ['data', 'xxx', 'objectUrl']
      objectUrlKey?: string | Array<string>
    }
    // 上传图片最大限制
    maxISize?: number
    // 上传文件最大限制
    maxFSize?: number
    // 真正的上传方法
    uploadFn?: (data?: Object) => Promise<any>
    // 获取上传的token信息
    token?: string | Object | ((data?: Object) => Promise<Object>)
    // 获取文件上传的token对象key，如果不在根级，则需使用数组的形式。如：data.xxx.token 就需要写为 ['data', 'xxx', 'token']
    tokenKey?: string | Array<string>
    // 获取文件访问签名-私有云或私有minio时必填
    sign?: (uploadId: string) => Promise<any>
    // 解析签名数据Map
    signMap?: {
      // 获取文件对象的地址key，如果不在根级，则需使用数组的形式。如：data.xxx.objectUrl 就需要写为 ['data', 'xxx', 'objectUrl']
      objectUrlKey?: string | Array<string>
      // 获取文件上传地址的对象key，如果不在根级，则需使用数组的形式。如：data.xxx.previewUrl 就需要写为 ['data', 'xxx', 'previewUrl']
      previewUrlKey?: string | Array<string>
    }
    // 分片配置
    sharding?: {
      // TODO
    }
  }
  // token 或者是 获取token 的方法
  token?: string | ((data?: any) => string)
  // 校验按钮权限方法
  auth?: (data?: any) => boolean
}
