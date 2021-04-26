<template>
  <v-container>
    <h1>Mantemiento de Datos de la empresa</h1>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit" v-model="valid">
          <v-row>
            <v-col cols="6" md="3">
              <v-text-field
                class="mb-4"
                v-model="codigoActividad"
                required
                label="Código de Actividad Económica"
                counter="6"
                hint="Es un número asignado según el negocio"
                hide-details="auto"
                :rules="rules.codActividad"
                type="number"
              ></v-text-field>
              <v-select
                class="mb-4"
                label="Tipo ID"
                v-model="tipoId"
                :items="tiposId"
                required
                :rules="rules.tipoId"
              ></v-select>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field
                class="mb-4"
                v-model="nombreEmisor"
                required
                :rules="rules.nombreEmisor"
                counter="100"
                label="Nombre Emisor"
              ></v-text-field>
              <v-text-field
                class="mb-4"
                counter="12"
                v-model="identificacion"
                :rules="rules.identificacion"
                required
                hint="Complete 12 carácteres con ceros a la izquierda"
                label="Identificación Emisor"
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="3">
              <v-text-field
                counter="80"
                v-model="nombreComercial"
                label="Nombre Comercial"
                hint="Opcional"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="3">
              <v-select
                label="Provincia"
                v-model="provincia"
                required
                :items="provincias"
                prepend-icon="mdi-map"
              ></v-select>
              <v-text-field
                prepend-icon="mdi-map-marker-outline"
                label="Cantón"
                v-model="canton"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-map-marker-outline"
                label="Distrito"
                v-model="distrito"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <v-text-field
                label="Barrio"
                v-model="barrio"
                hint="Opcional"
              ></v-text-field>
              <v-textarea
                label="Otras Señas"
                v-model="otrasSennas"
                type="text-area"
                outlined
                clearable
                counter="250"
              ></v-textarea>
            </v-col>
            <v-col cols="6" md="3">
              <v-select
                label="Código de País (opcional)"
                v-model="codigoPais"
                :items="paises"
                item-text="name"
                item-value="dial_code"
                prepend-icon="mdi-flag"
                persistent-hint
                return-object
                :hint="`${codigoPais.name}, ${codigoPais.dial_code}`"
              ></v-select>
              <v-text-field
                type="phone"
                v-model="telefono"
                label="Número de Teléfono"
                hint="Opcional"
                prepend-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                v-model="correoElectronico"
                label="Correo Electrónico"
                required
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn :disabled="!valid" color="success" @click="almacenar"
                >Aceptar</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import paises from '../assets/data/CountryCodes.json'

export default {
  name: 'Empresa',
  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || 'Requerido.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Correo incorrecto.'
        },
        codActividad: [
          (val) => !!val || 'Código Actividad Requerido',
          (val) =>
            (val && val.length == 6) ||
            'Debe tener 6 números asignados por Hacienda',
        ],
        nombreEmisor: [(val) => !!val || 'Debe digitar el nombre'],
        identificacion: [(val) => !!val || 'Debe digitar una Identifación'],
        tipoId: [(val) => !!val || 'Debe Seleccionar un tipo de ID'],
      },
      codigoActividad: '',
      nombreEmisor: '',
      identificacion: '',
      tipoId: '',
      tiposId: [
        '01 - Cédula Física',
        '02 - Cédula Jurídica',
        '03 - DIMEX',
        '04 - NITE',
      ],
      codigoPais: {
        code: 'CR',
        name: 'Costa Rica',
        dial_code: '+506',
      },
      // numeroIdentificacion: '',
      nombreComercial: '', //Opcional
      ubicacion: '',
      provincia: '',
      canton: '',
      distrito: '',
      barrio: '',
      otrasSennas: '',
      telefono: '',
      correoElectronico: '',
      provincias: [
        '1 - San José',
        '2 - Alajuela',
        '3 - Cartago',
        '4 - Heredia',
        '5 - Guanacaste',
        '6 - Puntarenas',
        '7 - Limon',
      ],
      // paises: paises.sort((a, b) => {
      //   console.log(
      //     `Nombre 1 ${a.name} - ${a.code} nombre 2 ${b.name} - ${b.code}`
      //   )
      //   if (a.code.trim() > b.code.trim()) {
      //     return 1
      //   }
      //   if (a.code.trim() < b.code.trim()) {
      //     return -1
      //   }
      //   return 0
      // }),
      paises: paises.sort((a, b) => (a.name > b.name ? 1 : -1)),
    }
  },
  methods: {
    almacenar() {
      this.$refs.form.validate()
      if (this.valid) {
        // console.log('Almacenar')
        const empresa = {
          CodigoActividad: this.codigoActividad,
          NombreEmisor: this.nombreEmisor,
          TipoId: this.tipoId,
          Identificacion: this.identificacion,
          NombreComercial: this.nombreComercial,
          Provincia: this.provincia,
          Canton: this.canton,
          Distrito: this.distrito,
          Barrio: this.barrio,
          OtrasSenas: this.otrasSennas,
          CodigoPais: {
            dial_code: this.codigoPais.dial_code,
            name: this.codigoPais.name,
            code: this.codigoPais.code,
          },
          NumeroTelefono: this.telefono,
          CorreoElectronico: this.correoElectronico,
        }
        console.log(`Empresa: ${empresa}`)
        this.$store.dispatch('addDataEmpresaAction', empresa)
      }
    },
  },
  async created() {
    await this.$store.dispatch('getEmpresasAction')
    console.log('Finalizada la carga de Empresas', this.empresas[0])
    this.nombreEmisor = this.empresas[0].NombreEmisor
    this.nombreComercial = this.empresas[0].NombreComercial
    this.tipoId = this.empresas[0].TipoId
    this.identificacion = this.empresas[0].Identificacion
    this.codigoActividad = this.empresas[0].CodigoActividad
    this.provincia = this.empresas[0].Provincia
    this.canton = this.empresas[0].Canton
    this.distrito = this.empresas[0].Distrito
    this.barrio = this.empresas[0].Barrio
    this.otrasSennas = this.empresas[0].OtrasSenas
    this.codigoPais.code = this.empresas[0].CodigoPais.code
    this.codigoPais.name = this.empresas[0].CodigoPais.name
    this.codigoPais.dial_code = this.empresas[0].CodigoPais.dial_code
    this.telefono = this.empresas[0].NumeroTelefono
    this.correoElectronico = this.empresas[0].CorreoElectronico
  },
  computed: {
    ...mapGetters({
      empresas: 'getEmpresas',
    }),
  },
}
</script>