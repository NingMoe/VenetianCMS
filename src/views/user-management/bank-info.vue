<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search" ref="search">
				<el-form-item label="用户名" prop="user_name">
					<el-input v-model="search.user_name" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSearch('search')">查询</el-button>
          <el-button @click="onReset('search')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;">
			<el-table-column prop="user_name" label="用户名" min-width="120" align="center">
			</el-table-column>
			<el-table-column prop="type" label="银行名称" min-width="180" align="center">
			</el-table-column>
			<el-table-column prop="bank_account" label="银行账号" min-width="180"  align="center">
			</el-table-column>
			<el-table-column prop="name" label="开户姓名" min-width="180"  align="center">
			</el-table-column>
			<el-table-column prop="open_name" label="开户行" min-width="180"  align="center">
			</el-table-column>
			<el-table-column label="操作" min-width="180" align="center">
				<template scope="scope">
          <section>
          <el-button
            size="small"
            type="info"
            @click="handle(scope.$index, scope.row.id)">编辑</el-button>
          </section>
        </template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="pageChange" :page-size="search.per_page" :total="total" :current-page="search.current_page" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="银行信息修改" :visible.sync="editFormVisible" size="tiny">
            <el-form :model="editForm" label-width="100px" ref="editForm" :rules="rules">
                <el-form-item label="用户名" >
                    <el-input v-model="editForm.user_name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="银行名称" prop="type">
                    <el-input v-model="editForm.type"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" prop="bank_account">
                    <el-input v-model="editForm.bank_account"></el-input>
                </el-form-item>
                <el-form-item label="开户姓名" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="开户行名称" prop="open_name">
                    <el-input v-model="editForm.open_name"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitEditForm">确 定</el-button>
			      </div>
		</el-dialog>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { pagingBankInfo, updateBankInfo } from '../../api/api';

	export default {
    data() {
      return {
        listLoading:false,
        total: 0,
        data: [],
        search: {
          current_page: 1,
          per_page: 10,
          user_name: '',
        },
        editFormVisible: false,
        editForm: {
          id: '',
          uid: '',
          name: '',
          type: '',
          bank_account: '',
          user_name: '',
          open_name: '',
          // password: ''
        },
        rules: {
          type: [
            { required: true, message: '银行类型不能为空', trigger: 'blur' }
          ],
          bank_account: [
            { required: true, message: '银行账号不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          open_name: [
            { required: true, message: '开户行不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onReset(formName) {
        this.$refs[formName].resetFields();
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
      onSubmit() {
        pagingBankInfo(this.search).then(res => {
          this.total = res.total;
          this.data = res.data;
        });
      },
      handle(index, id) {
        if (this.$refs['editForm'])
          this.$refs['editForm'].resetFields();
        Object.assign(this.editForm, this.data[index]);
        // this.editForm  = this.data[index];
        this.editForm.index = index;

        this.editFormVisible = true;
      },
      submitEditForm() {
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            updateBankInfo(this.editForm).then(() => {
              Object.assign(this.data[this.editForm.index], this.editForm);
              this.editFormVisible = false;
              this.$message({
                type: 'success',
                message: '更新银行信息成功'
              });
            });
          }
        })
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