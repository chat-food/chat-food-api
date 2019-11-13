const createPedidoDescription = (itens, itensAdicionados) => {
  return itens
    .map(({ idItem, quantidade }) => {
      const item = itensAdicionados.find(item => item.idItem === idItem)

      if (!item) {
        return ''
      }

      return `${quantidade} x ${item.nome}`
    })
    .filter(item => !!item)
    .join('\n')
}

const createPedidoDate = () => {
  const date = new Date()

  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const calculatePedidoTotal = (itens, itensAdicionados) => {
  return itens.reduce((total, { idItem, quantidade }) => {
    const item = itensAdicionados.find(item => item.idItem === idItem)

    if (!item) {
      return total
    }

    const precoTotalItem = item.preco * quantidade
    return total + precoTotalItem
  }, 0)
}

module.exports = {
  createPedidoDescription,
  createPedidoDate,
  calculatePedidoTotal,
}
