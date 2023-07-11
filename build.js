var fs = require('fs')
const { join } = require('path')

var tempStr = "import ${name} from './components/el-plus-form/components/${name}.vue'\n"
var componentsPath = './lib/components/el-plus-form/components'

var fileStr = ''

let files = fs.readdirSync(componentsPath)
const compList = []

files.forEach(function (item) {
  let stat = fs.statSync(join(componentsPath, item))
  if (stat.isFile() === true && item.indexOf('.vue') >= 0) {
    compList.push(item.replace('.vue', ''))
  }
})

compList.map((name) => {
  fileStr += tempStr.replaceAll('${name}', name)
})
fileStr += '\nexport default [\n'
compList.map((name) => {
  fileStr += `   ${name},\n`
})

fileStr += '] as any[]'

// eslint-disable-next-line no-console
console.log(`写入components-list......`)
fs.writeFileSync('./lib/components-list.ts', fileStr)
