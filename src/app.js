const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid').v4;
const homeRoutes = require('./routes/index.routes');

const app = express();

const storage = multer.diskStorage({ //Multer option
    destination: path.join(__dirname, 'public/images'),
    filename: (req, file, cb) => {
        cb(null,  uuid() + path.extname(file.originalname).toLowerCase()); //To store images whit its original names, instead hashed ids
    }
});

const upload = multer({ //Multer Middleware
    dest: path.join(__dirname, 'public/images'), //Directory destined to store the files
    storage,
    limits: { fileSize: 1000000 }, // 1MB MaxLimit
    fileFilter: ((req, file, cb) => {
        console.log(file.mimetype)
        const filetypes = /jpeg|jpg|png|gif/; //File extension acepted
        const mimetype = filetypes.test(file.mimetype); //if mimetype matches with filetypes values is valid
        const extname = filetypes.test(path.extname(file.originalname)) //To extract the file extension name(mimetype
        if(mimetype && extname) return cb(null,true); //If mimetype matches
        cb('Error: File extension should be: jpeg, pjg, png, gif');

    })
}).single('image'); //Single because we want to uploads one image at a time. Image is the name of the input files)

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public'))); //Set static files to access from the browser

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(upload); //Multer


//Router
app.use(homeRoutes);

module.exports = app;