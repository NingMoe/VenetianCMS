<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search" ref="search">
				<el-form-item label="用户名" prop="user_name">
					<el-input v-model="search.user_name" placeholder="请输入用户名"></el-input>
				</el-form-item>
                <el-form-item label="IP" prop="ip">
					<el-input v-model="search.ip" placeholder="请输入IP地址"></el-input>
				</el-form-item>
        <el-form-item label="最后登录时间">
          <el-date-picker
            v-model="search.time"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSearch('search')">查询</el-button>
          <el-button @click="onReset('search')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;" >
			<el-table-column prop="user_name" label="用户名" min-width="120" align="center">
			</el-table-column>
			<el-table-column prop="login_ip" label="IP" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="login_place" label="地点" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="create_time" label="最后登录时间" min-width="120" align="center">
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
  
	import { pagingLoginLog } from '../../api/api';

export default {
    data() {
      return {
        listLoading:false,
        total: 0,
        data: [],
        search: {
          current_page: 1,
          per_page: 10,
          interval: '',
          user_name: '',
          ip: '',
          time: []
        }
      }
    },
    methods: {
      onReset(formName) {
        this.$refs[formName].resetFields();
        this.search.interval = '';
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
        pagingLoginLog(this.search).then(res => {
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