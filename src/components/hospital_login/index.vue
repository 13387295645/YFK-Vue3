<template>
  <div class='login'>
    <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog">
      <el-row>
        <!-- 左侧：手机号码登录，微信扫一扫登录 -->
        <el-col :span="12">
          <div class="phone">
            <div v-show="scene == 0">
              <!-- 手机号登录相关表单 -->
              <el-form :model="loginParam" :rules="rules" ref="form">
                <el-form-item prop="phone">
                  <el-input placeholder="请输入手机号" :prefix-icon="User" v-model="loginParam.phone"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input placeholder="请输入验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="!isPhone || flag">
                    <span v-if="flag">获取验证码({{ time }}s)</span>
                    <span v-else @click="getCode">获取验证码</span>
                  </el-button>
                </el-form-item>
                <el-button style="width:100%" type="primary" size="default"
                  :disabled="!isPhone || loginParam.code.length != 6" @click="login">用户登录</el-button>
              </el-form>
              <div class="bottom" @click="ChangeScence">
                <p>微信扫码登录</p>
                <svg t="1728711950245" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4326" width="32" height="32">
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#28C445" p-id="4327"></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#28C445" p-id="4328"></path>
                </svg>
              </div>
            </div>
            <!-- 微信扫码登录界面 -->
            <div class="webChat" v-show="scene == 1">
              <!-- 这个容器显示微信扫码登录的页面 -->
              <div id="login_container"></div>
              <div class="sweepCode" @click="changePhone">
                <p>手机短信验证码登录</p>
                <svg t="1728980957041" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4845" width="32" height="32">
                  <path
                    d="M739.555556 1024H284.444444a113.777778 113.777778 0 0 1-113.777777-113.777778V113.777778a113.777778 113.777778 0 0 1 113.777777-113.777778h455.111112a113.777778 113.777778 0 0 1 113.777777 113.777778v796.444444a113.777778 113.777778 0 0 1-113.777777 113.777778z m56.888888-910.222222a56.888889 56.888889 0 0 0-56.888888-56.888889H284.444444a56.888889 56.888889 0 0 0-56.888888 56.888889v796.444444a56.888889 56.888889 0 0 0 56.888888 56.888889h455.111112a56.888889 56.888889 0 0 0 56.888888-56.888889V113.777778zM512 910.222222a56.888889 56.888889 0 1 1 56.888889-56.888889 56.888889 56.888889 0 0 1-56.888889 56.888889z m28.444444-739.555555h-56.888888a28.444444 28.444444 0 0 1 0-56.888889h56.888888a28.444444 28.444444 0 1 1 0 56.888889z"
                    fill="#515151" p-id="4846"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- 右侧二维码 -->
        </el-col>
        <el-col :span="12">
          <div class="leftContent">
            <div class="top">
              <div class="item">
                <img src="../../assets/code.jpg" alt="收款码">
                <svg t="1728715770487" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4668" width="20" height="20">
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#8a8a8a" p-id="4669"></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#8a8a8a" p-id="4670"></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>"快速预约挂号"</p>
              </div>
              <div class="item">
                <img src="../../assets/code.jpg" alt="收款码">
                <svg t="1728715722363" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3319" width="20" height="20">
                  <path
                    d="M736.653061 929.959184H287.346939c-45.97551 0-83.591837-37.616327-83.591837-83.591837V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h449.306122c45.97551 0 83.591837 37.616327 83.591837 83.591837v668.734694c0 45.97551-37.616327 83.591837-83.591837 83.591837zM287.346939 135.836735c-22.987755 0-41.795918 18.808163-41.795919 41.795918v668.734694c0 22.987755 18.808163 41.795918 41.795919 41.795918h449.306122c22.987755 0 41.795918-18.808163 41.795919-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795919-41.795918H287.346939z"
                    fill="#707070" p-id="3320"></path>
                  <path
                    d="M616.489796 815.020408H407.510204c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h208.979592c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959z"
                    fill="#707070" p-id="3321"></path>
                </svg>
                <p>扫一扫下载</p>
                <p>"预约挂号APP"</p>
              </div>
            </div>
          </div>
          <p class="tip">"易复康"官方指定平台</p>
          <p class="tip">快速挂号 安全放心</p>
        </el-col>
      </el-row>
      <template #footer>
        <el-button type="primary" size="default" @click="close">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup name='Login'>
import { ref, reactive, computed, watch } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { reqWxLogin } from '@/api/hospital';
import type { WXLoginResponse } from '@/api/hospital/type';
import { useRoute, useRouter } from 'vue-router';
//数据
let $route = useRoute()
let $router = useRouter()
let userStore = useUserStore()
let scene = ref<number>(0) //0代表手机号码登录 1代表微信扫码登录
let loginParam = reactive({
  phone: "",//手机号
  code: ''//验证码
})
let flag = ref<boolean>(false) //控制获取验证按钮，如果为真则显示倒计时，为假则隐藏
// 定时器秒数以及名称
let time = ref<number>(5)
let timer: any;
// 自定义校验
let form = ref<any>()

