const whatsappPrefix = 'whatsapp:'

const removeWhatsappPrefix = phone => {
  if (phone.startsWith(whatsappPrefix)) {
    return phone.substr(whatsappPrefix.length)
  }

  return phone
}

const formatItensQuantidade = itens => {
  return itens.map(item => {
    const [idItem, quantidade] = item.split('x')

    return {
      idItem: +idItem,
      quantidade: +quantidade,
    }
  })
}

module.exports = {
  removeWhatsappPrefix,
  formatItensQuantidade,
}
