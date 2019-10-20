const { removeWhatsappPrefix } = require('./dialogflowUtils')

const formatPhones = (req, res, next) => {
  const restaurante = removeWhatsappPrefix(
    req.body.originalDetectIntentRequest.payload.data.To,
  )
  const cliente = removeWhatsappPrefix(
    req.body.originalDetectIntentRequest.payload.data.From,
  )

  req.phoneNumbers = {
    restaurante,
    cliente,
  }

  next()
}

const formatDialogflow = (req, res, next) => {
  req.dialogflow = {
    intent: req.body.queryResult.intent.displayName,
  }

  next()
}

module.exports = {
  formatPhones,
  formatDialogflow,
}
