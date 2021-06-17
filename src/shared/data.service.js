import axios from 'axios'

const getCategorias = function(token) {
  console.log('Token en getCategorias', token)
  return new Promise((resolve, reject) => {
    try {
      let categorias = []
      console.log('Entre a cargar categorias')
      axios({
        method: 'get',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/categorias`
            : process.env.VUE_APP_URL + `categorias`,
        ContentType: 'application/json',
        headers: {
          'auth-token': token
        }
      }).then(cats => {
        if (cats === null || undefined) {
          categorias = []
        } else {
          categorias = cats
        }
        console.log('Categorias en Data-Service GetCategorias', categorias.data)
        resolve(categorias.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const addCategoria = function(categoria, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'post',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/categorias`
            : process.env.VUE_APP_URL + `categorias`,
        ContentType: 'application/json',
        data: categoria,
        headers: {
          'auth-token': token
        }
      }).then(cat => {
        console.log('Resultado del addCategoria DataService:', cat.data)
        resolve(cat.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const updateCategoria = function(categoria, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'put',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/categorias`
            : process.env.VUE_APP_URL + `categorias`,
        ContentType: 'application/json',
        data: categoria,
        headers: {
          'auth-token': token
        }
      }).then(cat => {
        console.log('Actualizado:', cat.data)
        resolve(cat.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const deleteCategoria = function(codCategoria, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'delete',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/categorias/${codCategoria}`
            : process.env.VUE_APP_URL + `categorias/${codCategoria}`,
        headers: {
          'auth-token': token
        }
      })
        .then(cat => {
          console.log('Actualizado:', cat.data)
          resolve(cat.data)
        })
        .catch(err => {
          console.log('Se fue por el catch del Axios, error:', err)
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

const getProductos = function(token) {
  return new Promise((resolve, reject) => {
    try {
      let productos = []
      console.log('Entre a cargar productos')
      axios({
        method: 'get',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/productos`
            : process.env.VUE_APP_URL + `productos`,
        ContentType: 'application/json',
        headers: {
          'auth-token': token
        }
      }).then(prods => {
        if (prods === null || undefined) {
          productos = []
        } else {
          productos = prods
        }
        console.log('Productos en getProductos DataService:', productos.data)
        resolve(productos.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const addProducto = function(producto, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'post',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/productos`
            : process.env.VUE_APP_URL + `productos`,
        ContentType: 'application/json',
        data: producto,
        headers: {
          'auth-token': token
        }
      }).then(prod => {
        resolve(prod.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}
const updateProducto = function(producto, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'put',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/productos/`
            : process.env.VUE_APP_URL + `productos`,
        ContentType: 'application/json',
        data: producto,
        headers: {
          'auth-token': token
        }
      }).then(prod => {
        resolve(prod.data)
      })
    } catch (error) {
      console.error('data.service=> updateProducto: ', error)
    }
  })
}

const deleteProducto = function(producto, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'delete',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/productos/${producto.NumeroIdentificacion}/${producto.CodProducto}`
            : process.env.VUE_APP_URL +
              `/${producto.NumeroIdentificacion}/${producto.CodProducto}`,
        ContentType: 'application/json',
        headers: {
          'auth-token': token
        }
      })
        .then(response => {
          console.log('Eliminado:', response.data.prodBorrar)
          resolve(response.data.prodBorrar)
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.error('data.service=> deleteProducto: ', error)
      reject(error)
    }
  })
}

const getUsuarios = function(token) {
  return new Promise((resolve, reject) => {
    try {
      let usuarios = []
      console.log('DataService: Entre a cargar usuarios')

      axios({
        method: 'get',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/user`
            : process.env.VUE_APP_URL + `user`,
        ContentType: 'application/json',
        headers: {
          'auth-token': token
        }
      }).then(usrs => {
        if (usrs === null || undefined) {
          usuarios = []
        } else {
          usuarios = usrs
        }
        console.log('Usuarios en getUsuarios DataService:', usuarios.data)
        resolve(usuarios.data)
      })
    } catch (error) {
      // console.log('Error en el catch de getUsuarios',error);
      reject(error)
    }
  })
}

const addUsuario = function(usuario, token) {
  console.log('Usuario en dataservice', usuario)
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'post',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/user/register`
            : process.env.VUE_APP_URL + `register`,
        ContentType: 'application/json',
        data: usuario,
        headers: {
          'auth-token': token
        }
      }).then(usr => {
        console.log('Resultado del addUsuario DataService:', usr.data)
        resolve(usr.data)
      })
    } catch (error) {
      console.log('Error en el catch de addUsuario:', error)
      reject(error)
    }
  })
}

const updateUsuario = function(usuario, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'put',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/user/`
            : process.env.VUE_APP_URL + `user`,
        ContentType: 'application/json',
        data: usuario,
        headers: {
          'auth-token': token
        }
      }).then(usuario => {
        console.log('Actualizado:', usuario.data)
        resolve(usuario.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const updateUsuarioClave = function(usuario, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'put',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/user/pwdChange/`
            : process.env.VUE_APP_URL + `pwdChange`,
        ContentType: 'application/json',
        data: usuario,
        headers: {
          'auth-token': token
        }
      }).then(usuario => {
        // console.log('Actualizado el pwd:', usuario.data)
        resolve(usuario.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const loginUsuario = function(loginUsuario, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'post',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/user/login/`
            : `http://localhost:8082/` + 'user/login/',
        // process.env.VUE_APP_URL
        ContentType: 'application/json',
        data: loginUsuario
        // headers : {
        //   'auth-token': token
        // }
      })
        .then(loggedUser => {
          console.log('Resultado del Login DataService:', loggedUser.data)
          window.localStorage.setItem(
            'loggedUser',
            JSON.stringify(loggedUser.data)
          )
          resolve(loggedUser.data)
        })
        .catch(error => {
          console.log(
            'Error en el catch de loginUsuario en Data Service',
            error.msg
          )
          reject(error)
        })
    } catch (error) {
      console.log('Error en el catch de Login:', error.msg)
      reject(error)
    }
  })
}

const deleteUsuario = function(usuario, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'delete',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/user/${usuario.IdUsuario}`
            : process.env.VUE_APP_URL + `${usuario.IdUsuario}`,
        ContentType: 'application/json',
        headers: {
          'auth-token': token
        }
      })
        .then(response => {
          console.log('Eliminado: ', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.error('data.service=> deleteUsuario: ', error)
      reject(error)
    }
  })
}

const getEmpresas = function(token) {
  return new Promise((resolve, reject) => {
    try {
      let empresas = []
      console.log('Entre a cargar empresas')
      axios({
        method: 'get',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/empresas`
            : process.env.VUE_APP_URL + `empresas`,
        ContentType: 'application/json',
        headers: {
          'auth-token': token
        }
      }).then(emp => {
        if (emp === null || undefined) {
          empresas = []
        } else {
          empresas = emp
        }
        console.log('Empresas en getEmpresas DataService:', empresas.data)
        resolve(empresas.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const addEmpresa = function(empresa, token) {
  console.log('token', token)
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

const updateEmpresa = async function(empresa, token) {
  console.log('token', token)
  try {
    await this.deleteEmpresa(empresa.Identificacion)
    await this.addEmpresa(empresa)
    return empresa
  } catch (error) {
    console.error(`data.service=> updateEmpresa: ${error}`)
  }
}

const deleteEmpresa = function(idEmpresa, token) {
  console.log('token', token)
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
  deleteEmpresa,
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
  getUsuarios,
  addUsuario,
  loginUsuario,
  updateUsuario,
  updateUsuarioClave,
  deleteUsuario
}
