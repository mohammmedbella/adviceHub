const express = require('express')
const mongoose = require('mongoose');
const Tip = require('./models/tip')
const tipController = require('./controllers/tipController')
const multer = require('multer');
const axios = require('axios');
const fs = require('fs')
const {uploadByBuffer} = require('telegraph-uploader');
const { Console } = require('console');
const { image } = require('pdfkit');
const app = express()


app.use(express.static('public'));
app.set('view engine' , 'ejs')

const dbURL = 'mongodb+srv://mohammmedbella:test123@cluster0.18cv2um.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect( dbURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(result => {
    app.listen(3000)
    console.log('connected to database')
})
.catch(err => {
    console.log(err)
})

// routes
app.get('/' , tipController.getIndex)
app.get('/addTip' , tipController.addTip)
app.get('/tipList' , tipController.tipList)
app.get('/tip/:id' , tipController.tipDetails)



// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/saveTip', upload.single('image') ,tipController.saveTip );
  