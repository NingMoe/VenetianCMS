<template>
	<el-form ref="form" :model="ruleForm" label-width="80px" :rules="rules" style="margin:0 auto;width:300px;min-width:300px;margin-top:20px;">
    <el-form-item label="基础额度" prop="threshold_first">
			<el-input v-model="ruleForm.threshold_first" placeholder="请输入基础额度" @change="checkFall"></el-input>
		</el-form-item>
    <el-form-item label="调整间隔" prop="threshold">
			<el-input v-model="ruleForm.threshold" placeholder="请输入调整间隔" @change="checkFall"></el-input>
		</el-form-item>
    <el-form-item label="降低赔率" prop="proportion">
			<el-input v-model="ruleForm.proportion" placeholder="请输入降低赔率" @change="checkFall"></el-input>
		</el-form-item>
        <div style="color: red;font-size: 14px;height:60px;line-height: 60px;text-align:center;">
            提示：修改后立即生效，请谨慎修改！
        </div>
        <el-form-item>
            <el-button type="primary" :disabled="isEmpty" @click="submit">确定</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
import { legalNumber, errorMessage } from '../../common/js/tools';
import { updateGlobalSetting, getGlobalSetting } from '../../api/api';
export default {
  data() {
      return {
        ruleForm: {
          threshold_first: '',
          threshold: '',
          proportion: '',
        },
        isEmpty: true,
        rules: {
          threshold_first: [
            { required: true, message: '请输入基础额度', trigger: 'blur' },
            { type: 'string', message: '请输入数字', trigger: 'blur', pattern: /^[1-9][\d\.]{0,}$/ }
          ],
          threshold: [
            { required: true, message: '请输入间隔数值', trigger: 'blur' },
            { type: 'string', message: '请输入数字', trigger: 'blur', pattern: /^[1-9][\d\.]{0,}$/ }
          ],
          proportion: [
            { required: true, message: '请输入赔率', trigger: 'blur' },
            { type: 'string', message: '请输入数字', trigger: 'blur', pattern: /^[0-9][\d\.]{0,}$/ }
          ],
        }
      }
  },
  mounted() {
    getGlobalSetting().then(res => this.ruleForm = res);
  },
  methods: {
    checkFall() {
      if(this.ruleForm.threshold_first != '' && this.ruleForm.threshold != '' && this.ruleForm.proportion != '') {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    },
    chcekLegality(event) {
      let ele = event.target;
      legalNumber(ele, ele.value);
    },
    submit() {
      updateGlobalSetting(this.ruleForm).then(() => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
      })
    }
  }
}
</script>