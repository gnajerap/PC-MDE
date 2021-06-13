<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawerState = isLoggedIn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey-text">
        <span class="font-weight-light">POS</span>
        <span class="">Restaurante</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!isLoggedIn" text color="grey" router to="/">
        <span>Login</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn v-else @click="logout" text color="grey">
        <span>Salir</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawerState" temporary class="primary">
      <v-list>
        <v-list-item
          v-for="(link, index) in navLinks"
          :key="index"
          router
          :to="link.path"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['navLinks'],
  data() {
    return {
      drawerState: false,
    }
  },
  async created() {
    console.log('Pase por el created:')
    await this.$store.dispatch('loadUserLoggedAction')
    console.log('Environment Vars:', process.env)
  },
  methods: {
    logout() {
      const login = {
        id: null,
        token: null,
        role: null,
      }
      this.$store.dispatch('logoutAction', login)
      this.$router.push({
        path: '/',
        redirect: '/Login',
      })
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
}
</script>