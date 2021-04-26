module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 8082,
    proxy: 'http://localhost:5000/'
  }
}
