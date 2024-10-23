<template>
  <div class='all'>
    <el-card>
      <!-- 头部 -->
      <template #header>
        <span>挂号订单</span>
      </template>
      <!-- 下拉菜单 -->
      <el-form :inline="true">
        <el-form-item label="就诊人" style="width: 300px;">
          <el-select placeholder="请选择就诊人" v-model="patientId" @change="change">
            <el-option label="获取全部就诊人" value=""></el-option>
            <el-option v-for="(patient, index) in PatientArr" :key="index" :label="patient.name"
              :value="patient.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态" style="width: 300px;">
          <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="change">
            <el-option label="获取全部订单" value=""></el-option>
            <el-option v-for="(status, index) in OrderStatusArr" :key="index" :label="status.comment"
              :value="status.status">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="AllOrderArr">
        <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
        <el-table-column label="医院" prop="hosname"></el-table-column>
        <el-table-column label="科室" prop="depname"></el-table-column>
        <el-table-column label="医生" prop="title"></el-table-column>
        <el-table-column label="医师服务费" prop="amount"></el-table-column>
        <el-table-column label="就诊人" prop="patientName"></el-table-column>
        <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
        <el-table-column label="操作" prop="">
          <template #="{ row }">
            <el-button text type="primary" @click="getDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageNumber" :page-sizes="[5, 10, 20, 30, 40]"
        layout="prev, pager, next, jumper,->,sizes,total" :total="total" style="margin:20px auto"
        @current-change="getOrderInfo" @size-change="handler" />
    </el-card>
  </div>
</template>

<script lang='ts' setup name='orderAll'>
import { onMounted, ref } from 'vue';
import { reqMemberOrderInfo, reqOrderStatus } from '@/api/user';
import { MemberOrderInfoResponseData, Records, OrderStatusResponseData, AllOrderStatus } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { reqGetUser } from '@/api/hospital';
import { UserResPonseData, UserArr } from '@/api/hospital/type';
//数据
let pageNo = ref<number>(1)
let pageNumber = ref<number>(10)
let patientId = ref<string>('')
let orderStatus = ref<string>('')
let AllOrderArr = ref<Records>([])
let total = ref<number>()
let $router = useRouter()
// 存储订单状态
let OrderStatusArr = ref<AllOrderStatus>([])
// 获取就诊人
let PatientArr = ref<UserArr>([])
//方法
onMounted(() => {
  getOrderInfo()
  getOrderStatus()
  getPatient()
})
// 获取所有订单数据
const getOrderInfo = async (pager: number = 1) => {
  pageNo.value = pager
  let result: MemberOrderInfoResponseData = await reqMemberOrderInfo(pageNo.value, pageNumber.value, patientId.value, orderStatus.value)
  if (result.code == 200) {
    AllOrderArr.value = result.data.records
    total.value = result.data.total
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
// 获取就诊状态数据
const getOrderStatus = async () => {
  let result: OrderStatusResponseData = await reqOrderStatus()
  if (result.code == 200) {
    OrderStatusArr.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }

}
// 获取就诊人数据
const getPatient = async () => {
  let result: UserResPonseData = await reqGetUser()
  if (result.code == 200) {
    PatientArr.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }

}
// 编程式路由导航到订单详情
const getDetail = (row: any) => {
  $router.push({ path: '/user/order', query: { orderID: row.id } })
}
// 选择分页器页码的方法
const handler = (pagesiz: number) => {
  pageNumber.value = pagesiz
  getOrderInfo()
}
const change = () => {
  getOrderInfo()
}
</script>

<style scoped></style>