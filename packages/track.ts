import { getTemplate, throttle } from './utils'
type TrackInfo = Record<string, any>
type anyMap = Record<string, any>
type Fn<V> = (...args: any[]) => V
export type FnMap = Record<string, Fn<any>>
export interface DirectiveBinding {
  name: string
  value?: any
  arg?: string
  oldArg?: string
  modifiers?: Record<string, boolean>
}
export class BuryPoint {
  defaultKey: string
  eventMap: anyMap
  getTrackConfig: Fn<Record<string, any>>
  // 构造函数，接收一个参数options，默认值为空对象
  constructor(options = {} as anyMap) {
    this.defaultKey = options.appId + '_track' || 'default'
    this.getTrackConfig = options.getTrackConfig || void 0
    this.eventMap = {}
  }

  // 请求埋点配置接口
  async getanyMay() {
    const resp = await this.getTrackConfig()
    this.eventMap = resp
  }

  // 组装当前埋点数据
  getTrackInfo(el: HTMLElement, binding: DirectiveBinding) {
    let { id, eventResource } = binding.value
    const { track } = el.dataset // 需要动态 eventRessource 数据时，需要从 el.dataset 中获取， 替换 eventResource
    if (track) {
      eventResource = track
    }
    // 埋点信息何必参数

    const trackInfo = Object.assign({}, getTemplate(), this.eventMap[id] || {})
    trackInfo.eventResource = eventResource
    return trackInfo
  }

  // 埋点事件绑定
  async handleBindEvent(
    el: HTMLElement,
    binding: DirectiveBinding,
  ): Promise<void> {
    if (!binding.value) {
      return
    }

    if (Object.keys(this.eventMap).length === 0) {
      await this.getanyMay()
    }

    const { id } = binding.value
    const { action } = this.eventMap[id]
    console.log('action: ', action)
    const trackInfo = this.getTrackInfo(el, binding)

    if (action === 'click')
    this.addClickTrigger(el, trackInfo, action)
  }

  // 添加点击事件/鼠标事件
  addClickTrigger(el: HTMLElement, trackInfo: TrackInfo, action: string):void {
    const clickHandler = () => {
      console.log('clickHandler: ', trackInfo)
      // 发送埋点数据
    }
      el.addEventListener(action,throttle(clickHandler, 3000), false)
  }
}
