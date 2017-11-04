<template>
	<el-form :rules="editFormRules" :inline="true" ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit" style="margin-top:20px;width:100%;">
		<div>
            <el-form-item label="增加用户类型">
                <el-select v-model="form.viptype">
                    <el-option label="会员" value="vip"></el-option>
                    <el-option label="代理" value="agent"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <hr/>
        <div>
            <el-form-item label="用户名" prop="name" >
                <el-input v-model="form.user" placeholder="请输入用户名" ></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="name" >
                <el-input v-model="form.user" placeholder="请输入用户密码"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="name" >
                <el-input v-model="form.user" placeholder="请输入重复密码"></el-input>
            </el-form-item>
        </div>
        <div v-if="form.viptype == 'agent'">
            <el-form-item label="反水类型" prop="name">
                <el-input v-model="form.user" placeholder="请输入反水类型"></el-input>
            </el-form-item>
            <el-form-item label="通过备注" prop="name">
                <el-input v-model="form.user" placeholder="请输入通过备注"></el-input>
            </el-form-item>
            <el-form-item label="反水周期" prop="name">
                <el-input v-model="form.user" placeholder="请输入反水周期"></el-input>
            </el-form-item>
        </div>
            
        <div>
            <el-form-item label="备注" prop="name">
                <el-input v-model="form.user" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.user" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="微信QQ">
                <el-input v-model="form.user" placeholder="请输入微信QQ"></el-input>
            </el-form-item>
        </div>
         <el-form-item>
            <el-button type="primary" >确定添加</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					viptype:'vip'
                },
                editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>