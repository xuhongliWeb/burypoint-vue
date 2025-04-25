import { BuryPoint } from './track'
import { type DirectiveBinding } from './track'

// 导出一个默认对象
export default {
  // 安装插件
  install(Vue: any, configs: any) {
    const Track = new BuryPoint(configs)
    Vue.directive('burypoint', {
      // 在绑定时执行
      beforeMount: function (el: HTMLElement, binding: DirectiveBinding) {
        Track.handleBindEvent(el, binding)
      },
    })
  },
}
