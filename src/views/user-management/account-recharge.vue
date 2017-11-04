<template>
	<el-form ref="form" :model="account" label-width="80px" @submit.prevent="onSubmit" style="margin:0 auto;width:300px;min-width:300px;margin-top:20px;">
        <el-form-item label="用户名" >
			<el-input v-model="account.name" placeholder="用户名"></el-input>
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
            <el-select v-model="account.viptype" placeholder="请选择类型">
            <el-option label="系统充值" value="rechargeSystem"></el-option>
            <el-option label="活动充值" value="rechargePromotion"></el-option>
        </el-select>
        </el-form-item>
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