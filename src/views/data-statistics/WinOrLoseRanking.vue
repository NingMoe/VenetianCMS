<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search">
                <el-form-item>
                    <el-button type="danger" v-if="search.sort=='desc'" @click="changeRanking('desc')">盈利排行</el-button>
                    <el-button type="" v-if="search.sort=='asc'" @click="changeRanking('desc')">盈利排行</el-button>
                    <el-button type="success" v-if="search.sort=='asc'" @click="changeRanking('asc')">亏损排行</el-button>
                    <el-button type="" v-if="search.sort=='desc'" @click="changeRanking('asc')">亏损排行</el-button>
                </el-form-item>
                <el-form-item label="日期范围" prop="time">
                    <el-date-picker
                    v-model="search.time"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    @change="dateChange"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="彩票种类" prop="issue">
                    <el-select v-model="search.lottery" placeholder="请选择彩种类型">
                      <el-option
                          v-for="item in lotteryType"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id" >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSearch('search')">查询</el-button>
                  <el-button @click="onReset('search')">重置</el-button>
                </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column  type="index" prop="" label="排名ID" width="80" align="center">
			</el-table-column>
			<el-table-column prop="name" label="用户名" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="last_login_place" label="登录地点" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="last_login_time" label="最后登录时间" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="order_money" label="下注总额" min-width="50" align="center">
			</el-table-column>
      <el-table-column prop="award" label="中奖总额" min-width="50" align="center">
			</el-table-column>
      <el-table-column prop="profit" label="用户输赢" min-width="50" align="center">
			</el-table-column>
      <el-table-column prop="lotteryProfit" label="彩种盈亏" min-width="50" align="center">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-pagination layout="prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :total="total" :current-page="search.current_page" style="float:right;"> -->
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { lotteryTypes,getProfitDetails } from '../../api/api';

		export default {
    data() {
      return {
        total: 0,
        data: [],
        lotteryType:[],
        dialogFormVisible: false,
        loading:true,
        form: {
          open_number: ''
        },
        formLabelWidth: '100px',
        search: {
          sort:'desc',
          limit:'',
          current_page: 1,
          per_page: 10,
          user_name: '',
          interval: '',
          order_money: '',
          lottery: '',
          time: []
        },
      }
    },
    methods: {
      onReset(formName) {
        // this.$refs[formName].resetFields();
        this.search.interval = '';
        this.search.user_name = '';
        this.search.lottery = '';
        this.search.time = [];
        this.onSearch();
      },
      pageChange(pageNo) {
        this.search.current_page = pageNo;
        this.onSubmit();
      },
      onSearch() {
        this.search.current_page = 1;
        this.onSubmit();
      },
      dateChange(event){
        if (!event) {
          this.search.interval = '';
          return;
        }
        const intervalArr = event.split(' - ');
        this.search.interval = intervalArr[0].trim() + ',' + intervalArr[1].trim();
      },
      onSubmit() {
        this.loading=true
        let filter={
          sort:this.search.sort,
          limit:this.search.limit,
          interval:this.search.interval,
        }
        if(!this.search.lottery==''){
          filter.gid=this.search.lottery
        }
        getProfitDetails(filter).then(res => {
          // let datas = res
          this.data = res
          for(let i=0;i<this.data.length;i++){
            this.data[i].lotteryProfit=~this.data[i].profit
            // console.log(datas[i].name)
          }
          this.loading=false
          // this.data=res
          // console.log(res)
        });
        console.log(this.sort);
        
      },
      getLotteryTypes(){
        lotteryTypes().then(res => {
          
          this.lotteryType=res
        })
      },
      
      changeRanking(sort){
        this.search.sort = sort;
        // console.log(this.sort);
        this.onSubmit()
      },
      edit(i, index) {

      },
    },
    mounted() {
      this.onSubmit();
      this.getLotteryTypes()
      console.log(this.lotteryType)
    }
  }

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>