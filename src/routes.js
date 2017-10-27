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
const lottery_limit = r => require.ensure([], () => r(require(开奖数据+'lottery-limit.vue')), 'lottery-data')
const lottery_test = r => require.ensure([], () => r(require(开奖数据+'lottery-test.vue')), 'lottery-data')
const manual_lottery = r => require.ensure([], () => r(require(开奖数据+'manual-lottery.vue')), 'lottery-data')




const Temporary = r => require.ensure([], () => r(require('./views/Temporary.vue')), 'Temporary')

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
const userlist = r => require.ensure([], () => r(require('./views/user-management/userlist.vue')), 'user-management')











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
        name: '威尼斯后台管理系统',
        iconCls: 'fa fa-dashboard',
        leaf: true,
        children: [
            { path: '/main', component: Main, name: '威尼斯后台管理系统', hidden: true },
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
            { path: '/business-flow/account_details', component: account_details, name: '帐变明细' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '开奖数据',
        iconCls: 'fa fa-building-o',
        children: [
            { path: '/temporary', component: Temporary, name: '重庆时时彩' },
            { path: '/temporary', component: Temporary, name: '香港六合彩' },
            { path: '/temporary', component: Temporary, name: '广西快三' },
            { path: '/temporary', component: Temporary, name: '时时快三' },
            { path: '/temporary', component: Temporary, name: '北京PK拾' },
            { path: '/temporary', component: Temporary, name: '幸运农场' },
            { path: '/temporary', component: Temporary, name: '澳门2分彩' },
            { path: '/temporary', component: Temporary, name: '急速六合彩' },
            { path: '/temporary', component: Temporary, name: '香港时时彩' },
            { path: '/temporary', component: Temporary, name: '暴力摩托' },
            { path: '/temporary', component: Temporary, name: '澳门快三' },
            { path: '/temporary', component: Temporary, name: '吉林快三' },
            { path: '/temporary', component: Temporary, name: '限额设置' },
            { path: '/temporary', component: Temporary, name: '开奖检测' },
            { path: '/temporary', component: Temporary, name: '手动开奖' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '玩法设置',
        iconCls: 'fa fa-clock-o',
        // leaf: true,
        children: [
            { path: '/temporary', component: Temporary, name: '玩法设置' },
            { path: '/temporary', component: Temporary, name: '动态设置赔率' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据统计',
        iconCls: 'fa fa-bar-chart-o',
        children: [
            { path: '/echarts', component: echarts, name: '统计概况' },
            { path: '/temporary', component: Temporary, name: '综合统计'},
            { path: '/temporary', component: Temporary, name: '投注内容排行'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-users',
        children: [
            { path: '/user-management', component: Temporary, name: '增加会员' },
            { path: '/user-management/userlist', component: userlist, name: '用户列表' },
            { path: '/user-management', component: Temporary, name: '银行信息' },
            { path: '/user-management', component: Temporary, name: '登录日志' },
            { path: '/user-management', component: Temporary, name: '账号充值' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理人员',
        iconCls: 'fa fa-user-circle',
        children: [
            { path: '/temporary', component: Temporary, name: '管理员列表' },
            { path: '/temporary', component: Temporary, name: '管理员登录日志' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '佣金管理',
        iconCls: 'fa fa-yen',
        children: [
            { path: '/temporary', component: Temporary, name: '代理佣金管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-desktop',
        children: [
            { path: '/temporary', component: Temporary, name: '公告中心' },
            { path: '/temporary', component: Temporary, name: '收款设置' },
            { path: '/temporary', component: Temporary, name: '网站设置' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '站内信管理',
        iconCls: 'fa fa-envelope-open-o',
        children: [
            { path: '/temporary', component: Temporary, name: '发信息' },
            { path: '/temporary', component: Temporary, name: '收件箱' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '客户关系管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/temporary', component: Temporary, name: '代理申请记录' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '编辑',
        iconCls: 'fa fa-edit',
        children: [
           { path: '/temporary', component: Temporary, name: '公告编辑'}
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
