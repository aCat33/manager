import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'

// 规则
let routes = [
   {
     path:'/index',
     component:index,
     children:[
       {
         path:'users',
         component:users
       }
     ]
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

//导航守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(to.path == '/login'){
    //直接去即可
    next()
  }
  else{
    //去登录页
    if(window.sessionStorage.getItem('token')){
      next()
    }else{
      Vue.prototype.$message.warning('请先登录');
      next('/login')
    }
  }
})

// 暴露
export default router;