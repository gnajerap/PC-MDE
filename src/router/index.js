import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from '../views/Dashboard'
// import Categorias from '../components/Categorias'
// import Productos from '../components/Productos'
import Usuarios from '../components/Usuarios'
import Facturacion from '../components/facturacion'
import Empresa from '../views/Empresa'
import Sucursales from '../views/Sucursales'
import store from '../store'
// import Login from '../components/Login'
// import mapGetters from 'vuex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/',
    name: 'Login',
    component: () =>
      import(
        /*webpackChunkName:"Login" */
        '../components/Login.vue'
      )
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(
        /*webpackChunkName:"Dashboard" */
        '../views/Dashboard'
      ),
    meta: { requiresAuth: true }
  },
  {
    path: '/empresa',
    name: 'Empresa',
    component: () =>
      import(
        /*webpackChunkName:"Empresa" */
        '../views/Empresa.vue'
      ),
    meta: { requiresAuth: true }
  },
  {
    path: '/sucursales',
    name: 'Sucursales',
    component: () =>
      import(
        /*webpackChunkName:"Sucursales" */
        '../views/Sucursales.vue'
      ),
    meta: { requiresAuth: true }
  },
  {
    path: '/categorias/',
    name: 'Categorias',
    component: () =>
      import(
        /* webpackChunkName: "Categorias" */
        '../components/Categorias.vue'
      ),
    meta: { requiresAuth: true }
  },
  {
    path: '/productos/',
    name: 'Productos',
    component: () =>
      import(
        /* webpackChunkName: "Productos" */
        '../components/Productos.vue'
      ),
    meta: { requiresAuth: true }
    // beforeEnter: (to, from, next) => {
    //   console.log('To:', to)
    //   console.log('Usuario en el store: ', store.state.loggedUser)
    //   if (!store.getters.isLoggedIn) {
    //     next('/')
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/usuarios/',
    name: 'Usuarios',
    component: () =>
      import(
        /*webpackChunkName:"Usuarios" */
        '../components/Usuarios.vue'
      ),
    meta: { requiresAuth: true }
  },
  {
    path: '/facturacion/',
    name: 'Facturacion',
    component: () =>
      import(
        /*webpackChunkName:"Facturacion" */
        '../components/facturacion.vue'
      ),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "About" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('To:', to)
  console.log('Esta logueado:', store.getters.isLoggedIn)
  console.log(
    'Requires Auth:',
    to.matched.some(record => record.meta.requiresAuth)
  )
  store.dispatch('loadUserLoggedAction');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //need login
    if (!store.getters.isLoggedIn) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
