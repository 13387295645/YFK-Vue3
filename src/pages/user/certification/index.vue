<template>
  <div class='certification'>
    <el-card class="card-header">
      <template #header>
        <span>实名认证</span>
      </template>
      <div class="content">
        <el-icon>
          <WarningFilled />
        </el-icon>
        <span>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续操作，请提前进行实名认证</span>
      </div>
      <!-- 用户已验证的结构——表格信息 -->
      <el-descriptions v-if="MemberInfo.authStatus == 1" class="margin-top" :column="1" border>
        <el-descriptions-item label-align="center" :width="10">
          <template #label>
            <div class="cell-item">用户姓名</div>
          </template>
          {{ MemberInfo.name }}
        </el-descriptions-item>
        <el-descriptions-item label-align="center" :width="10">
          <template #label>
            <div class="cell-item">证件类型</div>
          </template>
          {{ MemberInfo.certificatesType == 10 ? '身份证' : '户口本' }}
        </el-descriptions-item>
        <el-descriptions-item label-align="center" :width="10">
          <template #label>
            <div class="cell-item">证件号码</div>
          </template>
          {{ MemberInfo.certificatesNo }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- 用户未验证的结构 -->
      <el-form v-else style="width: 50%;margin: auto;" label-width="80" :model="params" :rules="rules" ref="form">
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesNo">
          <el-select placeholder="请选择证件类型" v-model="params.certificatesType">
            <el-option :label="item.name" :value="item.value" v-for="(item, index) in cerTypeArr" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificatesNo">
          <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="上传证件" prop="certificatesUrl">
          <el-upload action="/api/oss/file/fileUpload?fileHost=userAuah" ref="upload" :on-success="successhandler"
            :on-exceed="exceedhandler" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="1"
            list-type="picture-card">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full style="width: 100%;height: 100%;" v-if="params.certificatesUrl" :src="params.certificatesUrl" />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重写</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts' setup name='Certification'>
import { WarningFilled, Plus } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue';
import { reqMemberInfo, reqCertificatesType, reqMemberCreation } from '@/api/user';
import { MemberInfoResponseData, CertifiArr, CertifiResponseData, MemberParams } from '@/api/user/type';
import { ElMessage } from 'element-plus';

//数据
// 会员信息数据
let MemberInfo = ref<any>({})
// 手机表单数据
let params = reactive<MemberParams>({
  "certificatesNo": '',
  "certificatesType": '',
  "certificatesUrl": '',
  "name": '',
})
// 证件类型数组
let cerTypeArr = ref<CertifiArr>([])
// 预览dialog
let dialogVisible = ref<boolean>(false)
let upload = ref()
let form = ref()


//方法
// #region
onMounted(() => {
  getMemberInfo()
  getCertificates()
})
// 获取用户信息
const getMemberInfo = async () => {
  let result: MemberInfoResponseData = await reqMemberInfo()
  if (result.code == 200) {
    MemberInfo.value = result.data
  }
}
// 获取证件类型
const getCertificates = async () => {
  let result: CertifiResponseData = await reqCertificatesType()
  if (result.code == 200) {
    cerTypeArr.value = result.data
  }
}
// 超出数量的钩子
const exceedhandler = () => {
  ElMessage({
    type: 'error',
    message: '只能上传一张图片'
  })
}

// 上传成功的钩子
const successhandler = (response: any) => {
  params.certificatesUrl = response.data
  form.value.clearValidate()
}

// 预览的钩子
const handlePictureCardPreview = () => {
  dialogVisible.value = true
}
// 删除的钩子
const handleRemove = () => {
  params.certificatesUrl = ''
}

// 重写按钮
const reset = () => {
  // 清除图片
  upload.value.clearFiles()
  // 清除数据
  Object.assign(params, {
    "certificatesNo": '',
    "certificatesType": '',
    "certificatesUrl": '',
    "name": '',
  })
}
// 提交按钮
const submit = async () => {
  // 这行代码进行所有表单验证，验证成功才执行后面的代码
  await form.value.validate()
  try {
    await reqMemberCreation(params)
    ElMessage({
      type: 'success',
      message: '认证成功'
    })
    // 认证成功之后重新获取用户数据
    getMemberInfo()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '认证失败'
    })
  }
}
// #endregion

// 自定义表单校验
// @ts-ignore
const validatorname = (rule: any, value: any, callback: any) => {
  const name = /^(?:[\u4e00-\u9fa5]+)(?:·[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/
  if (name.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确姓名'))
  }

}
// @ts-ignore
const validatorType = (rule: any, value: any, callback: any) => {
  if (value == '10' || value == '20') {
    callback()
  } else {
    callback(new Error('请选择正确的证件类型'))
  }
}
// @ts-ignore
const validatorNo = (rule: any, value: any, callback: any) => {
  const sfz = /^\d{18}$/
  const hkb = /^\d{9}$/
  if (params.certificatesType == '10' && sfz.test(value)) {
    callback()
  } else if (params.certificatesType == '20' && hkb.test(value)) {
    callback()
  } else {
    callback(new Error('证件号码或证件类型有误'))
  }
}

// @ts-ignore
const validatorUrl = (rule: any, value: any, callback: any) => {
  if (value.length) {
    callback()
  } else {
    callback(new Error('请上传证件照片'))
  }
}
const rules = {
  name: [{ required: true, validator: validatorname, trigger: 'blur' }],
  certificatesType: { required: true, validator: validatorType, trigger: 'blur' },
  certificatesNo: { required: true, validator: validatorNo, trigger: 'blur' },
  certificatesUrl: { required: true, validator: validatorUrl, trigger: 'blur' },
}
</script>

<style scoped lang="scss">
.certification {
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7f7f7f;
    margin-bottom: 20px;
  }

  span {
    margin-left: 5px
  }
}
</style>