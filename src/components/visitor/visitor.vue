<template>
  <div class='visitor'>
    <div class="top">
      <div class="left">
        <span class="free">{{ visitor.isInsure == 1 ? '医保' : '自费' }}</span>
        <span class="username">{{ visitor.name }}</span>
      </div>
      <div class="left">
        <el-button type="primary" size="default" :icon="Edit" circle @click="$emit('changeSence')"></el-button>
        <slot></slot>
      </div>
    </div>
    <div class="bottom">
      <p><span>证件类型：</span><span class="detail">{{ visitor.param.certificatesTypeString }}</span></p>
      <p><span>证件号码：</span><span class="detail">{{ visitor.certificatesNo }}</span></p>
      <p><span>用户性别：</span><span class="detail">{{ visitor.sex == 1 ? '男' : '女' }}</span></p>
      <p><span>出生日期：</span><span class="detail">{{ visitor.birthdate }}</span></p>
      <p><span>手机号码：</span><span class="detail">{{ visitor.phone }}</span></p>
      <p><span>婚姻状况：</span><span class="detail">{{ visitor.isMarry == 0 ? '未婚' : '已婚' }}</span></p>
      <p><span>当前住址：</span><span class="detail">{{ visitor.address }}</span></p>
      <p><span>详细地址：</span><span class="detail">{{ visitor.param.fullAddress }}</span></p>
      <!-- 红色选择后就诊人水印 -->
      <transition name="confirm">
        <div class="confirm" v-if="index === currentIndex">选择就诊人</div>
      </transition>
    </div>
  </div>
</template>

<script lang='ts' setup name='Visitor'>
import { Edit } from '@element-plus/icons-vue'
//数据
defineProps(['visitor', 'index', 'currentIndex'])
let $emit = defineEmits(['changeSence'])
//方法

</script>

<style scoped lang="scss">
.visitor {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 10px;

  .top {
    height: 60px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px 10px 0px 0px;

    .left {
      .free {
        background-color: white;
        padding: 1px;
        font-size: 14px;
        border-radius: 10%;
        margin-right: 10px;
      }

      .username {
        margin-right: 60px;
      }
    }
  }

  .bottom {
    position: relative;
    padding: 20px;
    line-height: 30px;

    .detail {
      color: #7f7f7f;
    }

    .confirm {
      position: absolute;
      width: 200px;
      height: 200px;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 200px;
      left: 10%;
      top: 20%;
      opacity: 0.5;
      transform: rotate(40deg);
      font-weight: 900;
    }

    .confirm-enter-from {
      opacity: scale(1);
    }

    .confirm-enter-active {
      transition: all 0.3s;
    }

    .confirm-enter-to {
      transform: scale(1.2);
    }
  }
}
</style>