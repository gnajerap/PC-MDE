<template>
  <div class="dashboard">
    <h1>Estoy en el Dashboard</h1>
    <v-container>
      <v-card max-height="500" max-width="800" class="overflow-y-auto">
        <v-cart-text>
          <pdf
            v-if="true"
            src="http://localhost:8082/api/fe/documentosPDF/01/3101028782/07000001010000082790"
          />
        </v-cart-text>
      </v-card>
    </v-container>

    <div v-if="true">
      <iframe
        src="http://sd.blackball.lv/library/Learning_Vue.js_2_(2016).pdf"
        frameborder="5"
        title="Factura"
        height="600"
        width="800"
      ></iframe>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
//import Main from '@/components/Main.vue'
import pdf from 'vue-pdf-cdn'

export default {
  name: 'Dashboard',
  components: { pdf },
}
</script>
