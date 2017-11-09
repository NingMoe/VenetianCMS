<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-button type="primary" @click="onSearch('search')">盈利排行</el-button>
                    <el-button @click="onReset('search')">亏损排行</el-button>
                </el-form-item>
                <el-form-item label="日期范围" prop="time">
                    <el-date-picker
                    v-model="filters.time"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    @change="dateChange"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="彩票种类" prop="issue">
                    <el-select v-model="filters.lotteryClass" placeholder="请选择彩种类型">
                    <el-option label="重庆时时彩" value="cqssc"></el-option>
                    <el-option label="香港六合彩" value="xglhc"></el-option>
                    <el-option label="北京PK拾" value="bjpks"></el-option>
                    <el-option label="幸运农场" value="xync"></el-option>
                    <el-option label="江苏骰宝" value="jstb"></el-option>
                    <el-option label="澳门2分彩" value="am2fc"></el-option>
                    <el-option label="急速六合一" value="jslhy"></el-option>
                    </el-select>
                </el-form-item>
                
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="name" label="排名ID" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="sex" label="用户名" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="age" label="登录地点" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="birth" label="最后登录时间" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="age" label="下注总额" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="age" label="中奖总额" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="age" label="用户输赢" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="age" label="彩种盈亏" min-width="50" align="center">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
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
			
			
			selsChange: function (sels) {
				this.sels = sels;
			},
			
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