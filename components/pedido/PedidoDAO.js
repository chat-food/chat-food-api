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
            id_endereco,
            descricao,
            horario,
            status,
            valor_total
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

  getById(idPedido) {
    const query = `
      SELECT 
        id_restaurante, 
        id_cliente, 
        id_endereco,
        descricao,
        horario,
        status,
        valor_total
      FROM 
        pedido
      WHERE
        id_pedido = ?
    `

    return new Promise((resovle, reject) => {
      db.query(query, [idPedido], (error, results, fields) => {
        if (error) {
          reject(error)
          return
        }

        resovle({
          results: humps.camelizeKeys(results),
          fields,
        })
      })
    })
  }
}

module.exports = PedidoDAO
