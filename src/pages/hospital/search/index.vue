<template>
  <div class='search'>
    <div class="info">
      <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
      <el-empty description="暂无查询信息" />
    </div>
  </div>
</template>

<script lang='ts' setup name='Search'>
import useDetailStore from '@/store/modules/hospitalDetail';
//数据
let hospitalStore = useDetailStore()
//方法

</script>

<style scoped lang="scss">
.info {
  margin: 20px 0;

  h1 {
    text-align: center;
    font-size: 30px
  }
}
</style>