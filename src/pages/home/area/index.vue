<template>
  <div class='area'>
    <div class="content">
      <div class="left">地区：</div>
      <ul>
        <li :class="{ active: activeFlag == '' }" @click="changeArea('')">全部</li>
        <li v-for="item in areaArr" :class="{ active: activeFlag == item.value }" :key="item.value"
          @click="changeArea(item.value)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts' setup name='Area'>
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndArea } from '@/api/home';
import type { HospitalLevelAndAreaResponseData, HospitalLevelAndAreaArr } from '@/api/home/type';
//数据
let areaArr = ref<HospitalLevelAndAreaArr>([])
let activeFlag = ref<string>('')
//方法
onMounted(() => {
  getArea()
})
const getArea = async () => {
  let result: HospitalLevelAndAreaResponseData = await reqHospitalLevelAndArea('Beijin')
  if (result.code == 200) {
    areaArr.value = result.data
  }
}
// 点击时高亮
const changeArea = (item: string) => {
  activeFlag.value = item
  $emit('getArea', item)
}
let $emit = defineEmits(['getArea'])
</script>

<style scoped lang="scss">
.area {
  color: #7f7f7f;
  margin-top: 10px;
}

.content {
  display: flex;

  .left {
    margin-right: 2px;
    width: 60px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .active {
      color: #5fe1e9;
    }

    li:hover {

      cursor: pointer;
    }
  }
}
</style>