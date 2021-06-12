<template>
  <div id="app">
    <v-app class="grey lighten-4">
      <!-- <NavigationMenu
        :nav-links="navLinks"
        :image-path="require('./assets/logo.png')"
        background="#fff"
        link-color="#777"
        hoverBackground="#ddd"
      /> -->
      <NavBar :nav-links="navLinks" />
      <v-main class="mx-4">
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
// import Main from './components/Main'
// import NavigationMenu from '@/components/NavigationMenu'
import NavBar from '@/components/NavBar-vf'

export default {
  name: 'App',
  components: {
    // NavigationMenu,
    NavBar,
  },
  data() {
    return {
      navLinks: [
        {
          text: 'Dashboard',
          path: '/Dashboard',
          icon: 'mdi-view-dashboard',
        },
        {
          text: 'Conf. Empresa',
          path: '/Empresa',
          icon: 'mdi-chess-rook',
        },
        {
          text: 'Sucursales',
          path: '/Sucursales',
          icon: 'mdi-map-marker-radius-outline',
        },
        {
          text: 'Categorías',
          path: '/Categorias',
          icon: 'mdi-file-tree-outline',
        },
        {
          text: 'Productos',
          path: '/Productos',
          icon: 'mdi-noodles',
        },
        {
          text: 'Usuarios',
          path: '/Usuarios',
          icon: 'mdi-account-supervisor-circle',
        },
        {
          text: 'Facturación',
          path: '/facturacion',
          icon: 'mdi-receipt',
          role:'Ventas|Administrador|',
        },
        {
          text: 'Acerca de',
          path: '/About',
          icon: 'mdi-information-outline',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
// @import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';
</style>
