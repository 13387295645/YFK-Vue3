<template>
  <div class='hospital'>
    <!-- 左侧导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <House />
        </el-icon>
        <span>&nbsp;/&nbsp;医院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeRouter('/hospital/register')">
          <el-icon>
            <Calendar />
          </el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeRouter('/hospital/detail')">
          <el-icon>
            <document />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeRouter('/hospital/notice')">
          <el-icon>
            <Bell />
          </el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeRouter('/hospital/close')">
          <el-icon>
            <InfoFilled />
          </el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeRouter('/hospital/search')">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧路由组件内容区 -->
    <div class="content">
      <!-- 子组件展示结构的地方 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts' setup name='Hospital'>

import { Document, Bell, Calendar, Search, InfoFilled, House } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail';
//数据
let $router = useRouter()
let $route = useRoute()
let detailStore = useDetailStore()
//方法
// 点击切换路由
const changeRouter = (path: string) => {
  $router.push({ path, query: { hoscode: $route.query.hoscode } })
}
// 路由组件一挂载就获取数据
onMounted(() => {
  // 获取医院详情数据
  detailStore.getHospital($route.query.hoscode as string)
  // 获取医院科室数据
  detailStore.getDepartment($route.query.hoscode as string)

})
</script>

<style scoped lang="scss">
.hospital {
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
  }
}
</style>