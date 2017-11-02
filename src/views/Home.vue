<template>
	<div  class="container" :class="collapsed?'v-collapsed':''">
		
		<el-row  class="main">
			<aside >
				<!--导航菜单-->
				<el-menu :default-active="$router.path" class="el-menu--dark" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router >
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" @click="addTag(child)">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>

			</aside>
		</el-row>



        <section class="content-container">
                <!-- 工具栏 -->
            <el-row  class="header">
                <el-col :span="10">
                    <div class="tools" @click.prevent="collapse">
                        <i class="fa fa-navicon"></i>
                    </div>
                    <el-row class="header-button">
                       <el-col :span="4" class="btn-box">
                           <a href="#/business-flow/general_bets" class="pan-btn green-btn">普通投注</a>
                       </el-col>
                        <el-col :span="4" class="btn-box">
                           <a href="#/user-management/user_lists" class="pan-btn tiffany-btn">用户列表</a>
                       </el-col>
                       <el-col :span="4" class="btn-box">
                           <a href="#/user-management/account_recharge" class="pan-btn yellow-btn">账号充值</a>
                       </el-col>
                       <el-col :span="4" class="btn-box">
                           <a  class="pan-btn pink-btn" @click="clearCache">清空缓存</a>
                       </el-col>
                       <el-col :span="4" class="btn-box">
                           <a  class="pan-btn pink-btn">关闭提醒</a>
                       </el-col>
                    </el-row>
                    
                </el-col>
                
                <el-col :span="4" class="userinfo">
                    
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="full-screen" @click.prevent="fullScreen">
                        <i class="fa fa-arrows-alt"></i>
                    </div>
                </el-col>
            </el-row>

         
            
            <el-row class="rowbox">
				<div class="grid-content bg-purple-light">
					<div class="breadcrumb-container">
						
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
                        <strong class="v-tag">
                            <a v-for="tag in dynamicTags" :href="tag.href" class="tags-view" @click="addTag()">
                                <el-tag :key="tag.name"  :closable="true" :close-transition="true" :type="tag.type" @close="handleCloses(tag)">
                                    {{tag.name}}
                                </el-tag>
                            </a>
                        </strong>
					</div>

					<div class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</div>
				</div>
            </el-row>
		</section>

        

        
	</div>
</template>

<script>
export default {
  data() {
    return {
      sysName: "威尼斯后台管理系统",
      collapsed: false,
      fullScreend: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      clearCacheLoading:false
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    fullScreen() {
      var docElm = document.documentElement;
      //W3C
      if (this.fullScreend) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          //FireFox
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          //Chrome等
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          //IE11
          elem.msRequestFullscreen();
        }
      }
      this.fullScreend = !this.fullScreend;
    },

    //头部标签
    handleCloses(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      window.history.go(-1);
    },
    addTag(tag) {
      //   console.log(tag);
      if (tag && typeof tag === "object") {
        let tagdata = {
          name: tag.name,
          type: "",
          href: "#" + tag.path
        };
        let _dynamicTags = this.dynamicTags;
        let s = true;
        for (let i = 0; i < _dynamicTags.length; i++) {
          if (
            tagdata.href == _dynamicTags[i].href &&
            tagdata.name == _dynamicTags[i].name
          ) {
            s = false;
          }
        }
        if (tagdata && s) {
          this.dynamicTags.push(tagdata);
          if (this.dynamicTags.length > 10) {
            console.log("超出了");
          }
        }
      } else {
      }
    },
    clearCache(){
        this.$message({
          showClose: true,
          message: '清空成功',
          type: 'success'
        });
    },
    selectTag(id) {}
  },

  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

