<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" v-on:click="getData">添加公告</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;" border>
			<el-table-column prop="name" label="标题" min-width="120" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="作者" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="内容" min-width="100"  align="center">
			</el-table-column>
			<el-table-column prop="" label="日期" min-width="120"  align="center">
			</el-table-column>
            <el-table-column label="操作" min-width="150" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
                    name: '',
                    LastLoginTime: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getData();
			},
			//获取用户列表
			getData() {
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
                console.log(this.filters.LastLoginTime)
            },

            resetting(){
                this.filters.name=''
                this.getData();
            },
            pickerOptions(){

            }
		},
		mounted() {
			this.getData();
		}
	}

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>