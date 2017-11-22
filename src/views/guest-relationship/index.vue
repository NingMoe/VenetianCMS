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
                        @change="dateChange($event)">
                    </el-date-picker>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSearch('search')">查询</el-button>
          <el-button @click="onReset('search')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="user_name" label="用户名" min-width="120"  align="center">
			</el-table-column>
			<el-table-column prop="create_time" label="申请时间" min-width="100" align="center">
			</el-table-column>
			<el-table-column label="反水类型" min-width="100"  align="center">
        <template scope="scope">
          {{ scope.row.r_type === 1 ? '按流水' : '按盈利'}}
        </template>
			</el-table-column>
			<el-table-column label="返现周期" min-width="120" align="center">
        <template scope="scope">
          {{ scope.row.period === 1 ? '日' : scope.row.period === 7 ? '周' : '月'}}
        </template>
			</el-table-column>
			<el-table-column label="申请说明" min-width="180"  align="center">
        <template scope="scope">
          <section class="item">
            {{scope.row.remark}}
          </section>
        </template>
			</el-table-column>
      <el-table-column label="通过备注" min-width="180" align="center">
        <template scope="scope">
          <section class="item">
            {{generet(scope.row)}}
          </section>
        </template>
			</el-table-column>
			<el-table-column label="操作" width="150" align="center">
				<template scope="scope">
          <section :class="scope.row.code === 1 ? 'green' : 'red'" v-if="scope.row.code === 1 || scope.row.code === 2">
            {{ scope.row.code === 1 ? '已通过' : '已拒绝'}}
          </section>
          <section v-else>
            <el-button
              size="small"
              type="success"
              @click="pass(scope.$index)">通过</el-button>
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
			<el-pagination layout="total,prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :total="total" :current-page="search.current_page" style="float:right;">
			</el-pagination>
		</el-col>

    <el-dialog title="审核通过" :visible.sync="dialogFormVisible" size="tiny" inline>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="反水类型" :label-width="formLabelWidth" prop="r_type">
          <el-select v-model="form.r_type" placeholder="请选择反水类型">
            <el-option
              v-for="item in rTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <i style="color: red;">*</i>
        </el-form-item>
        <el-form-item label="返现周期" :label-width="formLabelWidth" prop="period">
          <el-select v-model="form.period" placeholder="请选择返现周期">
            <el-option
              v-for="item in periods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <i style="color: red;">*</i>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="agree_remark">
          <el-input style="width:195px;" v-model="form.agree_remark" auto-complete="off" required></el-input>
          <i style="color: red;">*</i>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
	</section>
</template>

<script>

	import { pagingRelationship, handleReferrerapplication } from '../../api/api';

export default {
    data() {
      return {
        listLoading:false,
        rules: {
          agree_remark: [
            { required: true, message: '请输入备注', trigger: 'change'}
          ],
          // r_type: [
          //   { required: true, message: '请选择反水类型', trigger: 'change'}
          // ]
        },
        total: 0,
        data: [],
        dialogFormVisible: false,
        search: {
          per_page: 10,
          current_page: 1,
          user_name: '',
          interval: '',
          time: []
        },
        rTypes: [{
          label: '按流水',
          value: 1
        },{
          label: '按盈利',
          value: 2
        }],
        periods: [{
          label: '天',
          value: 1
        },{
          label: '周',
          value: 7
        }, {
          label: '月',
          value: 30
        }],
        form: {
          index: '',
          id: '',
          code: '',
          period: 1,
          agree_remark: '',
          r_type: 1
        },
        formLabelWidth: '100px'
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            handleReferrerapplication({id: this.form.id, code: this.form.code, period: this.form.period, agree_remark: this.form.agree_remark, r_type: this.form.r_type})
            .then(() => {
              const data = this.data[this.form.index];
              data.code = this.form.code;
              data.period = this.form.period;
              data.agree_remark = this.form.agree_remark;
              this.$set(data, 'r_type', this.form.r_type);
              this.dialogFormVisible = false;
              this.$message({
                type: 'success',
                message: '审核成功'
              });
            });
          }
        });  
      },
      pass(index) {
        this.form = Object.assign({}, this.data[index]);
        this.form.index = index;
        this.form.code = 1;
        if (this.$refs['form'])
          this.$refs['form'].resetFields();

        this.dialogFormVisible = true;
      },
      generet(item) {
        if(item.code === 1) {
          return item.agree_remark;
        } else if (item.code === 2) {
          return ''
        } else {
          return ''
        }
      },
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
        pagingRelationship(this.search).then(res => {
          this.data = res.data;
          this.total = res.total;
        });
      },
      handle(i, id, code) {
        this.$confirm('您确定驳回申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          handleReferrerapplication({id: id, code: code, period: this.data[i].period})
            .then(() => {
              this.$set(this.data[i], 'code', code);              
              this.$message({
                type: 'success',
                message: '审核成功'
              });
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
    .toolbar{
        padding: 0px;
    }
</style>