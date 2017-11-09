<template>
	<el-form ref="form" :model="account" label-width="100px" @submit.prevent="onSubmit" style="margin:0 auto;width:350px;min-width:350px;margin-top:20px;">
        <el-form-item label="网站状态" >
			<el-tooltip :content="'当前状态: ' + status" placement="top">
                <el-switch
                    v-model="status"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="开"
                    off-value="关">
                </el-switch>
            </el-tooltip>
		</el-form-item>
         <el-form-item label="网站模式" >
			<template>
                <el-radio class="radio" v-model="radio" label="1">盈利模式</el-radio>
                <el-radio class="radio" v-model="radio" label="2">预设模式</el-radio>
            </template>
		</el-form-item>
         <el-form-item label="预设开奖条数" >
			 <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
             <el-button type="primary">更新</el-button>
		</el-form-item>
        <el-form-item label="清理数据" >
            <el-tooltip placement="top">
                <div slot="content">清理<span style="color:#FF4949;">{{input2}}</span>天投注、开奖历史、返奖等除了反水的一切用户活动数据<br/>第二行信息</div>
                <el-input
                placeholder="请输入天数"
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick">
                <el-button slot="append" icon="delete" ></el-button>
                </el-input>
            </el-tooltip>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				account: {
					name:"",
                },
                status:'',
                radio:'1',
                num1:'',
                input2:'0'
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>