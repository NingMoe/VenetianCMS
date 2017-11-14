<template>
	<el-form :rules="editFormRules" :inline="true" ref="userAdd" :model="userAdd"  label-width="100px" style="margin-top:20px;width:100%;">
		<div>
            <el-form-item label="增加用户类型">
                <el-select v-model="userAdd.selectUserType" @change="checkFall" placeholder="请选择用户类型">
                    <el-option
                      v-for="(v, k) in userAdd.userTypes"
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
            <el-form-item label="用户名" prop="userName" >
                <el-input v-model="userAdd.userName" placeholder="请输入用户名" @change="checkFall"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="pass" >
                <el-input type="password" v-model="userAdd.userPsd" placeholder="请输入用户密码" @change="checkFall"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="checkPass" >
                <el-input type="password"  v-model="userAdd.userRePsd" placeholder="请输入重复密码" @change="checkFall" @blur="checkRePsd"></el-input>
            </el-form-item>
        </div>
        <div v-if="userAdd.selectUserType == `代理`">
            <el-form-item label="反水类型" prop="selectType">
                <el-select 
                 v-model="userAdd.selectType" 
                 placeholder="请选择反水类型" 
                 @change="checkFall"
               >
                <el-option
                  v-for="(v, k) in userAdd.rebateTypes"
                  :key="v.value"
                  :label="v.label"
                  :value="v.value"
                  :disabled="v.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通过备注" prop="agreeRemark">
                <el-input v-model="userAdd.agreeRemark" placeholder="请输入通过备注" @change="checkFall"></el-input>
            </el-form-item>
            <el-form-item label="反水周期" prop="rebateDuration">
                <el-select 
                 v-model="userAdd.rebateDuration" 
                 placeholder="请选择反水周期" 
                 @change="checkFall"
               >
                <el-option
                  v-for="(v, k) in userAdd.waterPeriods"
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
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="userAdd.remark" placeholder="请输入备注" @change="checkFall"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNumber">
                <el-input v-model="userAdd.phoneNumber" placeholder="请输入手机号码" @blur="checkPhone"></el-input>
            </el-form-item>
            <el-form-item label="微信QQ">
                <el-input v-model="userAdd.qq" placeholder="请输入微信QQ"></el-input>
            </el-form-item>
        </div>
         <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              :disabled="userAdd.isEmpty"
              @click="addClickBtn"
            >确定添加</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
  import { checkPhoneNumber } from '../../common/js/tools';
  import { addUser } from '../../api/api';

	export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('通过备注不能为空'));
        }
        callback();
      };
      var userNameRule = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      var remarksRule = (rule, value, callback) => {
        if (this.userAdd.remark=='') {
          return callback(new Error('备注不能为空'));
        }
        callback();     
      };
      var passRule = (rule, value, callback) => {
        if (this.userAdd.userPsd=='') {
          return callback(new Error('密码不能为空'));
        }else{
          if (this.userAdd.userRePsd == '') {
            this.$refs.userAdd.validateField('checkPass');
        }
          callback();
        }
      };
      var CheckPassRule = (rule, value, callback) => {
        if (this.userAdd.userRePsd=='') {
          return callback(new Error('请再次输入密码'));
        }
        if(this.userAdd.userRePsd!=this.userAdd.userPsd){
          return callback(new Error('两次输入密码不一致，请重新输入！'));
        }
        callback();
      };
      var phoneNumberRule = (rule, value, callback) => {
        let pn=this.userAdd.phoneNumber
        let reg = new RegExp(/^1[3|4|5|7|8]\d{9}$/, 'g');
        if (this.userAdd.phoneNumber=='') {
          return callback(new Error('请输入手机号'));
        }
        
        if(!reg.test(pn)) {
          return callback(new Error('手机号码格式不正确，请重新输入'));
        }
        callback();
      };
      return {
        editFormRules: {
          userName: [
            { validator: userNameRule, trigger: 'blur',required: true }
          ],
          pass: [
            { validator: passRule, trigger: 'blur' ,required: true}
          ],
          checkPass: [
            { validator: CheckPassRule, trigger: 'blur' ,required: true}
          ],
          age: [
            { validator: checkAge, trigger: 'blur' ,required: true}
          ],
          selectType:[
            { validator: checkAge, trigger: 'blur' ,required: true}
          ],
          agreeRemark:[
            { validator: checkAge, trigger: 'blur' ,required: true}
          ],
          rebateDuration:[
            { validator: checkAge, trigger: 'blur' ,required: true}
          ],
          remarks:[
            { validator: remarksRule, trigger: 'blur' ,required: true}
          ],
          phoneNumber:[
            { validator: phoneNumberRule, trigger: 'blur' }
          ],
        },
        userAdd:{
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
        },
        
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
        if( this.userAdd.userName != '' &&
            this.userAdd.userPsd != '' &&
            this.userAdd.userRePsd != '' && 
            this.userAdd.selectUserType != '0' &&
            this.userAdd.remark != ''
          ) {
          if(this.userAdd.selectUserType == '代理') {
            if( this.userAdd.rebateDuration != '0' &&
                this.userAdd.agreeRemark != '' &&
                this.userAdd.selectType != '0' ) {
              this.userAdd.isEmpty = false;
            } else {
              this.userAdd.isEmpty = true
            }
          } else {
            this.userAdd.isEmpty = false;
          }
          
        } else {
          this.userAdd.isEmpty = true;
        }
      },
      gotoRate() {
        this.$router.replace({path: '/play-setting/set-rate'});
      },
      checkRePsd() {
        // if(this.userAdd.userRePsd != this.userAdd.userPsd) {
        //   this.$message({
        //     message: '两次输入密码不一致，请重新输入！',
        //     duration: '1500',
        //     type: 'error'
        //   });
        //   this.userAdd.userRePsd = '';
        // }
      },
      checkPhone() {
        // if(!checkPhoneNumber(this.userAdd.phoneNumber)) {
        //   this.userAdd.phoneNumber = '';
        // }
      },
      addClickBtn: async function() {
        let params = {
          name: this.userAdd.userName,
          user_type: this.userAdd.selectUserType,
          password: this.userAdd.userPsd,
          re_password: this.userAdd.userRePsd,
          agree_remark: this.userAdd.agreeRemark,
          r_type: this.userAdd.selectType,
          phone_num: this.userAdd.phoneNumber,
          qq: this.userAdd.qq,
          remark: this.userAdd.remark,
          period: this.userAdd.rebateDuration
        }
        addUser(params).then(res => {
            if(res.id) {
               this.$message({
                  message: '成功添加'+res.user_type+':'+res.name,
                  type: 'success'
                });
              this.$router.replace({path: '/user-management/user_lists'});
            return;
            }
          
        });
        // const res = await $http.post(ADD_NEUSER, params, {'post': false});
        
        // if(res.data.exception == 200) {
        //  this.userAdd.error_user_name = res.message.name;
        // }
      }
    }
  }

</script>