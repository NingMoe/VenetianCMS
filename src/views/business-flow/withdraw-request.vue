<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search" ref="search">
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
                <el-form-item label="状态">
                  <el-select v-model="search.code" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" >
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
			<el-table-column prop="user_name" label="用户名" min-width="120" align="center">
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
			<el-table-column prop="money" label="提现金额" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="bank_type" label="银行类型" min-width="120" align="center">
			</el-table-column>
			<el-table-column prop="bank_open_name" label="开户姓名" min-width="180"  align="center">
			</el-table-column>
      <el-table-column label="开户账号" min-width="180" align="center">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" v-bind:content="scope.row.bank_account" placement="right">
            <section>
            {{scope.row.bank_account}}
            </section>
          </el-tooltip>
        </template>
			</el-table-column>
      <el-table-column label="申请时间" min-width="180" align="center">
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
          <section v-if="scope.row.code === 1" class="pass">
            已通过
          </section>
          <section v-else-if="scope.row.code === 2" class="reject">
            已驳回
          </section>
          <section v-else>
            <el-button
            size="small"
            type="success"
            @click="handle(scope.$index, scope.row.id, 1)">通过</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handle(scope.$index, scope.row.id, 2)">驳回</el-button>
          </section>
        </template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" :page-size="search.per_page" :current-page="search.current_page" :total="total" @current-change	="pageChange" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import { drawRequest, handleDrawRequest } from "../../api/api";


export default {
  data() {
    return {
      total: 0,
      data: [],
      search: {
        per_page: 15,
        current_page: 1,
        user_name: "",
        interval: "",
        code: "",
        time: []
      },
      options: [
        {
          value: "",
          label: "显示全部"
        },
        {
          value: "-1",
          label: "已提交"
        },
        {
          value: "1",
          label: "已提现"
        },
        {
          value: "2",
          label: "已失败"
        }
      ]
    };
  },
  methods: {
    onReset(formName) {
      // this.$refs[formName].resetFields();
      this.search.interval = "";
      this.search.code = "";
      this.search.time = [];
      this.search.user_name = "";
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
    dateChange(event) {
      if (!event) {
        this.search.interval = "";
        return;
      }
      const intervalArr = event.split(" - ");
      this.search.interval =
        intervalArr[0].trim() + "," + intervalArr[1].trim();
    },
    onSubmit() {
      drawRequest(this.search).then(res => {
        this.data = res.data;
        this.total = res.total;
      });
    },
    handle(i, id, code) {
      this.$confirm(code === 1 ? "确定通过?" : "确定驳回?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          handleDrawRequest({ id: id, code: code }).then(res => {
            this.$message({
              showClose: true,
              message: "审核成功",
              type: "success"
            });

            this.$set(this.data[i], "code", code);
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.onSubmit();
  }
};
</script>

<style scoped>
.pass {
    color: green;
  }
  .reject {
    color: red;
  }
.toolbar {
  padding: 0px;
}
</style>