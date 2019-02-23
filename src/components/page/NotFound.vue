<template>
  <div class="not-found">
    <el-button
      type="text"
      icon="el-icon-arrow-left"
      class="back-to-index"
      @click.native.prevent="$router.push({ path: '/automobileInfMng' })"
    >返回首页</el-button>
  </div>
</template>
<script>
export default {
  name: "NotFound"
};
</script>
<style scoped>
.not-found {
  height: 100%;
  width: 100%;
  background: url("../../../static/gif/404.gif");
  background-size: 100% 100%;
}
.back-to-index {
  position: fixed;
  top: 86%;
  left: 45%;
  color: #99b3c3;
  font-size: 16px;
  font-weight: bold;
}
button:hover {
  color: #7391a2;
}
</style>
