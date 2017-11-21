<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" v-on:click="addNotice">添加公告</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="lists" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中..." style="width: 100%;" border>
			<el-table-column prop="title" label="标题" min-width="120" align="center">
			</el-table-column>
			<el-table-column prop="send_author" label="作者" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="content" label="内容" min-width="100"  align="center">
        <template scope="scope">
          <div v-html="lists[scope.$index].content"></div>
        </template>
			</el-table-column>
			<el-table-column prop="create_time" label="日期" min-width="120"  align="center">
			</el-table-column>
      <el-table-column label="操作" min-width="150" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" @click="editorHTML($event, scope.$index)">编辑</el-button>
          <el-button type="danger" size="small" @click="removeList($event, scope.$index)">删除</el-button>
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

	import { deleteNotice, pagingNotice } from '../../api/api';

	export default {
      data() {
        return {
          listLoading:false,
          isEmpty: true,
          userInfo: '',
          total: 0,
          search: {
            per_page: 10,
            current_page: 1
          },
          lists: []
        }
      },
      mounted() {
        this.paging();
      },
      methods: {
        pageChange(pageNo) {

        },
        removeList(e, index) {
          let $this = this;
          deleteNotice($this.lists[index].id).then( res => {
            if(res.message == '删除成功') {
              $this.lists = $this.lists.filter((v, k) => {
                if(v.id != $this.lists[index].id) {
                  return v;
                }
              });
              this.total = this.total - 1;
            }
          })
        },
        addNotice() {
          this.$router.push({
            path: '/editor/index'
          })
        },
        paging() {
          pagingNotice(this.search).then(res => {
            this.total = res.total;
            this.lists = res.data;
          })
        },
        editorHTML(event, index) {
          this.$router.push({
            path: '/editor/index',
            query: {
              'id': this.lists[index].id,
              'title': this.lists[index].title,
              'content': this.lists[index].content
            }
          })
        }
      }
  }
</script>

<style scoped>
    .toolbar{
        padding: 0px;
    }
</style>