<template>
	<el-form :rules="editFormRules" :inline="true" ref="form" model="selectUserType" label-width="100px" @submit.prevent="onSubmit" style="margin-top:20px;width:100%;">
		<div>
            <el-form-item label="增加用户类型">
                <el-select v-model="selectUserType" @change="checkFall" placeholder="请选择用户类型">
                    <el-option
                      v-for="(v, k) in userTypes"
                      :key="v.value"
                      :label="v.label"
                      :value="v.value"
                      :disabled="v.disabled"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
        <hr/>
        <div>
            <el-form-item label="用户名" prop="name" >
                <el-input v-model="userName" placeholder="请输入用户名" @change="checkFall"></el-input>
                <p class="error-text" v-html="error_user_name"></p>
            </el-form-item>
            <el-form-item label="用户密码" prop="name" >
                <el-input v-model="userPsd" placeholder="请输入用户密码" @change="checkFall"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="name" >
                <el-input v-model="userRePsd" placeholder="请输入重复密码" @change="checkFall" @blur="checkRePsd"></el-input>
            </el-form-item>
        </div>
        <div v-if="selectUserType == `代理`">
            <el-form-item label="反水类型" prop="name">
                <el-select 
                 v-model="selectType" 
                 placeholder="请选择反水类型" 
                 @change="checkFall"
               >
                <el-option
                  v-for="(v, k) in rebateTypes"
                  :key="v.value"
                  :label="v.label"
                  :value="v.value"
                  :disabled="v.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通过备注" prop="name">
                <el-input v-model="agreeRemark" placeholder="请输入通过备注" @change="checkFall"></el-input>
            </el-form-item>
            <el-form-item label="反水周期" prop="name">
                <el-select 
                 v-model="rebateDuration" 
                 placeholder="请选择反水周期" 
                 @change="checkFall"
               >
                <el-option
                  v-for="(v, k) in waterPeriods"
                  :key="v.value"
                  :label="v.label"
                  :value="v.value"
                  :disabled="v.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
        </div>
            
        <div>
            <el-form-item label="备注" prop="name">
                <el-input v-model="remark" placeholder="请输入备注" @change="checkFall"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="phoneNumber" placeholder="请输入手机号码" @blur="checkPhone"></el-input>
            </el-form-item>
            <el-form-item label="微信QQ">
                <el-input v-model="qq" placeholder="请输入微信QQ"></el-input>
            </el-form-item>
        </div>
         <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              :disabled="isEmpty"
              @click="addClickBtn"
            >确定添加</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
  import { checkPhoneNumber } from '../../common/js/tools';
  import { ADD_NEUSER } from '../../api/api';

	export default {
    data() {
      return {
        userTypes: [
          {
            value: '会员',
            label: '会员'
          },{
            value: '代理',
            label: '代理'
          }
        ],
        waterPeriods: [
          {
            value: '0',
            label: '请选择反水周期',
            disabled: true
          },{
            value: '1',
            label: '天'
          },{
            value: '7',
            label: '周'
          },{
            value: '30',
            label: '月'
          }
        ],
        rebateTypes: [
          {
            value: '0',
            label: '请选择反水类型',
            disabled: true
          },{
            value: '1',
            label: '按流水'
          },{
            value: '2',
            label: '按盈利'
          }
        ],
        selectUserType: '会员',
        selectType: '0',
        userName: '',
        error_user_name: '',
        userPsd: '',
        userRePsd: '',
        agreeRemark: '',
        rebateDuration: '0',
        phoneNumber: '',
        qq: '',
        remark: '',
        isEmpty: true
      }
    },
    mounted() {
    },
    watch: {
      userName: 'removeErrorMsg'
    },
    methods: {
      removeErrorMsg() {
        this.error_user_name = '';
      },
      checkFall() {
        if( this.userName != '' &&
            this.userPsd != '' &&
            this.userRePsd != '' && 
            this.selectUserType != '0' &&
            this.remark != ''
          ) {
          if(this.selectUserType == '代理') {
            if( this.rebateDuration != '0' &&
                this.agreeRemark != '' &&
                this.selectType != '0' ) {
              this.isEmpty = false;
            } else {
              this.isEmpty = true
            }
          } else {
            this.isEmpty = false;
          }
          
        } else {
          this.isEmpty = true;
        }
      },
      gotoRate() {
        this.$router.replace({path: '/play-setting/set-rate'});
      },
      checkRePsd() {
        if(this.userRePsd != this.userPsd) {
          this.$message({
            message: '两次输入密码不一致，请重新输入！',
            duration: '1500',
            type: 'error'
          });
          this.userRePsd = '';
        }
      },
      checkPhone() {
        if(!checkPhoneNumber(this.phoneNumber)) {
          this.phoneNumber = '';
        }
      },
      addClickBtn: async function() {
        let params = {
          name: this.userName,
          user_type: this.selectUserType,
          password: this.userPsd,
          re_password: this.userRePsd,
          agree_remark: this.agreeRemark,
          r_type: this.selectType,
          phone_num: this.phoneNumber,
          qq: this.qq,
          remark: this.remark,
          period: this.rebateDuration
        }
        const res = await $http.post(ADD_NEUSER, params, {'post': false});
        if(res.data.id) {
          this.$router.replace({path: '/user-management/user-lists'});
          return;
        }
        if(res.data.exception == 200) {
          this.error_user_name = res.data.message.name;
        }
      }
    }
  }

</script>