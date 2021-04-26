<template >
  <v-dialog max-width="600px" max-height="800px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-bind="size" slot="activator" class="primary" v-on="on"
        >Información del Cliente</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <h1>Cliente</h1>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="submit" class="px-3">
          <v-select required v-model="tipoIdLocal" :items="tiposId"></v-select>
          <v-text-field
            prepend-icon="mdi-badge-account-horizontal"
            label="Número Identificación"
            :counter="12"
            v-model="cedulaClienteLocal"
            :rules="IdRules"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-format-letter-starts-with"
            v-model="nombreClienteLocal"
            label="Nombre del Cliente"
            required
          >
          </v-text-field>
          <v-text-field
            prepend-icon="mdi-email"
            label="Correo Electrónico"
            required
            :rules="[rules.required, rules.email]"
            v-model="correoClienteLocal"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-bind="size" text class="success mx-0 mt-3" @click="aceptaDatos"
          >Aceptar</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn v-bind="size" text class="error mx-0 mt-3" @click="cancelaDatos"
          >Cancelar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'InfoCliente',
  props: {
    tipoId: {
      type: String,
      required: true,
    },
    cedulaCliente: {
      type: String,
      required: true,
    },
    nombreCliente: {
      type: String,
      required: true,
    },
    cliente: {
      type: Object,
      // required: true,
    },
    correoCliente: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tipoIdLocal: this.tipoId,
      cedulaClienteLocal: this.cedulaCliente,
      nombreClienteLocal: this.nombreCliente,
      correoClienteLocal: this.correoCliente,
      valid: true,
      dialog: false,
      tiposId: [
        '01 - Cédula Física',
        '02 - Cédula Jurídica',
        '03 - DIMEX',
        '04 - NITE',
      ],
      IdRules: [
        (v) => !!v || 'El Id es requerido',
        (v) =>
          (v && v.length == 12) ||
          'Debe tener al menos 12 caracteres, puede completar con ceros a la izquierda',
      ],
      rules: {
        required: (value) => !!value || 'Requerido.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Correo incorrecto.'
        },
      },
    }
  },
  computed: {
    size() {
      const size = {
        /*xs: 'x-small',*/
        xs: 'small',
        sm: 'small',
        lg: 'large' /*, xl: 'x-large'*/,
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
  },
  methods: {
    aceptaDatos() {
      console.log(
        `Cliente en InfoCliente Editado: ${this.nombreClienteLocal} tipo: ${this.tipoIdLocal}`
      )
      this.$emit('actualizaDatosCliente', {
        tipoId: this.tipoIdLocal,
        cedulaCliente: this.cedulaClienteLocal,
        nombreCliente: this.nombreClienteLocal,
        correoCliente: this.correoClienteLocal,
      })
      this.dialog = false
    },
    cancelaDatos() {
      this.tipoIdLocal = this.tipoId
      this.cedulaClienteLocal = this.cedulaCliente
      this.nombreClienteLocal = this.nombreCliente
      this.correoClienteLocal = this.correoCliente
      this.dialog = false
    },
  },
}
</script>