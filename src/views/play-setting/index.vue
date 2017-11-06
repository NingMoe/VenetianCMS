<template>
    <section>
        <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="彩种类型">
                <el-select v-model="form.lotteryClass" placeholder="请选择活动区域">
                    <el-option label="重庆时时彩" value="cqssc"></el-option>
                    <el-option label="香港六合彩" value="xglhc"></el-option>
                    <el-option label="北京PK拾" value="bjpks"></el-option>
                    <el-option label="幸运农场" value="xync"></el-option>
                    <el-option label="江苏骰宝" value="jssb"></el-option>
                    <el-option label="澳门2分彩" value="am2fc"></el-option>
                    <el-option label="急速六合一" value="jslhy"></el-option>
                </el-select>
            </el-form-item>
            
        </el-form>
        <div v-if="form.lotteryClass == 'cqssc'" class="play-body name-body">
            <div class="games" v-for="game in setGames">
                <div class="game-name">{{game.name}}</div>
                <div class="game-body">

                    <div class="game-body-item" v-for="item in game.item">
                        <div class="item-wrapper">
                            <div class="name">{{item.name}}</div>
                            <div class="per">
                                <div class="one">1:</div>
                                <div class="input-wrapper">
                                    <input type="number" name="" min="1">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="game-btn">
                    <el-button type="danger" size="small">关闭玩法</el-button>
                    <el-button type="primary" size="small">保存修改</el-button>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">

.play-body{

    .games{
        text-align: center;
        background: #fff;
        border-radius: 5px;
        margin: 20px 0;
        margin-right: 10px;
        padding: 10px 0;
        .game-name{
            width: 100%;
            line-height: 28px;
            margin-bottom: 10px;
        }
        .game-body{
            width: 100%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            .game-body-item{
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                width: 80px;
                margin-bottom: 10px;
                .item-wrapper{
                    width: 80px;
                    margin: 0 auto;
                    .name{
                        background: #30b08f;
                        color: #fff;
                        cursor: pointer;
                        border-radius: 5px;
                        line-height: 30px;
                    }
                    .per{
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        line-height: 30px;
                        .one{
                            -webkit-box-flex: 1;
                            -ms-flex: 1;
                            flex: 1;
                            text-align: right;
                        }
                        .input-wrapper{
                            -webkit-box-flex: 3;
                            -ms-flex: 3;
                            flex: 3;
                            line-height: 30px;
                            width: 100%;
                            input {
                                border: 0;
                                border-bottom: 1px solid #ccc;
                                padding: 0;
                                width: 70%;
                                line-height: 20px;
                                outline: none;
                            }
                        }
                    }
                }
            }
        }
        .game-btn{
            width: 100%;
            padding: 10px;
            .el-button{
                min-width: 80px;
                width: 10%;
            }
        }
    }
}
    
</style>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					lotteryClass: 'cqssc',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
                },
                setGames:[
                    {name:'两面玩法---总和,龙虎',item:[
                        {name:'总和大',per:''},
                        {name:'总和小',per:''},
                        {name:'总和单',per:''},
                        {name:'总和双',per:''},
                        {name:'龙',per:''},
                        {name:'虎',per:''},
                        {name:'和',per:''},
                    ]},
                    {name:'1-5球---第四球',item:[
                        
                    ]}
                ]
                    
                
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>