const db = require('./../../db')
const humps = require('humps')

class ClienteDAO {
  insert({ nome, telefone, cpf }) {
    const query = `
      INSERT INTO
        cliente (
          nome, 
          telefone, 
          cpf
        )
      VALUES (?, ?, ?)
    `

    return new Promise((resovle, reject) => {
      db.query(query, [nome, telefone, cpf], (error, results, fields) => {
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

  getById(idCliente) {
    const query = `
      SELECT
        id_cliente,
        nome, 
        telefone, 
        cpf
      FROM
        cliente
      WHERE
        id_cliente = ?
  `

    return new Promise((resovle, reject) => {
      db.query(query, [idCliente], (error, results, fields) => {
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

  getByTelefone(telefone) {
    const query = `
      SELECT
        id_cliente,
        nome, 
        telefone, 
        cpf
      FROM
        cliente
      WHERE
        telefone = ?
  `

    return new Promise((resovle, reject) => {
      db.query(query, [telefone], (error, results, fields) => {
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

module.exports = ClienteDAO
