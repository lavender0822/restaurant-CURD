// app.js
// 項目資料
const express = require('express')
const app = express()
const port = 3000

// handlebars
const exphbs =  require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

// 套入靜態檔案
app.use(express.static('public'))

// 路線設定
app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantList.results})
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