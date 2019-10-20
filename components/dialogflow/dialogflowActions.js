const dialogflowGlobals = require('./dialogflowGlobals')
const RestauranteDAO = require('./../restaurante/RestauranteDAO')
const CardapioDAO = require('./../cardapio/CardapioDAO')
const ItemDAO = require('./../item/ItemDAO')

const createMessageMenuIntent = restaurante => `Olá, bem-vindo(a) ao Restaurante ${restaurante.nome}!
Horário de atendimento: ${restaurante.horaInicio} - ${restaurante.horaFim}
Para visualizar o cardápio, escreva "Visualizar o cardápio"`

const createMessageCardapioIntent = itens => {
  const list = itens.map(item => {
    const codigo = item.idItem
    const nome = item.nome
    const preco = item.preco.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    })

    return `#${codigo} - ${nome} - ${preco}
`
  })

  return `Cardápio do dia
${list.join('')}`
}

const webhook = async (req, res) => {
  const phone = req.phoneNumbers
  const restauranteDao = new RestauranteDAO()
  const restaurante = (await restauranteDao.getByTelefone(phone.restaurante))
    .results[0]

  if (req.dialogflow.intent === dialogflowGlobals.INTENTS.MENU) {
    res.json({
      fulfillmentText: createMessageMenuIntent(restaurante),
    })

    return
  }

  if (req.dialogflow.intent === dialogflowGlobals.INTENTS.CARDAPIO) {
    const cardapioDao = new CardapioDAO()
    const itemDao = new ItemDAO()

    const cardapio = (await cardapioDao.getByIdRestaurante(
      restaurante.idRestaurante,
    )).results[0]
    const itens = (await itemDao.getByIdCardapio(cardapio.idCardapio)).results

    res.json({
      fulfillmentText: createMessageCardapioIntent(itens),
    })

    return
  }

  res.json({
    fulfillmentText: `Ops, não entendi! Poderia repetir, por favor?`,
  })
}

module.exports = {
  webhook,
}
