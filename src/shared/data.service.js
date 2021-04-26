//import * as axios from 'axios'

const getProductos = function() {
  return new Promise((resolve, reject) => {
    try {
      let productos = []
      const response = JSON.parse(localStorage.getItem('productos'))

      if (response === null || response === undefined) {
        productos = []
      } else {
        productos = response
      }
      resolve(productos)
    } catch (error) {
      reject(error)
    }
  })
}

const getEmpresas = function() {
  return new Promise((resolve, reject) => {
    try {
      let empresas = []
      const response = JSON.parse(localStorage.getItem('empresas'))
      if (!response) {
        empresas = []
      } else {
        empresas = response
      }
      resolve(empresas)
    } catch (error) {
      reject(error)
    }
  })
}

const addProducto = function(producto) {
  return new Promise((resolve, reject) => {
    try {
      //console.log('Producto en addProducto:', producto)
      this.getProductos().then(productosToAdd => {
        if (productosToAdd) {
          productosToAdd.push(producto)
        } else {
          productosToAdd = []
          productosToAdd.push(producto)
        }
        localStorage.setItem('productos', JSON.stringify(productosToAdd))
        resolve(producto)
      })
      //console.log('DataService=> Productos despues del getProductos:', productos);
    } catch (error) {
      reject(error)
    }
  })
}

const addEmpresa = function(empresa) {
  return new Promise((resolve, reject) => {
    try {
      this.getEmpresas().then(empresasToAdd => {
        if (empresasToAdd) {
          empresasToAdd.push(empresa)
        } else {
          empresasToAdd = []
          empresasToAdd.push(producto)
        }
        localStorage.setItem('empresas', JSON.stringify(empresasToAdd))
        resolve(empresa)
      })
      //console.log('DataService=> Productos despues del getProductos:', productos);
    } catch (error) {
      reject(error)
    }
  })
}

const updateEmpresa = async function(empresa) {
  try {
    await this.deleteEmpresa(empresa.Identificacion)
    await this.addEmpresa(empresa)
    return empresa
  } catch (error) {
    console.error(`data.service=> updateEmpresa: ${error}`)
  }
}

const updateProducto = async function(producto) {
  try {
    console.log('Producto a acualizar:', producto)
    await this.deleteProducto(producto.IdProducto)
    await this.addProducto(producto)
    return producto
  } catch (error) {
    console.error('data.service=> updateProducto: ', error)
  }
}

const deleteProducto = function(idProducto) {
  return new Promise((resolve, reject) => {
    try {
      //const productos = await getProductos()
      getProductos().then(productos => {
        // console.log('Data.Service deleteProducto => producto a Borrar', idProducto)
        productos.forEach((producto, index) => {
          if (producto.IdProducto === idProducto) {
            productos.splice(index, 1)
          }
          localStorage.setItem('productos', JSON.stringify(productos))
          resolve(idProducto)
        })
      })
    } catch (error) {
      console.error('data.service=> deleteProducto: ', error)
      reject(error)
    }
  })
}

const deleteEmpresa = function(idEmpresa) {
  return new Promise((resolve, reject) => {
    try {
      getEmpresas().then(empresas => {
        empresas.forEach((empresa, index) => {
          if (empresa.Identificacion === idEmpresa) {
            empresas.splice(index, 1)
          }
          localStorage.setItem('empresas', JSOON.stringify(empresas))
          resolve(idEmpresa)
        })
      })
    } catch (error) {
      console.error('data.service=> deleteEmpresa: ', error)
      reject(error)
    }
  })
}

export const dataService = {
  getProductos,
  addProducto,
  updateProducto,
  deleteProducto,
  getEmpresas,
  addEmpresa,
  updateEmpresa,
  deleteEmpresa
}
