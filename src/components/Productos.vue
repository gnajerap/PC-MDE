<template>
  <v-data-table
    :headers="headers"
    :items="productos"
    sort-by="IdProducto"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="subheading grey--text">
          Productos
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Producto Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.IdProducto"
                      label="Id Producto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.NombreProducto"
                      label="Nombre Producto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.ImpuestoProducto"
                      label="Impuesto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.PrecioProducto"
                      label="Precio Producto"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="550px" persistent>
          <v-card>
            <v-card-title class="headline"
              >Está seguro que desea eliminar el producto ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Aceptar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" dark @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Productos',
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id Producto',
          align: 'center',
          sortable: true,
          value: 'IdProducto',
        },
        { text: 'Nombre', value: 'NombreProducto' },
        { text: 'IVA', value: 'ImpuestoProducto' },
        { text: 'Precio', value: 'PrecioProducto' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // productos: [],
      editedIndex: -1,
      editedItem: {
        IdProducto: '',
        NombreProducto: '',
        ImpuestoProducto: 0,
        PrecioProducto: 0,
      },
      defaultItem: {
        IdProducto: '',
        NombreProducto: '',
        ImpuestoProducto: '0',
        PrecioProducto: '0',
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
    },
    ...mapGetters({
      productos: 'getProductos',
    }),
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.$store.dispatch('getProductosAction').then((prods) => {
        console.log('Productos => Finalizada la carga:', prods)
        // this.productos.push({
        //   ...prods,
        // })
      })
      // console.log('Productos en Initialize: ', this.productos)
      // this.productos = [
      // {
      //   IdProducto: '1',
      //   NombreProducto: 'Ceviche de Marlin',
      //   ImpuestoProducto: '0',
      //   PrecioProducto: 1000.0,
      // },
      //   {
      //     IdProducto: '2',
      //     NombreProducto: 'Ceviche de Marlin',
      //     ImpuestoProducto: '0',
      //     PrecioProducto: 1500.0,
      //   },
      //   {
      //     IdProducto: '5',
      //     NombreProducto: 'Ceviche de Corvina',
      //     ImpuestoProducto: '0',
      //     PrecioProducto: 1500.0,
      //   },
      // ]
    },
    editItem(producto) {
      this.editedIndex = this.productos.indexOf(producto)
      this.editedItem = Object.assign({}, producto)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.productos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.productos.splice(this.editedIndex, 1)
      this.$store.dispatch('deleteProductoAction', this.editedItem.IdProducto)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      console.log('editedIndex', this.editedIndex)
      console.log('editeItem', this.editedItem)
      if (this.editedIndex > -1) {
        Object.assign(this.productos[this.editedIndex], this.editedItem)
        this.$store.dispatch('updateProductoAction', this.editedItem)
      } else {
        //this.productos.push(this.editedItem)
        this.$store.dispatch('addProductoAction', this.editedItem)
      }
      this.close()
    },
  },
}
</script>