//方法
// 点击关闭窗口
const close = () => {
  userStore.visiable = false
}

// 点击切换微信扫码登录
const ChangeScence = async () => {
  scene.value = 1
  let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin')
  let result: WXLoginResponse = await reqWxLogin(redirect_URL)
  console.log(result);

  // 生成微信扫码登录二维码页面
  // @ts-ignore
  new WxLogin({
    self_redirect: true,//true:手机点击登录后可以在iframe内跳转到redirect_uri
    id: "login_container",//显示二维码容器设置
    appid: result.data.appid,//应用唯一标识，在微信开放平台提交应用审核通过后获得
    scope: "snsapi_login",//应用授权作用域
    redirect_uri: result.data.redirectUri,//重定向地址，需要进行UrlEncode
    state: 'result.data.state',//服务器重定向的地址携带的用户信息
    style: "black",//文字颜色
    href: ""//样式
  });
}


// 正则表达式验证手机号禁用获取验证码按钮
let isPhone = computed(() => {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

  return reg.test(loginParam.phone)
})
// 点击获取验证码/控制该按钮的倒计时 是否显示
let getCode = async () => {
  if (!isPhone.value || flag.value) return
  // 更改验证码按钮的状态
  flag.value = true
  try {
    // 获取验证码成功
    await userStore.getCode(loginParam.phone)
    loginParam.code = userStore.code
  } catch (error) {
    // 获取验证码失败
    ElMessage({
      type: 'error',
      message: (error as Error).message
    })
  }
}
// 验证码按钮倒计时功能
watch(() => flag.value, () => {
  //进入定时器前先清除定时器————只针对于setInterval
  // 原因：多次点击按钮时，多次创建了定时器，所以明面上看是“定时器越走越快”，其实是“多次初始化定时器”。所以其实并不是定时器越走越快，而是有多个定时器在执行，定时器里面的程序执行的频率提高了
  clearInterval(timer)
  timer = setInterval(() => {
    time.value--
    if (time.value == 0) {
      clearInterval(timer)
      flag.value = false
      time.value = 5
    }
  }, 1000);
},)

//登录功能
const login = async () => {
  //保证表单校验的两项都符合条件后再执行后面代码
  await form.value.validate()
  //发起登录请求
  //登录请求成功:顶部组件需要展示用户名字、对话框关闭
  //登录请求失败:弹出对应登录失败的错误信息
  try {
    // 登录成功
    userStore.Userlogin(loginParam)
    // 关闭对话框
    userStore.visiable = false
    //获取路径上的redirect
    let redirect = $route.query.redirect
    // 有的话往携带的地址跳，没有则返回home
    if (redirect) {
      $router.push(redirect as string)
    } else {
      $router.push('/home')
    }
  } catch (error) {
    // 显示错误信息
    ElMessage({
      type: 'error',
      message: (error as Error).message
    })
  }
}
// 自定义表单校验手机号和验证码，验证码只能验证是否为六位，是否与后台验证码一致需要后端完成
// @ts-ignore
const validatePhone = (rule: any, value: any, callback: any) => {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error("手机号不正确"))
  }
}
// @ts-ignore
const validateCode = (rule: any, value: any, callback: any) => {
  if (/^\d{6}$/.test(value)) {
    callback()
  } else {
    callback(new Error("验证码不正确"))
  }
}

// 表单校验规则
const rules = {
  // 默认校验方式，功能较为单一，只能简单的控制长度
  // #region
  // phone: [
  //   { required: true, message: '请输入正确的手机号', trigger: 'blur', min: 11, max: 11 },
  // ],
  // code: [
  //   { required: true, message: '验证码不正确', trigger: 'blur', min: 6, max: 6 },
  // ],
  // #endregion

  // 自定义校验
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  code: [{ validator: validateCode, }],
}

// 点击切换手机验证码登录
const changePhone = () => {
  scene.value = 0
}

//监听场景的数据
watch(
  () => scene.value,
  (val: number) => {
    if (val === 1) {
      userStore.queryState();
    }
  }
);
</script>

<style scoped lang="scss">
.login {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

    .webChat {
      display: flex;
      flex-direction: column;
      align-items: center;

      .sweepCode {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
          margin: 10px 0px;
        }
      }
    }
  }

  .phone {
    border: 1px solid #ccc;
    border-radius: 3%;
    padding: 20px;
    margin: 30px 0px;
    width: 450px;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 10px 0px;
    }
  }

  .leftContent {
    margin: 25px 0px 70px 0px;

    .top {
      display: flex;
      justify-content: space-around;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 130px;
          height: 130px;
          margin-bottom: 10px;
        }

        p {
          margin: 5px 0px;
        }
      }
    }
  }

  .tip {
    text-align: center;
    margin: 20px 0px;
    font-size: 20px;
    font-style: italic;
  }
}
</style>