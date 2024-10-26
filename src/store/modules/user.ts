import { defineStore } from "pinia";
import { reqUserCode, reqUserLoing } from "@/api/hospital";
import { UserState } from "./interface";
import { LoginData, UserLoginResponseData } from "@/api/hospital/type";
import { ElMessage } from "element-plus";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user";

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      visiable: false, //控制登录组件dialog的显示与隐藏
      code: '',//存储用户的验证码
      userInfo: JSON.parse(GET_TOKEN() as string) || {}
    }
  },
  actions: {
    // 验证码功能
    async getCode(phone: string) {
      // @ts-ignore
      let result: any = await reqUserCode(phone)
      if (result.code == 200) {
        this.code = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 登录功能
    async Userlogin(LoginData: LoginData) {
      let result: UserLoginResponseData = await reqUserLoing(LoginData)
      if (result.code == 200) {
        this.userInfo = result.data
        //本地存储持久化存储用户信息
        SET_TOKEN(JSON.stringify(this.userInfo));
        return 'ok'
      } else {
        // return Promise.reject(new Error(result.message))
        ElMessage({
          type: 'error',
          message: result.message
        })
      }
    },
    // 退出登录
    quit() {
      //清空仓库的数据
      this.userInfo = { name: '', token: '' }
      //清空本地存储的数据
      REMOVE_TOKEN();
    },
    //查询微信扫码的接口(看本地存储是否存储数据)
    queryState() {
      //开启定时器每隔一段时间问:本地村是都拥有用户信息
      let timer = setInterval(() => {
        //本地存储已有有数据:扫码成功
        if (GET_TOKEN()) {
          //关闭对话框
          this.visiable = false;
          this.userInfo = JSON.parse(GET_TOKEN() as string);
          clearInterval(timer);
        }
      }, 1000);
    }
  },
  getters: {}
})

export default useUserStore