/*@flow*/
'use strict'


/**
 * 和page 分开写是为了避免循环引用，所以这边需要记得保持key的一致性。
 */



export const pageConfig = {
    'TabView': {
        title: '资管无忧', hideBackBtn: true, gestureResponseDistance: 0.0001,direction: 'vertical',tintColor:'white'
    },
    'LoginView': {
        title: '登录', hideNavBar: true, gestureResponseDistance: 0.0001,
        direction: 'vertical'
    },
    "Financing":{title:'我要融资'},
    'Financed':{title:'我的融资'},
    "PersonCenter": {hideNavBar: true},
    "BaseWebView": {title: "加载中。。", gestureResponseDistance: 0.0001},
    "CourseInfoView": {title: "课程详情",},
    "LessonEvaluateView": {title: "课程评价",},
    "PersonInfo": {title: "设置",hideNavBar: false},
    "MyOrder": {title: "我的订单",},
    "Setting": {title: "设置",hideNavBar: false},
    "FindPwd": {title: "找回密码",},
    'Feedback': {title: "意见反馈",},
    "ClassRecord": {title: "课时流水",},
    "AlterPwd": {title: "修改密码",},
    "NickName": {title: "修改昵称",},
    "PhoneContacts": {title: "修改手机号",},
    'RegPhone': {title: '注册',hideNavBar: true},
    'Contribute': {title: '创意服务'},
    'Intro': {title: '介绍', hideNavBar: true, gestureResponseDistance: 100},
    'IdeaList': {title: '创意列表'},
    'iShowList': {title: '我的发布'},
    'iShowDetail': {title: ''},
    'Comment': {title: '评论'},
    'AddComment': {title: '写评论'},
    'Submit': {title: '选择类型'},
    'Normal': {title: '创意服务'},
    'iCommit': {title: '购买'},
    'iServe': {title: '我的服务'},
    'iPurchase': {title: ''},
    'iReply': {title: '回复'},
    'iRate': {title: '评价'},
    'introDetail': {title: '回复'},
    'About': {title: '关于我们'},
    'Home' : {title: "资管无忧",direction: 'vertical',hideNavBar:false},
    "Account" : {title:'账户信息'},
    "UserInfo" : {title:'个人信息'},
    "CreditInfo" : {title:'信用信息'},
    "AssetsInfo" : {title:"资产信息"},
    "AssetsList" : {title:"资产列表"},
    "FinanceDetail" : {title:"融资详情"},
    "GW":{title:"顾问",hideNavBar:true},
    "MSG":{title:"消息",hideNavBar:true},
    "ZG":{title:"顾问",hideNavBar:true},
    "WD":{title:"设置",hideNavBar:true},
}

export function config(key: string): Object {

    return {
        key: key,
        ...(pageConfig[key] || {title: key}),
    }
}

function defaultConfig() {
    return {}
}