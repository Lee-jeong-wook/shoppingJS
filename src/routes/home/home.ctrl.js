"use strict";
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
dotenv.config();
// const mongoose = require('mongoose');
const Item = require('../../model/item');
const ItemStorage = require('../../model/itemStorage')
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'src/public/images');
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const filename = Date.now() + ext;
      callback(null, filename); // 이미지 파일 이름 설정
    },
  });

  const upload = multer({ storage });

  const uploadImage = upload.single('itemImg');
//get 방식으로 받아오는 데이터들
const output = {
    home: async (req, res) => {
        try {
            const items = await ItemStorage.getItems(true);
            res.render('home/index', { items });
        } catch (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: 'Failed to fetch items' });
        }
    },
    basket: async (req, res) => {
        try {
            const items = await ItemStorage.getItems(true);
            res.render('home/basket', { items });
        } catch (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: 'Failed to fetch items' });
        }
    },
    product: async (req, res) => {
        try {
            const productId = req.query.id;
            console.log(productId);
            const item = new Item(req.body);
            const items = await item.product(productId);
            console.log(items);
            res.render('home/product', { items });
        } catch (err) {
            console.error('error:', err);
            return res.status(500).json({ error: 'Failed' });
        }
    },
    register: (req, res) => {
        res.render('home/register');
    }
};
//post 방식으로 받아오는 데이터들
const server = {
    home: async (req, res) => {
        const item = new Item(req.body);
        const response = await item.home();
        return res.json(response);
    },
    product: async (req, res) => {
        const item = new Item(req.body);
        const response = await item.basket();
        return response;
    },
    basket: async (req, res) => {
        console.log(req.body);
        const item = new Item(req.body);
        const response = await item.basketList();
    },
    register: async (req, res) => {
        try {
          // 이미지 업로드
          console.log(req.file);
          uploadImage(req, res, async (err) => {
            if (err) {
              console.error('이미지 업로드 오류:', err);
              return res.status(500).json({ error: '이미지 업로드 실패' });
            }
            const { itemName, itemTag, itemPrice, itemDescription } = req.body;
            let imageFilePath = req.file.path.replace(/\\/g, '/');
            console.log(req.file);
            imageFilePath = imageFilePath.replace('src/public', '');
            const id = Math.floor(Math.random() * 10000000);
            const newId = id.toString();
            const newItem = new Item({
              id: id,
              name: itemName,
              tag: itemTag,
              price: itemPrice,
              description: itemDescription,
              amount: 0,
              image: imageFilePath, // 이미지 경로 저장
            });
    
            await newItem.save();
            return res.json({ success: true, message: '상품이 등록되었습니다.' });
          });
        } catch (err) {
          console.error('상품 등록 오류:', err);
          return res.status(500).json({ error: '상품 등록 실패' });
        }
      },
};

module.exports = {
    output,
    server
};