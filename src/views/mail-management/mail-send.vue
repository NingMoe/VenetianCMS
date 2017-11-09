<template>
	
    <div class="mailbox">
        <div class="boxleft">
            <el-form ref="form" :model="filters" label-width="80px">
            
            <el-form-item label="收件人">
                <el-select v-model="filters.region" placeholder="请选择收件人">
                <el-option label="全部会员" value="wholevip"></el-option>
                <el-option label="全部代理" value="wholeagent"></el-option>
                <el-option label="部分会员" value="partvip"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主题">
                <el-input v-model="filters.name" placeholder="请输入主题"></el-input>
            </el-form-item>
            <el-form-item label="内容" >
                <el-input type="textarea" v-model="filters.desc" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发送</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="boxright" v-if="filters.region=='partvip'">
            <el-form ref="form" :model="filters" label-width="100px">
                
                <el-form-item label="用户名或备注">
                    <el-input
                    placeholder="请输入用户名或备注"
                    icon="search"
                    v-model="input2"
                    :on-icon-click="handleIconClick">
                    </el-input>
                </el-form-item>
            </el-form>
           <el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="name" label="姓名" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="sex" label="备注" min-width="100"  align="center">
			</el-table-column>
		</el-table>
        </div>
    </div>
</template>


<style type="text/css" lang="scss" scoped>
  .mailbox{
      box-sizing: inherit;
      .boxleft{
            width: 600px;
            float: left;
            padding-top: 20px;
            line-height: 36px;
            padding-right: 20px;
            .box{
                height: 100px;
            }
      }
      .boxright{
        //   padding-left: 20px;
            padding-top: 20px;
            width: 40%;
            float: right;
            line-height: 36px;
      }
  }
</style>

<script>
import util from '../../common/js/util'
	//import NProgress from 'nprogress'
    import { getvUserListPage, removeUser, batchRemoveUser, editUser, addUser ,getvUserList } from '../../api/api';
    
	export default {
		data() {
			return {
				filters: {
					name: '',
					region: 'partvip',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
                    desc: ''
                    ,viptype:'qbvip'
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
