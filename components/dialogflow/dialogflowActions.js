const dialogflowGlobals = require('./dialogflowGlobals')
const RestauranteDAO = require('./../restaurante/RestauranteDAO')
const CardapioDAO = require('./../cardapio/CardapioDAO')
const ItemDAO = require('./../item/ItemDAO')
const ClienteDAO = require('./../cliente/ClienteDAO')
const EnderecoDAO = require('./../endereco/EnderecoDAO')
const PedidoDAO = require('./../pedido/PedidoDAO')
const { formatItensQuantidade } = require('./dialogflowUtils')
const {
  createPedidoDescription,
  createPedidoDate,
  calculatePedidoTotal,
} = require('./../pedido/pedidoUtils')

const createMessageMenuIntent = restaurante => {
  return `Olá, bem-vindo(a) ao Restaurante ${restaurante.descricao}!
Horário de atendimento: ${restaurante.horaInicio} - ${restaurante.horaFim}
Comandos
 - Visualizar o cardápio, escreva "Visualizar o cardápio"
 - Realizar um pedido, escreva "Fazer pedido"
 - Cadastrar, escreva "Realizar cadastro"`
}

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

const createMessageCadastroIntent = cliente => {
  return `Cadastro realizado!
Nome: ${cliente.nome}
Telefone: ${cliente.telefone}
CPF: ${cliente.cpf}`
}

const webhook = async (req, res) => {
  const phone = req.phoneNumbers
  const restauranteDao = new RestauranteDAO()
  const clienteDao = new ClienteDAO()
  const enderecoDao = new EnderecoDAO()
  const pedidoDao = new PedidoDAO()
  const itemDao = new ItemDAO()

  const restaurante = (await restauranteDao.getByTelefone(phone.restaurante))
    .results[0]
  const cliente = (await clienteDao.getByTelefone(phone.cliente)).results[0]

  if (req.dialogflow.intent === dialogflowGlobals.INTENTS.MENU) {
    res.json({
      fulfillmentText: createMessageMenuIntent(restaurante),
    })

    return
  }

  if (req.dialogflow.intent === dialogflowGlobals.INTENTS.CARDAPIO) {
    const cardapioDao = new CardapioDAO()

    const cardapio = (await cardapioDao.getByIdRestaurante(
      restaurante.idRestaurante,
    )).results[0]
    const itens = (await itemDao.getByIdCardapio(cardapio.idCardapio)).results

    res.json({
      fulfillmentText: createMessageCardapioIntent(itens),
    })

    return
  }

  if (req.dialogflow.intent === dialogflowGlobals.INTENTS.CADASTRO) {
    if (cliente) {
      res.json({
        fulfillmentText: `Identificamos que você já possui cadastro!
Para realizar um pedido, consulte nosso cardápio e após isso digite "Pedido: código do produto x quantidade". Por exemplo, "Pedido: 1x2; 3x4"`,
      })

      return
    }

    const resultInsertCliente = (await clienteDao.insert({
      ...req.dialogflow.params,
      telefone: req.phoneNumbers.cliente,
    })).results

    const novoCliente = (await clienteDao.getById(resultInsertCliente.insertId))
      .results[0]

    await enderecoDao.insert({
      idCliente: novoCliente.idCliente,
      ...req.dialogflow.params,
    }).results

    res.json({
      fulfillmentText: createMessageCadastroIntent(novoCliente),
    })

    return
  }

  if (req.dialogflow.intent === dialogflowGlobals.INTENTS.PEDIDO) {
    if (!cliente) {
      res.json({
        fulfillmentText: `Ops, você ainda não possui cadastro ):
Para se cadastrar, escreva "Fazer cadastro"`,
      })

      return
    }

    if (
      !req.dialogflow.params.idItemQuantidade ||
      !req.dialogflow.params.idItemQuantidade.length
    ) {
      res.json({
        fulfillmentText: `Seu cadastro foi encontrado!
Para realizar um pedido, consulte nosso cardápio e após isso digite "Pedido: código do produto x quantidade". Por exemplo, "Pedido: 1x2; 3x4"`,
      })

      return
    }

    const itens = formatItensQuantidade(req.dialogflow.params.idItemQuantidade)
    const itensAdicionados = (await itemDao.getByIds(
      itens.map(({ idItem }) => idItem),
    )).results
    const resultadoInsertPedido = (await pedidoDao.insert({
      idRestaurante: restaurante.idRestaurante,
      idCliente: cliente.idCliente,
      status: 'aberto',
      descricao: createPedidoDescription(itens, itensAdicionados),
      horario: createPedidoDate(),
      valorTotal: calculatePedidoTotal(itens, itensAdicionados),
      idEndereco: 1,
    })).results

    const pedido = (await pedidoDao.getById(resultadoInsertPedido.insertId))
      .results[0]

    res.json({
      fulfillmentText: `Obrigado por escolher ${restaurante.descricao}! 
Seu pedido já está sendo preparado!

*Detalhes do Pedido*
${pedido.descricao}

*Valor total*
${pedido.valorTotal.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
})}`,
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
