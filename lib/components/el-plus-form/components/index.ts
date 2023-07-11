/**
 * 这里加载当前文件夹下的所有Vue组件
 */
const modulesFiles = import.meta.globEager('./*.vue')

const components: any[] = []
const typeList: String[] = []

// 递归
for (const file in modulesFiles) {
  const tempComponent = (modulesFiles[file] as any).default
  components.push(tempComponent)
  if (tempComponent.typeName) {
    typeList.push(tempComponent.typeName)
  }
}
export { components, typeList }
