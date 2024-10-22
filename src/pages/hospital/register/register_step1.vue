<template>
  <div class='step'>
    <!-- 顶部详情 -->
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">·</div>
      <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
    </div>
    <!-- 中间日期，是否有号内容 -->
    <div class="content">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div class="item"
          :class="{ active: item.status == -1 || item.availableNumber == -1, cur: item.workDate == workTime.workDate }"
          v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)">
          <div class="nowtime">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status == -1">停止挂号</div>
            <div v-if="item.status == 0">{{ item.availableNumber == -1 ? "约满了" : `有号(${item.availableNumber})` }}</div>
            <div v-if="item.status == 1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="workData.total" v-model:current-page="pageNo"
        @current-change="featchWorkData" />
    </div>
    <!-- 底部展示具体医生信息 -->
    <div class="bottom">
      <!-- 展示即将放号的时间 -->
      <div class="will" v-if="workTime.status == 1">
        <span>2024-10-21-8:30 放号</span>
      </div>
      <!-- 展示医生的结构，上午/下午 -->
      <div class="doctor" v-else>
        <div class="morning">
          <div class="tip">
            <svg t="1729069768983" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="10060" id="mx_n_1729069768984" width="32" height="32">
              <path
                d="M509.952 255.488c-146.432 0-265.216 118.784-265.216 265.216s118.784 265.216 265.216 265.216c146.432 0 265.216-118.784 265.216-265.216s-118.784-265.216-265.216-265.216z m0 475.648c-115.712 0-209.92-94.208-209.92-209.92s94.208-209.92 209.92-209.92 209.92 94.208 209.92 209.92-94.208 209.92-209.92 209.92zM509.952 198.656c-14.336 0-25.6-11.264-25.6-25.6v-66.56c0-13.824 11.776-25.6 25.6-25.6s25.6 11.264 25.6 25.6v66.56c0 13.824-11.776 25.6-25.6 25.6zM509.952 961.536c-14.336 0-25.6-11.776-25.6-25.6v-66.56c0-14.336 11.776-25.6 25.6-25.6s25.6 11.776 25.6 25.6v66.56c0 13.824-11.776 25.6-25.6 25.6zM187.392 521.216c0 14.336-11.264 25.6-25.6 25.6h-66.56c-13.824 0-25.6-11.776-25.6-25.6s11.264-25.6 25.6-25.6h66.56c13.824 0 25.6 11.264 25.6 25.6zM950.272 521.216c0 14.336-11.776 25.6-25.6 25.6h-66.56c-14.336 0-25.6-11.776-25.6-25.6s11.776-25.6 25.6-25.6h66.56c13.824 0 25.6 11.264 25.6 25.6z"
                fill="#5fe1e9" p-id="10061"></path>
              <path
                d="M280.576 747.52c9.728 10.24 9.728 26.112 0 36.352l-47.104 46.592c-10.24 9.728-26.112 9.728-36.352 0-9.728-10.24-9.728-26.112 0-36.352l47.104-46.592c9.728-9.728 26.112-9.728 36.352 0zM823.296 211.456c9.728 10.24 9.728 26.112 0 36.352l-47.104 46.592c-10.24 9.728-26.112 9.728-36.352 0-9.728-10.24-9.728-26.112 0-36.352l47.104-46.592c10.24-9.728 26.112-9.728 36.352 0z"
                fill="#5fe1e9" p-id="10062"></path>
              <path
                d="M284.672 289.792c-10.24 9.728-26.624 9.728-36.352-0.512l-46.592-47.616c-9.728-10.24-9.728-26.624 0.512-36.352 10.24-9.728 26.624-9.728 36.352 0.512l46.592 47.616c10.24 10.24 9.728 26.624-0.512 36.352zM817.152 836.608c-10.24 9.728-26.624 9.728-36.352-0.512l-46.592-47.616c-9.728-10.24-9.728-26.624 0.512-36.352 10.24-9.728 26.624-9.728 36.352 0.512l46.592 47.616c9.728 10.24 9.216 26.624-0.512 36.352z"
                fill="#5fe1e9" p-id="10063"></path>
            </svg>
            <span>上午号源</span>
          </div>
          <!-- 医生信息 -->
          <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
            <!-- 医生名字|等级|专项 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 该医生价格|余号 -->
            <div class="right">
              <div class="money">${{ doctor.amount }}</div>
              <el-button type="primary" size="default" @click="toStep2(doctor)">余号({{ doctor.availableNumber
                }})</el-button>
            </div>
          </div>
        </div>
        <!-- 下午 -->
        <div class="afternoon">
          <div class="tip">
            <svg t="1729069680615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="7734" id="mx_n_1729069680616" width="32" height="32">
              <path
                d="M244.9 601c12.3 0 22.3-10 22.3-22.3 0-135 109.8-244.9 244.9-244.9S757 443.6 757 578.7c0 12.3 10 22.3 22.3 22.3s22.3-10 22.3-22.3c0-159.6-129.8-289.4-289.4-289.4S222.6 419.2 222.6 578.8c0 12.3 10 22.2 22.3 22.2zM512 244.9c12.3 0 22.3-10 22.3-22.3V89c0-12.3-10-22.3-22.3-22.3s-22.3 10-22.3 22.3v133.6c0 12.3 10 22.3 22.3 22.3zM763.9 349.2c5.7 0 11.4-2.2 15.7-6.5l94.4-94.4c8.7-8.7 8.7-22.8 0-31.5s-22.8-8.7-31.5 0l-94.4 94.4c-8.7 8.7-8.7 22.8 0 31.5 4.4 4.3 10.1 6.5 15.8 6.5zM1001.7 556.5H868.2c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h133.6c12.3 0 22.3-10 22.3-22.3s-10.1-22.3-22.4-22.3zM178.1 578.8c0-12.3-10-22.3-22.3-22.3H22.3C10 556.5 0 566.5 0 578.8S10 601 22.3 601h133.6c12.2 0 22.2-9.9 22.2-22.2zM244.4 342.7c4.3 4.3 10 6.5 15.7 6.5s11.4-2.2 15.7-6.5c8.7-8.7 8.7-22.8 0-31.5l-94.4-94.4c-8.7-8.7-22.8-8.7-31.5 0s-8.7 22.8 0 31.5l94.5 94.4zM935 734.6H89c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h846c12.3 0 22.3-10 22.3-22.3s-10-22.3-22.3-22.3zM779.1 912.7H244.9c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h534.3c12.3 0 22.3-10 22.3-22.3s-10.1-22.3-22.4-22.3z"
                fill="#5fe1e9" p-id="7735"></path>
            </svg>
            <span>下午号源</span>
          </div>
          <!-- 医生信息 -->
          <div class="doc_info" v-for="doctor in afternoonArr" :key="doctor.id">
            <!-- 医生名字|等级|专项 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 该医生价格|余号 -->
            <div class="right">
              <div class="money">${{ doctor.amount }}</div>
              <el-button type="primary" size="default" @click="toStep2(doctor)">余号({{ doctor.availableNumber
                }})</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup name='Step1'>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital';
