const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant')

// 瀏覽全部餐廳
router.get('/', (req, res) => {
    Restaurant.find({})
    .lean()
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(error => console.error(error))  
  })

  module.exports = router