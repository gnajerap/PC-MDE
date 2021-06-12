import axios from 'axios'

const addFactura = function(factura, token) {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'post',
        url:
          process.env.NODE_ENV == 'development'
            ? `http://localhost:8082/api/facturas`
            : process.env.VUE_APP_URL + ``,
        ContentType: 'application/json',
        data: factura,
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

export const dataServiceFactura = {
  addFactura
}
