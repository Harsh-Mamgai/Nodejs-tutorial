const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res){

    models.User.findOne({where: {email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
                message: "Email Already Exists!"
            })
        }
        else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                
                    models.User.create(user).then(result=>{
                        res.status(201).json({
                            message: "User created successfully!"
                        });
                    }).catch(error=>{
                        res.status(500).json({
                            message: "Something went wrong!"
                        });
                    });
                });
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message: "Something went wrong"
        });
    });    
}

function login(req, res){
    models.User.findOne({where: {email: req.body.email}}).then(user=>{
        if(user === null){
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        else{
            //plain password of request and databse hashed password matching done by predefined function compare 
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    //if result true password matches. we create a jwt token and send it in response
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication Successfull !",
                            token: token
                        })
                    });
                }
                else{
                    //password does not match result is false
                    res.status(401).json({
                        message: "Invalid credentials !"
                    })
                }
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message: "Something went wrong !"
        })
    });
}

module.exports = {
    signUp: signUp,
    login: login
}