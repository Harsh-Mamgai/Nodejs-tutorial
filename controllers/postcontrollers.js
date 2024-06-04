const Validator = require('fastest-validator');//importing module for data validation 
const models = require('../models');//importing our models

function save(req, res){
    console.log(req.body);
    const pos = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.userData.userId
    }

    //validation schema with conditions
    const schema = {
        title : {type:"string", optional:false, max:"100"},
        content : {type:"string", optional:false, max:"500"},
        categoryId : {type:"number", optional:false}
    }
    const v = new Validator();//create the object v of Validator class
    //call validate() method. if validation ok true return otherwise if validation fails array of errors is returned
    const validationResponse = v.validate(pos, schema);
    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        })
    }

    models.Category.findByPk(req.body.categoryId).then(result =>{
        if(result !== null){
            //async task. models mein Post table yah model mein create kardega yah object. kyuki migration hai database mein changes automatically query chalke data insert hojaega Post table mein.
            models.Post.create(pos).then(result=>{
                res.status(201).json({
                    message: "Post created successfully",
                    post: result
                })
            }).catch(err=>{
                res.status(500).json({
                    message: "Something went wrong",
                    error: err
                })
            });
        }
        else{
            res.status(400).json({
                message: "Invalid Category ID"
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message: "Something went wrong"
        });
    });
}
function show(req, res){
    const id = req.params.id;
    models.Post.findByPk(id).then(result =>{
        if(result){
            res.status(200).json(result);
        }
        else{
            //if that id is not present in database tab 404 ke sath yeh json ayega
            res.status(404).json({
                message: "Post not Found"
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}

function index(req, res){
    models.Post.findAll().then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}

function update(req, res){
    const id = req.params.id;
    //changes to apply passed in request body 
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
    }
    const userId = req.userData.userId;

    const schema = {
        title : {type:"string", optional:false, max:"100"},
        content : {type:"string", optional:false, max:"500"},
        categoryId : {type:"number", optional:false}
    }
    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);
    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        })
    }

    models.Category.findByPk(req.body.categoryId).then(result =>{
        if(result !== null){
            //update method:- 1st arg. tells what changes to apply. 2nd arg. tells where to aplly those changes.
            models.Post.update(updatedPost, {where: {id: id, userId: userId}}).then(result=>{
                res.status(200).json({
                    message: "Post updated successfully",
                    post: updatedPost
                });
            }).catch(error=>{
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error
                })
            });
        }
        else{
            res.status(400).json({
                message: "Invalid Category ID"
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message: "Something went wrong"
        });
    });
}

function destroy(req, res){
    const id = req.params.id;
    const userId = req.userData.userId;
    models.Post.destroy({where: {id: id, userId: userId}}).then(result=>{
        res.status(200).json({
            message: "Post deleted successfully!",
        });
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}


module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}
    