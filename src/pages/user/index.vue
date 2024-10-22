<template>
  <div class='user'>
    <!-- 左侧导航 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <House />
        </el-icon>
        <span>&nbsp;/&nbsp;会员中心</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/user/certification" @click="changeRouter('/user/certification')">
          <el-icon>
            <Postcard />
          </el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="changeRouter('/user/order')">
          <el-icon>
            <Memo />
          </el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="changeRouter('/user/patient')">
          <el-icon>
            <User />
          </el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile" @click="changeRouter('/user/profile')">
          <el-icon>
            <Document />
          </el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="changeRouter('/user/feedback')">
          <el-icon>
            <ChatDotRound />
          </el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧展示组件 -->
    <div class="content"><router-view></router-view></div>
  </div>
</template>

<script lang='ts' setup name='User'>
import { House, Postcard, Memo, User, Document, ChatDotRound } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
//数据
let $router = useRouter()
let $route = useRoute()
//方法
const changeRouter = (path: string) => {
  $router.push({ path })
}
</script>

<style scoped lang="scss">
.user {
  display: flex;

  .menu {
    flex: 2;
    margin-top: 25px;

    .top {
      display: flex;
      justify-content: left;
      margin: 10px 30px;
      color: #7f7f7f;
      font-size: 14px;
    }
  }

  .content {
    flex: 8;
    margin: 30px 30px 0px 30px;
  }
}
</style>