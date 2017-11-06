<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="用户名">
					<el-input v-model="filters.name" placeholder="用户名"></el-input>
				</el-form-item>
                <el-form-item label="日期范围">
                    <el-date-picker
                        v-model="filters.LastLoginTime"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="充值类型">
                    <el-select v-model="filters.status" placeholder="线上充值">
                    <el-option label="线上充值" value="whole"></el-option>
                    <el-option label="线下充值" value="alreadySubmit"></el-option>
                    </el-select>
                </el-form-item>



				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="handleAdd">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="name" label="充值编号" width="120" align="center">
			</el-table-column>
			<el-table-column prop="sex" label="用户名" width="100" :formatter="formatSex" sortable align="center">
			</el-table-column>
			<el-table-column prop="age" label="上级关系" width="100" align="center">
			</el-table-column>
			<el-table-column prop="birth" label="充值金额" width="120" sortable align="center">
			</el-table-column>
			<el-table-column prop="addr" label="实际到账" min-width="180" sortable align="center">
			</el-table-column>
            <el-table-column prop="addr" label="充值银行" min-width="180" align="center">
			</el-table-column>
            <el-table-column prop="addr" label="状态" min-width="180" align="center">
			</el-table-column>
            <el-table-column prop="addr" label="备注" min-width="180" align="center">
			</el-table-column>
            <el-table-column prop="addr" label="充值时间" min-width="180" sortable align="center">
			</el-table-column>
			<el-table-column label="操作" width="150" align="center">
				<template scope="scope">
					<el-button type="success" size="small" @click="handleRecharge()">充值</el-button>
					<el-button type="danger" size="small" @click="handleRefuse()">拒绝</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
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
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
                    //NProgress.done();
                    console.log(this.users)
                });
			},
			//拒绝
			handleRefuse: function (index, row) {
				this.$confirm('确定拒绝?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '成功拒绝!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消拒绝'
                    });          
                });

			},
			//充值
			handleRecharge: function (index, row) {
				
                this.$prompt('请输入用户的实际到账金额', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '成功充值'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消充值'
                    });       
                });
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
		}
	}

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>