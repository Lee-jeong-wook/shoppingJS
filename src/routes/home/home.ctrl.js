"use strict";

const output = {
    home : (req, res) => {
        res.render('home/index')
    },
    basket : (req, res) => {
        res.render('home/basket')
    },
    product: (req, res) => {
        res.render('home/product')
    },
    register: (req, res) => {
        res.render('home/register')
    }
}


//post방식으로 보낼 코드
// const process = {
//     login: async (req, res) => {
//         const user = new User(req.body);
//         const response = await user.login();
//         console.log(response);
//         return res.json(response);
//     },
//     register: async (req, res) => {
//         const user = new User(req.body);
//         // user 데이터 받아오고 실행되어야 하니까 await 처리
//         const response = await user.register();
//         return res.json(response);
//     }
// };


module.exports = {
    output,
    // process
}