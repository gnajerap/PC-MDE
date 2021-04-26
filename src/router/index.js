import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Productos from '../components/Productos'
import Usuarios from '../components/Usuarios'
import Facturacion from '../components/facturacion'
import Empresa from '../views/Empresa'

Vue.use(VueRouter)

const routes = [
  {
    path: '/empresa',
    name: 'Empresa',
    component: Empresa
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/productos/',
    name: 'Productos',
    component: Productos
  },
  {
    path: '/usuarios/',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/facturacion/',
    name: 'Facturacion',
    component: Facturacion
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
