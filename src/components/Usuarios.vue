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
        <v-dialog v-model="dialog" max-width="900px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Usuario Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline green lighten-2">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row v-if="editedIndex != -1">
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field
                      v-model="editedItem.IdUsuario"
                      label="Id Usuario"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.NombreUsuario"
                      label="Nombre Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.LoginUsuario"
                      label="Login Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.CorreoUsuario"
                      label="Correo Electrónico"
                      email
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.RoleUsuario"
                      :items="Roles"
                      label="Role"
                      dense
                    ></v-select>
                  </v-col>
                  <!-- <v-col cols="12" md="4">
                    <v-switch
                      v-if="editedIndex > 1"
                      v-model="cambiarClave"
                      label="Cambiar Clave ?"
                      color="blue"
                      value="false"
                    ></v-switch>
                  </v-col> -->
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4" d-none="true">
                    <v-text-field
                      v-if="editedIndex === -1"
                      v-model="ClaveNueva"
                      label="Clave"
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-if="editedIndex === -1"
                      v-model="VerificacionClave"
                      label="Repita la Clave"
                      type="password"
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
              <!-- :disabled="!puedeGuardar" -->
              <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px" persistent>
          <v-card>
            <v-card-title class="headline red lighten-2"
              >Desea Borrar el usuario:
              {{ editedItem.NombreUsuario }}?</v-card-title
            >
            <v-card-text> </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="red darken-1" text @click="deleteItemConfirm"
                >Eliminar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogClave" max-width="800px" persistent>
          <v-card>
            <v-card-title class="headline grey lighten-2"
              >Modificar Clave</v-card-title
            >
            <v-card-text>
              <v-container>
                <v-row v-if="editedIndex != -1">
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.IdUsuario"
                      label="Id Usuario"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.NombreUsuario"
                      label="Nombre Usuario"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="ClaveUsuario"
                      label="Clave Actual"
                      type="password"
                      :error="claveIncorrecta"
                      :append-icon="
                        claveIncorrecta
                          ? 'mdi-lock-off-outline'
                          : 'mdi-lock-check-outline'
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="ClaveNueva"
                      label="Clave Nueva"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="VerificacionClave"
                      label="Repita la Clave"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeCambiarClave"
                >Cancelar</v-btn
              >
              <v-btn color="red darken-1" text @click="cambiaClaveConfirm"
                >Cambiar Clave</v-btn
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
      <v-icon @click="cambiarClave(item)"> mdi-lock-reset </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import bcrypt from 'bcryptjs'
export default {
  components: {},
  name: 'Usuarios',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogClave: false,
    ClaveUsuario: '',
    ClaveNueva: '',
    VerificacionClave: '',
    claveIncorrecta: true,
    loading: false,
    puedeGuardar: false,
    headers: [
      {
        text: 'Id',
        align: ' d-none',
        sortable: false,
        value: 'IdUsuario',
      },
      { text: 'Nombre', value: 'NombreUsuario' },
      { text: 'Login', value: 'LoginUsuario' },
      { text: 'Correo', value: 'CorreoUsuario' },
      { text: 'Role', value: 'RoleUsuario' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      IdUsuario: '',
      NombreUsuario: '',
      LoginUsuario: '',
      CorreoUsuario: '',
      RoleUsuario: '',
      ClaveUsuario: '',
    },
    defaultItem: {
      IdUsuario: '',
      NombreUsuario: '',
      LoginUsuario: '',
      CorreoUsuario: '',
      RoleUsuario: '',
      ClaveUsuario: '',
    },
    Roles: ['Administrador', 'Contador', 'Ventas'],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Usuario Nuevo' : 'Editar Usuario'
    },
    ...mapGetters({
      usuarios: 'getUsuarios',
    }),
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogClave(val) {
      val || this.closeCambiarClave()
    },
    ClaveNueva(val) {
      this.puedeGuardar =
        this.ClaveNueva === this.VerificacionClave &&
        this.ClaveNueva.length >= 6 &&
        this.VerificacionClave.length >= 6
    },
    VerificacionClave(val) {
      this.puedeGuardar =
        this.ClaveNueva === this.VerificacionClave &&
        this.ClaveNueva.length >= 6 &&
        this.VerificacionClave.length >= 6
    },
    ClaveUsuario(val) {
      bcrypt.compare(val, this.editedItem.ClaveUsuario).then((valid) => {
        // console.log('Clave Usuario', val, this.editedItem.ClaveUsuario, valid)
        this.claveIncorrecta = !valid
      })
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      console.log('Variable de ambiente:', process.env.NODE_ENV)
      console.log('Variable de desarrollo:', process.env.VUE_APP_URL)
      this.$store.dispatch('getUsuariosAction').then((users) => {
        console.log('usuarios => Finalizada la carga:', users)
      })
    },
    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    cambiarClave(item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.ClaveUsuario = ''
      this.ClaveNueva = ''
      this.VerificacionClave = ''
      this.dialogClave = true
    },
    deleteItemConfirm() {
      this.usuarios.splice(this.editedIndex, 1)
      this.$store.dispatch('deleteUsuarioAction', this.editedItem)
      this.closeDelete()
    },
    cambiaClaveConfirm() {
      const cambioClave = {
        IdUsuario: this.editedItem.IdUsuario,
        LoginUsuario: this.editedItem.LoginUsuario,
        ClaveActual: this.ClaveUsuario,
        ClaveNueva: this.ClaveNueva,
      }
      this.$store
        .dispatch('updateUsuarioClaveAction', cambioClave)
        .then((updatedPwd) => {
          // console.log('Updated Pwd:', updatedPwd)
          if (updatedPwd.msg.includes('Password Modificado')) {
            this.dialogClave = false
          }
        })
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeCambiarClave() {
      this.dialogClave = false
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
        this.$store.dispatch('updateUsuarioAction', this.editedItem)
      } else {
        this.$store.dispatch('addUsuarioAction', this.editedItem)
      }
      this.close()
    },
  },
}
</script>
