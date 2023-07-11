// 引入图标
import doc from '../images/doc.svg'
import file from '../images/file.svg'
import jpg from '../images/jpg.svg'
import pdf from '../images/pdf.svg'
import png from '../images/png.svg'
import ppt from '../images/ppt.svg'
import xls from '../images/xls.svg'

export default file

// 图片后缀
export const imgSuffix = ['.png', '.jpg', '.gif', '.jpeg']

// 图标Map
export const iconMap = {
  '.doc': doc,
  '.docx': doc,
  '.jpg': jpg,
  '.jpeg': jpg,
  '.png': png,
  '.pdf': pdf,
  '.ppt': ppt,
  '.pptx': ppt,
  '.xls': ppt,
  '.xlsx': xls
}
