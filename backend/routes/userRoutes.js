const express = require("express");
const router = express.Router();
const user = require('../db/user');
const jwt = require('jsonwebtoken');



router.post('/register', async (req,res)=>{
    console.log(req.body);
        try {
        console.log(req.body);
        const userData = new user(req.body);
         const result = await userData.save();
         res.send(result)
    } catch (error) {
        console.log("error", error);
        res.send(error)
    }
});

router.post('/login', async (req,res)=>{
    try {
        console.log(req.body, "adfv");
        
        const username = req.body.username;
        const password = req.body.password;
        // let user = {username, password};
        let data =  await user.findOne( { username:username, password: password}); 
        console.log("data ", data);
        jwt.sign({username, password}, 'raghuDaksh', {expiresIn: '1000s',}, (err,token)=>{
            console.log("token", token);
            
            res.json({
                token
            })
        })
        if(data){            
            return res.status(200).json(data);
        }else{
            return res.status(401).json('login failed');
        }
    } catch (error) {
        return res.status(500).json('login failed');

    }
})

module.exports = router;