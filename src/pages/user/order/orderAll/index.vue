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
          <el-select placeholder="请选择就诊人">
            <el-option label="111" value=""></el-option>
            <el-option label="111" value=""></el-option>
            <el-option label="111" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态" style="width: 300px;">
          <el-select placeholder="请选择订单状态">
            <el-option label="111" value=""></el-option>
            <el-option label="111" value=""></el-option>
            <el-option label="111" value=""></el-option>
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
import { reqMemberOrderInfo } from '@/api/user';
import { MemberOrderInfoResponseData, Records } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
// import emitter from '@/utils/emitter';
//数据
let pageNo = ref<number>(1)
let pageNumber = ref<number>(10)
let patientId = ref<string>('')
let orderStatus = ref<string>('')
let AllOrderArr = ref<Records>([])
let total = ref<number>()
let $router = useRouter()
// let emVisitor = ref()
//方法
onMounted(() => {
  getOrderInfo()
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
// 编程式路由导航到订单详情
const getDetail = (row: any) => {
  $router.push({ path: '/user/order', query: { orderID: row.id } })
}
// 选择分页器页码的方法
const handler = (pagesiz: number) => {
  pageNumber.value = pagesiz
  getOrderInfo()
}
// emitter.on('getVisitor', (value: any) => {
//   emVisitor.value = value
// })
</script>

<style scoped></style>