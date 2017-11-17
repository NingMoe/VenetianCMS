<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search" ref="search">
        <el-form-item label="反水类型" prop="issue">
          <el-select v-model="search.r_type" placeholder="请选择彩种类型">
            <el-option
              v-for="(v, k) in fsTypes"
              :key="v.value"
              :label="v.label"
              :value="v.value"
              :disabled="v.disabled"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="反水时间选择" prop="issue">
          <el-select v-model="search.period" placeholder="请选择彩种类型">
            <el-option
              v-for="(v, k) in fsTimeSelect"
              :key="v.value"
              :label="v.label"
              :value="v.value"  
              ></el-option>
          </el-select>
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
            <el-form-item>
              <el-button type="primary" @click="init('search')">查询</el-button>
            </el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="agentDatas" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;" border>
			<el-table-column prop="user_name" label="用户名" min-width="120" align="center">

			</el-table-column>
			<el-table-column prop="r_type" label="反水类型" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="period" label="返现周期" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="previous_amount" label="上周期内流水" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="previous_gift" label="上周期活动赠送" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="previous_profit" label="上周期内盈亏" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="current_profit" label="本周期内盈亏" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="previous_recharge" label="上周期内充值" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="previous_system_recharge" label="上周期系统充值" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="next_period" label="周期时间节点" min-width="180" align="center">
			</el-table-column>
      <el-table-column prop="account_balance" label="账户余额" min-width="100" align="center">
			</el-table-column>
      <el-table-column label="操作" min-width="100" align="center">
        <template scope="scope">
        <el-button type="primary" size="small" @click="handOut($event, $index)">发放</el-button>
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
import { cashback, updateCashback } from "../../api/api";

export default {
  data() {
    return {
      listLoading: false,
      search: {
        user_name: "",
        interval: "",
        r_type: "",
        per_page: 10,
        current_page: 1,
        period: "",
        time: []
      },
      fsTypes: [
        {
          value: "",
          label: "请选择类型"
        },
        {
          value: "1",
          label: "流水返现"
        },
        {
          value: "2",
          label: "输赢返现"
        }
      ],
      fsTimeSelect: [
        {
          value: "",
          label: "全部显示"
        },
        {
          value: "1",
          label: "每日"
        },
        {
          value: "7",
          label: "每周"
        },
        {
          value: "30",
          label: "每月"
        }
      ],
      agentHead: [
        "用户名",
        "反水类型",
        "返现周期",
        "上周期内流水",
        "上周期活动赠送",
        "上周期内输赢",
        "上周期内净输赢",
        "本周期内输赢",
        "上周期内充值",
        "上周期系统充值",
        "周期时间节点",
        "会员剩余总额",
        "操作"
      ],
      agentDatas: [],
      total: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    periodChange(val) {
      this.search.period = val;
      this.init();
    },
    rTypeChange(val) {
      this.search.r_type = val;
      this.init();
    },
    agreeRemark(ag) {
      let reg = new RegExp(/^[\d-\.]+$/, "g");
      if (ag && reg.test(ag)) {
        return ag + "%";
      }
      return ag;
    },
    init() {
      cashback(this.search).then(res => {
        this.total = res.total;
        this.agentDatas = res.data;
      });
    },
    pageChange(pageNo) {
      this.search.current_page = pageNo;
      this.init();
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
    removeList(event, key) {
      this.$message({ message: "功能开发中..." });
      // let ele = event.target;
      // this.agentDatas = this.agentDatas.filter((val, i) => key != i);
    },
    handOut(event, index) {
      this.$prompt("请输入 " + this.agentDatas[index].user_name + " 的发放金额", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[1-9][\d\.]*$/,
        inputErrorMessage: "请输入数字"
      })
        .then(({ value }) => {
          if (+value > this.agentDatas[index].account_balance) {
            this.$message({
              showClose: true,
              message: "实际发放金额不能大于充值金额",
              type: "error"
            });
          } else {
            updateCashback({
              money: value,
              uid: this.agentDatas[index].id
            }).then(res => {
              // this.agentDatas = this.agentDatas.filter((val, index) => {
              //   if(key == index) {
              //     val.code = '1';
              //   }
              //   return val;
              // });
              this.init();
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.toolbar {
  padding: 0px;
}
</style>