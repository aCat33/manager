import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'
import roles from '../components/roles.vue'
import rights from '../components/rights.vue'
import goods from '../components/goods.vue'
import params from '../components/params.vue'
import categories from '../components/categories.vue'
import orders from '../components/orders.vue'
import reports from '../components/reports.vue'

// 规则
let routes = [
  {
    path: '/',
    redirect: '/index'
  },
   {
     path:'/index',
     component:index,
     children:[
        {
          path: '',
          redirect: 'users'
        },
       {
         path:'users',
         component:users
       },
       {
        path:'roles',
        component:roles
      },
      {
        path:'rights',
        component:rights
      },
      {
        path:'goods',
        component:goods
      },
      {
        path:'params',
        component:params
      },
      {
        path:'categories',
        component:categories
      },
      {
        path:'orders',
        component:orders
      },
      {
        path:'reports',
        component:reports
      },
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