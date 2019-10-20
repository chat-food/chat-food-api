const express = require('express')
const config = require('./config')
const restauranteRoutes = require('./components/restaurante/restauranteRoutes')
const dialogflowRoutes = require('./components/dialogflow/dialogflowRoutes')

const app = express()

app.use(express.json())
app.use(restauranteRoutes)
app.use(dialogflowRoutes)

app.listen(config.SERVER.PORT, () => {
  console.log('====================')
  console.log('SERVER STARTED')
  console.log('PORT:', config.SERVER.PORT)
  console.log('====================')
})
