 // 你的自定义通用埋点信息
 export const options = {
    appId: 'demo-app-id', // 你的应用ID
// 获取埋点配置信息函数，一般埋点都是支持系统配置，从接口取埋点配置，下面只是简单示范
    getTrackConfig
}

function getTrackConfig() {
    // 该函数必须return如下结构，eventId和action字段固定不可更改，其他随意
    return {
        // 该key对应后续自定义指令里面的id
        "home_button_click": {
            "eventId": "home_button_click",
            "action": "click"
        },
   
    }
}