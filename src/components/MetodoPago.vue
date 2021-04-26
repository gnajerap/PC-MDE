<template>
  <v-dialog max-width="600px" max-height="800px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn slot="activator" v-on="on" color="light-green darken-1" dark>
        Método de Pago
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1>Método de Pago</h1>
      </v-card-title>
      <v-card-subtitle class="mt-2">
        <h2>Monto Total: {{ montoTotalLocal }}</h2>
      </v-card-subtitle>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="submit" class="px-3">
          <v-text-field
            prepend-icon="mdi-currency-usd"
            label="Efectivo"
            type="number"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                prepend-icon="mdi-credit-card-check"
                label="Últimos 4 Dígitos"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                prepend-icon="mdi-credit-card-outline"
                label="Monto Tarjeta"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Número Autorización"
                prepend-icon="mdi-pound-box-outline"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-text-field v-model="montoVueltoLocal"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn text class="success" @click="aceptaDatos">Aceptar</v-btn>
        <v-spacer></v-spacer>
        <v-btn text class="error" @click="cancelaDatos">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: 'MetodosPago',
  props: {
    montoEfectivo: {
      type: Number,
      required: true,
    },
    montoTarjeta: {
      type: Number,
      required: false,
    },
    montoTotal: {
      type: Number,
      required: true,
    },
    montoVuelto: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      montoEfectivoLocal: this.montoEfectivo,
      montoTarjetaLocal: this.montoTarjeta,
      montoTotalLocal: this.montoTotal,
      montoVueltoLocal: this.montoVuelto,
      montoTotalLolcal: this.montoTotal,
      valid: true,
      dialog: false,
    }
  },
  methods: {
    aceptaDatos() {},
    cancelaDatos() {
      this.montoEfectivoLocal = this.montoEfectivo
      this.montoTarjetaLocal = this.montoTarjeta
      this.dialog = false
    },
  },
}
</script>