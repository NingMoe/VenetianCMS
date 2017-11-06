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
        <div v-for="game in setGames" v-if="form.lotteryClass == game.nav" class="play-body name-body">
            <div class="games" v-for="items in game.item">
                <div class="game-name">{{items.name}}</div>
                <div class="game-body">

                    <div class="game-body-item" v-for="item in items.item">
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
            <div class="no-data">暂无数据</div>
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
            width: calc(100% - 15px);
            padding: 10px;
            .el-button{
                min-width: 80px;
                width: 10%;
            }
        }
    }
    .no-data{
            color: #999;
            text-align: center;
            margin-top: 40px;
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
                    {nav:'cqssc',item:[
                        {name:'两面玩法---总和,龙虎',item:[
                            {name:'总和大',per:''},
                            {name:'总和小',per:''},
                            {name:'总和单',per:''},
                            {name:'总和双',per:''},
                            {name:'龙',per:''},
                            {name:'虎',per:''},
                            {name:'和',per:''},
                        ]},
                        {name:'1-5球---第一球',item:[
                            {name:'0',per:''},
                            {name:'1',per:''},
                            {name:'2',per:''},
                            {name:'3',per:''},
                            {name:'4',per:''},
                            {name:'5',per:''},
                            {name:'6',per:''},
                            {name:'7',per:''},
                            {name:'8',per:''},
                            {name:'9',per:''},
                            
                        ]},
                        {name:'1-5球---第二球',item:[
                            {name:'0',per:''},
                            {name:'1',per:''},
                            {name:'2',per:''},
                            {name:'3',per:''},
                            {name:'4',per:''},
                            {name:'5',per:''},
                            {name:'6',per:''},
                            {name:'7',per:''},
                            {name:'8',per:''},
                            {name:'9',per:''},
                            
                        ]},
                        {name:'1-5球---第三球',item:[
                            {name:'0',per:''},
                            {name:'1',per:''},
                            {name:'2',per:''},
                            {name:'3',per:''},
                            {name:'4',per:''},
                            {name:'5',per:''},
                            {name:'6',per:''},
                            {name:'7',per:''},
                            {name:'8',per:''},
                            {name:'9',per:''},
                            
                        ]},
                        {name:'1-5球---第四球',item:[
                            {name:'0',per:''},
                            {name:'1',per:''},
                            {name:'2',per:''},
                            {name:'3',per:''},
                            {name:'4',per:''},
                            {name:'5',per:''},
                            {name:'6',per:''},
                            {name:'7',per:''},
                            {name:'8',per:''},
                            {name:'9',per:''},
                            
                        ]},
                        {name:'1-5球---第五球',item:[
                            {name:'0',per:''},
                            {name:'1',per:''},
                            {name:'2',per:''},
                            {name:'3',per:''},
                            {name:'4',per:''},
                            {name:'5',per:''},
                            {name:'6',per:''},
                            {name:'7',per:''},
                            {name:'8',per:''},
                            {name:'9',per:''},

                        ]},
                        {name:'前中后---前三',item:[
                            {name:'豹子',per:''},
                            {name:'顺子',per:''},
                            {name:'对子',per:''},
                            {name:'半顺',per:''},
                            {name:'杂六',per:''},

                        ]},
                        {name:'前中后---中三',item:[
                            {name:'豹子',per:''},
                            {name:'顺子',per:''},
                            {name:'对子',per:''},
                            {name:'半顺',per:''},
                            {name:'杂六',per:''},

                        ]},
                        {name:'前中后---后三',item:[
                            {name:'豹子',per:''},
                            {name:'顺子',per:''},
                            {name:'对子',per:''},
                            {name:'半顺',per:''},
                            {name:'杂六',per:''},

                        ]},
                        {name:'两面玩法---两面第一球',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                        ]},
                        {name:'两面玩法---两面第二球',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                        ]},
                        {name:'两面玩法---两面第三球',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                        ]},
                        {name:'两面玩法---两面第四球',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                        ]},
                        {name:'两面玩法---两面第五球',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                        ]}
                    ]},
                    {nav:'xglhc',item:[
                        {name:'特码---大小单双',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                        ]},
                        {name:'特码---特码',item:[
                            {name:'01',per:''},
                            {name:'02',per:''},
                            {name:'03',per:''},
                            {name:'04',per:''},
                            {name:'05',per:''},
                            {name:'06',per:''},
                            {name:'07',per:''},
                            {name:'08',per:''},
                            {name:'09',per:''},
                            {name:'10',per:''},
                            {name:'12',per:''},
                            {name:'13',per:''},
                            {name:'14',per:''},
                            {name:'15',per:''},
                            {name:'16',per:''},
                            {name:'17',per:''},
                            {name:'18',per:''},
                            {name:'19',per:''},
                            {name:'20',per:''},
                            {name:'21',per:''},
                            {name:'22',per:''},
                            {name:'23',per:''},
                            {name:'24',per:''},
                            {name:'25',per:''},
                            {name:'26',per:''},
                            {name:'27',per:''},
                            {name:'28',per:''},
                            {name:'29',per:''},
                            {name:'30',per:''},
                            {name:'31',per:''},
                            {name:'32',per:''},
                            {name:'33',per:''},
                            {name:'34',per:''},
                            {name:'35',per:''},
                            {name:'36',per:''},
                            {name:'37',per:''},
                            {name:'38',per:''},
                            {name:'39',per:''},
                            {name:'40',per:''},
                            {name:'41',per:''},
                            {name:'42',per:''},
                            {name:'43',per:''},
                            {name:'44',per:''},
                            {name:'45',per:''},
                            {name:'46',per:''},
                            {name:'47',per:''},
                            {name:'48',per:''},
                            {name:'49',per:''},
                        ]},
                        {name:'特肖---特肖',item:[
                            {name:'鸡',per:''},
                            {name:'猴',per:''},
                            {name:'羊',per:''},
                            {name:'马',per:''},
                            {name:'蛇',per:''},
                            {name:'龙',per:''},
                            {name:'兔',per:''},
                            {name:'虎',per:''},
                            {name:'牛',per:''},
                            {name:'鼠',per:''},
                            {name:'猪',per:''},
                            {name:'狗',per:''},
                        ]},
                        {name:'波色---波色',item:[
                            {name:'红波',per:''},
                            {name:'绿波',per:''},
                            {name:'蓝波',per:''},
                            {name:'红单',per:''},
                            {name:'红双',per:''},
                            {name:'红大',per:''},
                            {name:'红小',per:''},
                            {name:'绿单',per:''},
                            {name:'绿双',per:''},
                            {name:'绿大',per:''},
                            {name:'绿小',per:''},
                            {name:'蓝单',per:''},
                            {name:'蓝双',per:''},
                            {name:'蓝大',per:''},
                            {name:'蓝小',per:''},
                            {name:'红大单',per:''},
                            {name:'红小单',per:''},
                            {name:'红大双',per:''},
                            {name:'红小双',per:''},
                            {name:'绿大单',per:''},
                            {name:'绿小单',per:''},
                            {name:'绿大双',per:''},
                            {name:'绿小双',per:''},
                            {name:'蓝大单',per:''},
                            {name:'蓝小单',per:''},
                            {name:'蓝大双',per:''},
                            {name:'蓝小双',per:''},
                        ]},
                        {name:'正码---正码',item:[
                            {name:'01',per:''},
                            {name:'02',per:''},
                            {name:'03',per:''},
                            {name:'04',per:''},
                            {name:'05',per:''},
                            {name:'06',per:''},
                            {name:'07',per:''},
                            {name:'08',per:''},
                            {name:'09',per:''},
                            {name:'10',per:''},
                            {name:'12',per:''},
                            {name:'13',per:''},
                            {name:'14',per:''},
                            {name:'15',per:''},
                            {name:'16',per:''},
                            {name:'17',per:''},
                            {name:'18',per:''},
                            {name:'19',per:''},
                            {name:'20',per:''},
                            {name:'21',per:''},
                            {name:'22',per:''},
                            {name:'23',per:''},
                            {name:'24',per:''},
                            {name:'25',per:''},
                            {name:'26',per:''},
                            {name:'27',per:''},
                            {name:'28',per:''},
                            {name:'29',per:''},
                            {name:'30',per:''},
                            {name:'31',per:''},
                            {name:'32',per:''},
                            {name:'33',per:''},
                            {name:'34',per:''},
                            {name:'35',per:''},
                            {name:'36',per:''},
                            {name:'37',per:''},
                            {name:'38',per:''},
                            {name:'39',per:''},
                            {name:'40',per:''},
                            {name:'41',per:''},
                            {name:'42',per:''},
                            {name:'43',per:''},
                            {name:'44',per:''},
                            {name:'45',per:''},
                            {name:'46',per:''},
                            {name:'47',per:''},
                            {name:'48',per:''},
                            {name:'49',per:''},
                        ]},
                        {name:'生肖连---一肖连',item:[
                            {name:'鸡',per:''},
                            {name:'猴',per:''},
                            {name:'羊',per:''},
                            {name:'马',per:''},
                            {name:'蛇',per:''},
                            {name:'龙',per:''},
                            {name:'兔',per:''},
                            {name:'虎',per:''},
                            {name:'牛',per:''},
                            {name:'鼠',per:''},
                            {name:'猪',per:''},
                            {name:'狗',per:''},
                        ]},
                        {name:'生肖连---二肖连',item:[
                            {name:'鸡',per:''},
                            {name:'猴',per:''},
                            {name:'羊',per:''},
                            {name:'马',per:''},
                            {name:'蛇',per:''},
                            {name:'龙',per:''},
                            {name:'兔',per:''},
                            {name:'虎',per:''},
                            {name:'牛',per:''},
                            {name:'鼠',per:''},
                            {name:'猪',per:''},
                            {name:'狗',per:''},
                        ]},
                        {name:'生肖连---三肖连',item:[
                            {name:'鸡',per:''},
                            {name:'猴',per:''},
                            {name:'羊',per:''},
                            {name:'马',per:''},
                            {name:'蛇',per:''},
                            {name:'龙',per:''},
                            {name:'兔',per:''},
                            {name:'虎',per:''},
                            {name:'牛',per:''},
                            {name:'鼠',per:''},
                            {name:'猪',per:''},
                            {name:'狗',per:''},
                        ]},
                        {name:'生肖连---四肖连',item:[
                            {name:'鸡',per:''},
                            {name:'猴',per:''},
                            {name:'羊',per:''},
                            {name:'马',per:''},
                            {name:'蛇',per:''},
                            {name:'龙',per:''},
                            {name:'兔',per:''},
                            {name:'虎',per:''},
                            {name:'牛',per:''},
                            {name:'鼠',per:''},
                            {name:'猪',per:''},
                            {name:'狗',per:''},
                        ]},
                        {name:'生肖连---五肖连',item:[
                            {name:'鸡',per:''},
                            {name:'猴',per:''},
                            {name:'羊',per:''},
                            {name:'马',per:''},
                            {name:'蛇',per:''},
                            {name:'龙',per:''},
                            {name:'兔',per:''},
                            {name:'虎',per:''},
                            {name:'牛',per:''},
                            {name:'鼠',per:''},
                            {name:'猪',per:''},
                            {name:'狗',per:''},
                        ]},
                        {name:'连码---四中四',item:[
                            {name:'01',per:''},
                            {name:'02',per:''},
                            {name:'03',per:''},
                            {name:'04',per:''},
                            {name:'05',per:''},
                            {name:'06',per:''},
                            {name:'07',per:''},
                            {name:'08',per:''},
                            {name:'09',per:''},
                            {name:'10',per:''},
                            {name:'12',per:''},
                            {name:'13',per:''},
                            {name:'14',per:''},
                            {name:'15',per:''},
                            {name:'16',per:''},
                            {name:'17',per:''},
                            {name:'18',per:''},
                            {name:'19',per:''},
                            {name:'20',per:''},
                            {name:'21',per:''},
                            {name:'22',per:''},
                            {name:'23',per:''},
                            {name:'24',per:''},
                            {name:'25',per:''},
                            {name:'26',per:''},
                            {name:'27',per:''},
                            {name:'28',per:''},
                            {name:'29',per:''},
                            {name:'30',per:''},
                            {name:'31',per:''},
                            {name:'32',per:''},
                            {name:'33',per:''},
                            {name:'34',per:''},
                            {name:'35',per:''},
                            {name:'36',per:''},
                            {name:'37',per:''},
                            {name:'38',per:''},
                            {name:'39',per:''},
                            {name:'40',per:''},
                            {name:'41',per:''},
                            {name:'42',per:''},
                            {name:'43',per:''},
                            {name:'44',per:''},
                            {name:'45',per:''},
                            {name:'46',per:''},
                            {name:'47',per:''},
                            {name:'48',per:''},
                            {name:'49',per:''},
                        ]},
                        {name:'连码---三中三',item:[
                            {name:'01',per:''},
                            {name:'02',per:''},
                            {name:'03',per:''},
                            {name:'04',per:''},
                            {name:'05',per:''},
                            {name:'06',per:''},
                            {name:'07',per:''},
                            {name:'08',per:''},
                            {name:'09',per:''},
                            {name:'10',per:''},
                            {name:'12',per:''},
                            {name:'13',per:''},
                            {name:'14',per:''},
                            {name:'15',per:''},
                            {name:'16',per:''},
                            {name:'17',per:''},
                            {name:'18',per:''},
                            {name:'19',per:''},
                            {name:'20',per:''},
                            {name:'21',per:''},
                            {name:'22',per:''},
                            {name:'23',per:''},
                            {name:'24',per:''},
                            {name:'25',per:''},
                            {name:'26',per:''},
                            {name:'27',per:''},
                            {name:'28',per:''},
                            {name:'29',per:''},
                            {name:'30',per:''},
                            {name:'31',per:''},
                            {name:'32',per:''},
                            {name:'33',per:''},
                            {name:'34',per:''},
                            {name:'35',per:''},
                            {name:'36',per:''},
                            {name:'37',per:''},
                            {name:'38',per:''},
                            {name:'39',per:''},
                            {name:'40',per:''},
                            {name:'41',per:''},
                            {name:'42',per:''},
                            {name:'43',per:''},
                            {name:'44',per:''},
                            {name:'45',per:''},
                            {name:'46',per:''},
                            {name:'47',per:''},
                            {name:'48',per:''},
                            {name:'49',per:''},
                        ]},
                        {name:'连码---二中二',item:[
                            {name:'01',per:''},
                            {name:'02',per:''},
                            {name:'03',per:''},
                            {name:'04',per:''},
                            {name:'05',per:''},
                            {name:'06',per:''},
                            {name:'07',per:''},
                            {name:'08',per:''},
                            {name:'09',per:''},
                            {name:'10',per:''},
                            {name:'12',per:''},
                            {name:'13',per:''},
                            {name:'14',per:''},
                            {name:'15',per:''},
                            {name:'16',per:''},
                            {name:'17',per:''},
                            {name:'18',per:''},
                            {name:'19',per:''},
                            {name:'20',per:''},
                            {name:'21',per:''},
                            {name:'22',per:''},
                            {name:'23',per:''},
                            {name:'24',per:''},
                            {name:'25',per:''},
                            {name:'26',per:''},
                            {name:'27',per:''},
                            {name:'28',per:''},
                            {name:'29',per:''},
                            {name:'30',per:''},
                            {name:'31',per:''},
                            {name:'32',per:''},
                            {name:'33',per:''},
                            {name:'34',per:''},
                            {name:'35',per:''},
                            {name:'36',per:''},
                            {name:'37',per:''},
                            {name:'38',per:''},
                            {name:'39',per:''},
                            {name:'40',per:''},
                            {name:'41',per:''},
                            {name:'42',per:''},
                            {name:'43',per:''},
                            {name:'44',per:''},
                            {name:'45',per:''},
                            {name:'46',per:''},
                            {name:'47',per:''},
                            {name:'48',per:''},
                            {name:'49',per:''},
                        ]},
                        {name:'连码---特串',item:[
                            {name:'01',per:''},
                            {name:'02',per:''},
                            {name:'03',per:''},
                            {name:'04',per:''},
                            {name:'05',per:''},
                            {name:'06',per:''},
                            {name:'07',per:''},
                            {name:'08',per:''},
                            {name:'09',per:''},
                            {name:'10',per:''},
                            {name:'12',per:''},
                            {name:'13',per:''},
                            {name:'14',per:''},
                            {name:'15',per:''},
                            {name:'16',per:''},
                            {name:'17',per:''},
                            {name:'18',per:''},
                            {name:'19',per:''},
                            {name:'20',per:''},
                            {name:'21',per:''},
                            {name:'22',per:''},
                            {name:'23',per:''},
                            {name:'24',per:''},
                            {name:'25',per:''},
                            {name:'26',per:''},
                            {name:'27',per:''},
                            {name:'28',per:''},
                            {name:'29',per:''},
                            {name:'30',per:''},
                            {name:'31',per:''},
                            {name:'32',per:''},
                            {name:'33',per:''},
                            {name:'34',per:''},
                            {name:'35',per:''},
                            {name:'36',per:''},
                            {name:'37',per:''},
                            {name:'38',per:''},
                            {name:'39',per:''},
                            {name:'40',per:''},
                            {name:'41',per:''},
                            {name:'42',per:''},
                            {name:'43',per:''},
                            {name:'44',per:''},
                            {name:'45',per:''},
                            {name:'46',per:''},
                            {name:'47',per:''},
                            {name:'48',per:''},
                            {name:'49',per:''},
                        ]},
                        {name:'正码1-6---正码1码',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                            {name:'合大',per:''},
                            {name:'合小',per:''},
                            {name:'合单',per:''},
                            {name:'合双',per:''},
                            {name:'红',per:''},
                            {name:'绿',per:''},
                            {name:'蓝',per:''},
                            {name:'尾大',per:''},
                            {name:'尾小',per:''},
                        ]},
                        {name:'正码1-6---正码2码',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                            {name:'合大',per:''},
                            {name:'合小',per:''},
                            {name:'合单',per:''},
                            {name:'合双',per:''},
                            {name:'红',per:''},
                            {name:'绿',per:''},
                            {name:'蓝',per:''},
                            {name:'尾大',per:''},
                            {name:'尾小',per:''},
                        ]},
                        {name:'正码1-6---正码3码',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                            {name:'合大',per:''},
                            {name:'合小',per:''},
                            {name:'合单',per:''},
                            {name:'合双',per:''},
                            {name:'红',per:''},
                            {name:'绿',per:''},
                            {name:'蓝',per:''},
                            {name:'尾大',per:''},
                            {name:'尾小',per:''},
                        ]},
                        {name:'正码1-6---正码4码',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                            {name:'合大',per:''},
                            {name:'合小',per:''},
                            {name:'合单',per:''},
                            {name:'合双',per:''},
                            {name:'红',per:''},
                            {name:'绿',per:''},
                            {name:'蓝',per:''},
                            {name:'尾大',per:''},
                            {name:'尾小',per:''},
                        ]},
                        {name:'正码1-6---正码5码',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                            {name:'合大',per:''},
                            {name:'合小',per:''},
                            {name:'合单',per:''},
                            {name:'合双',per:''},
                            {name:'红',per:''},
                            {name:'绿',per:''},
                            {name:'蓝',per:''},
                            {name:'尾大',per:''},
                            {name:'尾小',per:''},
                        ]},
                        {name:'正码1-6---正码6码',item:[
                            {name:'大',per:''},
                            {name:'小',per:''},
                            {name:'单',per:''},
                            {name:'双',per:''},
                            {name:'合大',per:''},
                            {name:'合小',per:''},
                            {name:'合单',per:''},
                            {name:'合双',per:''},
                            {name:'红',per:''},
                            {name:'绿',per:''},
                            {name:'蓝',per:''},
                            {name:'尾大',per:''},
                            {name:'尾小',per:''},
                        ]},
                    ]},
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