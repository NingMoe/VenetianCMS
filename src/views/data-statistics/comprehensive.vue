<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search">
				<el-form-item label="用户名" prop="user_name">
                    <el-input v-model="search.user_name" placeholder="用户名"></el-input>
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
                
                <el-form-item>
                    <el-button type="primary" @click="onSearch('search')">查询</el-button>
                    <el-button @click="onReset('search')">重置</el-button>
                    <el-button @click="onReset('search')">返回上级</el-button>
                </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="user_name" label="用户名" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="user_type" label="类型" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="bet" label="投注金额" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="award" label="中奖金额" min-width="50" align="center">
			</el-table-column>
			<el-table-column prop="gift" label="活动赠送" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="system_recharge" label="系统充值" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="cashback" label="反水奖励" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="profit_of_platform" label="平台输赢" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="profit_of_team" label="团队输赢" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="bet_of_team" label="团队总流水" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="withdraw_of_team" label="团队提现总额" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="recharge_of_team" label="团队充值总额" min-width="50" align="center">
			</el-table-column>
            <el-table-column prop="balance_of_team" label="团队总余额" min-width="50" align="center">
			</el-table-column>
			<el-table-column label="操作" width="100" align="center">
				<template scope="scope">
          <el-button
            size="small"
            type="info"
            @click="viewJunior(scope.$index, scope.row.id)"
            v-if="scope.row.user_type === '代理'">
            查看下级
          </el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :total="total" :current-page="search.current_page" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { pagingIntegrativeStatistics, junior  } from '../../api/api';

  export default {
    data() {
      return {
        pageSize: 10,
        pageNo: 1,
        total: 0,
        data: [],
        search: {
          user_name: '',
          time: [],
          per_page: 10,
          current_page: 1,
          interval: '',
          id: ''
        }
      }
    },
    methods: {
      onReset(formName) {
        this.$refs[formName].resetFields();
        this.search.id = '';
        this.onSearch();
      },
      pageChange(pageNo) {
        this.search.current_page = pageNo;
        if (this.search.id) {
          this.viewJunior(-1, '');
        } else {
          this.onSubmit();
        }
      },
      onSearch() {
        this.search.current_page = 1;
        // if (this.search.id) {
        //   this.viewJunior(-1, '');
        // } else {
        this.onSubmit();
        // }
      },
      dateChange(event){
        if (!event) {
          this.search.interval = '';
          return;
        }
        const intervalArr = event.split(' - ');
        this.search.interval = intervalArr[0].trim() + ',' + intervalArr[1].trim();
      },
      viewJunior(index, id) {
        if (id) {
          this.search.id = id;
        }
        junior(this.search).then(res => {
          this.total = res.total;
          this.data = res.data;
        });
      },
      onSubmit() {
        pagingIntegrativeStatistics(this.search).then(res => {
          this.data = res.data;
          this.total = res.total;
        });
      }
    },
    mounted() {
      this.onSubmit();
    }
  }

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>