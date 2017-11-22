<template>
<section style="height:calc(100% - 100px);">
     <div class="title">
        <h5>主题</h5>
        <el-input v-model="advTitle" placeholder="主题"></el-input>
    </div>
        
    <div class="content">
        <h5>内容</h5>
        <quill-editor 
        :content="content"
        :options="editorOption"
        @change="onEditorChange($event)"
        ref="myQuillEditor"
        ></quill-editor>
    </div>
    <div>
        <el-button type="primary" @click="submitBtn" style="float:right;" >提交</el-button>
    </div>
</section>
   
</template>
<style lang="scss" scoped>
    .title{

    }
    .content{
        height:calc(100% - 62px);
        .quill-editor{
            height: calc(100% - 90px);
        }
    }
</style>

<script>
    import {addNotice, updateNotice } from '../../api/api';
    import { quillEditor } from 'vue-quill-editor'; // 导入quillEditor组件
    export default { 
    components: {
      quillEditor
    },
    data() {

      return{
        content: '',
        editorOption: {},
        advTitle: '',
        editType: '1',
        handleType: '0',
        id: '',
        send_author: window.localStorage.getItem('userName')
      }
    },
    methods: {
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorReady(editor) {
      },
      onEditorChange({ editor, html, text }) {
        this.content = html
      },
      submitBtn() {
        if(this.handleType == 'edit') {
          updateNotice({
            'id': this.id,
            'title': this.advTitle,
            'content': this.content,
            'send_author': this.send_author
          }).then(()=> {
            window.location.href="#/system-setting/adv_center"
          });
        } else if(this.handleType == 'add') {
          addNotice({
            'title': this.advTitle,
            'content': this.content,
            'send_author': this.send_author
          }).then(()=> {
            window.location.href="#/system-setting/adv_center"
          });
        }
      }
    },
    watch: {
      editType: 'changeRadio'
    },
    // get the current quill instace object.
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      this.advTitle = this.$route.query.title || '';
      this.content = this.$route.query.content || '';
      this.id = this.$route.query.id || '';
      if(this.advTitle != '') {
        this.handleType = 'edit';
      } else {
        this.handleType = 'add';
      }
    }
  }
</script>