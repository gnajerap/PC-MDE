// import { reject } from 'core-js/fn/promise'
import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared/data.service'
import {dataServiceFactura} from '../shared/data.service.factura'

import {
  GET_PRODUCTOS,
  ADD_PRODUCTO,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
  GET_CATEGORIAS,
  ADD_CATEGORIA,
  UPDATE_CATEGORIA,
  DELETE_CATEGORIA,
  GET_EMPRESAS,
  UPDATE_EMPRESA,
  ADD_EMPRESA,
  GET_USUARIOS,
  ADD_USUARIO,
  UPDATE_USUARIO,
  UPDATE_USUARIO_CLAVE,
  USER_LOGGED,
  DELETE_USUARIO,
  ADD_FACTURA
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productos: [],
    categorias: [],
    usuarios: [],
    factura: {},
    facturas: [],
    empresas: [],
    loggedUser: {
      id: null,
      token: null,
      role: null
    }
  },
  mutations: {
    [GET_CATEGORIAS](state, categorias) {
      state.categorias = categorias
    },
    [GET_PRODUCTOS](state, productos) {
      state.productos = productos
    },
    [GET_USUARIOS](state, usuarios) {
      state.usuarios = usuarios
    },
    [ADD_USUARIO](state, usuario) {
      state.usuarios.push(usuario)
    },
    [UPDATE_USUARIO](state, usuario) {
      const index = state.usuarios.findIndex(
        c => c.LoginUsuario === usuario.LoginUsuario
      )
      state.usuarios.splice(index, 1, usuario)
      state.usuarios = [...state.usuarios]
    },
    [UPDATE_USUARIO_CLAVE](state, usuario) {
      const index = state.usuarios.findIndex(
        c => c.LoginUsuario === usuario.LoginUsuario
      )
      let usuarioModificado = state.usuarios[index]
      usuarioModificado.ClaveUsuario = usuario.ClaveNueva
      state.usuarios.splice(index, 1, usuarioModificado)
      state.usuarios = [...state.usuarios]
    },
    [DELETE_USUARIO](state, IdUsuario) {
      state.usuarios = state.usuarios.filter(u => u.IdUsuario !== IdUsuario)
    },
    [ADD_CATEGORIA](state, categoria) {
      console.log('ADD_CATEGORIA:', categoria)
      state.categorias.push(categoria)
    },
    [ADD_PRODUCTO](state, producto) {
      state.productos.push(producto)
    },
    [UPDATE_CATEGORIA](state, categoria) {
      const index = state.categorias.findIndex(
        c => c.CodCategoria === categoria.CodCategoria
      )
      state.categorias.splice(index, 1, categoria)
      state.categorias = [...state.categorias]
    },
    [UPDATE_PRODUCTO](state, producto) {
      console.log('UPDATE_PRODUCTO => updateProducto Mutation ', producto)
      const index = state.productos.findIndex(
        p =>
          p.CodProducto === producto.CodProducto &&
          p.NumeroIdentificacion === producto.NumeroIdentificacion
      )
      state.productos.splice(index, 1, producto)
      state.productos = [...state.productos]
    },
    [DELETE_PRODUCTO](state, deletedProducto) {
      state.productos = state.productos.filter(
        p =>
          p.NumeroIdentificacion === deletedProducto.NumeroIdentificacion &&
          p.CodProducto !== deletedProducto.CodProducto
      )
    },
    [DELETE_CATEGORIA](state, CodCategoria) {
      state.categorias = [
        ...state.categorias.filter(c => c.CodCategoria !== CodCategoria)
      ]
    },
    [GET_EMPRESAS](state, empresas) {
      state.empresas = empresas
    },
    [ADD_EMPRESA](state, empresa) {
      state.empresas.unshift(empresa)
    },
    [UPDATE_EMPRESA](state, empresa) {
      const index = state.empresas.findIndex(
        e => e.Identificacion == empresa.Identificacion
      )
      state.empresas.splice(index, 1, empresa)
      state.empresas = [...state.empresas]
    },
    [USER_LOGGED](state, user) {
      console.log('USER_LOGGED:', user)
      state.loggedUser.id = user.id
      state.loggedUser.token = user.token
      state.loggedUser.role = user.role
    },
    [ADD_FACTURA](state, factura) {
      console.log('ADD_FACTURA', factura), state.facturas.push(factura)
    }
  },

  actions: {
    getProductosAction({ commit, state }) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService
          .getProductos(token)
          .then(prod => {
            console.log('En el promise de getProductosAction', prod.recordset)
            commit(GET_PRODUCTOS, prod.recordset)
            resolve(prod.recordset)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addProductoAction({ commit, state }, producto) {
      let token = state.loggedUser.token
      console.log('Store=> addProductoAction', producto)
      return new Promise((resolve, reject) => {
        dataService
          .addProducto(producto, token)
          .then(addedProducto => {
            commit(ADD_PRODUCTO, addedProducto.producto)
            resolve(addedProducto)
          })
          .catch(error => {
            console.log('Store=> AddProductoAction error en la promesa:', error)
            reject(addedProducto)
          })
      })
    },
    updateProductoAction({ commit, state }, producto) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService.updateProducto(producto, token).then(updatedProducto => {
          console.log('Store=> updateProductoAction:', updatedProducto)
          if (updatedProducto.msg.includes('Producto actualizado')) {
            commit(UPDATE_PRODUCTO, updatedProducto.producto)
            resolve(updatedProducto)
          } else {
            console.log(
              'Pase por el reject en UpdateCategoriaAction',
              updatedProducto
            )
            reject(updatedProducto)
          }
        })
      })
    },
    deleteProductoAction({ commit, state }, producto) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService
          .deleteProducto(producto, token)
          .then(deletedProd => {
            console.log('Then Store => deleteProductoAction:', deletedProd)
            commit(DELETE_PRODUCTO, deletedProd)
            resolve(deletedProd)
          })
          .catch(error => {
            console.log('Store=> DeleteProductoAction: ', error)
            reject(deletedProd)
          })
      })
    },
    getCategoriasAction({ commit, state }) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        // console.log('usuario conectado',state.loggedUser);
        dataService
          .getCategorias(token)
          .then(cats => {
            console.log('En el promise de getCategoriasAction', cats.recordset)
            commit(GET_CATEGORIAS, cats.recordset)
            resolve(cats.recordset)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addCategoriaAction({ commit, state }, categoria) {
      console.log('addCategoriaAction:', categoria)
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService
          .addCategoria(categoria, token)
          .then(addedCategoria => {
            if (addedCategoria.msg === 'Insertada') {
              commit(ADD_CATEGORIA, addedCategoria.categoria)
              resolve(addedCategoria)
            } else {
              reject(addedCategoria)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateCategoriaAction({ commit, state }, categoria) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService
          .updateCategoria(categoria, token)
          .then(updatedCategoria => {
            console.log(`Categoria actualizada: ${updatedCategoria.msg}`)
            if (updatedCategoria.msg.includes('Categoria actualizada')) {
              commit(UPDATE_CATEGORIA, updatedCategoria.categoria)
              resolve(updatedCategoria)
            } else {
              console.log(
                'Pase por el reject en UpdateCategoriaAction',
                updatedCategoria
              )
              reject(updatedCategoria)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteCategoriaAction({ commit, state }, categoria) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService
          .deleteCategoria(categoria.CodCategoria, token)
          .then(deletedCategoria => {
            console.log('En deleteCategoriaAction:', deletedCategoria.msg)
            if (deletedCategoria.msg.includes('Categoria eliminada')) {
              commit(DELETE_CATEGORIA, deletedCategoria.catBorrar.CodCategoria)
              resolve(deletedCategoria)
            } else {
              console.log(
                'Pase por el reject de eliminar Categoria',
                deletedCategoria
              )
              reject(deletedCategoria)
            }
          })
          .catch(error => {
            console.log('Error al borrar Categoria:', error.message)
            reject(error)
          })
      })
    },
    getUsuariosAction({ commit, state }) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        try {
          dataService
            .getUsuarios(token)
            .then(usuarios => {
              console.log(
                'En el promise de getCategoriasAction',
                usuarios.recordset
              )
              commit(GET_USUARIOS, usuarios.recordset)
              resolve(usuarios.recordset)
            })
            .catch(err => {
              console.log('Error en getUsuariosAction:', err)
            })
        } catch (err) {
          console.log('Error en getUsuariosAction', err)
          reject(err)
        }
      })
    },
    addUsuarioAction({ commit, state }, usuario) {
      let token = state.loggedUser.token
      console.log('addUsuarioAction:', usuario)
      const newUsuario = {
        NombreUsuario: usuario.NombreUsuario,
        LoginUsuario: usuario.LoginUsuario,
        ClaveUsuario: usuario.ClaveUsuario,
        CorreoUsuario: usuario.CorreoUsuario,
        RoleUsuario: usuario.RoleUsuario
      }
      return new Promise((resolve, reject) => {
        dataService
          .addUsuario(newUsuario, token)
          .then(addedUsuario => {
            if (addedUsuario.msg === 'Insertado') {
              commit(ADD_USUARIO, addedUsuario.usuario)
              resolve(addedUsuario)
            } else {
              reject(addedUsuario)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateUsuarioAction({ commit }, usuario) {
      console.log('updateUsuarioAction=>', usuario)
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService.updateUsuario(usuario, token).then(updatedUsuario => {
          if (updatedUsuario.msg.includes('Usuario actualizado')) {
            commit(UPDATE_USUARIO, updatedUsuario.usuario)
            resolve(updatedUsuario)
          } else {
            console.log(
              'Pase por el reject en UpdateUsuarioAction',
              updatedUsuario
            )
            reject(updatedUsuario)
          }
        })
      })
    },
    deleteUsuarioAction({ commit }, usuario) {
      console.log('en deleteUsuarioAction: ', usuario)
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService
          .deleteUsuario(usuario, token)
          .then(deletedUsuario => {
            console.log('DeletedUsuario', deletedUsuario.msg)
            if (deletedUsuario.msg.includes('Usuario eliminado')) {
              commit(DELETE_USUARIO, deletedUsuario.IdUsuario)
              resolve(deletedUsuario)
            } else {
              console.log(
                'Pase por el reject de eliminar Categoria',
                deletedUsuario
              )
              reject(deletedUsuario)
            }
          })
          .catch(error => {
            console.log('Error al borrar Usuario:', error.message)
            reject(token)
          })
      })
    },

    updateUsuarioClaveAction({ commit }, usuarioClave) {
      console.log('En upateUsuarioClaveAction:', usuarioClave)
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataService
          .updateUsuarioClave(usuarioClave, token)
          .then(updatedUsuarioClave => {
            if (updatedUsuarioClave.msg.includes('Password Modificado')) {
              commit(UPDATE_USUARIO_CLAVE, updatedUsuarioClave.usuario)
              resolve(updatedUsuarioClave)
            } else {
              console.log(
                'Pase por el reject en UpdateClaveUsuarioAction',
                updatedUsuarioClave
              )
              reject(updatedUsuarioClave)
            }
          })
      })
    },

    loginUsuarioAction({ commit }, loginUsuario) {
      //referencia: https://www.youtube.com/watch?v=g1lzdoitZkg
      console.log('En loginUsuarioAction:', loginUsuario)
      return new Promise((resolve, reject) => {
        dataService
          .loginUsuario(loginUsuario)
          .then(loggedUser => {
            if (loggedUser.msg.includes('Usuario Conectado')) {
              commit(USER_LOGGED, loggedUser)
              resolve(loggedUser)
            } else {
              console.log('Error al Loguear', loggedUser)
              resolve(loggedUser)
            }
          })
          .catch(error => {
            console.log('Error en el catch de loginUsuarioAction', error)
            reject(error)
          })
      })
    },

    logoutAction({ commit }, login) {
      console.log('Saliendo...')
      commit(USER_LOGGED, login)
      window.localStorage.removeItem('loggedUser')
    },

    loadUserLoggedAction({ commit }) {
      // let usuario = state.loggedUser
      // if (usuario.id === null) {
      const user = JSON.parse(window.localStorage.getItem('loggedUser'))
      console.log('Usuario del localStorage', user)
      if (user) {
        commit(USER_LOGGED, user)
      }
      // }
    },

    getEmpresasAction({ commit }) {
      return new Promise((resolve, reject) => {
        dataService
          .getEmpresas()
          .then(empresas => {
            console.log('En el promise de getEmpresasAction', empresas)
            commit(GET_EMPRESAS, empresas)
            resolve(empresas)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async addDataEmpresaAction({ commit }, empresa) {
      dataService
        .addEmpresa(empresa)
        .then(addedEmpresa => {
          commit(ADD_EMPRESA, addedEmpresa)
        })
        .catch(error => {
          console.log('Store=> AddEmpresaAction error en la promesa:', error)
        })
    },
    async updateDataEmpresaAction({ commit }, empresa) {
      console.log(`Empresa a grabar${empresa}`)
      dataService
        .updateEmpresa(empresa.Identificacion)
        .then(updatedEmpresa => {
          commit(UPDATE_EMPRESA, updatedEmpresa)
        })
        .catch(error => {
          console.log(`Store=> updateDataEmpresaAction ${error}`)
          reject(error)
        })
    },
    addFacturaAction({ commit, state }, factura) {
      let token = state.loggedUser.token
      return new Promise((resolve, reject) => {
        dataServiceFactura
          .addFactura(factura, token)
          .then(addedFactura => {
            commit(ADD_FACTURA, addedFactura)
            resolve(addedFactura)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  modules: {},
  getters: {
    getProductById: state => id =>
      state.productos.find(p => p.idProducto === id),
    getProductos: state => state.productos,
    getEmpresas: state => state.empresas,
    getCategorias: state => state.categorias,
    getUsuarios: state => state.usuarios,
    isLoggedIn(state) {
      return state.loggedUser.token != null
    },
    getUserLogged(state) {
      return state.loggedUser
    }
  }
})
