const db = require('./../../db')
const humps = require('humps')

class EnderecoDAO {
  insert({ idCliente, logradouro, bairro, cidade, cep, estado, complemento }) {
    const query = `
      INSERT INTO endereco (
        id_cliente,
        logradouro,
        bairro,
        cidade,
        cep,
        estado,
        complemento
      )
      VALUES (?, ?, ?, ?, ?, ?, ?);    
    `

    return new Promise((resovle, reject) => {
      db.query(
        query,
        [idCliente, logradouro, bairro, cidade, cep, estado, complemento],
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

module.exports = EnderecoDAO
