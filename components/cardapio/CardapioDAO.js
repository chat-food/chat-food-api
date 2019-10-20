const db = require('./../../db')
const humps = require('humps')

class CardapioDAO {
  getByIdRestaurante(idRestaurante) {
    const query = `
      SELECT
        id_cardapio,
        id_restaurante
      FROM
        cardapio
      WHERE
        id_restaurante = ?
    `

    return new Promise((resovle, reject) => {
      db.query(query, [idRestaurante], (error, results, fields) => {
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

module.exports = CardapioDAO
