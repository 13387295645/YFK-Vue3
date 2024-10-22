# Vue 3 + TypeScript + Vite

## 使用步骤
1.pnpm i
2.把组件名字写在script标签上：需要安装插件
  2.1. npm i vite-plugin-vue-setup-extend -D
  2.2. vite文件中引入
   1. import VueSetupExtend from 'vite-plugin-vue-setup-extend'
   2. plugins: [vue(), VueSetupExtend()],

pnpm run dev运行

目前存在的bug:
由确认就诊人信息(step2)跳转回挂号详情界面(index)再次选择挂号科室hoscode参数没有携带过来，导致(step1)页面渲染问题
