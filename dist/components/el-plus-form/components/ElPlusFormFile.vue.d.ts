declare const _default: import('vue').DefineComponent<
  {
    modelValue: {
      type: import('vue').PropType<IOssInfo[]>
    }
    field: {
      type: import('vue').PropType<string>
      required: true
    }
    loading: {
      type: import('vue').PropType<boolean>
    }
    desc: {
      type: import('vue').PropType<{
        [key: string]: any
      }>
      required: true
    }
    formData: {
      type: import('vue').PropType<{
        [key: string]: any
      }>
      required: true
    }
  },
  {},
  unknown,
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      modelValue: {
        type: import('vue').PropType<IOssInfo[]>
      }
      field: {
        type: import('vue').PropType<string>
        required: true
      }
      loading: {
        type: import('vue').PropType<boolean>
      }
      desc: {
        type: import('vue').PropType<{
          [key: string]: any
        }>
        required: true
      }
      formData: {
        type: import('vue').PropType<{
          [key: string]: any
        }>
        required: true
      }
    }>
  >,
  {},
  {}
>
export default _default
