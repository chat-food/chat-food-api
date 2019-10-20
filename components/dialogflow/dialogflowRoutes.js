const express = require('express')
const router = express.Router()
const dialogflowMiddlewares = require('./dialogflowMiddlewares')
const dialogflowActions = require('./dialogflowActions')

router.post(
  '/dialogflow/webhook',
  dialogflowMiddlewares.formatPhones,
  dialogflowMiddlewares.formatDialogflow,
  dialogflowActions.webhook,
)

module.exports = router
