<template>
  <!-- v-container centra el contenido cuando hay cambios de tamaño de la pantalla -->
  <v-container class="my-2" fluid>
    <v-row class="px-2">
      <v-col cols="12" md="6">
        <v-card
          class="px-3 overflow-y-auto flex-wrap"
          min-height="300px"
          height="85vh"
        >
          <v-card-text>
            <v-row no-gutters class="d-flex justify-space-between">
              <v-col
                cols="12"
                align-self="center"
                sm="4"
                md="6"
                lg="4"
                v-for="producto in productos"
                :key="producto.IdProducto"
              >
                <v-card
                  tile
                  color="#4DB6AC"
                  hover
                  class="ma-1 text-center"
                  @click="facturarProducto(producto)"
                >
                  <v-card-title>
                    <v-row>
                      <div class="overline white--text text-center mb-2">
                        Id: {{ producto.IdProducto }}
                      </div>
                    </v-row>
                    <v-row>
                      <div class="caption white--text">
                        {{ producto.NombreProducto }}
                      </div>
                    </v-row>
                  </v-card-title>
                  <v-card-text class="white--text caption text-right">
                    Precio: {{ producto.PrecioProducto }}
                  </v-card-text>
                  <v-card-actions></v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <hr />
      </v-col>
      <!-- Factura -->
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <h1
                  cols="12"
                  class="mb-4 text-caption text-sm-overline text-md-h4"
                >
                  {{ nombreCliente }}
                </h1>
                <v-row
                  dense
                  class="justify-space-between"
                  justify-content="center"
                >
                  <InfoCliente
                    v-on:actualizaDatosCliente="actualizaCliente($event)"
                    :tipoId="tipoId"
                    :cedulaCliente="cedulaCliente"
                    :nombreCliente="nombreCliente"
                    :correoCliente="correoCliente"
                  />

                  <v-btn v-bind="size" class="ml-1" color="orange" dark
                    >Entrega</v-btn
                  >
                  <!-- <v-btn v-bind="size" class="ml-1" color="lime lighten-1" dark
                    >Forma de Pago</v-btn
                  > -->
                  <MetodoPago
                    v-on:actulizaDatosMetodoPago="actualizaMetodoPago($metodos)"
                    :montoEfectivo="montoEfectivo"
                    :montoTarjeta="montoTarjeta"
                    :montoVuelto="montoVuelto"
                    :montoTotal="factura.resumen.totalDocumento"
                  />
                  <v-btn class="ml-1" v-bind="size" color="cyan" dark
                    >Adicionales</v-btn
                  >
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card height="45vh" class="overflow-y-auto">
              <v-card-text class="pt-0">
                <v-simple-table class="mt-0" fixed-header height="40vh">
                  <template>
                    <thead>
                      <tr>
                        <th class="text-left">Línea</th>
                        <th class="text-left">Código</th>
                        <th class="text-left">Producto</th>
                        <th class="text-center">Pre. Unit</th>
                        <th class="text-center">Cantidad</th>
                        <th class="text-right">Total</th>
                        <th class="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="linea in factura.detalle"
                        :key="linea.NumLinea"
                      >
                        <td>{{ linea.NumLinea }}</td>
                        <td>{{ linea.CodigoProd }}</td>
                        <td>{{ linea.NombreProducto }}</td>
                        <td class="text-right">{{ linea.PrecioUnitario }}</td>
                        <td class="text-center">{{ linea.Cantidad }}</td>
                        <td class="text-right">{{ linea.PrecioLinea }}</td>
                        <td class="text-center">
                          <v-btn
                            icon
                            class="mx-1 pa-1 text-caption"
                            color="error"
                            dark
                            @click="restaUno(linea)"
                            ><v-icon>mdi-minus-circle</v-icon></v-btn
                          >
                          <v-btn
                            icon
                            color="green"
                            class="mx-2 pa-1 text-caption"
                            dark
                            @click="sumaUno(linea)"
                            ><v-icon>mdi-plus-circle</v-icon></v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card class="ma-auto">
          <v-card-text class="text-right pr-8 text-caption text-md-h5">
            Total Factura: {{ factura.resumen.totalDocumento }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-bind="size"
              :disabled="factura.detalle.length <= 0"
              text
              class="success"
              >Pagar</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn v-bind="size" text class="success">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import InfoCliente from './InfoCliente.vue'
import MetodoPago from './MetodoPago.vue'

export default {
  name: 'Facturacion',
  data: () => ({
    valid: true,
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
    tipoId: '01 - Cédula Física',
    cedulaCliente: '000',
    nombreCliente: 'Cliente de Contado',
    correoCliente: '',
    factura: {
      cliente: {
        tipoId: '01 - Cédula Física',
        cedulaCliente: '000',
        nombreCliente: 'Cliente de Contado',
      },
      tipoDocumento: '01',
      detalle: [],
      resumen: {
        totalExento: 0,
        totalGravado: 0,
        totalIVA: 0,
        tatalDescuento: 0,
        totalDocumento: 0,
      },
    },
    montoEfectivo: 0,
    montoTarjeta: 0,
    montoVuelto: 0,
  }),
  components: {
    InfoCliente,
    MetodoPago,
  },
  created() {
    this.$store.dispatch('getProductosAction').then((prods) => {
      console.log('Productos => Finalizada la carga:', prods)
      console.log('Factura', this.factura)
    })
  },
  methods: {
    facturarProducto(prod) {
      console.log('Facturar', prod)
      const numLinea = this.factura.detalle.length + 1
      const linea = {
        NumLinea: numLinea,
        CodigoProd: prod.IdProducto,
        CodigoHacienda: prod.IdProducto,
        NombreProducto: prod.NombreProducto,
        Cantidad: 1,
        PrecioUnitario: prod.PrecioProducto,
        IVA: 0,
        PrecioLinea: parseFloat(prod.PrecioProducto),
      }

      const prodIndex = this.factura.detalle.findIndex(
        (p) => p.CodigoProd == linea.CodigoProd
      )

      console.log(`Indice del producto ${prodIndex}`)

      if (prodIndex == -1) {
        this.factura.detalle.push(linea)
      } else {
        this.factura.detalle[prodIndex].Cantidad += 1
        this.factura.detalle[prodIndex].PrecioLinea =
          this.factura.detalle[prodIndex].Cantidad *
          this.factura.detalle[prodIndex].PrecioUnitario
      }

      console.log('Factura:', this.factura)
      this.calculaTotal()
    },
    actualizaCliente(clienteEvent) {
      this.tipoId = clienteEvent.tipoId
      this.cedulaCliente = clienteEvent.cedulaCliente
      this.nombreCliente = clienteEvent.nombreCliente
      this.factura.cliente.tipoId = clienteEvent.tipoId
      this.factura.cliente.cedulaCliente = clienteEvent.cedulaCliente
      this.factura.cliente.nombreCliente = clienteEvent.nombreCliente
      console.log(`Actualiza Desde cliente en padre:  ${this.nombreCliente}`)
    },
    restaUno(linea) {
      // console.log(`Linea por borrar: ${linea.CodigoProd}`)
      const prodIndex = this.factura.detalle.findIndex(
        (p) => p.CodigoProd == linea.CodigoProd
      )
      if (prodIndex >= 0) {
        this.factura.detalle[prodIndex].Cantidad -= 1
        if (this.factura.detalle[prodIndex].Cantidad == 0) {
          this.factura.detalle = this.factura.detalle.filter(
            (p) => p.Cantidad > 0
          )
          this.renumeraLineas()
        } else {
          this.factura.detalle[prodIndex].PrecioLinea =
            this.factura.detalle[prodIndex].Cantidad *
            this.factura.detalle[prodIndex].PrecioUnitario
        }
      }
      this.calculaTotal()
    },
    sumaUno(linea) {
      console.log(`Linea por sumar: ${Object.values(linea)}`)
      const prodIndex = this.factura.detalle.findIndex(
        (p) => p.CodigoProd == linea.CodigoProd
      )
      if (prodIndex >= 0) {
        this.factura.detalle[prodIndex].Cantidad += 1
        this.factura.detalle[prodIndex].PrecioLinea =
          this.factura.detalle[prodIndex].Cantidad *
          this.factura.detalle[prodIndex].PrecioUnitario
      }
      this.calculaTotal()
    },
    renumeraLineas() {
      // reccore el arreglo y substituye el numero de linea con el indice + 1
      this.factura.detalle.forEach(
        (linea, index) => (linea.NumLinea = index + 1)
      )
    },
    calculaTotal() {
      // TOMADO DE: https://javascript.info/array-methods
      // hace un arreglo de los precios de las lineas
      // const arrPrecios = this.factura.detalle.reduce(
      //   (acc, linea) => [...acc, linea.PrecioLinea],
      //   []
      // )
      // console.log(arrPrecios)

      // https://www.youtube.com/watch?v=NiLUGy1Mh4U
      // saca el total de las lineas
      const totalFactura = this.factura.detalle.reduce(
        (acumulador, item) => acumulador + item.PrecioLinea,
        0
      )
      this.factura.resumen.totalDocumento = totalFactura
      console.log(`total de la factura: ${totalFactura}`)
    },
  },
  computed: {
    ...mapGetters({
      productos: 'getProductos',
    }),
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
}
</script>

<style scoped>
</style>
