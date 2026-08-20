/**
 * 列表查询状态快照缓存（内存级）
 *
 * 用于「列表页 -> 详情页 -> 返回」场景：返回时恢复筛选条件和分页，并自动重查最新数据。
 * 通过 popstate 识别「返回导航」：浏览器返回按钮 / router.back() 都会触发 popstate，
 * 菜单点击 / router.push 不会触发，从而实现「返回恢复、重进重置」。
 */

// 快照结构
export interface IQuerySnapshot {
  // 筛选表单数据
  form: Record<string, any>
  // 当前页码
  current: number
  // 每页条数
  size: number
  // 当前选中的Tab值（配置了tabConf时）
  tab?: string | number
  // 筛选表单折叠状态（可折叠时）
  collapsed?: boolean
  // 卡片/列表布局（DIYMain模式）
  layout?: string
}

// 各列表页的查询快照（key 由 cacheQuery 字符串或 tbName 提供）
const snapshotMap = new Map<string, IQuerySnapshot>()

// 快照上限，超出删最旧，防止长时间使用内存增长
const MAX_SNAPSHOT = 10

// 上次 popstate 触发时间戳（0 表示尚未触发过）
let lastPopstateAt = 0

// popstate 监听只安装一次
let isWatchPopstate = false

// 时间窗启发式：仅「popstate 后极短时间内挂载」视为返回导航，误判仅存在于
// 「无关返回后 300ms 内编程式 push 进入缓存列表」这类几乎不存在的序列；
// 需要绝对精确的业务可自行接入 router.afterEach 做方向判断
const BACK_NAV_WINDOW = 300

/**
 * 懒安装 popstate 监听（首次有缓存表格时调用）
 */
function watchPopstate() {
  if (isWatchPopstate || typeof window === 'undefined') return
  isWatchPopstate = true
  window.addEventListener('popstate', () => {
    lastPopstateAt = Date.now()
  })
}

/**
 * 判断本次组件挂载是否紧跟一次「返回导航」
 */
export function wasRecentBackNav() {
  return Date.now() - lastPopstateAt < BACK_NAV_WINDOW
}

/**
 * 等待返回导航确认。
 * 浏览器返回按钮：popstate 先于组件挂载触发（wasRecentBackNav 立即 true）；
 * vue-router 的 back() 是乐观导航：组件挂载先于 popstate 到达，需要等一小段时间确认。
 * 通过轮询常驻 popstate 监听维护的时间戳实现，不额外注册事件监听。
 * @param timeout 等待 popstate 的窗口（ms），超时判定为非返回导航
 */
export function waitForBackNav(timeout: number = 150): Promise<boolean> {
  watchPopstate()
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (wasRecentBackNav()) return Promise.resolve(true)
  const startAt = Date.now()
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      // 等待期间有 popstate 到达（乐观 back 的 popstate 晚于组件挂载）
      if (lastPopstateAt >= startAt) {
        clearInterval(timer)
        resolve(true)
      } else if (Date.now() - startAt >= timeout) {
        clearInterval(timer)
        resolve(false)
      }
    }, 10)
  })
}

/**
 * 读取快照
 * @param key
 */
export function getQuerySnapshot(key: string): IQuerySnapshot | undefined {
  return snapshotMap.get(key)
}

/**
 * 保存快照（列表页卸载时调用）
 * @param key
 * @param snapshot
 */
export function saveQuerySnapshot(key: string, snapshot: IQuerySnapshot) {
  watchPopstate()
  // 重复保存时先删再存，保证 Map 迭代顺序 = 使用顺序，便于淘汰最旧
  snapshotMap.delete(key)
  snapshotMap.set(key, snapshot)
  if (snapshotMap.size > MAX_SNAPSHOT) {
    const oldestKey = snapshotMap.keys().next().value
    if (oldestKey !== undefined) snapshotMap.delete(oldestKey)
  }
}

/**
 * 手动清除某个快照（比如业务希望强制重置时）
 * @param key
 */
export function clearQuerySnapshot(key: string) {
  snapshotMap.delete(key)
}
