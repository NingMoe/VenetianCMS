<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="期数">
					<el-input v-model="filters.name" placeholder="请输入期数"></el-input>
				</el-form-item>
                <el-form-item label="日期范围">
                    <el-date-picker
                        v-model="filters.LastLoginTime"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

				<el-form-item>
					<el-button type="primary" v-on:click="getData">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="resetting">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;" border>
			<el-table-column prop="name" label="期数" min-width="120" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="开奖时间" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="开奖数据" min-width="100"  align="center">
			</el-table-column>
			<el-table-column prop="" label="状态" min-width="120"  align="center">
			</el-table-column>
			<el-table-column prop="" label="参与人数" min-width="180" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="投注金额" min-width="180" sortable align="center">
			</el-table-column>
            <el-table-column prop="" label="中奖金额" min-width="180" sortable align="center">
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