declare module '@vueuse/core' {
  import { Ref, WritableComputedRef } from 'vue'
  export function useVModel<T>(props: any, key: string, emit: any): Ref<T>
  export function useVModel<T>(props: any, key: string, emit: any, options: { passive?: boolean; deep?: boolean }): WritableComputedRef<T>
}
