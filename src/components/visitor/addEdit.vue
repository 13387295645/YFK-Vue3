<template>
  <div class='addEdit'>
    <el-divider content-position="left">就诊人信息</el-divider>
    <el-form style="width: 60%;margin: auto;">
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select placeholder="请选择证件类型">
          <el-option v-for="(type, index) in TypeArr" :key="index" :label="type.name" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-radio-group>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker type="datetime" placeholder="请选择您的出生日期" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input placeholder="请输入手机号码"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">建档信息(完善后部分医院首次就诊不用排队建档)</el-divider>
    <el-form style="width: 60%;margin: auto;">
      <el-form-item label="婚姻状况">
        <el-radio-group>
          <el-radio :label="1">已婚</el-radio>
          <el-radio :label="0">未婚</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自费/医保">
        <el-radio-group>
          <el-radio :label="1">自费</el-radio>
          <el-radio :label="0">医保</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前住址">
        <el-cascader :props="props" />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input placeholder="请输入详细居住地址，精确到街道"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">家属信息(选填)</el-divider>
    <el-form style="width: 60%;margin: auto;" label-width="80">
      <el-form-item label="家属姓名">
        <el-input placeholder="请输入家属姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select placeholder="请选择证件类型">
          <el-option v-for="(type, index) in TypeArr" :key="index" :label="type.name" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button>重写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts' setup name='AddEdit'>
import { onMounted, ref } from 'vue';
import { reqCertificatesType, reqCity } from '@/api/user';
import { CertifiResponseData, CertifiArr } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import type { CascaderProps } from 'element-plus'
//数据

//存储证件类型
let TypeArr = ref<CertifiArr>([])
//方法
onMounted(() => {
  getType()
})
// 获取证件类型
const getType = async () => {
  let result: CertifiResponseData = await reqCertificatesType()
  if (result.code == 200) {
    TypeArr.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }

}

const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node: any, resolve: any) {
    let result = await reqCity(node.data.id || '86')
    let ShowData = result.data.map(((item: any) => {
      return {
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren
      }
    }))
    resolve(ShowData)
  },
}
</script>

<style scoped lang="scss"></style>