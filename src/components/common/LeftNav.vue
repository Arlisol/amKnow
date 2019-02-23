<template>
  <nav :class="getCollapse?'menu-collapsed':'menu-expanded'">
    <!--正常菜单-->
    <el-menu
      :default-active="$route.path.substring(1)"
      id="elmenu"
      background-color="#eef1f6"
      text-color="#053343"
      active-text-color="#409EFF"
      unique-opened
      router
      v-show="!getCollapse"
    >
      <template v-for="navMenu in navMenus">
        <el-submenu :index="navMenu.entity.path" v-if="navMenu.childs" :key="navMenu.entity.id">
          <template slot="title">
            <i :class="navMenu.entity.icon"></i>
            <span style="padding-left:4px">{{navMenu.entity.name}}</span>
          </template>
          <el-menu-item
            v-for="child in navMenu.childs"
            :index="child.entity.path"
            :key="child.entity.id"
          >{{child.entity.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="navMenu.entity.path" v-else :key="navMenu.entity.id">
          <i :class="navMenu.entity.icon"></i>
          <span style="padding-left:4px">{{navMenu.entity.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <!--折叠菜单-->
    <ul
      class="el-menu collapsed"
      v-show="getCollapse"
      ref="menuCollapsed"
      style="backgroundColor:#eef1f6"
    >
      <li v-for="navMenu in navMenus" :key="navMenu.entity.id" class="el-submenu item">
        <template v-if="navMenu.childs">
          <div
            class="el-submenu__title"
            @mouseover="showMenu(navMenu.entity.id,true)"
            @mouseout="showMenu(navMenu.entity.id,false)"
            :title="navMenu.entity.name"
          >
            <i :class="navMenu.entity.icon"></i>
          </div>
          <ul
            class="el-menu submenu"
            :class="'submenu-hook-'+navMenu.entity.id"
            @mouseover="showMenu(navMenu.entity.id,true)"
            @mouseout="showMenu(navMenu.entity.id,false)"
            style="backgroundColor:#eef1f6"
          >
            <li
              v-for="child in navMenu.childs"
              :key="child.entity.id"
              class="el-menu-item"
              :class="$route.path=='/'+child.entity.path?'is-active':'put-color'"
              @click="$router.push(child.entity.path)"
            >{{child.entity.name}}</li>
          </ul>
        </template>
        <template v-else>
          <div
            class="el-submenu__title"
            :class="$route.path=='/'+navMenu.entity.path?'active':''"
            @click="$router.push(navMenu.entity.path)"
            :title="navMenu.entity.name"
          >
            <i :class="navMenu.entity.icon"></i>
          </div>
        </template>
      </li>
    </ul>
  </nav>
</template>
<script>
import store from "@/vuex/store";
export default {
  name: "LeftNav",
  props: ["navMenus"],
  store,
  computed: {
    getCollapse() {
      return this.$store.state.collapsed;
    }
  },
  methods: {
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  watch: {
    getCollapse() {
      var elmenu = document.getElementById("elmenu");
      if (elmenu.offsetWidth === 0) {
        elmenu.style.width = "230px";
      }
    }
  }
};
</script>
<style>
nav {
  flex: 0 0 230px;
  width: 230px;
}
.el-menu {
  height: 100%;
}
.collapsed {
  width: 60px;
}
.submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}
.active i{
  color: #409eff;
}
.put-color{
  color: #053343;
}
.menu-collapsed {
  flex: 0 0 60px;
  width: 100%;
}
.menu-expanded {
  flex: 0 0 230px;
  width: 100%;
}
.el-submenu__title:hover {
  background-color: #d1dbe5 !important;
}
.el-menu-item:hover {
  background-color: #d1dbe5 !important;
}
</style>
