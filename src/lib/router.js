import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'

// 规则
let routes = [
   {
     path:'/index',
     component:index
   },
    
  {
    path:'/login',
    component:login
  },
 
]

// 路由对象
let router = new VueRouter({
  routes
})

// 暴露
export default router;