<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      
			<el-form label-position="left" :inline="true" :model="search" ref="search" label-width="70px">
        <div>
          <el-form-item label="彩种类型">
            <template>
              <el-select v-model="values" placeholder="请选择彩种类型" @change="switchType">
                <el-option
                  v-for="item in type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.gid"
                  >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
        </div>
        
				<el-form-item label="期数" prop="name">
					<el-input v-model="search.issue" placeholder="请输入期数"></el-input>
				</el-form-item>
        <el-form-item label="日期范围" prop="time">
          <el-date-picker
            v-model="search.time"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            @change="getTimeVal($event)"
          >
          </el-date-picker>
        </el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSearch('search')">查询</el-button>
          <el-button @click="onReset('search')">重置</el-button>
				</el-form-item>
        
        
			</el-form>

		</el-col>
		<!--列表-->
		<el-table :data="data" v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;" border>
			<el-table-column prop="issue" label="期数" min-width="120"  align="center">
			</el-table-column>
			<el-table-column prop="open_time" label="开奖时间" min-width="100"  align="center">
			</el-table-column>
			<el-table-column prop="open_number" label="开奖数据" min-width="180"  align="center">
			</el-table-column>
			<el-table-column label="状态" min-width="120"  align="center">
        <template scope="scope">
          {{scope.row.open_number!=='等待开奖' ? '已开奖' : '未开奖'}}
        </template>
			</el-table-column>
			<el-table-column prop="total_people" label="参与人数" min-width="80"  align="center">
			</el-table-column>
      <el-table-column prop="amount_of_bet" label="投注金额" min-width="120"  align="center">
			</el-table-column>
      <el-table-column prop="amount_of_award" label="中奖金额" min-width="120"  align="center">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :total="total" :current-page="search.current_page" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>

	import { lotteryTypes, lotteryResult } from '../../api/api';

	export default {
		data() {
			return {
        listLoading:false,
         type: [],
        values: '',
				search: {
            current_page:1,
            issue:'',
            per_page:10,
            interval:'',
            time:[]
				},
				data: [],
				total: 0,
				page: 1,
			}
		},
		methods: {
      onReset(formName) {
        this.$refs[formName].resetFields();
        this.search.interval = '';
        this.search.issue = '';
        this.onSearch();
      },
      onSearch() {
        this.search.current_page = 1;
        this.getData();
      },
      pageChange(pageNo) {
        this.search.current_page = pageNo;
        this.getData();
      },
			switchType() {
        this.getData();
				// console.log(this.values);
      },
			getData() {
        this.listLoading=true
        let params={
          type:this.values,
          ask:this.search
        }
        if(this.values==''){
          params.type='1'
        }
				lotteryResult(params).then(res=>{
          // console.log(res);
          this.data=res.data
          this.total = res.total;
          this.listLoading=false
        })
      },
      getType(){
        lotteryTypes().then(res=>{
          this.type=res
          // console.log(res);
        })
      },
      getTimeVal(event) {
        if(event == '' || event == null) {
          this.search.interval = '';
          return;
        }
        let timeArr = event.split(' - ');
        this.search.interval = timeArr[0].trim() + ',' + timeArr[1].trim();
      }
		},
		mounted() {
      this.getType()
			this.getData();
		}
	}

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>