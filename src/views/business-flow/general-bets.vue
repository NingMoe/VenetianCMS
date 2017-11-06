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
                <el-form-item label="彩种类型">
                    <el-select v-model="filters.status" placeholder="请选择类型">
                        <el-option label="重庆时时彩" value="cqssc"></el-option>
                        <el-option label="香港六合彩" value="xglhc"></el-option>
                        <el-option label="北京PK拾" value="bjpks"></el-option>
                        <el-option label="幸运农场" value="xync"></el-option>
                        <el-option label="江苏骰宝" value="jssb"></el-option>
                        <el-option label="澳门2分彩" value="am2fc"></el-option>
                        <el-option label="急速六合一" value="jslhy"></el-option>
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
			<el-table-column prop="" label="单号" width="120" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="期号" width="100" :formatter="formatSex" sortable align="center">
			</el-table-column>
			<el-table-column prop="name" label="用户名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="" label="投注时间" width="120" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="彩种" min-width="80" align="center">
			</el-table-column>
            <el-table-column prop="" label="玩法" min-width="80" align="center">
			</el-table-column>
            <el-table-column prop="" label="倍数" min-width="80" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="注数" min-width="80" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="投注号码" min-width="80" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="投注金额" min-width="80" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="中奖金额" min-width="80" sortable align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="150" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button type="warning" size="small" @click="handleRecall()">撤单</el-button>
					<el-button type="danger" size="small" @click="handleFreeze()">冻结</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--查看-->
		<el-dialog title="投注详情" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px"  ref="editForm" :inline="true">
				<el-form-item label="彩种" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="玩法" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="投注人" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="投注人状态" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="期号" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="单号" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="时间" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="状态" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <div>
                    <el-form-item label="开奖号码" >
					    
				    </el-form-item> 
                </div>
				<div>
                    <el-form-item label="投注号码" >
					    
				    </el-form-item>
                </div>
                
				<el-form-item label="注数" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="倍数" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="投注金额" >
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>
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
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
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
			//撤单
			handleRecall: function () {
				this.$confirm('您确定要撤销此单吗?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '成功撤销!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消撤销'
                    });          
                });
            },
            //冻结
            handleFreeze: function () {
				this.$confirm('您确定要冻结此用户吗?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '成功冻结!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消冻结'
                    });          
                });
            },
			//新增
			addSubmit: function () {
				
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