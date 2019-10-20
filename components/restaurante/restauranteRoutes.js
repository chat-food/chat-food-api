const express = require('express')
const router = express.Router()
const RestauranteDAO = require('./RestauranteDAO')

router.get('/restaurantes', async (req, res) => {
  const restauranteDao = new RestauranteDAO()
  const restaurantes = await restauranteDao.getAll()

  res.json({
    data: { restaurantes: restaurantes.results },
  })
})

module.exports = router
