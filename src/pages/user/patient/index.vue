<template>
  <div class='patient'>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button type="success" :icon="User" @click="addPatient">添加就诊人</el-button>
        </div>
      </template>
      <!-- 就诊人卡片 -->
      <div class="visitors" v-if="sence">
        <Visitor class="item" v-for="(visitor, index) in patientArr" :key="visitor.id" :visitor="visitor" :index="index"
          @changeSence="changeSence">
          <!-- 删除就诊人按钮 -->
          <el-popconfirm :title="`您确定要删除${visitor.name}吗?`" @confirm="removeUser(visitor.id)" width="200px">
            <template #reference>
              <el-button type="danger" size="default" :icon="Delete" circle></el-button>
            </template>
          </el-popconfirm>

        </Visitor>
      </div>
      <!-- 添加就诊人 -->
      <div class='addEdit' v-else>
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form style="width: 60%;margin: auto;">
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户姓名" v-model="UserParams.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="请选择证件类型" v-model="UserParams.certificatesType">
              <el-option v-for="(type, index) in TypeArr" :key="index" :label="type.name"
                :value="type.value"></el-option>
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
              <el-option v-for="(type, index) in TypeArr" :key="index" :label="type.name"
                :value="type.value"></el-option>
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
            <el-button @click="reset">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts' setup name='Patient'>
import { Delete, User } from '@element-plus/icons-vue';
import { onMounted, ref, reactive, watch } from 'vue';
import { reqGetUser } from '@/api/hospital/index'
import { UserResPonseData, UserArr } from '@/api/hospital/type';
import { reqCertificatesType, reqCity, reqAddorUpdateUser, reqRemoveUser } from '@/api/user';
import { CertifiResponseData, CertifiArr, AddorUpdateUser } from '@/api/user/type';
import type { CascaderProps } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
//数据
// 所有就诊人的数据
let patientArr = ref<UserArr>([])
// 为真显示就诊人卡片  为假显示添加就诊人
let sence = ref<boolean>(true)
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
let $route = useRoute()
let $router = useRouter()
//方法
onMounted(() => {
  getPatient()
  getType()
  // 新增 判断是不是从预约挂号跳转过来的
  if ($route.query.type == 'add') {
    sence.value = false
  }
  // 修改 判断是不是从预约挂号过来
  if ($route.query.type == 'edit') {
    sence.value = false
  }
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
// 添加就诊人按钮
const addPatient = () => {
  reset()
  sence.value = false
}

// 重写输入框
const reset = () => {
  Object.assign(UserParams, {
    id: null,
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
}

// 就诊人卡片的自定义事件
const changeSence = (visitor: AddorUpdateUser) => {
  sence.value = false
  Object.assign(UserParams, visitor)

}

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
// 提交按钮
const submit = async () => {
  try {
    await reqAddorUpdateUser(UserParams)
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    // 如果是从预约挂号跳转，添加后重新跳回预约挂号的就诊人管理
    if ($route.query.type == 'add') {
      $router.back()
    } else {
      sence.value = true
    }
    getPatient()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}

// 监听所有就诊人的数据
watch(() => patientArr.value, () => {
  if ($route.query.type == 'edit') {
    let patient = patientArr.value.find((item: any) => {
      return item.id = $route.query.id
    })
    Object.assign(UserParams, patient)
  }
})

// 删除就诊人
const removeUser = async (id: number) => {
  try {
    // 删除成功
    await reqRemoveUser(id)
    // 展示成功信息
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 页面重新获取就诊人数据
    getPatient()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
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