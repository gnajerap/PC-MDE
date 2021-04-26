import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from '../shared/data.service'
import {
  GET_PRODUCTOS,
  ADD_PRODUCTO,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
  GET_EMPRESAS,
  UPDATE_EMPRESA,
  ADD_EMPRESA
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productos: [],
    usuarios: [],
    factura: {},
    empresas: []
  },
  getters: {
    getProductos: state => state.productos,
    getEmpresas: state => state.empresas
  },
  mutations: {
    [GET_PRODUCTOS](state, productos) {
      state.productos = productos
    },
    [ADD_PRODUCTO](state, producto) {
      state.productos.unshift(producto)
    },
    [UPDATE_PRODUCTO](state, producto) {
      console.log('Store => updateProducto Mutation ', producto)
      const index = state.productos.findIndex(
        p => p.IdProducto === producto.IdProducto
      )
      state.productos.splice(index, 1, producto)
      state.productos = [...state.productos]
    },
    [DELETE_PRODUCTO](state, idProducto) {
      state.productos = [
        ...state.productos.filter(p => p.IdProducto !== idProducto)
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
    }
  },
  actions: {
    getProductosAction({ commit }) {
      // let productos = []
      // productos = await dataService.getProductos().then((prod) => {prod})
      dataService.getProductos().then(prod => {
        console.log('En el promise de getProductosAction', prod)
        this.productos = prod
        commit(GET_PRODUCTOS, this.productos)
      })

      // console.log(
      //   'getProductosAction es de tipo:' + typeof(productos),
      //   this.productos
      // )
      // commit(GET_PRODUCTOS, this.productos)
    },
    async getEmpresasAction({ commit }) {
      dataService.getEmpresas().then(empresas => {
        console.log('En el promise de getEmpresasAction', empresas)
        this.empresas = empresas
        commit(GET_EMPRESAS, this.empresas)
        return this.empresas
      })
    },
    async addProductoAction({ commit }, producto) {
      console.log('Store=> addProductoAction', producto)
      // const addedProducto = await dataService.addProducto(producto)
      // console.log('Store=> Added Producto:', addedProducto)
      // if (addedProducto) {
      //   commit(ADD_PRODUCTO, addedProducto)
      // }
      dataService
        .addProducto(producto)
        .then(addedProducto => {
          commit(ADD_PRODUCTO, addedProducto)
        })
        .catch(error => {
          console.log('Store=> AdProductoAction error en la promesa:', error)
        })
    },
    async updateProductoAction({ commit }, producto) {
      const updatedProducto = await dataService.updateProducto(producto)
      console.log('Store=> updateProductoAction:', updatedProducto)
      commit(UPDATE_PRODUCTO, updatedProducto)
    },
    async deleteProductoAction({ commit }, idProducto) {
      dataService
        .deleteProducto(idProducto)
        .then(deletedProducto => {
          commit(DELETE_PRODUCTO, deletedProducto)
        })
        .catch(error => {
          console.log('Store=> DeleteProductoAction: ', error)
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
        })
    }
  },
  modules: {},
  getters: {
    getProductById: state => id =>
      state.productos.find(p => p.idProducto === id),
    getProductos: state => state.productos,
    getEmpresas: state => state.empresas
  }
})
