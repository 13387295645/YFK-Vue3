<template>
  <div class='top'>
    <div class="content">
      <!-- 图标 -->
      <div class="left" @click="goHome">
        <img src="../../assets/logo.jpg" alt="">
        <p>易复康 预约挂号统一平台</p>
      </div>
      <!-- 登录/注册 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <!-- 如果没有用户信息，显示登录注册 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登录&nbsp;/&nbsp;注册</p>
        <!-- 有用户信息，显示用户详情 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeRouter('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="changeRouter('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="changeRouter('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
              <el-dropdown-item disabled>测试</el-dropdown-item>
              <el-dropdown-item divided>个人信息‘测试’</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup name='Top'>
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { ArrowDown } from '@element-plus/icons-vue'
//数据
let userStore = useUserStore()
let $router = useRouter()
//方法
const goHome = () => {
  $router.push({ path: '/home' })
}
// 点击登录注册的时候弹出对话框
const login = () => {
  userStore.visiable = true;
}
// 点击跳转路由
const changeRouter = (path: string) => {
  $router.push({ path })
}
// 退出登录
const quit = () => {
  userStore.quit()
  $router.push({ path: '/home' })
}
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 5px rgb(180, 173, 173);

  .content {
    width: 1200px;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      p {
        font-size: 20px;
        color: #5fe1e9;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #bbb;

      p:hover {
        color: rgba(0, 0, 0, 0.642);
      }
    }

    .help {
      margin-right: 10px;
    }

  }
}
</style>