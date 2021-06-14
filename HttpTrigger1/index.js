module.exports = async function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')

  const name = req.query.name || (req.body && req.body.name)
  const responseMessage = name
    ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.'
  const VUE_APP_URL = 'https://cde-api.azurewebsites.net/api/'
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: { responseMessage, VUE_APP_URL }
  }
}
