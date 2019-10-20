const db = require('./../../db')
const humps = require('humps')

class ItemDAO {
  getByIdCardapio(idCardapio) {
    const query = `
      SELECT
        id_item,
        id_cardapio,
        nome,
        preco,
        descricao
      FROM
        item
      WHERE
        id_cardapio = ?
    `

    return new Promise((resovle, reject) => {
      db.query(query, [idCardapio], (error, results, fields) => {
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

module.exports = ItemDAO
