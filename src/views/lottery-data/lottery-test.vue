<template>
	<section>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;margin-top:16px;" border>
			<el-table-column prop="name" label="彩种" min-width="120"  align="center">
			</el-table-column>
			<el-table-column prop="" label="期数" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="开奖时间" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="参与人数" min-width="120" sortable  align="center">
			</el-table-column>
			<el-table-column prop="" label="总投注额" min-width="180" sortable align="center">
			</el-table-column>
            <el-table-column label="操作" min-width="80" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">确认开奖</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!--编辑界面-->
		<el-dialog title="修改限额" v-model="editFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="期数" >
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="开奖时间" >
					    <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
				</el-form-item>
                <el-form-item label="开奖号码" >
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
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
                    name: '',
                    LastLoginTime: ''
                },
                value1:'',
				users: [],
				total: 0,
				page: 1,
                listLoading: false,

                editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
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

            },
            //显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
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