<template>
	
    <div class="mailbox">
        <div class="boxleft">
            <el-form ref="form" :model="form" label-width="80px">
            
            <el-form-item label="收件人">
                <el-select v-model="form.message_type" placeholder="请选择收件人" @change="messageTypeChange">
                <el-option label="全部会员" value="会员"></el-option>
                <el-option label="全部代理" value="代理"></el-option>
                <el-option label="部分会员" value="其他"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主题">
                <el-input v-model="mailTitle" placeholder="请输入主题"></el-input>
            </el-form-item>
            <el-form-item label="内容" >
                <el-input type="textarea" v-model="mailBody" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="send">发送</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="boxright" v-show="initRadio">
            <el-form ref="form" :model="search" label-width="100px">
                
                <el-form-item label="用户名或备注">
                    <el-input
                    placeholder="请输入用户名或备注"
                    icon="search"
                    v-model="search.user_name"
                    :on-icon-click="pagingUser">
                    </el-input>
                </el-form-item>
            </el-form>
    <el-table ref="multipleTable" :data="data" border v-loading="listLoading" element-loading-text="拼命加载中..." @selection-change="handleSelectionChange" style="width: 100%;">
			<el-table-column
            type="selection"
            class-name="cells"
            width="55">
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="100" sortable align="center">
			</el-table-column>
			<el-table-column prop="remark" label="备注" min-width="100"  align="center">
			</el-table-column>
		</el-table>
        </div>
    </div>
</template>


<style type="text/css" lang="scss" scoped>
  .mailbox{
      box-sizing: inherit;
      .boxleft{
            width: 600px;
            float: left;
            padding-top: 20px;
            line-height: 36px;
            padding-right: 20px;
            .box{
                height: 100px;
            }
      }
      .boxright{
        //   padding-left: 20px;
            padding-top: 20px;
            width: 40%;
            float: right;
            line-height: 36px;
      }
  }
</style>

<script>

import { pagingUser, sendMessage } from '../../api/api';
    
export default {
    data() {
        return {
          listLoading:false,
          options: [{
            value: '会员',
            label: '全部会员'
          }, {
            value: '代理',
            label: '全部代理'
          }, {
            value: '其他',
            label: '部分会员'
          }],
          form: {
            message_type: '其他',
          },
          initRadio: 1,
          mailTitle: '',
          mailBody: '',
          checkAll: false,
          checkedState: [],
          checkedLen: 0,
          total: 0,
          search: {
            user_name: '',
            per_page: 5,
            current_page: 1
          },
          data: [],
          selection: []
        }
    },
    mounted() {
      this.pagingUser();
    },
    methods: {
      pageChange(pageNo) {
        this.search.current_page = pageNo;
        this.pagingUser();
      },
      pagingUser() {
        pagingUser(this.search).then(res => {
          this.total = res.total;
          this.data = res.data;
        });
      },
      send() {
        if (this.form.message_type === '其他' && this.selection.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择收件人'
          });
          return
        } else if (this.mailTitle.trim() === '') {
          this.$message({
            type: 'error',
            message: '请填写主题'
          });
          return
        } else if (this.mailBody.trim() === '') {
          this.$message({
            type: 'error',
            message: '请填写内容'
          });
          return
        }
        let selects = ''
        this.selection.forEach(function(item, index, array) {
          if (index == 0) {
            selects += item.id;
          } else {
            selects += ',' + item.id;
          }
          
        });
        const params = {
          send_author: localStorage.getItem('userName'),
          message_type: this.form.message_type,
          users: selects,
          title: this.mailTitle,
          content: this.mailBody
        }
        sendMessage(params).then(() => {
          this.$message({
            type: 'success',
            message: '发送成功'
          });
          this.$router.replace({path: '/mail-management/mail-outbox'});
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.selection = val;
      },
      messageTypeChange(checkVal) {
        if ('其他' === checkVal) {
          this.initRadio = 1;
        } else {
          this.initRadio = 0;
          this.$refs.multipleTable.clearSelection();
        }
      }
    }
  }
</script>
