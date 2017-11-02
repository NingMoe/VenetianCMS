import axios from 'axios';

let base = '';
//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
//获取用户列表
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getvUserList = params => { return axios.get(`${base}/vuser/list`, { params: params }); };


//获取用户列表分页
export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const getvUserListPage = params => { return axios.get(`${base}/vuser/listpage`, { params: params }); };


//删除用户
export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

//批量删除用户
export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
//编辑用户
export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
//添加用户
export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

// console.log(getvUserListPage(''))


