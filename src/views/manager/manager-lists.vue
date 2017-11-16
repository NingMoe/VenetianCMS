<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="addVip">添加管理员</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;"border>
			<el-table-column prop="id" label="UID" width="200"  align="center">
			</el-table-column>
			<el-table-column prop="name" label="用户名" width="200"  align="center">
			</el-table-column>
			<el-table-column prop="logip" label="登录IP" width="200"  align="center">
			</el-table-column>
			<el-table-column prop="state" label="状态" width="200"  align="center">
			</el-table-column>
			<el-table-column prop="now_log_time" label="最后登录时间" min-width="200"  align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="150" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" @click="editVip(scope.$index)">修改密码</el-button>
          <el-button type="danger" size="small" @click="removeList($event,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--编辑界面-->
		<el-dialog :title="title" :visible.sync="managerFormVisible" size="tiny">
			<el-form :model="managerForm" label-width="80px" :rules="rules" ref="managerForm">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="managerForm.name" auto-complete="off" :disabled="title === '添加管理员' ? false :  true"></el-input>
				</el-form-item>
                <el-form-item label="密码" prop="pwd">
					<el-input v-model="managerForm.pwd" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="重复密码" prop="rePwd">
					<el-input v-model="managerForm.rePwd" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="managerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { pagingManager, addManager, updateManager, deleteManager } from '../../api/api';

export default {
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.managerForm.checkPass !== '') {
              this.$refs.managerForm.validateField('rePwd');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.managerForm.pwd) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          listLoading:false,
          title: '',
          managerFormVisible: false,
          isEmpty: true,
          userInfo: '',
          total: 0,
          data: [],
          managerForm: {
            index: -1,
            name: '',
            pwd: '',
            rePwd: '',
            group_id: 1
          },
          rules: {
            pwd: [
              { validator: validatePass, trigger: 'blur' }
            ],
            rePwd: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        }
      },
      mounted() {
        this.pagingManagers();
      },
      methods: {
        pagingManagers() {
          pagingManager().then(res => {
            this.data = res.data;
            this.total = res.total;
          })
        },
        removeList(event, key) {
          let ele = event.target;
          if(this.data.length <= 1) {
            this.$message({
              message: '唯一管理员不能删除',
              type: 'warning',
              duration: '1500'
            });
            return;
          }
          deleteManager(this.data[key].id).then(() => {
            this.data.splice(key, 1);
            this.$message({
              type: 'success',
              message: '删除管理员成功'
            });
          });
        },
        addVip() {
          if (this.$refs['managerForm'])
            this.$refs['managerForm'].resetFields();
          this.managerForm.name = '';
          this.title = '添加管理员';
          this.managerFormVisible = true;
        },
        editVip(index,name) {
          if (this.$refs['managerForm'])
            this.$refs['managerForm'].resetFields();
          this.title = '修改管理员密码';
          Object.assign(this.managerForm, this.data[index]);
          this.managerForm.index = index;
          this.managerFormVisible = true;
          console.log(this.data[index].name);
        },
        submitEditForm() {
          if (this.title === '添加管理员') {
            addManager(this.managerForm).then(() => {
              this.pagingManagers();
              this.managerFormVisible = false;
              this.$message({
                type: 'success',
                message: '添加管理员成功'
              });
            })
          } else {
            updateManager(this.managerForm).then(() => {
              Object.assign(this.data[this.managerForm.index], this.managerForm);
              this.managerFormVisible = false;
              this.$message({
                type: 'success',
                message: '修改管理员密码成功'
              });
            })
          }
        }
      }
  }
</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>