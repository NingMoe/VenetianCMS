<template>
	<el-form ref="form" :model="account" label-width="80px" @submit.prevent="onSubmit" style="margin:0 auto;width:300px;min-width:300px;margin-top:20px;">
        <el-form-item label="基础额度" >
			<el-input v-model="account.name" placeholder="基础额度"></el-input>
		</el-form-item>
         <el-form-item label="调整间隔" >
			<el-input v-model="account.name" placeholder="调整间隔"></el-input>
		</el-form-item>
         <el-form-item label="降低赔率" >
			<el-input v-model="account.name" placeholder="降低赔率"></el-input>
		</el-form-item>
        <div style="color: red;font-size: 14px;height:60px;line-height: 60px;text-align:center;">
            提示：修改后立即生效，请谨慎修改！
        </div>
        <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button >取消</el-button>
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