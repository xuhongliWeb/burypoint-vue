'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// 返回埋点信息模板
function getTemplate() {
    return {
        eventTime: Date.now(),
        eventResource: '',
        eventModule: '',
        action: '',
    };
}
// 节流
function throttle(fn, delay = 200, immediate = false) {
    let timer = null, remaining = 0, previous = Date.now();
    return function (...args) {
        const now = Date.now();
        remaining = now - previous;
        if (remaining >= delay || immediate) {
            if (timer)
                clearTimeout(timer);
            fn.call(this, ...args);
            previous = now;
            immediate = false;
        }
        else {
            if (timer)
                return;
            timer = setTimeout(() => {
                fn.call(this, ...args);
                previous = Date.now();
            }, delay - remaining);
        }
    };
}

class BuryPoint {
    // 构造函数，接收一个参数options，默认值为空对象
    constructor(options = {}) {
        this.defaultKey = options.appId + '_track' || 'default';
        this.getTrackConfig = options.getTrackConfig || void 0;
        this.eventMap = {};
    }
    // 请求埋点配置接口
    getanyMay() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.getTrackConfig();
            this.eventMap = resp;
        });
    }
    // 组装当前埋点数据
    getTrackInfo(el, binding) {
        let { id, eventResource } = binding.value;
        const { track } = el.dataset; // 需要动态 eventRessource 数据时，需要从 el.dataset 中获取， 替换 eventResource
        if (track) {
            eventResource = track;
        }
        // 埋点信息何必参数
        const trackInfo = Object.assign({}, getTemplate(), this.eventMap[id] || {});
        trackInfo.eventResource = eventResource;
        return trackInfo;
    }
    // 埋点事件绑定
    handleBindEvent(el, binding) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!binding.value) {
                return;
            }
            if (Object.keys(this.eventMap).length === 0) {
                yield this.getanyMay();
            }
            const { id } = binding.value;
            const { action } = this.eventMap[id];
            console.log('action: ', action);
            const trackInfo = this.getTrackInfo(el, binding);
            if (action === 'click')
                this.addClickTrigger(el, trackInfo, action);
        });
    }
    // 添加点击事件/鼠标事件
    addClickTrigger(el, trackInfo, action) {
        const clickHandler = () => {
            console.log('clickHandler: ', trackInfo);
            // 发送埋点数据
        };
        el.addEventListener(action, throttle(clickHandler, 3000), false);
    }
}

// 导出一个默认对象
var index = {
    // 安装插件
    install(Vue, configs) {
        const Track = new BuryPoint(configs);
        Vue.directive('burypoint', {
            // 在绑定时执行
            beforeMount: function (el, binding) {
                Track.handleBindEvent(el, binding);
            },
        });
    },
};

module.exports = index;
