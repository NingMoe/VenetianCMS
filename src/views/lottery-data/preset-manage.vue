<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
                <el-form-item label="彩种类型">
                    <el-select v-model="filters.lotteryClass" placeholder="请选择彩种类型">
                    <el-option label="澳门2分彩" value="am2fc"></el-option>
                    <el-option label="急速六合一" value="jslhy"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="最小限额" >
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="最小限额" >
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;" border>
			<el-table-column prop="name" label="彩种" min-width="120"  align="center">
			</el-table-column>
			<el-table-column prop="" label="期数" min-width="100"  align="center">
			</el-table-column>
			<el-table-column prop="" label="开奖号码" min-width="100"  align="center">
                <template scope="scope">
                    <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>					
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作" min-width="120"  align="center">
                <template scope="scope">
                    <el-button type="primary" size="small">保存</el-button>					
				</template>
			</el-table-column>
			<el-table-column prop="" label="开奖时间" min-width="180" sortable align="center">
			</el-table-column>
		</el-table>
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
                    lotteryClass: 'am2fc'
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