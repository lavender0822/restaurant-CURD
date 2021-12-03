const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
    return res.render('new')
})

// 新增餐廳
router.post("/", (req, res) => {
    const userId = req.user._id
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})

// 瀏覽特定餐廳
router.get('/:restaurantId', (req, res) => {
    const userId = req.user._id
    const { restaurantId } = req.params
    return Restaurant.findOne({ restaurantId, userId })
        .lean()
        .then(restaurantData => res.render("show", { restaurantData }))
        .catch(err => console.log(err))
})

// 編輯餐廳頁面
router.get("/:restaurantId/edit", (req, res) => {
    const userId = req.user._id
    const { restaurantId } = req.params
    return Restaurant.findOne({ restaurantId, userId })
        .lean()
        .lean()
        .then(restaurantData => res.render("edit", { restaurantData }))
        .catch(err => console.log(err))
})

// 更新餐廳
router.put("/:restaurantId", (req, res) => {
    const userId = req.user._id
    const { restaurantId } = req.params
    return Restaurant.findByIdAndUpdate({ restaurantId, userId }, { $set: req.body })
        .then(() => res.redirect(`/restaurants/${restaurantId}`))
        .catch(err => console.log(err))
})

// 刪除餐廳
router.delete("/:restaurantId", (req, res) => {
    const userId = req.user._id
    const { restaurantId } = req.params
    return Restaurant.findOne({ restaurantId, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router