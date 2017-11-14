<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search" ref="search">
				<el-form-item label="用户名" prop="user_name">
					<el-input v-model="search.user_name" placeholder="请输入用户名"></el-input>
				</el-form-item>
        <el-form-item label="会员类型" prop="user_type">
          <el-select v-model="search.user_type" placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone_num">
					<el-input v-model="search.phone_num" placeholder="请输入手机号"></el-input>
				</el-form-item>
        <el-form-item label="最后登录时间"prop="time">
          <el-date-picker
            v-model="search.time"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSearch('search')">查询</el-button>
          <el-button @click="onReset('search')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="name" label="用户名" min-width="100"  align="center">
			</el-table-column>
			<el-table-column prop="user_type" label="类型" min-width="100"  align="center">
			</el-table-column>
			<el-table-column prop="r_code" label="邀请码" min-width="130"  align="center">
			</el-table-column>
			<el-table-column prop="phone_num" label="手机号" min-width="130"  align="center">
			</el-table-column>
			<el-table-column label="上级关系" min-width="130"  align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.referrers" placement="right">
            <section>
            {{scope.row.referrers}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
      <el-table-column prop="center" label="可用金额" min-width="150" align="center">
			</el-table-column>
      <el-table-column label="账号状态" min-width="120"  align="center">
        <template scope="scope">
          {{ scope.row.status === 1 ? '正常' : '已冻结'}}
        </template>
			</el-table-column>
      <el-table-column prop="last_login_time" label="最后登录时间" width="200" align="center">
			</el-table-column>
      <el-table-column label="备注" min-width="130"  align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.remark" placement="left">
            <section>
            {{scope.row.remark}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>    
    <el-table-column
      label="操作"
      min-width="250"
      class-name="operation"
      align="center">
        <template scope="scope">
          <section>
            <el-button
            size="small"
            type="success"
            @click="edit(scope.$index, scope.row.id)">编辑</el-button>
          <el-button
            size="small"
            :type="scope.row.status === 1 ? 'danger' : 'primary'"
            @click="status(scope.$index, scope.row.id, scope.row.status === 0 ? 1 : 0)">
              {{ scope.row.status === 1 ? '冻结' : '解冻'}}
            </el-button>
          <el-button
            size="small"
            type="danger"
            @click="offline(scope.$index, scope.row.id)" :disabled="scope.row.online_status !== '1'">踢下线</el-button>
          <el-dropdown trigger="click" v-if="scope.row.children > 0 && scope.row.referrers !== null && scope.row.referrers !== 'sys_manager'">
            <span class="el-dropdown-link">
              点我查看
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                <section  v-on:click="viewParent(scope.$index, scope.row.id)" >
                  查看上级
                </section>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                <section  v-on:click="viewJunior(scope.$index, scope.row.id)" >
                  查看下级
                </section>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            size="small"
            type="info"
            @click="viewJunior(scope.$index, scope.row.id)" v-else-if="scope.row.children > 0">查看下级</el-button>
          <el-button
            size="small"
            type="info"
            @click="viewParent(scope.$index, scope.row.id)" v-else :disabled="scope.row.referrers == '' || scope.row.referrers == 'sys_manager'">查看上级</el-button>
          
          </section>
        </template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :total="total" :current-page="search.current_page" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" >
			<el-form :model="editForm" label-width="80px" :rules="rules1" ref="editForm" :inline="true">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="类型" >
                    <el-select v-model="editForm.user_type" placeholder="选择类型">
                    <el-option label="会员" value="会员"></el-option>
                    <el-option label="代理" value="代理"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="name">
					<el-input v-model="editForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="name">
					<el-input v-model="editForm.repass" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="qq" prop="name">
					<el-input v-model="editForm.qq" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="name">
					<el-input v-model="editForm.phone_num" auto-complete="off"></el-input>
				</el-form-item>
        <br v-show="editForm.user_type == `会员`"/>
        <template v-if="editForm.user_type == `代理`">
          <el-form-item label="返现周期" :label-width="formLabelWidth">
            <el-select v-model="editForm.period" placeholder="请选择返现周期"  class="el-self-select">
              <el-option label="天" value=1></el-option>
              <el-option label="周" value=7></el-option>
              <el-option label="月" value=30></el-option>
            </el-select>
            <i style="color: red;">*</i>
          </el-form-item>
          <el-form-item label="代理备注" :label-width="formLabelWidth">
            <el-input v-model="editForm.agree_remark" auto-complete="off"></el-input>
            <i style="color: red; position: absolute; right: -10px; top: 0;">*</i>
          </el-form-item>
          <el-form-item label="反水类型" :label-width="formLabelWidth">
            <el-select v-model="editForm.r_type" placeholder="请选择反水类型"  class="el-self-select">
              <el-option label="按流水" value=1></el-option>
              <el-option label="按盈利" value=2></el-option>
            </el-select>
            <i style="color: red;">*</i>
          </el-form-item>
        </template>
        <el-form-item label="备注" prop="name">
					<el-input v-model="editForm.remark" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="投注总额" prop="name">
					<el-input v-model="editForm.bet" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="中奖金额" prop="name">
					<el-input v-model="editForm.award" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="赠送总额" prop="name">
					<el-input v-model="editForm.gift" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="充值总额" prop="name">
					<el-input v-model="editForm.recharge" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="提现总额" prop="name">
					<el-input v-model="editForm.withdraw" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="账户余额" prop="name">
					<el-input v-model="editForm.balance" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="总结算" prop="name">
					<el-input v-model="editForm.profit" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="注册时间" prop="name">
					<el-input v-model="editForm.create_time" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
        <el-form-item label="反水总额" :label-width="formLabelWidth" v-show="editForm.user_type == '代理'">
          <el-input v-model="editForm.cashback" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
  import util from '../../common/js/util'
  
	import { pagingUser, integrativeStatistics, updateUser, updateUserInfo, offlineUser, parent, children } from '../../api/api';

 export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入名称'));
        } else if (value.indexOf(' ') !== -1) {
          callback(new Error('名称中不能带空格'));
        } else {
          callback();
        }
      };
      return {
        listLoading:false,
        rules1: {
          name: [
            { validator: validateName, trigger: 'blur' },
          ],
          user_type: [
            { required: true, message: '请选择用户类型', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写普通备注', trigger: 'blur' }
          ]
        },
        total: 0,
        data: [],
        editForm: {
          index: 0,
          id: '',
          name: '',
          user_type: '',
          create_time: '',
          start: '100',
          end: '1000',
          bet: '',
          gift: '',
          personalActivity: '',
          cashback: '',
          waterTerm: '',
          waterPeriod: '',
          waterRatio: '',
          recharge: '',
          withdraw: '',
          balance: '',
          profit: '',
          period: '',
          r_type: '',
          agree_remark: '',
          remark: '',
          password: '',
          repass: '',
          award: '',
          qq: '',
          phone_num: ''
        },
        editFormVisible: false,
        formLabelWidth: '80px',
        search: {
          current_page: 1,
          per_page: 15,
          user_name: '',
          interval: '',
          time: [],
          user_type: '',
          id: '',
          parent: false,
          phone_num: ''
        },
        options: [{
          value: '会员',
          label: '会员'
        }, {
          value: '代理',
          label: '代理'
        }],
        
      }
    },
    methods: {
      onReset(formName) {
        this.$refs[formName].resetFields();
        this.search.interval = '';
        this.search.id = '';
        this.search.parent = false;
        this.onSearch();
      },
      pageChange(pageNo) {
        this.search.current_page = pageNo;
        this.onSubmit();
      },
      onSearch() {
        this.search.current_page = 1;
        this.onSubmit();
      },
      dateChange(event){
        if (!event) {
          this.search.interval = '';
          return;
        }
        const intervalArr = event.split(' - ');
        this.search.interval = intervalArr[0].trim() + ',' + intervalArr[1].trim();
      },
      onSubmit() {
        if (this.search.id == '') {
          pagingUser(this.search).then(res => {
            this.data = res.data;
            this.total = res.total;
          });
        } else if (this.search.parent) {
          parent(this.search).then(res => {
            this.total = res.total;
            
            this.data = res.data;
          });
        } else {
          children(this.search).then(res => {
            this.total = res.total;
            this.data = res.data;
          });
        }
        
      },
      viewJunior(index, id) {
        this.search.id = id;
        this.search.user_name = '';
        this.search.parent = false;
        children(this.search).then(res => {
          this.total = res.total;
          this.data = res.data;
        });
      },
      viewParent(index, id) {
        this.search.id = id;
        this.search.user_name = '';
        this.search.parent = true;
        parent(this.search).then(res => {
          this.total = res.total;
          this.data = res.data;
        });
      },
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editForm.password != '' && this.editForm.password != this.editForm.repass) {
              this.$message({
                message: '确认密码与密码不一致',
                type: 'error'
              });
              return
            }
            if (this.editForm.remark == '') {
              this.$message({
                message: '请输入备注',
                type: 'error'
              });
              return;
            }
            if(this.editForm.user_type == '会员') {
              this.editForm.period = '';
            } else {
              if(this.editForm.period == '' ) {
                this.$message({
                  message: '必须选择返现周期',
                  type: 'error'
                });
                return;
              }
              if(this.editForm.agree_remark == '' ) {
                this.$message({
                  message: '必须填写代理通过备注',
                  type: 'error'
                });
                return;
              }
              if(this.editForm.r_type == '' ) {
                this.$message({
                  message: '必须选择反水类型',
                  type: 'error'
                });
                return;
              }
            }
            const form = Object.assign({}, this.editForm);
            if (form.password == '') {
              delete form.password;
              delete form.repass;
            }
            updateUserInfo(form).then(() => {
              Object.assign(this.data[this.editForm.index], form);
              this.editFormVisible = false;
              this.$message({
                type: 'success',
                message: '更新用户信息成功'
              });
            })
          }
        });
      },
      // 修改用户
      edit(i, id) {
        if (this.$refs['editForm'])
          this.$refs['editForm'].resetFields();
        Object.assign(this.editForm, this.data[i]);
        this.editForm.index = i;
        this.editForm.password = this.editForm.repass = '';
        integrativeStatistics({id: this.editForm.id}).then(res => {
          this.editForm = Object.assign(this.editForm, res);
          this.editForm.profit = Math.abs(res.profit);
          this.editFormVisible = true;
        })
      },
      close() {
        this.editFormVisible = false;
      },
      status(i, id, status) {
        const ms = status === 0 ? '冻结' : '解冻';
        this.$confirm(`您确定要${ms}此用户吗?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateUser({ id: id, status: status }).then(res => {
              this.$set(this.data[i],'status', status);
              this.$message({
                message: `${ms}成功`,
                type: 'success'
              });
            });
          }).catch(() => {});
      },
      offline(i, id) {
        this.$confirm('您确定要踢此用户下线吗?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            offlineUser({ id: id, status: 0}).then(res => {
              this.$set(this.data[i],'online_status', '0');
              this.$message({
                message: `下线成功`,
                type: 'success'
              });
            })
          }).catch(() => {});
      }
    },
   
    mounted() {
      this.onSubmit();
    }
  }

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>