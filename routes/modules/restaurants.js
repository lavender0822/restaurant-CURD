const express = require('express')
const router = express.Router()

const restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
    return res.render('new')
})

// 新增餐廳
router.post("/", (req, res) => {
    restaurant.create(req.body)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})

// 瀏覽特定餐廳
router.get('/:restaurantId', (req, res) => {
    const { restaurantId } = req.params
    restaurant.findById(restaurantId)
        .lean()
        .then(restaurantData => res.render("show", { restaurantData }))
        .catch(err => console.log(err))
})

// 編輯餐廳頁面
router.get("/:restaurantId/edit", (req, res) => {
    const { restaurantId } = req.params
    restaurant.findById(restaurantId)
        .lean()
        .then(restaurantData => res.render("edit", { restaurantData }))
        .catch(err => console.log(err))
})

// 更新餐廳
router.put("/:restaurantId", (req, res) => {
    const { restaurantId } = req.params
    restaurant.findByIdAndUpdate(restaurantId, req.body)
        //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
        .then(() => res.redirect(`/restaurants/${restaurantId}`))
        .catch(err => console.log(err))
})

// 刪除餐廳
router.delete("/:restaurantId", (req, res) => {
    const { restaurantId } = req.params
    restaurant.findByIdAndDelete(restaurantId)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})

module.exports = router