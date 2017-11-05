<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="用户名">
					<el-input v-model="filters.name" placeholder="用户名"></el-input>
				</el-form-item>
                <el-form-item label="会员类型">
                    <el-select v-model="filters.viptype" placeholder="请选择活动区域">
                    <el-option label="会员" value="vip"></el-option>
                    <el-option label="代理" value="agent"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号">
					<el-input v-model="filters.number" placeholder="用户名"></el-input>
				</el-form-item>
                <el-form-item label="最后登录时间">
                    <el-date-picker
                        v-model="filters.LastLoginTime"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>

				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="name" label="用户名" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="sex" label="类型" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="age" label="邀请码" min-width="130" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="手机号" min-width="130" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="上级关系" min-width="130" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="可用金额" min-width="150" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="账号状态" min-width="120" sortable align="center">
			</el-table-column>
            <el-table-column prop="lastloginTime" label="最后登录时间" width="200" sortable align="center">
			</el-table-column>
            <el-table-column prop="name" label="备注" min-width="130" sortable align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="280" align="center">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleFreeze(scope.$index, scope.row)">冻结</el-button>
                    <el-button type="primary" size="small">踢下线</el-button>
                    <el-button type="primary" size="small">查看上线</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" >
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" :inline="true">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="类型" >
                    <el-select v-model="filters.viptype" placeholder="选择类型">
                    <el-option label="会员" value="vip"></el-option>
                    <el-option label="代理" value="agent"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="qq" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="备注" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="投注总额" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="中奖金额" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="赠送总额" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="充值总额" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="提现总额" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="账户余额" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="总结算" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="注册时间" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">确定</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getvUserListPage, removeUser, batchRemoveUser, editUser, addUser ,getvUserList } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
                    name: '',
                    viptype:'',
                    number:'',
                    LastLoginTime:'',
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getvUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
                    //NProgress.done();
                    // console.log(this.users)
                });
                // console.log(getvUserListPage(''))
			},
			//删除
			handleFreeze: function (index, row) {
				this.$confirm('确认冻结该用户吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '冻结成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
            this.getUsers();
            ()=>{
                console.log(this.users)
                
            }
		}
	}

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>