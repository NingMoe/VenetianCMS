/**
 * Created by isr on 2017/7/27.
 */
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
// export const base = 'https://lottery.d1.t1.wxuny.com';
export const base = 'https://lottery.wns.52jbp.com';
// export const base = 'http://47.93.1.21';
Promise.stop = function() {
  return new Promise(() => { console.log('----') })
}

// request拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  // config.headers.Authorization = localStorage.getItem('token');

  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  config.headers = {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
})


axios.interceptors.response.use(response => {
  const data = response.data;
  const errorMsg = data.message;
  if (data.exception) {
    response.status = 500;
    switch (data.exception) {
      case 200:
        // return response;
        break
      case 401:
        break;
      case 404:
        break;
      case 500:
        break;
    }
    Message({
      message: errorMsg,
      type: 'error',
      duration: 5 * 1000
    });
    // debugger
    return Promise.reject(new Error(''));
  } else {
    return response;
  }
}, () => {
  Message({
    message: '网络错误',
    type: 'error',
    duration: 5 * 1000
  });
  // 对返回的错误信息进行处理
  // debugger
  return Promise.reject(new Error(''));
});

/**
 * 提现请求
 * @param params
 */
// https://api.cp.52jbp.com/Manager1Open/withdrawList.html
// form data data:{"user_name":"fff","interval":["2017-07-04","2017-07-04"],"limit":"0,5","hasPass":0,"code":"-1"}
export const drawRequest = params => axios.get(`${base}/withdraw?${qs.stringify(params)}`).then(res => res.data)

/**
 * 提现审核
 * @param params params
 */
export const handleDrawRequest = params => axios.put(`${base}/withdraw/${params.id}?code=${params.code}`).then(res => res.data)

