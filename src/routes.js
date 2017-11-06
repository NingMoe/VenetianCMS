import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

let 业务流水='./views/business-flow/',
    开奖数据='./views/lottery-data/',
    玩法设置='./views/play-setting/',
    数据统计='./views/data-statistics/',
    用户管理='./views/user-management/',
    管理人员='./views/manager/',
    佣金管理='./views/commissions/',
    系统设置='./views/system-setting/',
    站内信管理='./views/mail-management/',
    客户关系管理='./views/guest-relationship/',
    编辑='./views/editor/'



//业务流水
const withdraw_request = r => require.ensure([], () => r(require(业务流水+'withdraw-request.vue')), 'business-flow')
const recharge_record = r => require.ensure([], () => r(require(业务流水+'recharge-record.vue')), 'business-flow')
const general_bets = r => require.ensure([], () => r(require(业务流水+'general-bets.vue')), 'business-flow')
const account_details = r => require.ensure([], () => r(require(业务流水+'account-details.vue')), 'business-flow')

//开奖数据
const lottery1 = r => require.ensure([], () => r(require(开奖数据+'1.vue')), 'lottery-gather')
const lottery2 = r => require.ensure([], () => r(require(开奖数据+'2.vue')), 'lottery-gather')
const lottery3 = r => require.ensure([], () => r(require(开奖数据+'3.vue')), 'lottery-gather')
const lottery4 = r => require.ensure([], () => r(require(开奖数据+'4.vue')), 'lottery-gather')
const lottery5 = r => require.ensure([], () => r(require(开奖数据+'5.vue')), 'lottery-gather')
const lottery6 = r => require.ensure([], () => r(require(开奖数据+'6.vue')), 'lottery-gather')
const lottery7 = r => require.ensure([], () => r(require(开奖数据+'7.vue')), 'lottery-gather')
const lottery_limit = r => require.ensure([], () => r(require(开奖数据+'lottery-limit.vue')), 'lottery-data')
const lottery_test = r => require.ensure([], () => r(require(开奖数据+'lottery-test.vue')), 'lottery-data')
const manual_lottery = r => require.ensure([], () => r(require(开奖数据+'manual-lottery.vue')), 'lottery-data')
const preset_manage = r => require.ensure([], () => r(require(开奖数据+'preset-manage.vue')), 'lottery-data')

//玩法设置
const play_setting = r => require.ensure([], () => r(require(玩法设置+'index.vue')), 'play-setting')
const set_rate = r => require.ensure([], () => r(require(玩法设置+'set-rate.vue')), 'play-setting')

//数据统计
const survey = r => require.ensure([], () => r(require(数据统计+'survey.vue')), 'data-statistics')
const comprehensive = r => require.ensure([], () => r(require(数据统计+'comprehensive.vue')), 'data-statistics')
const risk = r => require.ensure([], () => r(require(数据统计+'risk.vue')), 'data-statistics')

//用户管理
const add_vip = r => require.ensure([], () => r(require(用户管理+'add-vip.vue')), 'data-statistics')
const user_lists = r => require.ensure([], () => r(require(用户管理+'user-lists.vue')), 'data-statistics')
const bank_info = r => require.ensure([], () => r(require(用户管理+'bank-info.vue')), 'data-statistics')
const login_log = r => require.ensure([], () => r(require(用户管理+'login-log.vue')), 'data-statistics')
const account_recharge = r => require.ensure([], () => r(require(用户管理+'account-recharge.vue')), 'data-statistics')

//管理人员
const manager_lists = r => require.ensure([], () => r(require(管理人员+'manager-lists.vue')), 'manager')
const manager_login_log= r => require.ensure([], () => r(require(管理人员+'manager-login-log.vue')), 'manager')

//佣金管理
const commissions= r => require.ensure([], () => r(require(佣金管理+'index.vue')), 'commissions')

//系统设置
const adv_center= r => require.ensure([], () => r(require(系统设置+'adv-center.vue')), 'system-setting')
const receivable_setting= r => require.ensure([], () => r(require(系统设置+'receivable-setting.vue')), 'system-setting')
const web_setting= r => require.ensure([], () => r(require(系统设置+'web-setting.vue')), 'system-setting')

//站内信管理
const mail_send= r => require.ensure([], () => r(require(站内信管理+'mail-send.vue')), 'mail-management')
const mail_outbox= r => require.ensure([], () => r(require(站内信管理+'mail-outbox.vue')), 'mail-management')

//客户关系管理
const guest_relationship= r => require.ensure([], () => r(require(客户关系管理+'index.vue')), 'guest-relationship')

//编辑
const editor= r => require.ensure([], () => r(require(编辑+'index.vue')), 'editor')

