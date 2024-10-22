import { defineStore } from "pinia";
import { reqUserCode, reqUserLoing } from "@/api/hospital";
import { UserState } from "./interface";
import { LoginData, UserLoginResponseData } from "@/api/hospital/type";

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      visiable: false, //控制登录组件dialog的显示与隐藏
      code: '',//存储用户的验证码
      userInfo: JSON.parse(localStorage.getItem("USERINFO") as string) || {}
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
        // 本地存储，持久化用户数据
        localStorage.setItem("USERINFO", JSON.stringify(this.userInfo))
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    quit() {
      this.userInfo = { name: '', token: '' }
      localStorage.removeItem("USERINFO")
    }
  },
  getters: {}
})

export default useUserStore