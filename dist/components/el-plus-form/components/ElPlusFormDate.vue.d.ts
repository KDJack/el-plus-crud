declare const _default: import('vue').DefineComponent<
  {
    modelValue: {
      type: import('vue').PropType<string | number | null>
    }
    field: {
      type: import('vue').PropType<string>
      required: true
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
  'update:modelValue'[],
  'update:modelValue',
  import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      modelValue: {
        type: import('vue').PropType<string | number | null>
      }
      field: {
        type: import('vue').PropType<string>
        required: true
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
  > & {
    'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined
  },
  {},
  {}
>
export default _default