//测试
const Table = r => require.ensure([], () => r(require('./views/test/Table.vue')), 'test')
const user = r => require.ensure([], () => r(require('./views/test/user.vue')), 'test')
const Form = r => require.ensure([], () => r(require('./views/test/Form.vue')), 'test')
const Page4 = r => require.ensure([], () => r(require('./views/test/Page4.vue')), 'test')
const Page5 = r => require.ensure([], () => r(require('./views/test/Page5.vue')), 'test')
const Page6 = r => require.ensure([], () => r(require('./views/test/Page6.vue')), 'test')
const echarts = r => require.ensure([], () => r(require('./views/test/echarts.vue')), 'test')
const ttt = r => require.ensure([], () => r(require('./views/test/ttt.vue')), 'test')

//用户管理
const userlist = r => require.ensure([], () => r(require('./views/user-management/user-lists.vue')), 'user-management')






let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '后台管理系统',
        iconCls: 'fa fa-dashboard',
        leaf: true,
        children: [
            { path: '/main', component: Main, name: '后台管理系统', hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '业务流水',
        iconCls: 'fa fa-calendar',//图标样式class
        children: [
            { path: '/business-flow/withdraw-request', component: withdraw_request, name: '提现请求' },
            { path: '/business-flow/recharge_record', component: recharge_record, name: '充值记录' },
            { path: '/business-flow/general_bets', component: general_bets, name: '普通投注' },
            { path: '/business-flow/account_details', component: account_details, name: '账变明细' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '开奖数据',
        iconCls: 'fa fa-building-o',
        children: [
            { path: '/lottery-gather/lottery1', component: lottery1, name: '重庆时时彩' },
            { path: '/lottery-gather/lottery2', component: lottery2, name: '香港六合彩' },
            { path: '/lottery-gather/lottery3', component: lottery3, name: '北京PK拾' },
            { path: '/lottery-gather/lottery4', component: lottery4, name: '幸运农场' },
            { path: '/lottery-gather/lottery5', component: lottery5, name: '江苏骰宝' },                        
            { path: '/lottery-gather/lottery6', component: lottery6, name: '澳门2分彩' },
            { path: '/lottery-gather/lottery7', component: lottery7, name: '急速六合一' },
            { path: '/lottery-gather/lottery-limit', component: lottery_limit, name: '限额设置' },
            { path: '/lottery-gather/lottery-test', component: lottery_test, name: '开奖检测' },
            { path: '/lottery-gather/preset-manage', component: preset_manage, name: '预设管理模式' },                        
            { path: '/lottery-gather/manual-lottery', component: manual_lottery, name: '手动开奖' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '玩法设置',
        iconCls: 'fa fa-clock-o',
        // leaf: true,
        children: [
            { path: '/play-setting/play-setting', component: play_setting, name: '玩法设置' },
            { path: '/play-setting/set-rate', component: set_rate, name: '动态设置赔率' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据统计',
        iconCls: 'fa fa-bar-chart-o',
        children: [
            { path: '/data-statistics/survey', component: survey, name: '统计概况' },
            { path: '/data-statistics/comprehensive', component: comprehensive, name: '综合统计'},
            { path: '/data-statistics/risk', component: risk, name: '投注内容排行'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-users',
        children: [
            { path: '/user-management/add_vip', component: add_vip, name: '增加会员' },
            { path: '/user-management/user_lists', component: user_lists, name: '用户列表' },
            { path: '/user-management/bank_inof', component: bank_info, name: '银行信息' },
            { path: '/user-management/login_log', component: login_log, name: '登录日志' },
            { path: '/user-management/account_recharge', component: account_recharge, name: '账号充值' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理人员',
        iconCls: 'fa fa-user-circle',
        children: [
            { path: '/manager/manager_lists', component: manager_lists, name: '管理员列表' },
            { path: '/manager/manager_login_log', component: manager_login_log, name: '管理员登录日志' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '佣金管理',
        iconCls: 'fa fa-yen',
        children: [
            { path: '/commissions/index', component: commissions, name: '代理佣金管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-desktop',
        children: [
            { path: '/system-setting/adv_center', component: adv_center, name: '公告中心' },
            { path: '/system-setting/receivable_setting', component: receivable_setting, name: '收款设置' },
            { path: '/system-setting/web_setting', component: web_setting, name: '网站设置' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '站内信管理',
        iconCls: 'fa fa-envelope-open-o',
        children: [
            { path: '/mail-management/mail_send', component: mail_send, name: '发信息' },
            { path: '/mail-management/mail_outbox', component: mail_outbox, name: '收件箱' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '客户关系管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/guest-relationship/index', component: guest_relationship, name: '代理申请记录' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '编辑',
        iconCls: 'fa fa-edit',
        children: [
           { path: '/editor/index', component: editor, name: '公告编辑'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '测试',
        iconCls: 'fa fa-paper-plane',
        children: [
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: 'user' },
            { path: '/page4', component: Page4, name: 'Page4' },
            { path: '/page5', component: Page5, name: 'Page5' },
            { path: '/page6', component: Page6, name: 'Page6' },
            { path: '/echarts', component: echarts, name: 'echarts' },
            { path: '/ttttttt', component: ttt, name: 'ttt' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