export const login = params => axios.post(`${base}/auth?${qs.stringify(params)}`, '', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(res => res.data);

/**
 * 分页获取充值记录
 * @param params 查询参数
 */
export const pagingRecharge = params => axios.get(`${base}/recharge?${qs.stringify(params)}`).then(res => res.data)

/**
 * 驳回提现请求
 * @param params
 */
export const handleRecharge = params => axios.put(`${base}/recharge/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 分页获取普通投注记录
 * @param params params
 */
export const pagingGeneralBets = params => axios.get(`${base}/ticket?${qs.stringify(params)}`).then(res => res.data)

/**
 * 撤单
 * @param params params
 */
export const withdrawals = params => axios.put(`${base}/ticket/${params.id}?${qs.stringify(params)}`).then(res => res.data)
/**
 * 分页获取账号详情
 * @param params
 */
export const pagingAccountDetail = params => axios.get(`${base}/accountchange?${qs.stringify(params)}`).then(res => res.data)

/**
 * 分页获取用户信息
 * @param params
 */
export const pagingUser = params => axios.get(`${base}/user?${qs.stringify(params)}`).then(res => res.data)

/**
 * 更新用户状态
 * @param params params
 */
export const updateUser = params => axios.put(`${base}/user/${params.id}/${params.status}`).then(res => res.data)

/**
 * 更新用户信息
 * @param params params
 */
export const updateUserInfo = params => axios.put(`${base}/user/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 踢用户下线
 * @param params params
 */
export const offlineUser = params => axios.put(`${base}/kickout/${params.id}`).then(res => res.data)

/**
 * 分页获取银行信息
 * @param params params
 */
export const pagingBankInfo = params => axios.get(`${base}/bankInfo?${qs.stringify(params)}`).then(res => res.data)

/**
 * 分页获取登录日志
 * @param params params
 */
export const pagingLoginLog = params => axios.get(`${base}/loginlog?${qs.stringify(params)}`).then(res => res.data)


/**
 * 分页获取登录日志
 * @param params params
 */
export const pagingManagerLoginLog = params => axios.get(`${base}/managerloginlog?${qs.stringify(params)}`).then(res => res.data)



/**
 * 操作日志
 * @param params params
 */
export const pagingOptionLog = params => axios.get(`${base}/operationList?data=${JSON.stringify(params)}`).then(res => res.data)

/**
 * 分页获取综合统计信息
 * @param params params
 */
export const pagingIntegrativeStatistics = params => axios.get(`${base}/financial?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取单个用户统计信息
 * @param params params
 */
export const integrativeStatistics = params => axios.get(`${base}/financial/${params.id}`).then(res => res.data)

/**
 * 分页获取接收的信息
 * @param params params
 */
export const pagingInbox = params => axios.get(`${base}/mail/inbox?data=${JSON.stringify(params)}`).then(res => res.data)

/**
 * 分页获取发送的信息
 * @param params params
 */
export const pagingOutbox = params => axios.get(`${base}/message/outbox?${qs.stringify(params)}`).then(res => res.data)

/**
 * 分页获取代理申请记录
 * @param params params
 */
export const pagingRelationship = params => axios.get(`${base}/referrerapplication?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取系统动态赔率数据
 */
export const getGlobalSetting = () => axios.get(`${base}/config/odds`).then(res => res.data);

/**
 * 修改系统动态赔率数据
 * @param params params
 */
export const updateGlobalSetting = params => axios.put(`${base}/config/odds?${qs.stringify(params)}`).then(res => res.data);

/**
 * 更新银行信息
 * @param params params
 */
export const updateBankInfo = params => axios.put(`${base}/bankinfo/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取管理员列表
 */
export const pagingManager = () => axios.get(`${base}/manager`).then(res => res.data)

/**
 * 添加管理员
 * @param params params
 */
export const addManager = params => axios.post(`${base}/manager?${qs.stringify(params)}`).then(res => res.data)

/**
 * 修改管理员密码
 * @param params 管理员信息
 */
export const updateManager = params => axios.put(`${base}/manager/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 删除管理员
 * @param  params 管理员id
 */
export const deleteManager = params => axios.delete(`${base}/manager/${params}`).then(res => res.data)

/**
 * 分页获取系统公告
 * @param params page info
 */
export const pagingNotice = params => axios.get(`${base}/notice?${qs.stringify(params)}`).then(res => res.data)

/**
 * 添加系统公告
 * @param params 公告信息
 */
export const addNotice = params => axios.post(`${base}/notice?${qs.stringify(params)}`).then(res => res.data)

/**
 * 修改系统公告
 * @param params 公告信息
 */
export const updateNotice = params => axios.put(`${base}/notice/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 删除系统公告
 * @param params 公告id
 */
export const deleteNotice = params => axios.delete(`${base}/notice/${params}`).then(res => res.data)

/**
 * 系统收款设置
 */
export const getAccountConfig = () => axios.get(`${base}/config/account`).then(res => res.data)

/**
 * 修改系统收款设置
 * @param params 收款设置
 */
export const updateAccountConfig = params => axios.put(`${base}/config/account?${qs.stringify(params)}`).then(res => res.data)

/**
 * 发送邮件
 * @param params params
 */
export const sendMessage = params => axios.post(`${base}/message?${qs.stringify(params)}`).then(res => res.data)

/**
 * 收件箱删除邮件
 * @param params params
 */
export const recallMessage = params => axios.delete(`${base}/message/${params}`).then(res => res.data)

/**
 * 修改代理申请状态
 * @param params params
 */
export const handleReferrerapplication = params => axios.put(`${base}/referrerapplication/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取用户限额
 */
export const userLimit = () => axios.get(`${base}/config/limit`).then(res => res.data)

/**
 * 修改用户限额设置
 * @param params params
 */
export const updateUserLimit = params => axios.put(`${base}/config/limit?${qs.stringify(params)}`).then(res => res.data)

/**
 * 预设管理
 * @param params params
 * ?key=efskfkjjweeopsdw&gid=3
 * https://op.t1.wxuny.com/action/getSysLotteries.html //获取彩种
 * https://op.t1.wxuny.com/action/getTempData.html?gid=4 //拿数据
 */
/*
const get_lotteries_baseurl = 'https://op.t1.wxuny.com/action/getSysLotteries.html';
export const GET_LOTTERIES = params => axios.post(`${get_lotteries_baseurl}?${qs.stringify(params)}`).then(res => res.data)

const get_tempdata_baseurl = 'https://op.t1.wxuny.com/action/getTempData.html';
export const GET_TEMPDATA = params => axios.get(`${get_tempdata_baseurl}?${qs.stringify(params)}`).then(res => res.data)

const preset_baseurl = 'https://manager.cp.52jbp.com/actions/editTmpOpenSystem.html';
export const PRESET_MANAGE = params => axios.get(`${preset_baseurl}?${qs.stringify(params)}`).then(res => res.data)*/

/**
 * 获取代理佣金列表
 */
export const cashback = params => axios.get(`${base}/cashback?${qs.stringify(params)}`).then(res => res.data)

/**
 * 发放用户
 * @param params params
 */
export const updateCashback = params => axios.put(`${base}/cashback/${params.uid}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取综合统计下级信息
 * @param params params
 */
export const junior = params => axios.get(`${base}/team/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 开奖检测
 * @param params params
 */
export const unusualLottery = params => axios.get(`${base}/lotteryresult/unusual?${qs.stringify(params)}`).then(res => res.data)


/**
 * 手动开奖、开奖检测中的确定开奖
 * @param params params
 */
export const openLotterySelf = params => axios.post(`${base}/lotteryresult?${qs.stringify(params)}`).then(res => res.data)

/**
 * 用户充值
 * @param params params
 */
export const accountRecharge = params => axios.post(`${base}/recharge?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取赔率
 */
export const odds = params => axios.get(`${base}/odds?${qs.stringify(params)}`).then(res => res.data)


/**
 * 更新节点在线状态
 * @param params params
 */
export const updateOddNodeOnline = params => axios.put(`${base}/node/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 更新赔率信息
 * @param params params
 */
export const updateOddInfo = params => axios.put(`${base}/odds/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取
 * @param params params
 */
export const presetManage = params => axios.get(`${base}/tempdata?${qs.stringify(params)}`).then(res => res.data)
// export const presetManage = params => axios.get(`${base}/preset/manage?${qs.stringify(params)}`).then(res => res.data)

/**
 * 更新预设管理模式
 * @param params params
 */
export const updatePresetManage = params => axios.put(`${base}/tempdata/${params.id}?${qs.stringify(params)}`).then(res => res.data);
// export const updatePresetManage = params => axios.put(`${base}/preset/manage/${params.id}?${qs.stringify(params)}`).then(res => res.data);

/**
 * 获取彩票种类信息
 */
export const lotteryTypes = params => axios.get(`${base}/lottery?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取账变类型
 */
export const accountChangeTypes = () => axios.get(`${base}/accountchangetype`).then(res => res.data)

/**
 * 异常开奖记录(时间已到未开奖的记录)
 */
export const unusual = () => axios.get(`${base}/lotteryresult/unusual`).then(res => res.data)

/**
 * 异常开奖记录开奖
 * @param params params
 */
export const openUnusual = params => axios.post(`${base}/lotteryresult?${qs.stringify(params)}`).then(res => res.data)

/**
 * 系统当前模式
 * 1是预设模式，2是盈利模式
 * 预设模式显示预设选项
 */
export const presetModel = () => axios.get(`${base}/config/mode`).then(res => res.data)

/**
 * 更新系统预设模式
 * @param {*params} params
 */
export const updatePresetModel = params => axios.put(`${base}/config/mode?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取预设的开奖条数
 */
export const presupposenumber = () => axios.get(`${base}/config/presupposenumber`).then(res => res.data)

/**
 * 更新预设的开奖条数
 * @param params params
 */
export const updatePresupposenumber = params => axios.put(`${base}/config/presupposenumber?${qs.stringify(params)}`).then(res => res.data)

/**
 * 更新限额
 * @param params params
 */
export const updateLimit = params => axios.put(`${base}/lottery/${params.id}?orderMoneySetting=${JSON.stringify({ min: params.min, max: params.max })}`)

/**
 * 获取上级列表
 * @param params params
 */
export const parent = params => axios.get(`${base}/parent/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取下级列表
 * @param params params
 */
export const children = params => axios.get(`${base}/children/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 清理用户数据
 * @param params params
 */
export const cleanUp = params => axios.put(`${base}/cleanup?${qs.stringify(params)}`).then(res => res.data)

/**
 * clean cache
 */
export const cleancache = () => axios.put(`${base}/config/clearcache`).then(res => res.data)

export const tts = () => axios.get('/static/recharge.mp3').then(res => res.data)