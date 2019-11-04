const db = require('./../../db')
const humps = require('humps')

class PedidoDAO {
  insert({
    idRestaurante,
    idCliente,
    idEndereco,
    descricao,
    horario,
    status,
    valorTotal,
  }) {
    const query = `
        INSERT INTO
        pedido (
            id_restaurante, 
            id_cliente, 
            descricao,
            horario,
            status,
            valor_total,
            id_endereco
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    return new Promise((resovle, reject) => {
      db.query(
        query,
        [
          idRestaurante,
          idCliente,
          idEndereco,
          descricao,
          horario,
          status,
          valorTotal,
        ],
        (error, results, fields) => {
          if (error) {
            reject(error)
            return
          }

          resovle({
            results: humps.camelizeKeys(results),
            fields,
          })
        },
      )
    })
  }
}

module.exports = PedidoDAO
