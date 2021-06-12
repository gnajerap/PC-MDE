<template>
  <v-dialog max-width="600px" max-height="800px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn slot="activator" v-on="on" color="light-green darken-1" dark>
        Pagar
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1>Método de Pago</h1>
      </v-card-title>
      <v-card-subtitle class="mt-2">
        <h2>Monto Total: {{ montoTotalLocal |formatNumber }}</h2>
        <!-- <v-text-field v-model="montoTotalLocal" disabled></v-text-field> -->
      </v-card-subtitle>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="submit"
          class="px-3"
        >
          <v-text-field
            prepend-icon="mdi-currency-usd"
            label="Efectivo"
            @focus="$event.target.select()"
            v-model="montoEfectivoLocal"
            :rules="montoVueltoLocal >= 0 ? [] : [rules.required]"
            type="number"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                prepend-icon="mdi-credit-card-check"
                @focus="$event.target.select()"
                v-model="numeroTarjetaLocal"
                counter="4"
                :rules="
                  montoTarjetaLocal > 0 ? [rules.required, rules.atLeast4] : []
                "
                label="Últimos 4 Dígitos"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                prepend-icon="mdi-credit-card-outline"
                v-model="montoTarjetaLocal"
                @focus="$event.target.select()"
                label="Monto Tarjeta"
                type="number"
                :rules="montoPagado < montoTotal ? [rules.required] : []"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Número Autorización"
                v-model="numeroAutorizacionLocal"
                prepend-icon="mdi-pound-box-outline" 
                :rules="
                  montoTarjetaLocal > 0 ? [rules.required, rules.atLeast4] : []
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Pagado"
                v-model="montoPagado"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :label="montoVueltoLocal > 0 ? 'Vuelto' : 'Pendiente'"
                class="text--primary headline"
                v-model="montoVueltoLocal" type="number"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" text class="success" @click="aceptaDatos"
          >Aceptar</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn text class="error" @click="cancelaDatos">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import numeral from 'numeral'
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
    numeroTarjeta: {
      type: String,
      required: true,
    },
    numeroAutorizacion: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      montoEfectivoLocal: this.montoEfectivo,
      montoTarjetaLocal: this.montoTarjeta,
      numeroTarjetaLocal: this.numeroAutorizacion,
      numeroAutorizacionLocal: this.numeroAutorizacion,
      valid: false,
      dialog: false,
      rules: {
        required: (value) => !!value || 'Requerido.',
        atLeast4: (v) => (v && v.length == 4) || 'Debe tener 4 caractéres',
      },
    }
  },
  created() {
    // this.montoTotalLocal = this.montoTotal
  },
  computed: {
    montoVueltoLocal() {
      return parseFloat(this.montoPagado) - parseFloat(this.montoTotalLocal)
    },
    montoTotalLocal() {
      return parseFloat(this.montoTotal)
    },
    montoPagado() {
      return (
        (this.montoEfectivoLocal === ''
          ? 0
          : parseFloat(this.montoEfectivoLocal)) +
        (this.montoTarjetaLocal === '' ? 0 : parseFloat(this.montoTarjetaLocal))
      )
    },
  },
  filters: {
    formatNumber: (value) => {
      return numeral(value).format("0,0.00")
    },
  },
  methods: {
    aceptaDatos() {
      this.$refs.form.validate()
      if (parseFloat(this.montoTotal) < this.montoPagado) {
        this.valid = false
        return
      }
      this.$emit('actulizaDatosMetodoPago', {
        montoEfectivo: parseFloat(this.montoEfectivoLocal),
        montoTarjeta: parseFloat(this.montoTarjetaLocal),
        numeroTarjeta: this.numeroTarjetaLocal,
        numeroAutorizacion: this.numeroAutorizacionLocal,
      })
      this.dialog = false
    },
    cancelaDatos() {
      this.montoEfectivoLocal = this.montoEfectivo
      this.montoTarjetaLocal = this.montoTarjeta
      this.montoTotalLocal = this.montoTotal
      this.numeroTarjetaLocal = this.numeroTarjeta
      this.numeroAutorizacionLocal = this.numeroAutorizacion
      this.dialog = false
    },
  },
}
</script>