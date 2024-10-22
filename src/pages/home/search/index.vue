<template>
  <div class='search'>
    <el-autocomplete clearable placeholder="请输入医院名称" style="width:670px;margin-right:5px" v-model="hosname"
      :fetch-suggestions="fetchData" :trigger-on-focus="false" @select="goDetail" />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script lang='ts' setup name='Search'>
import { ref } from 'vue';
import { HospitalInfo } from '@/api/home/type';
import { reqHospitalInfo } from '@/api/home';
import { useRouter } from 'vue-router';
// 引入图标组件
import { Search } from '@element-plus/icons-vue'

//数据
const hosname = ref<string>('')
let $router = useRouter()
//方法

// 搜索下拉框联想提示
const fetchData = async (keyworld: string, cb: any) => {
  let result: HospitalInfo = await reqHospitalInfo(keyworld)
  // 整理数据，下拉菜单只接受value属性
  let showData = result.data.map(item => {
    return {
      value: item.hosname,//展示医院的名字
      hoscode: item.hoscode,//存储医院的编码
    }
  })
  // 给组件提供展示医院数据
  cb(showData);
}

const goDetail = (item: any) => {
  // 编程式路由导航，进入医院详情页,后期需要携带query参数（医院编码）
  $router.push({ path: '/hospital/register', query: { hoscode: item.hoscode } })
  console.log(item);

}
</script>

<style scoped lang="scss" name="Search">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  // 深度选择器  CSS=》 >>>  less=》 /deep/ scss=》 ::v-deep
  // ::v-deep(.el-input__wrapper) {
  //   width: 600px;
  //   margin-right: 10px;
  // }
}
</style>