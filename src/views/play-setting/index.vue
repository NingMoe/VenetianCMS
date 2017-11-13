<template>
    <section>
        <div style="overflow: hidden;padding: 20px;" class="tool-box">
            <el-form ref="form" v-model="selectVal" label-width="80px" style="width:60%;min-width:600px;float:left;">
                <el-form-item label="彩种类型">
                    <el-select v-model="selectVal" placeholder="请选择活动区域" @change="lotterySelect">
                      <el-option
                        v-for="(v, k) in lotteryType"
                        :key="v.id"
                        :label="v.name"
                        :value="v.id"
                      ></el-option>
                    </el-select>
                </el-form-item>
            
            </el-form>
            <div style="float:right;">
                <el-button type="primary" @click="gotoRate">动态设置赔率</el-button>
            </div>
        </div>
        
        
        <div class="play-body name-body">
            <div class="games" v-for="(v, k) in lotteryPlayItems" :key="k">
                <div class="game-name">{{`${v.game_name}---${v.node_name}`}}</div>
                <div class="game-body">

                    <div class="game-body-item" v-for="(v, k) in v.value" :key="k">
                        <div class="item-wrapper">
                            <div class="name">{{v.name}}</div>
                            <div class="per">
                                <div class="one">1:</div>
                                <div class="input-wrapper">
                                    <input type="number" name="" min="1" v-model="v.per">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="game-btn">
                    <el-button v-if="!v.node_online" type="success" size="small" @click="onlineChange(v.id, 1, k)">开启玩法</el-button>
                <el-button v-else type="danger" size="small" @click="onlineChange(v.id, 0, k)">关闭玩法</el-button>
                <el-button type="primary" size="small" @click="savePerChange($event, k)">保存修改</el-button>
                </div>
            </div>
            <div class="no-data">暂无数据</div>
        </div>
    </section>
</template>
<style scoped lang="scss">
.tool-box{
    .el-form-item {
        margin-bottom: 0px;
    }
}

.play-body{
    
    .games{
        text-align: center;
        background: #fff;
        border-radius: 5px;
        margin: 20px 0;
        // margin-right: 10px;
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
            width: calc(100% - 20px);
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
import { legalNumber, errorMessage } from '../../common/js/tools';
import { odds, updateOddInfo, updateOddNodeOnline, lotteryTypes } from '../../api/api';

  export default {
    data() {
      return {
        selectVal: '',
        lotteryPlayItems: [],
        lotteryType:[],
      }
    },
    mounted() {
      this.autoSelect();
      this.getLotteryTypes();
      
    },
    computed: {
      // ...mapGetters([
      //   'lotteryType',
      // ])
    },
    watch: {
      lotteryType: 'autoSelect'
    },
    methods: {
      getLotteryTypes(){
        lotteryTypes().then(res => {
          this.lotteryType=res
        })
      },
      gotoRate() {
        this.$router.replace({path: '/play-setting/set-rate'});
      },
      autoSelect() {
        if (this.lotteryType.length > 0) {
          this.selectVal = this.lotteryType[0].value;
        }
      },
      lotterySelect(val) {
        odds({gid: val}).then(res => {
          this.lotteryPlayItems = res;
        });
      },
      onlineChange(_id, isOnline, index) {
        updateOddNodeOnline({'id': _id, 'online': isOnline}).then( res => {
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
        }).then(() => {
          this.lotteryPlayItems[index].node_online = !this.lotteryPlayItems[index].node_online;
        })
      },
      savePerChange(event, index) {
        let temp = {};
        temp['id'] = this.lotteryPlayItems[index].id;
        temp.value = JSON.stringify(this.lotteryPlayItems[index].value);
        updateOddInfo(temp).then( res => {
          this.$message({
            message: '赔率修改成功！',
            type: 'success'
          });
        })
      },

      minLimit(event, key) {
        let ele = event.target;
        let minVal = ele.value;
        if(!legalNumber(ele, minVal)) {
          return;
        }
        let max = this.$refs[`maxLimit${key}`][0].value;
        if(max == '') {
          return;
        }
        if(Number(minVal) > Number(max)) {
          errorMessage('最低限额不能大于最高限额');
          ele.value = '';
          return;
        }
      },
      maxLimit(event, key) {
        let ele = event.target;
        let maxVal = ele.value;
        if(!legalNumber(ele, maxVal)) {
          return;
        }
        let min = this.$refs[`minLimit${key}`][0].value;
        if(min == '') {
          return;
        }
        if(Number(min) > Number(maxVal)) {
          errorMessage('最高限额不能小于最低限额');
          ele.value = '';
          return;
        }
      }
    }
  }
</script>