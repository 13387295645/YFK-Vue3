// 路由守卫
import router from "./router";
// 引入用户数据存储的仓库
import useUserStore from "./store/modules/user";
// 引入大仓库
import pinia from '@/store';
// 引入进度条
// @ts-ignore
import NProgress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css'
// 进度条右边小圆球要不要
NProgress.configure({ trickle: false });
// 用户未登录可以访问的路由组件
let whiteList = ['/home', '/hospital/register', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search']
// 判断用户是否登录的token
let UserStore = useUserStore(pinia)
// 全局路由守卫
// 前置守卫
//@ts-ignore
router.beforeEach((to, from, next) => {
  //访问路由组件的之前,进度条开始动
  NProgress.start()
  //动态设置网页左上角的标题
  document.title = `易复康-${to.meta.title}`
  // 判断用户是否登录的token
  let token = UserStore.userInfo.token
  // 用户登录了
  if (token) {
    next()
  } else {
    // 用户未登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 显示登录组件,跳转首页
      UserStore.visiable = true
      next({ query: { redirect: to.fullPath } })
    }
  }
})
// 后置守卫
//@ts-ignore
router.beforeEach((to, from) => {
  NProgress.done()
})