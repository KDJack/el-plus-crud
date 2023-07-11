/**
 * pinia 类型定义
 */

/**
 * 用户角色
 */
declare interface IUserRoleItem {
  roleId: string
  roleName: string
  roleCode: string
  roleDesc: string
  // 	数据权限类型
  dsType: number
  dsScope: string
  createBy: string
  updateBy: string
  createTime: string
  updateTime: string
  // 删除标记,1:已删除,0:正常
  delFlag: 0 | 1
}

/**
 * 用户岗位
 */
declare interface IUserPostItem {
  postId: string
  postCode: string
  postName: string
  postSort: string
  remark: string
  createBy: string
  updateBy: string
  createTime: string
  updateTime: string
  // 删除标记,1:已删除,0:正常
  delFlag: 0 | 1
}

/**
 * 用户信息
 */
declare interface IUserInfo {
  userId: string
  username: string
  wxOpenid: string
  qqOpenid: string
  createTime: string
  updateTime: string
  // 删除标记,1:已删除,0:正常
  delFlag: 0 | 1
  // 锁定标记,0:正常,9:已锁定
  lockFlag: number
  phone: string
  avatar: Array<IOssInfo>
  // 所属部门
  deptId: string
  // 所属租户
  tenantId: string
  deptName: string
  roleList: Array<IUserRoleItem>
  postList: Array<IUserPostItem>
  nickname: string
  name: string
  email: string
}

// 用户信息
declare interface UserInfosState {
  userInfos: IUserInfo
}

// 路由缓存列表
declare interface KeepAliveNamesState {
  keepAliveNames: string[]
  cachedViews: string[]
}

// 后端返回原始路由(未处理时)
declare interface RequestOldRoutesState {
  requestOldRoutes: string[]
}

// TagsView 路由列表
declare interface TagsViewRoutesState<T = any> {
  tagsViewRoutes: T[]
  isTagsViewCurrenFull: Boolean
}

// 路由列表
declare interface RoutesListState<T = any> {
  isInit: boolean
  routesList: T[]
  isColumnsMenuHover: Boolean
  isColumnsNavHover: Boolean
}

// 布局配置
declare interface ThemeConfigState {
  themeConfig: {
    isDrawer: boolean
    primary: string
    topBar: string
    topBarColor: string
    isTopBarColorGradual: boolean
    menuBar: string
    menuBarColor: string
    menuBarActiveColor: string
    isMenuBarColorGradual: boolean
    columnsMenuBar: string
    columnsMenuBarColor: string
    isColumnsMenuBarColorGradual: boolean
    isColumnsMenuHoverPreload: boolean
    isCollapse: boolean
    isUniqueOpened: boolean
    isFixedHeader: boolean
    isFixedHeaderChange: boolean
    isClassicSplitMenu: boolean
    isLockScreen: boolean
    lockScreenTime: number
    isShowLogo: boolean
    isShowLogoChange: boolean
    isBreadcrumb: boolean
    isTagsview: boolean
    isBreadcrumbIcon: boolean
    isTagsviewIcon: boolean
    isCacheTagsView: boolean
    isSortableTagsView: boolean
    isShareTagsView: boolean
    isFooter: boolean
    isGrayscale: boolean
    isInvert: boolean
    isIsDark: boolean
    isWartermark: boolean
    wartermarkText: string
    tagsStyle: string
    animation: string
    columnsAsideStyle: string
    columnsAsideLayout: string
    layout: string
    isRequestRoutes: boolean
    globalTitle: string
    globalViceTitle: string
    globalViceTitleMsg: string
    globalI18n: string
    globalComponentSize: string
  }
}
