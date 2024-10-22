<template>
  <div class='carousel'>
    <el-carousel type="card" height="350px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item.url" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang='ts' setup name='Carousel'>
//数据
let imgList = [
  { url: new URL(`../../../assets/banner1.png`, import.meta.url).href },
  { url: new URL(`../../../assets/banner2.png`, import.meta.url).href },
  { url: new URL(`../../../assets/banner3.jpg`, import.meta.url).href },
  { url: new URL(`../../../assets/banner4.jpg`, import.meta.url).href },
]
//方法
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 350px;
}
</style>