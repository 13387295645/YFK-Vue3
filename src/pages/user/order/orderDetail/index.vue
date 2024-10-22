<template>
  <div class='detail'>
    <!-- 展示订单详情结构 -->
    <el-card class="box-card">
      <template #header>
        <div class="title"><span>挂号详情</span></div>
      </template>
      <div class="middle">
        <div class="left">
          <el-tag type="success" effect=dark>
            <el-icon><Select /></el-icon>
            <span>{{ orderInfo.param?.orderStatusString }}</span>
          </el-tag>
        </div>
        <div class="right">
          <img src="../../../../assets/code.jpg" alt="">
          <div class="text">
            <p>"使用微信&nbsp;
              <svg t="1729328028815" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6436" width="14" height="14">
                <path
                  d="M352.814545 385.396364m-33.512727 0a33.512727 33.512727 0 1 0 67.025455 0 33.512727 33.512727 0 1 0-67.025455 0Z"
                  fill="#50B674" p-id="6437"></path>
                <path
                  d="M502.690909 384.465455m-33.512727 0a33.512727 33.512727 0 1 0 67.025454 0 33.512727 33.512727 0 1 0-67.025454 0Z"
                  fill="#50B674" p-id="6438"></path>
                <path
                  d="M576.232727 534.341818m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z"
                  fill="#50B674" p-id="6439"></path>
                <path
                  d="M694.458182 536.203636m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z"
                  fill="#50B674" p-id="6440"></path>
                <path
                  d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m-87.505455 630.225455c-26.996364 0-48.407273-5.585455-75.403636-11.17091l-75.403636 37.236364 21.410909-64.232727c-53.992727-37.236364-85.643636-85.643636-85.643637-145.221818 0-102.4 96.814545-182.458182 215.04-182.458182 105.192727 0 198.283636 64.232727 216.901819 150.807273-6.516364-0.930909-13.963636-0.930909-20.48-0.93091-102.4 0-182.458182 76.334545-182.458182 170.356364 0 15.825455 2.792727 30.72 6.516363 44.683636-7.447273 0-13.963636 0.930909-20.48 0.93091z m314.647273 75.403636l15.825455 53.992727-58.647273-32.581818c-21.410909 5.585455-42.821818 11.170909-64.232727 11.170909-102.4 0-182.458182-69.818182-182.458182-155.461818s80.058182-155.461818 182.458182-155.461818c96.814545 0 182.458182 69.818182 182.458182 155.461818 0 47.476364-31.650909 90.298182-75.403637 122.88z"
                  fill="#50B674" p-id="6441"></path>
              </svg>
              &nbsp;扫一扫"
            </p>
            <p>"赞助一下吧~~~///(^v^)\\\~~~"</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊人姓名</div>
              </template>
              {{ orderInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              {{ orderInfo.reserveDate }}&nbsp;{{ orderInfo.reserveTime == 1 ? '上午' : '下午' }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              {{ orderInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              <el-tag size="small">{{ orderInfo.depname }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              {{ orderInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医师服务费</div>
              </template>
              <span style="color: red;">￥{{ orderInfo.amount }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单号</div>
              </template>
              {{ orderInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              {{ orderInfo.createTime }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 订单由三种状态码orderStatus -1取消预约 0已预约未支付 1已支付 -->
          <div class="btn" v-if="orderInfo.orderStatus == 1 || orderInfo.orderStatus == 0">
            <el-popconfirm title="确定取消预约吗?" @confirm="cancel">
              <template #reference>
                <el-button type="warning" plain round>取消预约</el-button>
              </template>
            </el-popconfirm>

            <el-button type="success" plain round v-if="orderInfo.orderStatus == 0" @click="toPay">确认支付</el-button>
          </div>
        </div>
        <div class="right">
          <el-card style="height:320px;" shadow="never">
            <template #header>
              <div class="card-header">
                <span style="font-weight: 900;">注意事项</span>
              </div>
            </template>
            <div class="notice">
              <p>1. 挂号请明确就诊科室，可通过医院官网、手机 APP 等多种渠道进行。</p>
              <p style="color: red;">2. 网上挂号时务必准确填写个人信息，包括姓名、身份证号、联系方式等，确保与就诊者本人一致，以免给就诊带来不必要的麻烦。</p>
              <p>3. 挂号后请在{{ orderInfo.fetchTime }}，在{{ orderInfo.fetchAddress }}，提前安排好行程。若因特殊情况无法前往，应及时取消挂号，方便他人就诊。</p>
              <p>4. 退号请在{{ orderInfo.quitTime }}前办理，逾期不予处理。</p>
              <p>5. 注意区分不同号源，如专家号、普通号和特需号等。根据自身病情和需求选择合适的号源，以获得更好的医疗服务。</p>
            </div>

          </el-card>
        </div>
      </div>
    </el-card>
    <!-- v-model控制对话框的显示与隐藏 true:展示|false：隐藏 -->
    <el-dialog v-model="dialogVisible" title="微信支付" width="500" :show-close="false" :close-on-press-escape="false"
      :close-on-click-modal="false">
      <!-- 微信支付二维码 -->
      <div class="qrcode">
        <img :src="imgUrl" alt="微信支付二维码">
        <p>请使用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <template #footer>
        <el-button @click="closePayWin">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup name='orderDetail'>
import { Select } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { reqGetOrderInfo, reqOrderCancel, reqQrCode, reqPay } from '@/api/user';
import { useRoute } from 'vue-router';
import { OrderResponseData, QrCode, payCon } from '@/api/user/type';
import { ElMessage } from 'element-plus';
// 将字符串转为图片插件
// @ts-ignore
import QRCode from 'qrcode';
//数据
let $route = useRoute()
// 挂号详情数据
let orderInfo = ref<any>({})
// 控制微信支付窗口的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 存储微信支付图片
let imgUrl = ref<string>('')
// 定时器
let timer = ref<any>()
//方法
onMounted(() => {
  getOrderInfo()
})
// 获取订单详情数据
const getOrderInfo = async () => {
  let result: OrderResponseData = await reqGetOrderInfo($route.query.orderID as string)
  if (result.code == 200) {
    orderInfo.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
// 取消预约
const cancel = async () => {
  let result = await reqOrderCancel($route.query.orderID as string)
  if (result.code == 200) {
    getOrderInfo()
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
// 关闭窗口
const closePayWin = () => {
  dialogVisible.value = false
  clearInterval(timer.value)
}
// 支付按钮
const toPay = async () => {
  // 展示支付窗口
  dialogVisible.value = true
  // 微信支付二维码
  let result: QrCode = await reqQrCode($route.query.orderID as string)
  imgUrl.value = await QRCode.toDataURL(result.data.codeUrl)
  // 展示支付状态
  timer.value = setInterval(async () => {
    let result: payCon = await reqPay($route.query.orderID as string)
    // data为true代表支付成功
    if (result.data) {
      // 关闭对话框
      dialogVisible.value = false
      // 提示支付状态
      ElMessage({
        type: 'success',
        message: result.message
      })
      // 关闭定时器
      clearInterval(timer.value)
      // 再次获取订单详情的数据
      getOrderInfo()
    }
    console.log(111);
  }, 2000);

}


</script>

<style scoped lang="scss">
.detail {
  .box-card {
    .title {
      color: #7f7f7f;
      font-weight: 900;
    }

    .middle {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e7ed;
      padding-bottom: 20px;

      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
        }

        .text {
          font-size: 12px;
          line-height: 20px;
          color: #7f7f7f;
          margin-left: 8px;
        }
      }
    }

    .bottom {
      display: flex;
      margin-top: 20px;

      .left {
        flex: 4;

        .btn {
          margin-top: 10px;
        }
      }

      .right {
        flex: 6;
        margin-left: 30px;

        .notice {
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }

  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
  }

  .qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;

    img {
      width: 400px;
    }
  }
}
</style>