// 項目資料
const express = require('express')
const exphbs =  require('express-handlebars')
const mongoose =require('mongoose')
const Restaurant = require("./models/Restaurant")

const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-curd',{ useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('good')
})

// 套入靜態檔案
app.use(express.static('public'))

// 路線設定
app.get('/', (req, res) => {
  Restaurant.find({})
  .lean()
  .then(restaurantsData => res.render('index', { restaurantsData }))
  
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase().trim()
    const restaurants = restaurantList.results.filter(
      (restaurant) => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
    )
    // { restaurants : restaurants , keyword : keyword } object literal extension
    res.render('index', { restaurants, keyword })
  })

// start and listen on the Express server
app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})