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
                <el-form-item label="彩种类型">
                    <el-select v-model="search.lottery" placeholder="请选择类型">
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
		<el-table :data="data" highlight-current-row element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="order_id" label="单号" width="120" align="center">
			</el-table-column>
			<el-table-column prop="order_issue" label="期号" width="100" align="center">
			</el-table-column>
			<el-table-column prop="user_name" label="用户名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="create_time" label="投注时间" width="120" align="center">
			</el-table-column>
			<el-table-column prop="lottery_name" label="彩种" min-width="80" align="center">
			</el-table-column>
            <el-table-column prop="game_name" label="玩法" min-width="80" align="center">
			</el-table-column>
            <el-table-column prop="order_count" label="倍数" min-width="80" align="center">
			</el-table-column>
            <el-table-column prop="order_number" label="注数" min-width="80" align="center">
			</el-table-column>
      <el-table-column label="投注号码" min-width="80" align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.order_data" placement="right">
            <section>
            {{scope.row.order_data}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
            <el-table-column prop="order_money" label="投注金额" min-width="80" align="center">
			</el-table-column>
      <el-table-column label="中奖金额" min-width="80" align="center">
        <template scope="scope">
          <section v-if="scope.row.code === -1" class="green">
              未开奖
          </section>
          <section v-else-if="scope.row.code === 3" class="blue">
              已撤单
          </section>
          <section v-else :class="scope.row.jj > 0 ? 'red' : 'blue'">
              {{scope.row.jj}}
          </section>
        </template>
			</el-table-column>
			<el-table-column label="操作" min-width="150" align="center">
				<template scope="scope">
          <section>
            <el-button
            size="small"
            type="info"
            @click="review(scope.$index, scope.row.id)">查看</el-button>
          <el-button
            size="small"
            type="warning"
            @click="revoke(scope.$index, scope.row.id)" :disabled="scope.row.code === 3">撤单</el-button>
          <el-button
            size="small"
            type="danger"
            @click="status(scope.$index, scope.row.uid, 0)" :disabled="scope.row.user_status !== 1">冻结</el-button>
          </section>
        </template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change	="pageChange" :page-size="search.per_page" :current-page="search.current_page" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--查看-->
		<el-dialog title="投注详情" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="form" label-width="100px"  ref="editForm" :inline="true">
				<el-form-item label="彩种" >
					<el-input v-model="form.lottery_name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="玩法" >
					<el-input v-model="form.game_name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="投注人" >
					<el-input v-model="form.user_name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="投注人状态" >
					<el-input v-model="form.u_status" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="期号" >
					<el-input v-model="form.order_issue" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="单号" >
					<el-input v-model="form.order_id" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="时间" >
					<el-input v-model="form.create_time" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
        <el-form-item label="状态" >
					<el-input v-model="form.i_status" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
        <div>
          <el-form-item label="开奖号码" >
					    {{form.open_number}}
				  </el-form-item> 
        </div>
				<div>
          <el-form-item label="投注号码" >
					    {{form.order_data}}
				  </el-form-item>
        </div>
                
				<el-form-item label="注数" >
					<el-input v-model="form.order_number" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="倍数" >
					<el-input v-model="form.order_count" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
                <el-form-item label="投注金额" >
					<el-input v-model="form.order_money" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import {  pagingGeneralBets, withdrawals, updateUser, lotteryTypes} from '../../api/api';

  // import { mapGetters } from 'vuex';

	export default {
    data() {
      return {
        total: 0,
        data: [],
        lotteryType:[],
        dialogFormVisible: false,
        form: {
          open_number: ''
        },
        formLabelWidth: '100px',
        search: {
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
    computed: {
      // ...mapGetters([
      //   'lotteryType',
      // ])
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
        pagingGeneralBets(this.search).then(res => {
          this.total = res.total;
          const date = new Date;
          const year = date.getFullYear(); 
          res.data.forEach((d) => { 
              const a = d.create_time.split('-');
              let dd = '';
              a.forEach((value, index) => {
                if (index !== 0) {
                  dd += value + '-';
                }
              })
              d.create_time = dd.substring(0, dd.length -1);
              // d.create_time = d.create_time.replace(year+'-', ''); 
          });
          this.data = res.data;
        });
      },
      getLotteryTypes(){
        lotteryTypes().then(res => {
          this.lotteryType=res
        })
      },
      review(i, index) {
        this.form = this.data[i];
        this.form.u_status = this.form.user_status === 1 ? '正常' : '冻结';
        this.form.i_status = this.form.code === -1 ? '未开奖' : this.form.code === 2 ? '已中奖' : this.form.code === 1 ? '已开奖' : '已撤单';
        this.dialogFormVisible = true;
      },
      status(i, id, status) {
        const ms = status === 0 ? '冻结' : '解冻';
        this.$confirm(`您确定要${ms}此用户吗?`, '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateUser({ id: id, status: status }).then(res => {
              const user = this.data[i];
              const result = this.data.map(item => {
                if (item.uid == user.uid) {
                  item.user_status = status;
                }
                return item;
              });
              this.data = result;
              
              // this.$set(this.data[i],'user_status', status);
              this.$message({
                message: `${ms}成功`,
                type: 'success'
              });
            });
          }).catch(() => {});
      },
      edit(i, index) {

      },
      revoke(i, id) {
        this.$confirm('您确定要撤销此单吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          withdrawals({id: id, code: 3}).then(() => {
            this.$set(this.data[i],'code', 3);
            this.$message({
              message: `撤单成功`,
              type: 'success'
            });
          })
        }).catch(() => {});
      }
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