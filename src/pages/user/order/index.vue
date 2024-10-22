<template>
  <div class='order'>
    <div v-if="$route.query.orderID">
      <orderDetail />
    </div>
    <div v-else>
      <orderAll />
    </div>

  </div>
</template>

<script lang='ts' setup name='Order'>
import orderDetail from './orderDetail/index.vue';
import orderAll from './orderAll/index.vue';
import { useRoute } from 'vue-router';
//数据
let $route = useRoute()
//方法

</script>

<style scoped></style>