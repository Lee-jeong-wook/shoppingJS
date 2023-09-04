"use strict";
const dotenv = require('dotenv');
dotenv.config();

// const mongoose = require('mongoose');
const Item = require('../../model/item');
const ItemStorage = require('../../model/itemStorage')

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

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
    basket: (req, res) => {
        res.render('home/basket');
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
        res.render('home/product');
    },
    register: (req, res) => {
        res.render('home/register');
    }
};

const server = {
    home: async (req, res) => {
        const item = new Item(req.body);
        const response = await item.home();
        return res.json(response);
    },
};

module.exports = {
    output,
    server
};
