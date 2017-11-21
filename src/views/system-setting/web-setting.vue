<template>
	<el-form ref="form" label-width="100px" style="margin:0 auto;width:350px;min-width:350px;margin-top:20px;">
      <el-form-item label="网站状态" >
      <el-tooltip :content="'当前状态: ' + status" placement="top">
        <el-switch
          v-model="status"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="开"
          off-value="关"
          @change="toggle">
        </el-switch>
    </el-tooltip>
		</el-form-item>
    <el-form-item label="网站模式" >
			<template>
        <el-radio class="radio" v-model="setPresetModel" label="1" @change="togglePresetModel">预设模式</el-radio>        
        <el-radio class="radio" v-model="setPresetModel" label="2" @change="togglePresetModel">盈利模式</el-radio>
      </template>
		</el-form-item>
    <el-form-item label="预设开奖条数" >
			<el-input-number v-model="numbers" ></el-input-number>
      <el-button type="warning" size="small" @click="updateLimit">更新</el-button> 
		</el-form-item>
    <el-form-item label="清理数据" >
            <el-tooltip placement="top">
                <div slot="content">清理<span style="color:#FF4949;">{{limitData}}</span>天投注、开奖历史、返奖等除了反水的一切用户活动数据<br/>第二行信息</div>
                <el-input
                placeholder="请输入天数"
                v-model="limitData">
                <el-button slot="append" icon="delete" @click="handleClean"></el-button>
                </el-input>
            </el-tooltip>
		</el-form-item>
	</el-form>
</template>

<script>

  // import { mapGetters } from 'vuex';
  import { updatePresetModel, cleanUp, presupposenumber, updatePresupposenumber,presetModel } from '../../api/api';

export default {
    data() {
        return {
          status:'开',
          limitData: 0,
          numbers: 1,
          setPresetModel:''
        }
    },
    computed: {
      // ...mapGetters([
      //   'presetModel'
      // ])
    },
    mounted() {
      presupposenumber().then(res => this.numbers = res);
    },
    methods: {
      toggle() {
        this.status='开'
        this.$message({message:'功能开发中...'})
      },
      handleClean() {
        if (this.limitData == '' || this.limitData == 0) {
          this.$message({
            type: 'error',
            message: '请输入天数'
          });
          return
        }
        cleanUp({before: this.limitData}).then(() => {
            this.limitData = 0;
            this.$message({
              type: 'success',
              message: '清理数据成功'
            });
        })
      },
      getpresetModel(){
        presetModel().then(res =>{
          console.log(res)
          this.setPresetModel=res
        })
      },
      togglePresetModel() {
        const pre = this.presetModel ? '2' : '1';
        // const state = !this.presetModel;

        updatePresetModel({value: pre}).then(() => {
          this.$message({
            type: 'success',
            message: '更新模式成功'
          });
          // this.$store.dispatch('PresetModel', state);
        })
      },
      updateLimit() {
        updatePresupposenumber({value: this.numbers}).then(() => {
          this.$message({
            type: 'success',
            message: '更新预设开奖条数成功'
          });
        })
      }
    },
    mounted() {
        this.getpresetModel();
    },
  }

</script>