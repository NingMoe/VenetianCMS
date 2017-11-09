<template>
	<el-form ref="form" :model="account" label-width="100px" @submit.prevent="onSubmit" style="margin:0 auto;width:300px;min-width:300px;margin-top:20px;">
        <el-form-item label="收款人姓名" >
			<el-input v-model="account.name" placeholder="收款人姓名"></el-input>
		</el-form-item>
         <el-form-item label="银行名称" >
			<el-input v-model="account.name" placeholder="银行名称"></el-input>
		</el-form-item>
         <el-form-item label="银行账号" >
			<el-input v-model="account.name" placeholder="银行账号"></el-input>
		</el-form-item>
        <el-form-item>
            <el-button type="primary">确定</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				account: {
					name:"",
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>