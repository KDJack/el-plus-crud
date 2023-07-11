declare const _default: import('vue').DefineComponent<
  {
    modelValue: {
      type: import('vue').PropType<any>
    }
    field: {
      type: import('vue').PropType<string>
    }
    desc: {
      type: import('vue').PropType<IColumnItem>
      required: true
    }
    scope: {
      type: import('vue').PropType<{
        [key: string]: any
      }>
      required: true
    }
    size: {
      type: import('vue').PropType<string>
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
        type: import('vue').PropType<any>
      }
      field: {
        type: import('vue').PropType<string>
      }
      desc: {
        type: import('vue').PropType<IColumnItem>
        required: true
      }
      scope: {
        type: import('vue').PropType<{
          [key: string]: any
        }>
        required: true
      }
      size: {
        type: import('vue').PropType<string>
      }
    }>
  >,
  {},
  {}
>
export default _default
