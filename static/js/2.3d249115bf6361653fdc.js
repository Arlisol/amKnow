webpackJsonp([2],{ALtT:function(t,e){},Blzh:function(t,e){},FO1L:function(t,e){},MpTN:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("YtJ0"),i={name:"LeftNav",props:["navMenus"],store:s.a,computed:{getCollapse:function(){return this.$store.state.collapsed}},methods:{showMenu:function(t,e){this.$refs.menuCollapsed.getElementsByClassName("submenu-hook-"+t)[0].style.display=e?"block":"none"}},watch:{getCollapse:function(){var t=document.getElementById("elmenu");0===t.offsetWidth&&(t.style.width="230px")}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{class:t.getCollapse?"menu-collapsed":"menu-expanded"},[n("el-menu",{directives:[{name:"show",rawName:"v-show",value:!t.getCollapse,expression:"!getCollapse"}],attrs:{"default-active":t.$route.path.substring(1),id:"elmenu","background-color":"#eef1f6","text-color":"#053343","active-text-color":"#409EFF","unique-opened":"",router:""}},[t._l(t.navMenus,function(e){return[e.childs?n("el-submenu",{key:e.entity.id,attrs:{index:e.entity.path}},[n("template",{slot:"title"},[n("i",{class:e.entity.icon}),t._v(" "),n("span",{staticStyle:{"padding-left":"4px"}},[t._v(t._s(e.entity.name))])]),t._v(" "),t._l(e.childs,function(e){return n("el-menu-item",{key:e.entity.id,attrs:{index:e.entity.path}},[t._v(t._s(e.entity.name))])})],2):n("el-menu-item",{key:e.entity.id,attrs:{index:e.entity.path}},[n("i",{class:e.entity.icon}),t._v(" "),n("span",{staticStyle:{"padding-left":"4px"}},[t._v(t._s(e.entity.name))])])]})],2),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.getCollapse,expression:"getCollapse"}],ref:"menuCollapsed",staticClass:"el-menu collapsed",staticStyle:{backgroundColor:"#eef1f6"}},t._l(t.navMenus,function(e){return n("li",{key:e.entity.id,staticClass:"el-submenu item"},[e.childs?[n("div",{staticClass:"el-submenu__title",attrs:{title:e.entity.name},on:{mouseover:function(n){return t.showMenu(e.entity.id,!0)},mouseout:function(n){return t.showMenu(e.entity.id,!1)}}},[n("i",{class:e.entity.icon})]),t._v(" "),n("ul",{staticClass:"el-menu submenu",class:"submenu-hook-"+e.entity.id,staticStyle:{backgroundColor:"#eef1f6"},on:{mouseover:function(n){return t.showMenu(e.entity.id,!0)},mouseout:function(n){return t.showMenu(e.entity.id,!1)}}},t._l(e.childs,function(e){return n("li",{key:e.entity.id,staticClass:"el-menu-item",class:t.$route.path=="/"+e.entity.path?"is-active":"put-color",on:{click:function(n){return t.$router.push(e.entity.path)}}},[t._v(t._s(e.entity.name))])}),0)]:[n("div",{staticClass:"el-submenu__title",class:t.$route.path=="/"+e.entity.path?"active":"",attrs:{title:e.entity.name},on:{click:function(n){return t.$router.push(e.entity.path)}}},[n("i",{class:e.entity.icon})])]],2)}),0)],1)},staticRenderFns:[]};var o=n("VU/8")(i,a,!1,function(t){n("zQRr")},null,null).exports,l={name:"Main",props:["navMenus"],store:s.a,computed:{getCollapse:function(){return this.$store.state.collapsed}},data:function(){return{parentName:"",childName:"",hasParent:!0,hasChild:!0}},mounted:function(){this.getBreadcrumbName(this.$route.path)},methods:{getBreadcrumbName:function(t){var e=this.navMenus;for(var n in e){if("/"+e[n].entity.path==t){this.hasParent=!0,this.hasChild=!1,this.parentName=e[n].entity.name;break}if(e[n].hasOwnProperty("childs")){this.hasParent=!0,this.hasChild=!0;var s=e[n].childs;for(var i in s)if("/"+s[i].entity.path==t){this.childName=s[i].entity.name,this.parentName=e[n].entity.name;break}}}}},watch:{$route:function(t){this.getBreadcrumbName(t.path)}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.getCollapse?"collapsed-main":"main"},[n("el-col",{attrs:{span:24}},[n("el-breadcrumb",{staticClass:"breadcrumb-inner"},[t.hasParent?n("el-breadcrumb-item",{class:t.hasChild?"normal-font":"bold-font"},[t._v(t._s(t.parentName))]):t._e(),t._v(" "),t.hasChild?n("el-breadcrumb-item",{staticClass:"bold-font"},[t._v(t._s(t.childName))]):t._e()],1)],1),t._v(" "),n("el-col",{staticClass:"content-wrapper",attrs:{span:24}},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("keep-alive",[t.$route.meta.keepAlive?n("router-view"):t._e()],1),t._v(" "),t.$route.meta.keepAlive?t._e():n("router-view")],1)],1)],1)},staticRenderFns:[]};var c=n("VU/8")(l,r,!1,function(t){n("FO1L")},null,null).exports,u={data:function(){return{systemName:"amKnow",image:""}},store:s.a,mounted:function(){this.image=JSON.parse(sessionStorage.getItem("userInf")).image},computed:{getCollapse:function(){return this.$store.state.collapsed}},methods:{logout:function(){var t=this;this.$confirm("确认退出吗?","提示",{cancelButtonClass:"btn-custom-cancel"}).then(function(){sessionStorage.clear(),t.$router.push("/login")}).catch(function(){})}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("el-col",{staticClass:"logo",class:t.getCollapse?"logo-collapse-width":"logo-width",attrs:{span:4}},[t._v("\n    "+t._s(t.getCollapse?"":t.systemName)+"\n    "),n("i",{directives:[{name:"show",rawName:"v-show",value:t.getCollapse,expression:"getCollapse"}],staticClass:"icon iconfont icon-tubiaozhizuomoban"})]),t._v(" "),n("el-col",{attrs:{span:4}},[n("div",{staticClass:"collapse-tool",on:{click:function(e){t.$store.state.isActive&&t.$store.commit("collapse")}}},[n("i",{class:t.getCollapse?"icon iconfont icon-right":"icon iconfont icon-left"})])]),t._v(" "),n("el-col",{staticClass:"user",attrs:{span:6}},[n("el-dropdown",[n("span",{staticClass:"el-dropdown-link user-span"},[n("img",{staticClass:"head-portrait",attrs:{src:t.image}})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[n("i",{staticClass:"icon iconfont icon-user"}),t._v(" "),n("span",{staticClass:"icon-span"},[t._v("个人信息")])]),t._v(" "),n("el-dropdown-item",[n("i",{staticClass:"icon iconfont icon-edit-square"}),t._v(" "),n("span",{staticClass:"icon-span"},[t._v("修改资料")])]),t._v(" "),n("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(e){return t.logout(e)}}},[n("i",{staticClass:"icon iconfont icon-poweroff"}),t._v(" "),n("span",{staticClass:"icon-span"},[t._v("退出")])])],1)],1)],1)],1)},staticRenderFns:[]};var d={name:"Home",components:{LeftNav:o,Main:c,Header:n("VU/8")(u,m,!1,function(t){n("ALtT")},null,null).exports},store:s.a,data:function(){return{menuData:[{entity:{id:"AM",name:"汽车管理",icon:"icon iconfont icon-box",path:"automobileMng"},childs:[{entity:{id:"AIM",name:"汽车信息管理",icon:"",path:"automobileInfMng"}},{entity:{id:"ABM",name:"汽车品牌管理",icon:"",path:"automobileBrandMng"}}]},{entity:{id:"SM",name:"库存管理",icon:"icon iconfont icon-similarproduct",path:"stockManage"}},{entity:{id:"DB",name:"Dashboard",icon:"icon iconfont icon-viewgallery",path:"Dashboard"}}]}},mounted:function(){var t=this,e=document.body.clientWidth;e<500?t.$store.commit("isShowModify",4):e>=500&&e<800?t.$store.commit("isShowModify",3):e>=800&&e<1100&&t.$store.commit("isShowModify",2),e<800&&t.$store.commit("collapseToTrue"),e<800&&t.$store.commit("isActiveToFalse"),window.onresize=function(){var n=document.body.clientWidth;e<500?t.$store.commit("isShowModify",4):e>=500&&n<800?t.$store.commit("isShowModify",3):n>=800&&n<1100?t.$store.commit("isShowModify",2):t.$store.commit("isShowModify",1),n<800&&0==t.$store.state.collapsed?t.$store.commit("collapseToTrue"):n>=800&&1==t.$store.state.collapsed&&t.$store.commit("collapseToFalse"),n<800?t.$store.commit("isActiveToFalse"):t.$store.commit("isActiveToTrue")}}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-row",{staticClass:"container"},[e("el-col",{staticClass:"header",attrs:{span:24}},[e("Header")],1),this._v(" "),e("el-col",{staticClass:"remain",attrs:{span:24}},[e("LeftNav",{attrs:{navMenus:this.menuData}}),this._v(" "),e("Main",{attrs:{navMenus:this.menuData}})],1)],1)},staticRenderFns:[]};var h=n("VU/8")(d,p,!1,function(t){n("Blzh")},null,null);e.default=h.exports},zQRr:function(t,e){}});
//# sourceMappingURL=2.3d249115bf6361653fdc.js.map