import { HospitalWorkData, DoctorResponseData, DocArr, Doctor } from '@/api/hospital/type';
// #region 数据
let $route = useRoute()
let $router = useRouter()
let pageNo = ref<number>(1)
let limit = ref<number>(6)
// 存储医院数据
let workData = ref<any>({})
// 存储排班日期：当前数据第一个
let workTime: any = ref({})
// 存储医生排班的数据
let docArr = ref<DocArr>([])
// #endregion
//方法
// 组件挂在完毕就发一次请求
onMounted(() => {
  featchWorkData()
})
// 获取挂号的数据
const featchWorkData = async () => {
  let result: HospitalWorkData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
  if (result.code == 200) {
    workData.value = result.data
    workTime.value = workData.value.bookingScheduleList[0]
    // 获取一次医生的数据
    getDoctorWorkData()
  }
}
// 获取医生一天的排班数据
const getDoctorWorkData = async () => {
  let hoscode: string = $route.query.hoscode as string
  let depcode: string = $route.query.depcode as string
  let workDate: string = workTime.value.workDate

  let result: DoctorResponseData = await reqHospitalDoctor(hoscode, depcode, workDate)
  if (result.code == 200) {
    docArr.value = result.data
  }
}

// 点击中间小方块的事件
const changeTime = (item: any) => {
  // 存储用户选择那一天的数据
  workTime.value = item
  // 再获取一次医生排班的数据
  getDoctorWorkData()
}
// 计算出上下午医生排班的顺序
let morningArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 0
  })
})
let afternoonArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 1
  })
})

// 余号点击事件回调
const toStep2 = (doctor: Doctor) => {
  $router.push({ path: 'register_step2', query: { docId: doctor.id } })
}
</script>

<style scoped lang="scss">
.step {
  margin: 30px 30px 0px 30px;

  .top {
    display: flex;
    color: #7f7f7f;

    .line {
      width: 1px;
      height: 16px;
      background-color: #7f7f7f;
      margin: 0px 8px;
    }

    .dot {
      margin: 0px 10px;
    }
  }

  .content {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .time {
      margin-top: 70px;
      font-weight: 900;
    }

    .item:hover {
      transform: scale(1.1);
    }

    .container {
      width: 100%;
      display: flex;
      margin: 30px 0px;

      .item {
        flex: 1;
        width: 100%;
        border: 1px solid skyblue;
        border-radius: 10%;
        margin: 0px 5px;
        transition: all linear .2s;

        &.active {
          border: 1px solid #ccc;

          .nowtime {
            background-color: #ccc;

          }
        }

        &.cur {
          transform: scale(1.1);
        }

        .nowtime {
          background-color: #5fe1e9;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
          border-radius: 10px 10px 0 0;
        }

        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }

  .bottom {

    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      color: #5fe1e9;
    }

    .doctor {

      .morning,
      .afternoon {
        margin-top: 10px;

        .tip {
          display: flex;
          align-items: center;
          margin: 20px 0px;

          span {
            color: #7f7f7f;
            font-weight: 900;
            margin-left: 5px;
          }
        }

        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;

          .left {
            .info {
              color: #5fe1e9;
              margin: 10px 0px;

              span {
                // margin: 5px 0px;
                font-size: 18px;
                font-weight: 900;
              }
            }

            .skill {
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }

          .right {
            width: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>