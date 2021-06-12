// tomado de: http://www.4codev.com/vuejs/create-a-vuejs-login-page-use-vuetify-template-and-validate-with-vee-validate-idpx4532168145666720540.html
<template>
  <section class="section-container">
    <v-row class="signing">
      <v-col cols="8" class="left">
        <v-row>
          <h1 class="text-center pa-5">Ceviches de La esquina</h1>
          <h3 class="text-center pa-5 text-capitalize">
            Bienvenido, sistema de Control de Facturación
          </h3>
        </v-row>
        <v-row> </v-row>
      </v-col>
      <v-col cols="4" class="right">
        <h3 class="caption text-center text-capitalize">
          {{ nombreCompania }}
        </h3>
        <br />
        <h2 class="headline text-center text-uppercase">Login</h2>
        <br />
        <v-divider></v-divider>
        <v-alert :value="error" type="error">
          {{ errorMessage }}
        </v-alert>
        <v-form ref="form" @submit.prevent="login" v-model="valid">
          <v-row class="text-center">
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account-circle"
                label="Usuario"
                dark
                placeholder="Digite el usuario"
                dense
                v-model="loginUsuario"
                outlined
                filled
                :rules="[rules.required, rules.tamano]"
                class="form-input"
              ></v-text-field>
              <v-text-field
                label="Clave"
                prepend-icon="mdi-lock"
                :append-icon="showClave ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="loginClave"
                password
                dark
                outlined
                filled
                dense
                v-bind:type="showClave ? 'text' : 'password'"
                @click:append="showClave = !showClave"
                :rules="[rules.required, rules.tamano]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-divider></v-divider>

        <v-btn
          class="signing-btn"
          rounded
          color="white"
          dark
          @click="login"
          :loading="loading"
          :disabled="!valid"
          >Login</v-btn
        >
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginUsuario: 'gnajerap',
      loginClave: '1740523Ampa',
      valid: false,
      rules: {
        required: (value) => !!value || 'Requerido.',
        tamano: (val) =>
          (val && val.length >= 6) || 'Debe tener al menos 6 caracteres',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Correo incorrecto.'
        },
      },
      showClave: false,
      loading: false,
      nombreCompania: process.env.VUE_APP_TITLE,
      errorMessage: '',
      error: false,
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      const login = {
        LoginUsuario: this.loginUsuario,
        ClaveUsuario: this.loginClave,
      }
      this.$store
        .dispatch('loginUsuarioAction', login)
        .then((loggedUser) => {
          console.log('Logged Usuario', loggedUser)
          if (loggedUser.msg.includes('Usuario Conectado')) {
            this.$router.push({
              name: 'Productos',
              query: { redirect: '/productos' },
            })
          } else {
            this.error = true
            this.errorMessage = loggedUser.msg
          }
        })
        .catch((err) => {
          this.error = true
          this.errorMessage = err
          console.log('Error en login: ', err)
        })
    },
  },
}
</script>

<style lang="scss">
.section-container {
  padding: 20px;
  margin: 20px;
  background: #fff;
  width: 100%;
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  box-sizing: border-box;
  .signing {
    padding: 0;
    max-width: 1000px;
    margin: 0 auto;
    min-height: 600px;
    box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
    .left {
      padding: 30px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      color: #30ac7c;
      background-color: #f9f9f9;
    }
    .right {
      padding: 30px;
      box-sizing: border-box;
      background: #30ac7c;
      color: #fff;
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signing-btn {
        width: 100%;
        color: #30ac7c;
      }
    }
  }
}
.form-input >>> .v-input__slot::after {
  border-color: rgba(255, 255, 255, 0.7) !important;
}
.form-input >>> .v-input__slot::before {
  border-color: rgba(255, 255, 255, 0.7) !important;
}
.form-input >>> .error--text {
  color: rgba(255, 255, 255, 0.7) !important;
}
.form-input >>> input {
  caret-color: white !important;
}
</style>