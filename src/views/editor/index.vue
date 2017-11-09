<template>
<section style="height:calc(100% - 100px);">
     <div class="title">
        <h5>主题</h5>
        <el-input v-model="title" placeholder="主题"></el-input>
    </div>
        
    <div class="content">
        <h5>内容</h5>
        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
    </div>
    <div>
        <el-button type="primary" v-on:click="getUsers" style="float:right;" >提交</el-button>
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
    import { quillEditor } from 'vue-quill-editor'; // 导入quillEditor组件
    export default {
        data: function(){
            return {
                title:'',
                content: '',                // 编辑器的内容
                editorOption: {             // 编辑器的配置
                    // something config
                }
            }
        },
        components: {
            quillEditor                 // 声明组件quillEditor
        }
    }
</script>