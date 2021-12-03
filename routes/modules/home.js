const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 瀏覽全部餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId})
    .lean()
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(error => console.error(error))
})

// 搜尋特定餐廳
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()
  const userId = req.user._id
  Restaurant.find({userId})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurantsData: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
})

module.exports = router