<template>
  <div class='container'>
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom />
    <!-- 登录组件 -->
    <HospitalLogin v-if="userStore.visiable" />
  </div>
</template>

<script lang='ts' setup name='YFK'>
import useUserStore from './store/modules/user';
//数据
let userStore = useUserStore()
//方法

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 834px;
    margin-bottom: 10px;
  }

  .bottom {
    width: 100%;
    height: 50px;
  }
}
</style>