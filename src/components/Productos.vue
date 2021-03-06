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
        <v-dialog
          v-model="dialog"
          max-width="800px"
          max-heigth="600px"
          persistent
        >
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
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editedItem.NumeroIdentificacion"
                      label="Id Empresa"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editedItem.CodProducto"
                      label="Id Producto"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      :items="categoriasActivas"
                      :hint="`Cod.Categoría: ${editedItem.CodCategoria}`"
                      v-model="editedItem.CodCategoria"
                      item-text="Descripcion"
                      item-value="CodCategoria"
                      persistent-hint
                      label="Categoria"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.Descripcion"
                      label="Nombre Producto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editedItem.UnidadMedida"
                      label="Unidad de Medida"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.PagaImpuesto"
                      label="Impuesto"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.PrecioUnitario"
                      label="Precio Producto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editedItem.CodigoCabys"
                      label="Cabys"
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
              >Está seguro que desea eliminar el producto:
              {{ editedItem.CodProducto }} ?
            </v-card-title>
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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
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
        { text: 'Empresa', value: 'NumeroIdentificacion', sortable: false },
        {
          text: 'Cod.Producto',
          align: 'center',
          sortable: true,
          value: 'CodProducto',
        },
        { text: 'Categoria', value: 'CodCategoria' },
        { text: 'Nombre', value: 'Descripcion' },
        { text: 'Unidad Medida', value: 'UnidadMedida' },
        { text: 'IVA', value: 'PagaImpuesto' },
        { text: 'Precio', value: 'PrecioUnitario' },
        { text: 'CodigoCabys', value: 'CodigoCabys' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // productos: [],
      editedIndex: -1,
      editedItem: {
        CodProducto: '',
        CodCategoria: '',
        Descripcion: '',
        UnidMedida: '',
        PagaImpuesto: 0,
        PrecioUnitario: 0,
        CodigoCabys: '',
      },
      defaultItem: {
        CodProducto: '',
        CodCategoria: '',
        Descripcion: '',
        UnidMedida: '',
        PagaImpuesto: '0',
        PrecioUnitario: '0',
        CodigoCabys: '',
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
    },
    ...mapGetters({
      productos: 'getProductos',
      categorias: 'getCategorias',
      empresas: 'getEmpresas',
    }),
    categoriasActivas() {
      return this.categorias.filter((c) => c.Estado !== 'Inactiva')
    },
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
    initialize() {
      this.$store.dispatch('getProductosAction').then((prods) => {
        console.log('Productos => Finalizada la carga:', prods)
        // this.productos.push({
        //   ...prods,
        // })
      })
      this.$store.dispatch('getCategoriasAction').then((cats) => {
        console.log('Categorías Cargadas', this.categorias)
      })
      this.$store.dispatch('getEmpresasAction').then((empresas) => {
        console.log('Empresas Cargadas', this.empresas)
      })
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
      this.$store.dispatch('deleteProductoAction', this.editedItem)
      // this.initialize()
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
        this.editedItem.NumeroIdentificacion = this.empresas[0].NumeroIdentificacion

        let numProd = ''
        if (this.productos.length > 0) {
          console.log(
            'Último Producto',
            this.productos[this.productos.length - 1]
          )
          numProd = String(
            parseInt(this.productos[this.productos.length - 1].CodProducto) + 1
          ).padStart(10, '0')
        } else
        {numProd = '0000000001'}

        this.editedItem.CodProducto = numProd

        this.$store.dispatch('addProductoAction', this.editedItem)
      }
      this.close()
    },
  },
}
</script>
