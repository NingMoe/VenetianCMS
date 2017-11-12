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
                <el-form-item label="充值类型">
                    <el-select v-model="search" placeholder="线上充值">
                    <el-option label="线上充值" value="whole"></el-option>
                    <el-option label="线下充值" value="alreadySubmit"></el-option>
                    </el-select>
                </el-form-item>



				<el-form-item>
          <el-button type="primary" @click="onSearch('search')">查询</el-button>
          <el-button @click="onReset('search')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="lists" highlight-current-row element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="order_id" label="充值编号" min-width="120" align="center">
			</el-table-column>
			<el-table-column prop="user_name" label="用户名" min-width="100" align="center">
			</el-table-column>
			<el-table-column label="上级关系" min-width="200" align="center">
         <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.referrers" placement="right">
            <section>
            {{scope.row.referrers}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
			<el-table-column prop="order_money" label="充值金额" min-width="120" align="center">
			</el-table-column>
			<el-table-column prop="money" label="实际到账" min-width="180" align="center">
			</el-table-column>
      <el-table-column label="充值银行" min-width="100" align="center">
        <template scope="scope">
          <section>
            {{ generateType(scope.row.type) }}
          </section>
        </template>
			</el-table-column>
      <el-table-column label="状态" min-width="100" align="center">
        <template scope="scope">
          <section :class="scope.row.code === 1 ? 'green' : scope.row.code === 2 ? 'red' : ''">
            {{ scope.row.code === 1 ? '已到账' : scope.row.code === 2 ? '已拒绝' : scope.row.code === -1 ? '已下单':'待确认' }}
          </section>
        </template>
			</el-table-column>
      <el-table-column prop="remark" label="备注" min-width="180" align="center">
			</el-table-column>
      <el-table-column label="充值时间" min-width="180" align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.create_time" placement="left">
            <section>
            {{scope.row.create_time}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
			<el-table-column label="操作" width="150" align="center">
				<template scope="scope">
          <section :class="scope.row.code === 1 ? 'green' : scope.row.code === 2 ? 'red' : ''" v-if="scope.row.code === 1 || scope.row.code === 2">
            {{ scope.row.code === 1 ? '已到账' : '已拒绝'}}
          </section>
          <section v-else-if="scope.row.code === -1">
            已下单
          </section>
          <section v-else>
            <el-button
            size="small"
            type="success"
            @click="pass(scope.$index, scope.row.id)">充值</el-button>
          <el-button
            size="small"
            type="danger"
            @click="reject(scope.$index, scope.row.id)">拒绝</el-button>
          </section>
        </template>
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
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { pagingRecharge, handleRecharge } from '../../api/api';

	export default {
    data() {
      return {
        total: 0,
        lists: [],
        search: {
          current_page: 1,
          per_page: 15,
          user_name: '',
          interval: '',
          time: []
        },
        codes: [{
          type: 'wxpay',
          name: '微信'
        }, {
          type: 'alipay',
          name: '支付宝'
        }, {
          type: 'bankpay',
          name: '银联'
        }]
      }
    },
    methods: {
      generateType(type) {
        const types = this.codes.filter(i => i.type === type);
        if (types.length > 0) {
          return types[0].name;
        }
        return '';
      },
      onReset(formName) {
        // this.$refs[formName].resetFields();
        this.search.interval = '';
        this.search.user_name = '';
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
        pagingRecharge(this.search).then(res => {
          this.lists = res.data;
          this.total = res.total;
        });
      },
      pass(i, id) {
        this.$prompt('请输入 ' + this.lists[i].user_name + ' 的实际到账金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[1-9][\d\.]*/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          handleRecharge({id: id, code: 1, money: value}).then((data) => {
            this.lists[i].code = 1;
            this.lists[i].money = value;
            this.$set(this.lists[i],'status', '已到账');
            this.$message({
              showClose: true,
              message: '到账成功',
              type: 'success'
            });
          });
        }).catch(() => {});
      },
      reject(i, id) {
        this.$confirm('您确定拒绝吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          handleRecharge({id: id, code: 2}).then((data) => {
              if (data.id.toString().length > 0) {
                this.lists[i].code = 2;
                this.$set(this.lists[i],'status', '已拒绝');
                this.$message({
                  showClose: true,
                  message: '拒绝成功',
                  type: 'success'
                });
              // } else {
              //   this.$message({
              //     showClose: true,
              //     message: '操作失败,请稍后重试',
              //     type: 'error'
              //   });
              }
            });
        }).catch(() => {});   
      }
    },
    mounted() {
      this.onSubmit();
    }
  }

</script>

<style scoped>
.green {
    color: green;
  }
  .red {
    color: red;
  }
    .toolbar{
        padding: 0px;
    }
</style>