.v-collapsed {
  .main {
    transform: translate(-140px) !important;
    .el-menu {
      transform: translate(132px) !important;
    }
  }
  .main:hover {
    width: calc(180px + 140px);
    box-shadow: 3px 0px 12px rgba(0, 0, 0, 0.5);
  }
  .main:hover .el-menu {
    transform: translate(140px) !important;
  }
  .content-container {
    margin-left: 40px !important;
  }
  .tools > .fa-navicon {
    transform: rotate(0deg) !important;
  }
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: $h;
    line-height: $h;
    background: $color-primary;
    color: rgb(72, 87, 106);
    overflow: hidden;
    .userinfo {
      text-align: right;
      padding-right: 8px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: rgb(72, 87, 106);
        img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo-width {
      width: 180px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 16px;
      width: 32px;
      height: $h;
      line-height: 70px;
      cursor: pointer;
      float: left;
    }
    .header-button {
      // margin-left: 16px;
      float: left;
      width: calc(100% - 64px);
      padding-top: 10px;
      .btn-box {
        position: relative;
      }
      .pan-btn {
        line-height: 14px;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        border: none;
        outline: none;
        transition: all 0.6s ease;
        position: relative;
        display: inline-block;
        text-decoration: none;
        overflow: hidden;
      }
      .pan-btn::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0;
        transition: all 0.4s ease;
        // background : #fff;
      }
      .pan-btn::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 2px;
        width: 0;
        transition: all 0.4s ease;
      }
      .pan-btn:hover {
        background: #fff;
      }
      .green-btn {
        background: #30b08f;
      }

      .tiffany-btn {
        background: #4ab7bd;
      }
      .yellow-btn {
        background: #fec171;
      }
      .pink-btn {
        background: #e65d6e;
      }

      //
      .green-btn:hover {
        color: #30b08f;
        border-radius: 3px;
      }
      .green-btn:hover::after {
        background: #30b08f;
        width: 100%;
      }
      .green-btn:hover::before {
        background: #30b08f;
        width: 100%;
      }

      .tiffany-btn:hover {
        color: #4ab7bd;
      }

      .tiffany-btn:hover::after {
        background: #4ab7bd;
        width: 100%;
      }
      .tiffany-btn:hover::before {
        background: #4ab7bd;
        width: 100%;
      }

      .yellow-btn:hover {
        color: #fec171;
      }
      .yellow-btn:hover::after {
        background: #fec171;
        width: 100%;
      }
      .yellow-btn:hover::before {
        background: #fec171;
        width: 100%;
      }

      .pink-btn:hover {
        color: #e65d6e;
      }

      .pink-btn:hover::after {
        background: #e65d6e;
        width: 100%;
      }
      .pink-btn:hover::before {
        background: #e65d6e;
        width: 100%;
      }
    }
    .fa-navicon {
      font-size: 30px;
      transition: all 0.25s ease;
      transform: rotate(90deg);
    }
    .full-screen {
      font-size: 30px;
      float: right;
      margin-right: 20px;
    }
    .el-dropdown {
      float: right;
      height: $h;
    }
  }

  .content-container {
    margin-left: 180px;
    height: 100%;
    // flex: 1;
    transition: all 0.25s ease;
    overflow: hidden;

    .breadcrumb-container {
      height: $h;
      line-height: $h;
      .v-tag {
        // width: 600px;
        float: left;
        color: #475669;
        // margin-left: 20px;
        .tags-view {
          margin-left: 20px;
        }
      }
      .breadcrumb-inner {
        height: $h;
        line-height: $h;
        float: left;
        margin-left: 12px;
      }
    }

    .content-wrapper {
      margin: 0px 10px 10px 10px;
      padding-left: 15px;
      background: #f2f2f2;
      box-sizing: border-box;
      overflow-y: scroll;
    }
    .rowbox {
      height: 100%;
      .grid-content {
        height: 100%;
        .content-wrapper {
          height: calc(100% - 120px);
        }
      }
    }
  }

  .main {
    width: 180px;
    position: fixed;
    top: 0;
    bottom: 0px;
    overflow: hidden;
    transition: all 0.25s ease;
    transform: translate(0px);
    z-index: 1001;
    // box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
    aside {
      overflow: hidden;
      height: 100%;
      position: relative;
      .el-menu {
        width: 197px;
        height: calc(100% + 17px);
        border-radius: 0px;
        overflow-y: scroll;
        transition: all 0.25s ease;
      }
      .collapsed {
        width: 56px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 56px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }

    // 折叠
  }
}
</style>