<template>
  <div class='addEdit'>
    <el-divider content-position="left">就诊人信息</el-divider>
    <el-form style="width: 60%;margin: auto;">
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入用户姓名" v-model="UserParams.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select placeholder="请选择证件类型" v-model="UserParams.certificatesType">
          <el-option v-for="(type, index) in TypeArr" :key="index" :label="type.name" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input placeholder="请输入证件号码" v-model="UserParams.certificatesNo"></el-input>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-radio-group v-model="UserParams.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker type="datetime" placeholder="请选择您的出生日期" value-format="YYYY-MM-DD"
          v-model="UserParams.birthdate" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input placeholder="请输入手机号码" v-model="UserParams.phone" </el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">建档信息(完善后部分医院首次就诊不用排队建档)</el-divider>
    <el-form style="width: 60%;margin: auto;">
      <el-form-item label="婚姻状况">
        <el-radio-group v-model="UserParams.isMarry">
          <el-radio :label="1">已婚</el-radio>
          <el-radio :label="0">未婚</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自费/医保">
        <el-radio-group v-model="UserParams.isInsure">
          <el-radio :label="1">自费</el-radio>
          <el-radio :label="0">医保</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前住址">
        <el-cascader :props="props" v-model="UserParams.address" />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input placeholder="请输入详细居住地址，精确到街道" v-model="UserParams.addressSelected"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">家属信息(选填)</el-divider>
    <el-form style="width: 60%;margin: auto;" label-width="80">
      <el-form-item label="家属姓名">
        <el-input placeholder="请输入家属姓名" v-model="UserParams.contactsName" </el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select placeholder="请选择证件类型" v-model="UserParams.contactsCertificatesType">
          <el-option v-for="(type, index) in TypeArr" :key="index" :label="type.name" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input placeholder="请输入证件号码" v-model="UserParams.contactsCertificatesNo"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input placeholder="请输入手机号码" v-model="UserParams.contactsPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button>重写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts' setup name='AddEdit'>
import { onMounted, ref, reactive } from 'vue';
import { reqCertificatesType, reqCity, reqAddorUpdateUser } from '@/api/user';
import { CertifiResponseData, CertifiArr, AddorUpdateUser } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import type { CascaderProps } from 'element-plus'
//数据
// 收集新增就诊人的数据
let UserParams = reactive<AddorUpdateUser>({
  name: '',
  certificatesType: '',
  certificatesNo: '',
  sex: 0,
  birthdate: '',
  phone: '',
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: '',
  contactsName: '',
  contactsCertificatesType: '',
  contactsCertificatesNo: '',
  contactsPhone: '',
})
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
// 获取区县网络请求
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
const submit = async () => {
  try {
    await reqAddorUpdateUser(UserParams)
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}
</script>

<style scoped lang="scss"></style>