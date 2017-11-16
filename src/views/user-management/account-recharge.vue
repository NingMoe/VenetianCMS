<template>
	<el-form ref="form" :model="form" label-width="80px" style="margin:0 auto;width:300px;min-width:300px;margin-top:20px;">
    <el-form-item label="用户名" >
			<el-autocomplete
      class="inline-input"
      v-model="form.uid"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
		</el-form-item>
        <el-form-item label="账户余额">
			<!-- <el-input v-model="account.name" placeholder="账户余额"></el-input> -->
		</el-form-item>
        <el-form-item label="备注">
			<!-- <el-input v-model="account.name" placeholder="备注"></el-input> -->
		</el-form-item>
        <el-form-item label="账户类型">
			<!-- <el-input v-model="account.name" placeholder="用户名"></el-input> -->
		</el-form-item>
        <el-form-item label="充值金额">
			<el-input v-model="account.name" placeholder="充值金额"></el-input>
		</el-form-item>
        <el-form-item label="类型">
            <el-select v-model="form.type_id" placeholder="请选择类型">
            <el-option
                v-for="item in accountType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="large" @click="submit">确定</el-button>
            <el-button type="primary" size="large" @click="reset">取消</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
  import { legalNumber } from '../../common/js/tools';
  import { pagingUser, accountRecharge } from '../../api/api';
  export default {
      data() {
          return {
            accountBalance: '0.00',
            remark: '',
            type: '',
            accountType: [{
              label: '系统充值',
              value: 2
            }, {
              label: '活动充值',
              value: 3
            }],
            form: {
              uid: '',
              type_id: 2,
              money: '',
              order_money: '',
              code: 1
            },
            userList: [],
          }
      },
      mounted() {
        this.pagingUser('');
      },
      methods: {
        querySearch(){

        },
        handleSelect(item) {
          console.log(item);
        },
        select() {
          if (!this.form.uid) {
            return;
          }
          const res = this.userList.filter(item => {
            return item.id === this.form.uid;
          })[0];
          this.accountBalance = res.balance;
          this.remark = res.remark;
          this.type = res.user_type;
        },
        pagingUser(username) {
          if (this.userList.filter(item => item.name === username).length > 0) return;
          pagingUser({user_name: username}).then(res => {
            res.data.forEach(item => {
              item.label = item.name;
              item.value = item.id;
            });
            this.userList = res.data;
          });
        },
        reset() {
          this.accountBalance = '0.00';
          this.remark = '';
          this.type = '';
          this.form = {
            uid: '',
            type_id: 1,
            money: ''
          };
          this.userName = '';
          this.userList = [];
        },
        submit() {
          let empty = false;
          if (this.form.uid === '') {
            this.$notify.error({
              title: '错误',
              message: '请选择用户'
            });
            empty = true;
          }
          if (this.form.money === '') {
            setTimeout(() => {
              this.$notify.error({
                title: '错误', 
                message: '请输入充值金额' 
              })
            }, 100);
            
            empty = true;
          }
          if (empty) return;
          this.form.order_money = this.form.money;
          accountRecharge(this.form).then(() => {
            this.$message({
              type: 'success',
              message: '充值成功'
            });
            this.reset();
          })
        },
        checkNumber(event) {
          let ele = event.target;
          legalNumber(ele, ele.value);
        }
      }
  }
</script>