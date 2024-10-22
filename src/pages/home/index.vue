<template>
  <div class='home'>
    <!-- 轮播图 -->
    <Carousel />
    <!-- 搜索表单 -->
    <Search />
    <!-- 底部展示医院的结构 -->
    <el-row gutter.number="20">
      <el-col :span="20">
        <!-- 等级 -->
        <Level @getLevel="getLevel" />
        <!-- 地区 -->
        <Area @getArea="getArea" />
        <!-- 卡片 -->
        <div class="card" v-if="hasHospitalArr.length > 0">
          <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
        </div>
        <el-empty v-else description="暂无符合条件医院" />
        <!-- 分页 -->
        <el-pagination v-model:current-page="PageNo" v-model:page-size="PageSize" :page-sizes="[5, 10, 15, 20]"
          layout="prev, pager, next, jumper,->,total,sizes" :total="total" @current-change="currentChange"
          @size-change="sizeChange" />
      </el-col>

      <el-col :span="4">
        <Sider />
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup name='Home'>
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Area from './area/index.vue'
import Card from './card/index.vue'
import Sider from './sider/index.vue'
// TS规范接口文件
import { Content, HospitalResponeseData } from '@/api/home/type'
import { ref, onMounted } from 'vue'
import { reqHospital } from '@/api/home'

// 分页器页码
const PageNo = ref<number>(1)
// 一页展示多少数据
const PageSize = ref<number>(10)
// 存储医院等级相应数据
const Hostype = ref<string>('')
// 存储医院地区
const districtCode = ref<string>('')

// 存储已有的医院数据
let hasHospitalArr = ref<Content>([])
let total = ref<number>(0)
// 组件挂载完毕发一次请求
onMounted(() => {
  getHospitalInfo();
})
// 获取已有的医院数据
const getHospitalInfo = async () => {
  // 获取医院的数据：默认获取第一页，一页十条数据
  let result: HospitalResponeseData = await reqHospital(PageNo.value, PageSize.value, Hostype.value, districtCode.value);
  if (result.code == 200) {
    // 存储已有的医院数据
    hasHospitalArr.value = result.data.content;
    // 存储医院的总个数
    total.value = result.data.totalElements;
  }
}
// 分页器页码发生变化时回调
const currentChange = () => {
  getHospitalInfo();
}
// 分页器下拉菜单改变时回调
const sizeChange = () => {
  getHospitalInfo();
}
// 子组件的自定义时间——获取等级的value
const getLevel = (level: string) => {
  Hostype.value = level
  getHospitalInfo()
}
// 子组件的自定义时间——获取地区的value
const getArea = (area: string) => {
  districtCode.value = area
  getHospitalInfo()
}
</script>

<style scoped lang="scss">
.home {
  margin-top: 10px;

  .card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 48%;
      margin: 10px 0px;
    }

  }
}
</style>