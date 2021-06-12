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
                :key="producto.CodProducto"
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
                        Id: {{ producto.CodProducto }}
                      </div>
                    </v-row>
                    <v-row>
                      <div class="caption white--text">
                        {{ producto.Descripcion }}
                      </div>
                    </v-row>
                  </v-card-title>
                  <v-card-text class="white--text caption text-right">
                    Precio: {{ producto.PrecioUnitario }}
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
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <h1 class="mb-4 text-caption text-sm-overline text-md-h5">
                      {{ FacturaElectronica.Receptor.Nombre }}
                    </h1>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <span class="text-h5 text-sm-overline"
                      >Condición Venta:</span
                    >
                    <v-radio-group
                      v-model="FacturaElectronica.CondicionVenta"
                      row
                    >
                      <v-radio label="Contado" value="01"></v-radio>
                      <v-radio label="Crédito" value="02"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                    class="text-h6 text-sm-overline"
                  >
                    Fecha:
                    <span class="text-h6 text-sm-overline">{{
                      FacturaElectronica.FechaEmision
                    }}</span>
                  </v-col>
                </v-row>
                <v-row dense> </v-row>
                <v-row
                  dense
                  class="justify-space-between"
                  justify-content="center"
                >
                  <InfoCliente
                    v-on:actualizaDatosCliente="actualizaCliente($event)"
                    :tipoId="FacturaElectronica.Receptor.Identificacion.Tipo"
                    :cedulaCliente="
                      FacturaElectronica.Receptor.Identificacion.Numero
                    "
                    :nombreCliente="FacturaElectronica.Receptor.Nombre"
                    :correoCliente="
                      FacturaElectronica.Receptor.CorreoElectronico
                    "
                    :enviarCorreo="enviarCorreo"
                  />

                  <v-btn v-bind="size" class="ml-1" color="orange" dark
                    >Entrega</v-btn
                  >
                  <!-- <v-btn v-bind="size" class="ml-1" color="lime lighten-1" dark
                    >Forma de Pago</v-btn
                  > -->
                  <!-- :disabled="FacturaElectronica.Detalle.length <= 0" -->
                  <MetodoPago
                    v-if="
                      FacturaElectronica.ResumenFactura.TotalComprobante > 0
                    "
                    v-on:actulizaDatosMetodoPago="actualizaMetodoPago($event)"
                    :montoEfectivo="montoEfectivo"
                    :montoTarjeta="montoTarjeta"
                    :montoVuelto="montoVuelto"
                    :montoTotal="
                      FacturaElectronica.ResumenFactura.TotalComprobante
                    "
                    :numeroTarjeta="numeroTarjeta"
                    :numeroAutorizacion="numeroAutorizacion"
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
                        v-for="linea in FacturaElectronica.LineaDetalle"
                        :key="linea.NumeroLinea"
                      >
                        <td>{{ linea.NumeroLinea }}</td>
                        <td>{{ linea.Codigo }}</td>
                        <td>{{ linea.Descripcion }}</td>
                        <td class="text-right">
                          {{ linea.PrecioUnitario | formatNumber }}
                        </td>
                        <td class="text-center">{{ linea.Cantidad }}</td>
                        <td class="text-right">
                          {{ linea.PrecioLinea | formatNumber }}
                        </td>
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
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="4"
                class="text-right text-caption text-md-h6"
              >
                Total Gravado:
                {{
                  FacturaElectronica.ResumenFactura.TotalGravado | formatNumber
                }}
              </v-col>

              <v-col
                cols="12"
                md="4"
                class="text-right text-caption text-md-h6"
              >
                Total Impuesto:
                {{
                  FacturaElectronica.ResumenFactura.TotalImpuesto | formatNumber
                }}
              </v-col>
              <v-col
                cols="12"
                md="4"
                class="text-right text-caption text-md-h6"
              >
                Total Factura:
                {{
                  FacturaElectronica.ResumenFactura.TotalComprobante
                    | formatNumber
                }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <!-- <v-btn
              v-bind="size"
              :disabled="FacturaElectronica.Detalle.length <= 0"
              text
              class="success"
              >Pagar</v-btn
            > -->
            <v-spacer></v-spacer>
            <v-btn
              v-bind="size"
              v-on:click="imprimeFactura()"
              text
              class="success"
              >Imprimir</v-btn
            >
            <v-btn v-bind="size" text class="success">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row id="factura">
      <body>
        <div class="ticket">
          <p class="centrado">
            Ceviches de la Esquina, S.A.
            <br />
            Tiquete de venta <br />San José, Costa Rica <br />
            Fecha: {{ fechaDocumento }}
          </p>
          <p>Cliente: {{ FacturaElectronica.Receptor.Nombre }}</p>
          <table>
            <thead>
              <tr>
                <th class="cantidad">CANT</th>
                <th class="producto">PRODUCTO</th>
                <th class="precio">PRECIO</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="linea in FacturaElectronica.LineaDetalle"
                :key="linea.NumLinea"
              >
                <td class="cantidad">{{ linea.Cantidad }}</td>
                <td class="producto">{{ linea.Descripcion }}</td>
                <td class="text-right">{{ linea.PrecioLinea }}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total:</td>
                <td>
                  {{
                    FacturaElectronica.ResumenFactura.TotalComprobante
                      | formatNumber
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <p class="centrado">
            ¡GRACIAS POR SU COMPRA!<br />Ceviches de la Esquina, S.A.
          </p>
        </div>
      </body>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import InfoCliente from './InfoCliente.vue'
import MetodoPago from './MetodoPago.vue'
import moment from 'moment'
import numeral from 'numeral'

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
    // tipoId: '01 - Cédula Física',
    // cedulaCliente: '000',
    // nombreCliente: 'Cliente de Contado',
    // correoCliente: '',
    FacturaElectronica: {
      TipoDocumento: '04',
      CodigoActividad: '',
      Clave: '',
      NumeroConsecutivo: '',
      FechaEmision: moment(new Date()).format('DD/MM/YYYY'),
      CondicionVenta: '01',
      Emisor: {
        Nombre: '',
        Identificacion: {
          Tipo: '',
          Numero: '',
        },
        Ubicacion: {
          Provincia: '',
          Canton: '',
          Distrito: '',
          Barrio: '',
          OtrasSennas: '',
        },
        Telefono: {
          CodigoPais: '',
          NumTelefono: '',
        },
        Fax: {
          CodigoPais: '',
          NumTelefono: '',
        },
        CorreoElectronico: '',
      },
      Receptor: {
        // tipoId: '01 - Cédula Física',
        // cedulaCliente: '000',
        // nombreCliente: 'Cliente de Contado',
        Nombre: 'Cliente de Contado',
        Identificacion: {
          Tipo: '01 - Cédula Física',
          Numero: '000',
        },
        Ubicacion: {
          Provincia: '',
          Canton: '',
          Distrito: '',
          Barrio: '',
          OtrasSennas: '',
        },
        CorreoElectronico: '',
      },
      ResumenFactura: {
        CodigoTipoMoneda: {
          CodigoMoneda: 'CRC',
          TipoCambio: 1,
        },
        TotalServGravados: 0,
        TotalServExentos: 0,
        TotalServExonerado: 0,
        TotalMercanciasGravadas: 0,
        TotalMercanciasExentas: 0,
        TotalMercExonerada: 0,
        TotalGravado: 0,
        TotalExento: 0,
        TotalExonerado: 0,
        TotalVenta: 0,
        TotalDescuento: 0,
        TotalVentaNeta: 0,
        TotalImpuesto: 0,
        TotalIVADevuelto: 0,
        TotalOtrosCargos: 0,
        TotalComprobante: 0,
      },
      LineaDetalle: [],
      Otros: [],
    },
    tipoDocumento: '01',
    montoEfectivo: 0,
    montoTarjeta: 0,
    montoVuelto: 0,
    enviarCorreo: false,
    numeroTarjeta: '',
    numeroAutorizacion: '',
  }),
  filters: {
    fechaTicaFormat: (fecha) => {
      if (!fecha) return ''
      return moment(String(fecha)).format('DD/MM/YYYY')
    },
    formatNumber: (value) => {
      return numeral(value).format('0,0.00')
    },
  },
  components: {
    InfoCliente,
    MetodoPago,
  },
  created() {
    this.$store
      .dispatch('getProductosAction')
      .then((prods) => {
        console.log('Productos => Finalizada la carga:', prods)
        // console.log('Factura', this.factura)
      })
      .catch((error) => {
        console.log(error)
      })
    this.$store.dispatch('getEmpresasAction').then((empresas) => {
      this.FacturaElectronica.Emisor.Nombre = empresas[0].NombreEmpresa
      this.FacturaElectronica.Emisor.Identificacion.Tipo =
        empresas[0].TipoIdentificacion
      this.FacturaElectronica.Emisor.Identificacion.Numero =
        empresas[0].NumeroIdentificacion
      this.FacturaElectronica.Emisor.Ubicacion.Provincia = empresas[0].Provincia
      this.FacturaElectronica.Emisor.Ubicacion.Canton = empresas[0].Canton
      this.FacturaElectronica.Emisor.Ubicacion.Distrito = empresas[0].Distrito
      this.FacturaElectronica.Emisor.Ubicacion.Barrio = empresas[0].Barrio
      this.FacturaElectronica.Emisor.Ubicacion.OtrasSennas =
        empresas[0].OtrasSennas
      this.FacturaElectronica.Emisor.Telefono.CodigoPais =
        empresas[0].CodigoPais
      this.FacturaElectronica.Emisor.Telefono.NumTelefono =
        empresas[0].NumeroTelefono
      this.FacturaElectronica.Emisor.Fax.CodigoPais = empresas[0].CodigoPaisFax
      this.FacturaElectronica.Emisor.Fax.NumTelefono = empresas[0].NumeroFax
      this.FacturaElectronica.Emisor.CorreoElectronico =
        empresas[0].CorreoElectronico
      this.FacturaElectronica.CodigoActividad = empresas[0].CodigoActividad
    })
  },
  methods: {
    facturarProducto(prod) {
      console.log('Facturar', prod)
      const numLinea = this.FacturaElectronica.LineaDetalle.length + 1
      const linea = {
        NumeroLinea: numLinea,
        Codigo: prod.CodProducto,
        CodigoCabys: prod.CodigoCabys,
        Descripcion: prod.Descripcion,
        Cantidad: 1,
        PrecioUnitario: parseFloat(prod.PrecioUnitario),
        IVA: parseFloat(prod.PrecioUnitario) * 0.115,
        PrecioLinea: parseFloat(prod.PrecioUnitario),
      }
      console.log('linea:', linea)
      const prodIndex = this.FacturaElectronica.LineaDetalle.findIndex(
        (p) => p.Codigo == linea.Codigo
      )

      console.log(`Indice del producto ${prodIndex}`)
      const factor = parseFloat('0.115')
      console.log('Factor', factor)

      if (prodIndex == -1) {
        this.FacturaElectronica.LineaDetalle.push(linea)
      } else {
        this.FacturaElectronica.LineaDetalle[prodIndex].Cantidad += 1

        this.FacturaElectronica.LineaDetalle[prodIndex].PrecioLinea =
          this.FacturaElectronica.LineaDetalle[prodIndex].Cantidad *
          this.FacturaElectronica.LineaDetalle[prodIndex].PrecioUnitario

        this.FacturaElectronica.LineaDetalle[prodIndex].IVA =
          this.FacturaElectronica.LineaDetalle[prodIndex].PrecioLinea * 0.115
      }

      console.log('Factura:', this.FacturaElectronica)
      this.calculaTotal()
    },
    actualizaCliente(clienteEvent) {
      // this.tipoId = clienteEvent.tipoId
      // this.cedulaCliente = clienteEvent.cedulaCliente
      // this.nombreCliente = clienteEvent.nombreCliente
      this.FacturaElectronica.Receptor.Identificacion.Tipo = clienteEvent.tipoId
      this.FacturaElectronica.Receptor.Identificacion.Numero =
        clienteEvent.cedulaCliente
      this.FacturaElectronica.Receptor.Nombre = clienteEvent.nombreCliente
      this.FacturaElectronica.Receptor.CorreoElectronico =
        clienteEvent.correoCliente
      this.enviarCorreo = clienteEvent.enviarCorreo
      console.log(`Actualiza Desde cliente en padre:  ${this.nombreCliente}`)
    },
    actualizaMetodoPago(pago) {
      console.log('Pago en actualiza pago', pago)
      this.numeroAutorizacion = pago.numeroAutorizacion
      this.numeroTarjeta = pago.numeroTarjeta
      this.montoTarjeta = pago.montoTarjeta
      this.montoEfectivo = pago.montoEfectivo
    },
    restaUno(linea) {
      // console.log(`Linea por borrar: ${linea.CodigoProd}`)
      const prodIndex = this.FacturaElectronica.LineaDetalle.findIndex(
        (p) => p.Codigo == linea.Codigo
      )
      if (prodIndex >= 0) {
        this.FacturaElectronica.LineaDetalle[prodIndex].Cantidad -= 1
        if (this.FacturaElectronica.LineaDetalle[prodIndex].Cantidad == 0) {
          this.FacturaElectronica.LineaDetalle = this.FacturaElectronica.LineaDetalle.filter(
            (p) => p.Cantidad > 0
          )
          this.renumeraLineas()
        } else {
          this.FacturaElectronica.LineaDetalle[prodIndex].PrecioLinea =
            this.FacturaElectronica.LineaDetalle[prodIndex].Cantidad *
            this.FacturaElectronica.LineaDetalle[prodIndex].PrecioUnitario
          this.FacturaElectronica.LineaDetalle[prodIndex].IVA =
            this.FacturaElectronica.LineaDetalle[prodIndex].PrecioLinea * 0.115
        }
      }
      this.calculaTotal()
    },
    sumaUno(linea) {
      console.log(`Linea por sumar: ${Object.values(linea)}`)
      const prodIndex = this.FacturaElectronica.LineaDetalle.findIndex(
        (p) => p.Codigo == linea.Codigo
      )
      if (prodIndex >= 0) {
        this.FacturaElectronica.LineaDetalle[prodIndex].Cantidad += 1
        this.FacturaElectronica.LineaDetalle[prodIndex].PrecioLinea =
          this.FacturaElectronica.LineaDetalle[prodIndex].Cantidad *
          this.FacturaElectronica.LineaDetalle[prodIndex].PrecioUnitario
        this.FacturaElectronica.LineaDetalle[prodIndex].IVA =
          this.FacturaElectronica.LineaDetalle[prodIndex].PrecioLinea * 0.115
      }
      this.calculaTotal()
    },
    renumeraLineas() {
      // reccore el arreglo y substituye el numero de linea con el indice + 1
      this.FacturaElectronica.LineaDetalle.forEach(
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
      const totalFactura = this.FacturaElectronica.LineaDetalle.reduce(
        (acumulador, item) => acumulador + item.PrecioLinea,
        0
      )
      const totalImpuesto = this.FacturaElectronica.LineaDetalle.reduce(
        (acumulador, item) => acumulador + item.IVA,
        0
      )
      this.FacturaElectronica.ResumenFactura.TotalMercanciasGravadas =
        totalFactura - totalImpuesto
      this.FacturaElectronica.ResumenFactura.TotalGravado =
        totalFactura - totalImpuesto
      this.FacturaElectronica.ResumenFactura.TotalVenta =
        totalFactura - totalImpuesto
      this.FacturaElectronica.ResumenFactura.TotalImpuesto = totalImpuesto
      this.FacturaElectronica.ResumenFactura.TotalVentaNeta =
        totalFactura - totalImpuesto
      this.FacturaElectronica.ResumenFactura.TotalComprobante = totalFactura
      console.log(`total de la factura: ${totalFactura}`)
    },
    imprimeFactura() {
      this.$store
        .dispatch('addFacturaAction', this.FacturaElectronica)
        .then((addedFactura) => {
          console.log('Factura creada', addedFactura)
        })
        .catch((error) => {
          console.log('No se creo la factura', error)
        })
      // window.print()
    },
  },
  computed: {
    ...mapGetters({
      productos: 'getProductos',
      empresas: 'getEmpresas',
    }),
    fechaDocumento() {
      return moment(new Date()).format('DD/MM/YYYY')
      // let today = new Date()
      // let dd = String(today.getDate()).padStart(2, '0')
      // let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      // let yyyy = today.getFullYear()
      // return (today = dd + '/' + mm + '/' + yyyy)
    },
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
* {
  font-size: 12px;
  font-family: 'Times New Roman';
}

td,
th,
tr,
table {
  border-top: 1px solid black;
  border-collapse: collapse;
}

td.producto,
th.producto {
  width: 75px;
  max-width: 75px;
}

td.cantidad,
th.cantidad {
  width: 100px;
  max-width: 100px;
  word-break: break-all;
}

td.precio,
th.precio {
  width: 70px;
  max-width: 70px;
  word-break: break-all;
}

.centrado {
  text-align: center;
  align-content: center;
}
.centrado {
  text-align: center;
  align-content: center;
}

.ticket {
  width: 250px;
  max-width: 155px;
}
</style>
