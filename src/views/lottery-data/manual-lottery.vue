<template>
	<el-form :rules="rules" ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:300px;">
		<el-form-item label="彩票种类" prop="issue">
            <el-select v-model="form.lotteryClass" placeholder="请选择彩种类型">
            <el-option label="澳门2分彩" value="am2fc"></el-option>
            <el-option label="急速六合一" value="jslhy"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开奖时间" prop="issue">
            <el-date-picker
                v-model="form.value1"
                type="datetime"
                placeholder="选择日期时间" >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="期号" prop="issue" >
            <el-input v-model="form.issue" auto-complete="off" placeholder="请输入期号"></el-input>
        </el-form-item>
        <el-form-item label="开奖号码" prop="number">
            <el-input v-model="form.number" auto-complete="off" placeholder="请输入开奖号码"></el-input>
        </el-form-item>
        <el-form-item>
			<el-button type="primary" v-on:click="getUsers">查询</el-button>
            <el-button  @click="handleAdd">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
          value1:'',
      },
      rules:{
          issue:[
              { required: true, message: '请输入期号', trigger: 'blur' },
          ],
          number:[
              { required: true, message: '请输入开奖号码', trigger: 'blur' },
          ]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>