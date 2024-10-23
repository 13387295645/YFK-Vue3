<template>
  <div class='step'>
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片—展示就诊人信息 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <Visitor v-for="(visitor, index) in visitorArr" :key="visitor.id" class="item" :visitor="visitor"
          @click="changeIndex(index)" :index="index" :currentIndex="currentIndex" />
      </div>
    </el-card>
    <!-- 展示医生信息卡片 -->
    <el-card class="info">
      <template #header>
        <!-- 头部 -->
        <div class="card-header">
          <span>挂号信息</span>
          <el-button type="primary" :disabled="currentIndex == -1 ? true : false" @click="submitOrder">确认挂号</el-button>
        </div>
      </template>
      <!-- 医生信息 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期：</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院：</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室：</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名：</div>
          </template>
          <el-tag size="default">{{ docInfo.docname }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称：</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长：</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医师服务费：</div>
          </template>
          ￥{{ docInfo.amount }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script lang='ts' setup name='Step2'>
// import Visitor from './visitor.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { User } from '@element-plus/icons-vue'
import { reqGetUser, reqGetDoctor } from '@/api/hospital';
import { UserArr, UserResPonseData, DoctorInfoData } from '@/api/hospital/type';
import { reqSubmitOrder } from '@/api/user';
import { SubmitOrder } from '@/api/user/type';
import { ElMessage } from 'element-plus';
//数据
// 存储全部就诊人信息
let visitorArr = ref<UserArr>([])
// 存储医生信息
let docInfo = ref<any>({})
let $router = useRouter()
let $route = useRoute()
let currentIndex = ref<number>(-1)
//方法
onMounted(() => {
  // 获取就诊人信息
  featchUserData()
  // 获取医生信息
  featchDoctorData()
  // emitter.emit('getVisitor', visitorArr.value)
})
// 获取就诊人信息
const featchUserData = async () => {
  let result: UserResPonseData = await reqGetUser()
  if (result.code == 200) {
    visitorArr.value = result.data
  }
}
// 获取医生信息
const featchDoctorData = async () => {
  let resul: DoctorInfoData = await reqGetDoctor($route.query.docId as string)
  if (resul.code == 200) {
    docInfo.value = resul.data
  }
}
// 卡片的点击回调
const changeIndex = (index: number) => {
  currentIndex.value = index
}
// 确认挂号点击回调，携带就诊人ID跳转至订单详情
const submitOrder = async () => {
  // 医院编号
  let hoscode = docInfo.value.hoscode
  // 医生ID
  let scheduleId = docInfo.value.id
  // 就诊人ID
  let patientId = visitorArr.value[currentIndex.value].id
  // 确认挂号
  let result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId)
  if (result.code == 200) {
    $router.push({ path: '/user/order', query: { orderID: result.data } })
  } else {
    ElMessage({
      type: "error",
      message: result.message
    })
  }
}
</script>

<style scoped lang="scss">
.step {
  margin: 30px 30px 0px 30px;

  .tip {
    font-size: 23px;
    font-weight: 900;
    color: #7f7f7f;
  }

  .box-card {
    margin: 20px 0px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 30%;
        margin: 10px;
      }
    }
  }

  .info {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 900;
      }
    }
  }
}
</style>