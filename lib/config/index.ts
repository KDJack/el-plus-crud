export default {
  debug: false,
  size: 'default',
  storagePrefix: 'el-plus-crud_',
  form: {
    leng: {
      input: 20,
      textare: 500,
      nbinput: {
        min: 0,
        max: 999999999,
        precision: 0,
        controlsPosition: 'right'
      }
    }
  },
  upload: {
    type: 'minio',
    action: '',
    maxISize: 1024 * 1024 * 20,
    maxFSize: 1024 * 1024 * 20,
    minio: {
      action: '',
      getUploadUrl: () => {},
      doElUpload: () => {},
      getObjectAuthUrl: () => {}
    }
  }
} as ICRUDConfig
