<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search" ref="search">
        <el-form-item label="日期范围">
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
		<el-table :data="data" v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column label="收件人" min-width="100"  align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.recipient" placement="top">
            <section>
            {{scope.row.recipient}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
			<el-table-column label="主题" min-width="100"  align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.title" placement="top">
            <section>
            {{scope.row.title}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
			<el-table-column label="内容" min-width="130"  align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.content" placement="top">
            <section>
            {{scope.row.content}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
			<el-table-column prop="create_time" label="时间" min-width="200" sortable  align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="80" align="center">
				<template scope="scope">
					<el-button type="warning" size="small" @click="recall(scope.$index, scope.row.id)">撤回</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :total="total" :current-page="search.current_page" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import { pagingOutbox, recallMessage } from '../../api/api';

 export default {
    data() {
      return {
        listLoading:false,
        total: 0,
        data: [],
        search: {
          per_page: 10,
          current_page: 1,
          user_name: '',
          interval: '',
          time: [],
          author: localStorage.getItem('userName')
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
        pagingOutbox(this.search).then(res => {
          console.log(res.data);
          this.data = res.data;
          this.total = res.maxCount;
        });
      },
      recall(i, id) {
          this.$confirm('您确定撤回此信息?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            recallMessage(id).then(() => {
              this.data.splice(i, 1);
              this.$message({
                type: 'success',
                message: '撤回成功'
              });
            });
          }).catch(() => {});
      },
      receiveUser(users) {
        const u =  users || [];
        let r = '';
        u.forEach(function(item, index, array) {
            if (index === 0) {
              r += item;
            } else {
              r += ',' + item;
            }
        });
        return r;
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