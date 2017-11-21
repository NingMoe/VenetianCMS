<template>
	<el-form ref="form" :model="form" :rules="rules" label-width="100px" style="margin:0 auto;width:300px;min-width:300px;margin-top:20px;">
    <el-form-item label="收款人姓名" prop="bank_user" >
			<el-input v-model="form.bank_user" placeholder="收款人姓名"></el-input>
		</el-form-item>
    <el-form-item label="银行名称" prop="bank_name">
			<el-input v-model="form.bank_name" placeholder="银行名称"></el-input>
		</el-form-item>
    <el-form-item label="银行账号" prop="bank_num">
			<el-input v-model="form.bank_num" placeholder="银行账号"></el-input>
		</el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确定修改</el-button>
    </el-form-item>
	</el-form>
</template>

<script>
  import { getAccountConfig, updateAccountConfig } from '../../api/api';
	export default {
  data() {
      return {
        form: {
          bank_user: '',
          bank_name: '',
          bank_num: '',
        },
        rules: {
          bank_user: [
            { required: true, message: '请输入收款人姓名', trigger: 'blur' },
          ],
          bank_name: [
            { required: true, message: '请输入银行名称', trigger: 'blur' },
          ],
          bank_num: [
            { required: true, message: '请输入银行账号', trigger: 'blur' },
          ],
        }
      }
  },
  mounted() {
    getAccountConfig().then(res => this.form = res);
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateAccountConfig(this.form).then(() => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
          })
        }
      });
      
    }
  }
}
</script>