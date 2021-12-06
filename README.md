# 我的餐廳清單

![Index page about Restaurant List](./public/image/snapshot.jpg)

## 介紹

紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

### 功能

- 可以新增使用者
- 可以以個人帳號登入
- 可以連結 facebook 登入
- 查看所有餐廳
- 瀏覽餐廳的詳細資訊
- 連結餐廳的地址到 Google 地圖
- 搜尋特定餐廳
- 新增特定餐廳
- 修改特定餐廳
- 刪除特定餐廳

## 安裝與執行步驟

1.打開終端機 cd 到指定路徑 ( 以 windows 桌面 為例 )

```text
cd Desktop
```

2.下載 restaurant_list 專案到本地電腦上

```text
git clone https://github.com/lavender0822/restaurant-CURD.git
```

3.進入 restaurant_list 路徑

```text
cd restaurant_list
```

4.在 restaurant_list 路徑中，依照 package-lock.json 安裝 Express、Express-handlebars 與其他必要套件

```text
npm install
```

5.執行專案 ( 伺服器啟動後會顯示 `The server is listening on http://localhost:3000` )

```text
npm start
```

6.開啟瀏覽器輸入網址 <http://localhost:3000>
## 開發工具

- Node.js 14.16.0
- Express 4.17.1
- Express-Handlebars 5.3.4
- Bootstrap 4.3.1( 搭配 popper 2.9.1 + jquery 3.6.0 )
- Font-awesome 5.8.1
- MongoDB
- mongoose 6.0.12
