const whatsappPrefix = 'whatsapp:'

const removeWhatsappPrefix = phone => {
  if (phone.startsWith(whatsappPrefix)) {
    return phone.substr(whatsappPrefix.length)
  }

  return phone
}

module.exports = {
  removeWhatsappPrefix,
}
