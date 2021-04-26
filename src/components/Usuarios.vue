<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuarios </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Usuario Nuevo
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
                      v-model="editedItem.IdUsuario"
                      label="Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.NombreUsuario"
                      label="Nombre Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.RoleUsuario"
                      label="Rol"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" >
                    <v-switch v-model="cambiarClave" label="Cambiar Clave ?" color="blue" value="false"></v-switch>
                  </v-col>
                  
                  <v-col v-if="cambiarClave" cols="12" sm="6" md="4" d-none="true">
                    <v-text-field
                      v-model="editedItem.ClaveUsuario"
                      label="Clave Actual" type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="cambiarClave" cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="ClaveNueva" 
                      label="Clave Nueva" type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="cambiarClave" cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="VerificacionClave"
                      label="Repita la Clave" type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
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
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  components: {},
  name: 'Usuarios',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cambiarClave: false,
    ClaveNueva:'',
    VerificacionClave:'',
    loading: false,
    headers: [
      {
        text: 'Usuario',
        align: 'start',
        sortable: false,
        value: 'IdUsuario',
      },
      { text: 'Nombre', value: 'NombreUsuario' },
      { text: 'Role', value: 'RoleUsuario' },
      // { text: 'Clave', value: 'ClaveUsuario'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    usuarios: [],
    editedIndex: -1,
    editedItem: {
      IdUsuario:'',
      NombreUsuario: '',
      RoleUsuario: '',
      ClaveUsuario: ''
    },
    defaultItem: {
      IdUsuario:'',
      NombreUsuario: '',
      RoleUsuario: '',
      ClaveUsuario: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Usuario Nuevo' : 'Editar Usuario'
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
      this.usuarios = [
        {
          IdUsuario:'gnajerap@gmail.com',
          NombreUsuario: 'Gerardo Nájera Picado',
          RoleUsuario: 'Admin',
          ClaveUsuario: '12345'
        },
        {
          IdUsuario:'m.torres',
          NombreUsuario: 'Mariano Torres',
          RoleUsuario: 'Admin',
          ClaveUsuario: '54321'
        },
        {
          IdUsuario:'j.pereira',
          NombreUsuario: 'Juana Pereira',
          RoleUsuario: 'Cajera',
          ClaveUsuario: '12345'
        },
        {
          IdUsuario:'e.contador',
          NombreUsuario: 'El Contador',
          RoleUsuario: 'Contador',
          ClaveUsuario: '12345'
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.ClaveNueva = ''
      this.VerificacionClave = ''
      this.cambiarClave = false
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.usuarios.splice(this.editedIndex, 1)
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
      if (this.editedIndex > -1) {
        Object.assign(this.usuarios[this.editedIndex], this.editedItem)
      } else {
        this.usuarios.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
