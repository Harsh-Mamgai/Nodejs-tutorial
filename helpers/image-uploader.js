const multer = require('multer');
const path = require('path');

//diskStorage method gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        //null signifies error. second argument is destination 
        callback(null, './uploads');
    },
    //it will return new file name for the uploaded file
    filename: function(req, file, callback){
        //second argument is filename after + sign it is extension
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, callback)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true)
    }
    else{
        callback(new Error('Unsupported files'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
});

module.exports = {
    upload: upload
}