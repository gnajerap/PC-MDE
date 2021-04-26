<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawerState = !drawerState"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey-text">
        <span class="font-weight-light">POS</span>
        <span class="">Restaurante</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="grey">
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
export default {
  props: ['navLinks'],

  data() {
    return {
      drawerState: false,
    }
  },
}
</script>