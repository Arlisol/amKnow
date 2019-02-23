<template>
  <header class="header">
    <el-col :span="4" class="logo" :class="getCollapse?'logo-collapse-width':'logo-width'">
      {{getCollapse?"":systemName}}
      <i
        v-show="getCollapse"
        class="icon iconfont icon-tubiaozhizuomoban"
      ></i>
    </el-col>
    <el-col :span="4">
      <div class="collapse-tool" @click="$store.state.isActive && $store.commit('collapse')">
        <i :class="getCollapse?'icon iconfont icon-right':'icon iconfont icon-left'"></i>
      </div>
    </el-col>
    <el-col :span="6" class="user">
      <el-dropdown>
        <span class="el-dropdown-link user-span">
          <img :src="image" class="head-portrait">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="icon iconfont icon-user"></i>
            <span class="icon-span">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="icon iconfont icon-edit-square"></i>
            <span class="icon-span">修改资料</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <i class="icon iconfont icon-poweroff"></i>
            <span class="icon-span">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </header>
</template>
<script>
import store from "@/vuex/store";
export default {
  data() {
    return {
      systemName: "amKnow",
      image: ""
    };
  },
  store,
  mounted() {
    this.image = JSON.parse(sessionStorage.getItem("userInf")).image;
  },
  computed: {
    getCollapse() {
      return this.$store.state.collapsed;
    }
  },
  methods: {
    //退出
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        cancelButtonClass: "btn-custom-cancel"
      })
        .then(() => {
          sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.header {
  background-color: #f6db63;
  color: #053343;
}
.logo {
  height: 100%;
  text-align: center;
  font-size: 24px;
  border-right: 1px solid #eef1f6;
}
.logo-width {
  width: 230px;
}
.logo-collapse-width {
  width: 60px;
}
.collapse-tool {
  padding: 0px 20px;
  width: 20px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.user {
  height: 60px;
  text-align: right;
  padding-right: 20px;
  float: right;
}
.user-span {
  cursor: pointer;
  height: 60px;
}
.head-portrait {
  width: 40px;
  border-radius: 20px;
  margin: 10px 35px 10px 35px;
  float: right;
}
.icon-span {
  padding-left: 4px;
}
</style>
