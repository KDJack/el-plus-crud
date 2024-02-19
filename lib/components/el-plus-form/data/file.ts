/**
 * 能够上传的图片类型
 */
export const imageTypes = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg']
/**
 * 能够上传的图片后缀名称
 */
export const imageSuffixes = ['.jpe', '.jpeg', '.jpg', '.gif', '.png']

/**
 * 能够上传的视频类型
 */
export const videoTypes = ['video/3gpp', 'video/mpeg', 'application/mp4', 'video/mp4', 'video/ogg', 'video/x-flv', 'video/x-msvideo']
/**
 * 能够上传的视频后缀名称
 */
export const videoSuffixes = ['.3gpp', '.mpeg', '.mpg', '.mp4', '.ogv', '.flv', '.avi']

/**
 * 能够上传的音频类型
 */
export const audioTypes = ['audio/x-wav', 'audio/x-ms-wma', 'audio/mp4', 'audio/mp3']
/**
 * 能够上传的音频后缀名称
 */
export const audioSuffixes = ['.wav', '.wma', '.mp4a', '.mp3']

/**
 * 能够上传的文档类型
 */
export const officeTypes = ['application/x-msaccess', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '	application/vnd.ms-powerpoint', 'application/vnd.ms-excel', '	application/msword', 'application/pdf', 'application/vnd.ms-works']
/**
 * 能够上传的文档后缀名称
 */
export const officeSuffixes = ['.mdb', '.docx', '.xlsx', '.pptx', '.ppt', '.xls', '.doc', '.pdf']

/**
 * 能够上传的文档类型
 */
export const textTypes = ['application/xml', 'application/x-sh', 'application/json', 'application/javascript', 'application/java-vm', 'application/java-archive', 'text/html', 'text/plain']
/**
 * 能够上传的文档后缀名称
 */
export const textSuffixes = ['.xml', '.sh', '.json', '.js', '.class', '.jar', 'html', '.txt', '.wdb', '.wps']

/**
 * 能够上传的文档类型
 */
export const otherTypes = ['application/x-rar-compressed', 'application/x-msdownload', 'application/x-font-woff', '	application/x-font-ttf', 'application/x-7z-compressed', '	application/vnd.android.package-archive', 'application/zip']
/**
 * 能够上传的文档后缀
 */
export const otherSuffixes = ['.rar', '.exe', '.woff', '.ttf', '.7z', '.apk', '.zip']

/**
 * 能够上传的文件类型
 */
export const fileTypes = [...imageTypes, ...videoTypes, ...audioTypes, ...officeTypes, ...textTypes, ...otherTypes]
/**
 * 能够上传的文件后缀
 */
export const fileSuffixes = [...imageSuffixes, ...videoSuffixes, ...audioSuffixes, ...officeSuffixes, ...textSuffixes, ...otherSuffixes]

/**
 * 文档后缀对应的类型
 */
export const suffixTypes = [
  { type: 'pdf', suffixes: ['.pdf'] },
  { type: 'txt', suffixes: ['.txt'] },
  { type: 'excel', suffixes: ['.xls', '.xlsx'] },
  { type: 'word', suffixes: ['.doc', '.docx'] },
  { type: 'ppt', suffixes: ['.ppt', '.pptx'] },
  { type: 'zip', suffixes: ['.zip', '.rar', '.7z'] }
]
