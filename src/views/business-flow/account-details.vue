<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search">
				<el-form-item label="用户名">
					<el-input v-model="search.user_name" placeholder="用户名"></el-input>
				</el-form-item>
                <el-form-item label="日期范围">
                    <el-date-picker
                        v-model="search.time"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="账变类型">
                    <el-select v-model="search.account_change_type" placeholder="请选择类型">
                        <el-option
                          v-for="item in accountType"
                          :key="item.id"
                          :label="item.type_name"
                          :value="item.type_id" >
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
		<el-table :data="data" highlight-current-row element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="order_id" label="单号" min-width="120" align="center">
			</el-table-column>
			<el-table-column prop="user_name" label="用户名" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="change_type" label="账变类型" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="num" label="变动金额" min-width="120" sortable align="center">
			</el-table-column>
			<el-table-column prop="this_balance" label="账户余额" min-width="180" sortable align="center">
			</el-table-column>
            <el-table-column prop="create_time" label="发生时间" min-width="180" sortable align="center">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :current-page="search.current_page" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { pagingAccountDetail,accountChangeTypes } from '../../api/api';

	export default {
    data() {
      return {
        pageSize: 10,
        pageNo: 1,
        total: 0,
        data: [],
        search: {
          per_page: 15,
          current_page: 1,
          user_name: '',
          interval: '',
          account_change_type: '',
          type: '',
          time: []       
        },
        accountType:[],
      }
    },
    computed: {
      // ...mapGetters([
      //   'lotteryType',
      //   'accountType'
      // ])
    },
    methods: {
      onReset(formName) {
        // this.$refs[formName].resetFields();
        this.search.interval = '';
        this.search.user_name = '';
        this.search.account_change_type = '';
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
        pagingAccountDetail(this.search).then(res => {
          this.data = res.data;
          this.total = res.total;
        });
      },
      getAccountType(){
        accountChangeTypes().then(res => {
          this.accountType=res;
                    console.log(res);

        })
      }
    },
    mounted() {
      this.onSubmit();
      this.getAccountType();
    }
  }

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>