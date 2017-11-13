<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search">
				<el-form-item label="彩票种类" prop="issue">
                    <el-select v-model="search._gid" placeholder="请选择彩种类型" @change="LotteryType">
                      <el-option
                          v-for="item in lotteryType"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id" >
                        </el-option>
                    </el-select>
                </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="risk_index" label="序号" width="120" align="center">
			</el-table-column>
			<el-table-column prop="game_name" label="玩法" width="100" align="center">
			</el-table-column>
			<el-table-column prop="node_name" label="玩法节点" width="100" align="center">
			</el-table-column>
			<el-table-column prop="content" label="投注内容" width="120" align="center">
			</el-table-column>
			<el-table-column prop="content_count_number" label="投注数量" min-width="180" align="center">
			</el-table-column>
            <el-table-column prop="risk_factor_number" label="风险系数" min-width="180" align="center">
			</el-table-column>
            <el-table-column prop="update_time" label="统计时间" min-width="180" align="center">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;"> -->
			</el-pagination>
		</el-col>


	
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getRisk,lotteryTypes } from '../../api/api';

		export default {
    data() {
      return {
        total: 0,
        data: [],
        lotteryType:[],
        formLabelWidth: '100px',
        search: {
          _gid:'',
        },
        loading: true
      }
    },
    methods: {
      pageChange(pageNo) {
        this.search.current_page = pageNo;
        this.onSubmit();
      },
      onSubmit() {
        this.loading=true
        let filter={
          gid:this.search._gid
        }
        if(this.search._gid==''){
          filter.gid='1'
        }
        getRisk(filter).then(res => {
          // let datas = res
          if(typeof res== 'object'){
            this.data = res
            this.loading=false
          }else{
            this.data = []
            this.loading=false                   
            // this.$message.error('暂无数据');
            // this.loading=true
          }
        });
        console.log(filter);
        
      },
      getLotteryTypes(){
        
        lotteryTypes().then(res => {
          this.lotteryType=res
        })
      },
      LotteryType(){
        console.log(this.search.gid);
      this.onSubmit();
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