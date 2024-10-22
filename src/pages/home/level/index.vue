<template>
  <div class='level'>
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{ active: activeFlag == '' }" @click="changeLevel('')">全部</li>
        <li v-for="item in levelArr" :class="{ active: activeFlag == item.value }" :key="item.value"
          @click="changeLevel(item.value)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts' setup name='Level'>
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndArea } from '@/api/home';
import type { HospitalLevelAndAreaResponseData, HospitalLevelAndAreaArr } from '@/api/home/type';
//数据
let levelArr = ref<HospitalLevelAndAreaArr>([])
let activeFlag = ref<string>('')
//方法
onMounted(() => {
  getLevel()
})
// 获取医院等级数据
const getLevel = async () => {
  let result: HospitalLevelAndAreaResponseData = await reqHospitalLevelAndArea('Hostype')
  // 存储医院等级数据
  if (result.code == 200) {
    levelArr.value = result.data
  }
};
// 点击时高亮
const changeLevel = (item: string) => {
  activeFlag.value = item

  // 触发自定义事件，把医院的等级参数传给父组件
  $emit('getLevel', item)
}

let $emit = defineEmits(['getLevel'])
</script>

<style scoped lang=scss>
.level {
  color: #7f7f7f;

  h1 {
    font-weight: 900;
    margin: 10px 0px;
  }

  .content {
    display: flex;
    padding: 10px 0;

    .left {
      margin-right: 10px
    }

    .hospital {
      display: flex;

      li {
        margin-right: 10px;
      }

      .active {
        color: #5fe1e9;
      }

      li:hover {

        cursor: pointer;
      }
    }
  }
}
</style>