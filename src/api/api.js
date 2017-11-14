import axios from 'axios';
import qs from 'qs';
import {
  Message
} from 'element-ui';

export const base = 'https://lottery.wns.52jbp.com';

// export const base = 'https://lottery.d1.t1.wxuny.com';

var instance = axios.create({
  headers: {
    Authorization: localStorage.getItem('token'),
    'content-type': 'application/x-www-form-urlencoded'
  }
});



// request拦截器
instance.interceptors.request.use(config => {
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


instance.interceptors.response.use(response => {
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
    console.log(data)
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



//登录
export const requestLogin = params => {
  return instance.post(`${base}/auth`, qs.stringify(params)).then(res => res.data);
};

/**
 * 提现请求
 * @param params
 */
// https://api.cp.52jbp.com/Manager1Open/withdrawList.html
// form data data:{"user_name":"fff","interval":["2017-07-04","2017-07-04"],"limit":"0,5","hasPass":0,"code":"-1"}

export const drawRequest = params => instance.get(`${base}/withdraw?${qs.stringify(params)}`).then(res => res.data)


/**
 * 驳回提现请求
 * @param params
 */
export const handleRecharge = params => instance.put(`${base}/recharge/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 分页获取充值记录
 * @param params 查询参数
 */
export const pagingRecharge = params => instance.get(`${base}/recharge?${qs.stringify(params)}`).then(res => res.data)

/**
 * 分页获取普通投注记录
 * @param params params
 */
export const pagingGeneralBets = params => instance.get(`${base}/ticket?${qs.stringify(params)}`).then(res => res.data)

/**
 * 撤单
 * @param params params
 */
export const withdrawals = params => instance.put(`${base}/ticket/${params.id}?${qs.stringify(params)}`).then(res => res.data)

// /**
//  * 更新用户状态
//  * @param params params
//  */
// export const updateUser = params => instance.put(`${base}/user/${params.id}/${params.status}`).then(res => res.data)

// /**
//  * 更新用户信息
//  * @param params params
//  */
// export const updateUserInfo = params => instance.put(`${base}/user/${params.id}?${qs.stringify(params)}`).then(res => res.data)


/**
 * 获取彩票种类信息
 */
export const lotteryTypes = params => instance.get(`${base}/lottery?${qs.stringify(params)}`).then(res => res.data)



/**
 * 分页获取账号详情
 * @param params
 */
export const pagingAccountDetail = params => instance.get(`${base}/accountchange?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取账变类型
 */
export const accountChangeTypes = () => instance.get(`${base}/accountchangetype`).then(res => res.data)

// console.log(accountChangeTypes());


/**
 * 异常开奖记录(时间已到未开奖的记录)
 */
export const unusual = () => instance.get(`${base}/lotteryresult/unusual`).then(res => res.data)


/**
 * 异常开奖记录开奖
 * @param params params
 */
export const openUnusual = params => instance.post(`${base}/lotteryresult?${qs.stringify(params)}`).then(res => res.data)



/**
 * 获取赔率
 */
export const odds = params => instance.get(`${base}/odds?${qs.stringify(params)}`).then(res => res.data)

/**
 * 更新节点在线状态
 * @param params params
 */
export const updateOddNodeOnline = params => instance.put(`${base}/node/${params.id}?${qs.stringify(params)}`).then(res => res.data)


/**
 * 更新赔率信息
 * @param params params
 */
export const updateOddInfo = params => instance.put(`${base}/odds/${params.id}?${qs.stringify(params)}`).then(res => res.data)


/**
 * 获取系统动态赔率数据
 */
export const getGlobalSetting = () => instance.get(`${base}/config/odds`).then(res => res.data);

/**
 * 修改系统动态赔率数据
 * @param params params
 */
export const updateGlobalSetting = params => instance.put(`${base}/config/odds?${qs.stringify(params)}`).then(res => res.data);


/**
 * 获取综合统计下级信息
 * @param params params
 */
export const junior = params => instance.get(`${base}/team/${params.id}?${qs.stringify(params)}`).then(res => res.data)

/**
 * 分页获取综合统计信息
 * @param params params
 */
export const pagingIntegrativeStatistics = params => instance.get(`${base}/financial?${qs.stringify(params)}`).then(res => res.data)

/**
 * 输赢排行
 * @param params params
 */
export const getProfitDetails = params => instance.get(`${base}/dashboard/getProfitDetails?${qs.stringify(params)}`).then(res => res.data)




/**
 * 投注内容排行
 * @param params params
 */
export const getRisk = params => instance.get(`${base}/risk?${qs.stringify(params)}`).then(res => res.data)


/**
 * 新增用户
 * @param params params
 */
export const addUser = params => instance.post(`${base}/user?${qs.stringify(params)}`).then(res => res.data)





/**
 * 分页获取用户信息
 * @param params
 */
export const pagingUser = params => instance.get(`${base}/user?${qs.stringify(params)}`).then(res => res.data)

/**
 * 获取单个用户统计信息
 * @param params params
 */
export const integrativeStatistics = params => instance.get(`${base}/financial/${params.id}`).then(res => res.data)


/**
 * 更新用户状态
 * @param params params
 */
export const updateUser = params => instance.put(`${base}/user/${params.id}/${params.status}`).then(res => res.data)


/**
 * 更新用户信息
 * @param params params
 */
export const updateUserInfo = params => instance.put(`${base}/user/${params.id}?${qs.stringify(params)}`).then(res => res.data)


/**
 * 踢用户下线
 * @param params params
 */
export const offlineUser = params => instance.put(`${base}/kickout/${params.id}`).then(res => res.data)


/**
 * 获取上级列表
 * @param params params
 */
export const parent = params => instance.get(`${base}/parent/${params.id}?${qs.stringify(params)}`).then(res => res.data)


/**
 * 获取下级列表
 * @param params params
 */
export const children = params => instance.get(`${base}/children/${params.id}?${qs.stringify(params)}`).then(res => res.data)