const db = require('./../../db')
const humps = require('humps')

class RestauranteDAO {
  getByTelefone(phone) {
    const query = `
      SELECT
        id_restaurante,
        nome,
        descricao,
        telefone,
        hora_inicio,
        hora_fim
      FROM
        restaurante
      WHERE
        telefone = ?
    `

    return new Promise((resovle, reject) => {
      db.query(query, [phone], (error, results, fields) => {
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

  getAll() {
    const query = `
      SELECT
        id_restaurante,
        nome,
        descricao,
        telefone,
        hora_inicio,
        hora_fim
      FROM
        restaurante;
    `

    return new Promise((resovle, reject) => {
      db.query(query, (error, results, fields) => {
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

module.exports = RestauranteDAO
