<template>
  <div class='patient'>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button type="success" :icon="User" @click="changeSence">添加就诊人</el-button>
        </div>
      </template>
      <!-- 就诊人卡片 -->
      <div class="visitors" v-if="sence">
        <Visitor class="item" v-for="(visitor, index) in patientArr" :key="visitor.id" :visitor="visitor" :index="index"
          @changeSence="changeSence">
          <el-button type="danger" size="default" :icon="Delete" circle></el-button>
        </Visitor>
      </div>
      <div class="addEdit" v-else>
        <AddEdit />
      </div>
    </el-card>
  </div>
</template>

<script lang='ts' setup name='Patient'>
import { Delete, User } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { reqGetUser } from '@/api/hospital/index'
import { UserResPonseData, UserArr } from '@/api/hospital/type';
import { ElMessage } from 'element-plus';
//数据
let patientArr = ref<UserArr>([])
let sence = ref<boolean>(true)
//方法
onMounted(() => {
  getPatient()
})
// 获取就诊人信息
const getPatient = async () => {
  let result: UserResPonseData = await reqGetUser()
  if (result.code == 200) {
    patientArr.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }

}
const changeSence = () => {
  sence.value = false
}
</script>

<style scoped lang="scss">
.patient {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .visitors {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 30%;
      margin: 10px;
    }
  }
}
</style>