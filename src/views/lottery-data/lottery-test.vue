<template>
	<section>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;margin-top:16px;" border>
			<el-table-column prop="name" label="彩种" min-width="120"  align="center">
			</el-table-column>
			<el-table-column prop="" label="期数" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="开奖时间" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="" label="参与人数" min-width="120" sortable  align="center">
			</el-table-column>
			<el-table-column prop="" label="总投注额" min-width="180" sortable align="center">
			</el-table-column>
            <el-table-column label="操作" min-width="80" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">确认开奖</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!--编辑界面-->
		<el-dialog title="修改限额" v-model="editFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="期数" >
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="开奖时间" >
					    <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
				</el-form-item>
                <el-form-item label="开奖号码" >
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { unusual, openUnusual } from '../../api/api';

	export default {
    data() {
      var checkOpenNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入开奖号码'));
        } else if(/^[0-9+,]+$/.test(value)) {
          callback();
        } else {
          callback(new Error('开奖号码只能是数字,+'));
        }
      };
      var checkTime = (rule, value, callback) => {
        if (!value || value == '') {
          callback(new Error('请选择开奖时间'));
        } else {
          callback();
        }
      };
      return {
        rules: {
          open_time: [
            { validator: checkTime, trigger: 'blur' }
          ],
          open_number: [
            { required: true, message: '请输入开奖号码', trigger: 'blur' },
            { validator: checkOpenNumber, trigger: 'blur' }
          ]
        },
        lotteryPlayTypes: [],
        dialogFormVisible: false,
        form: {
          gid: '',
          issue: '',
          open_time: '',
          open_number: ''
        },
        formLabelWidth: '80px'
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        unusual().then(res => this.lotteryPlayTypes = res);
      },
      open(index) {
        if (this.$refs['form'])
          this.$refs['form'].resetFields();
        this.form = Object.assign({}, this.lotteryPlayTypes[index]);
        this.dialogFormVisible = true;
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return
          }
          const date = new Date(this.form.open_time);
          let fmt = 'yyyy-MM-dd hh:mm:ss';
          var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日   
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
          };   
          if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
          for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
          this.form.open_time = fmt;
          openUnusual(this.form).then(() => {
            this.loadData();
            this.dialogFormVisible = false;
          })
        });
      }
    }
  }

</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>