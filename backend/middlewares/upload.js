const multer = require('multer');
const path = require('path');


const storageEngine = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback)=>{
        const index = file.originalname.lastIndexOf('.');
        const name = file.originalname.slice(0,index) + '-' + Date.now() + path.extname(file.originalname);
        callback(null, name);
    }
});



const fileFilter = (req, file, callback)=>{
    let allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/svg', 'image/gif'];
    if (allowedFileTypes.includes(file.mimetype)){
        callback(null, true);
    }else{
        callback(null, false);
    }
}



const upload = multer({
    storage: storageEngine,
    fileFilter: fileFilter
});


module.exports = upload;