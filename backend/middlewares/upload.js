const multer = require('multer');
const path = require('path');


const storageEngine = multer.diskStorage({});



const fileFilter = (req, file, callback)=>{
    const ext = path.extname(file.originalname);
    let allowedFileTypes = ['.jpeg', '.jpg', '.png', '.svg+xml', '.svg', '.gif', '.xlsx', '.xls', '.doc', '.docx', '.ppt', '.pptx', '.txt', '.pdf'];
    if (allowedFileTypes.includes(ext)){
        callback(null, true);
    }else{
        callback(null, false);
    }
}



const upload = multer({
    storage: storageEngine,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});


module.exports = upload;