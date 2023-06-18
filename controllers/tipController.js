const express = require('express')
const mongoose = require('mongoose')
const Tip = require('../models/tip')


const multer = require('multer');
const axios = require('axios');
const fs = require('fs')
const {uploadByBuffer} = require('telegraph-uploader');
const { Console } = require('console');
const { image } = require('pdfkit');



exports.getIndex = (req,res) => {
    res.render('index' , {
        pageTitle : 'Home Page'
    })
}

exports.addTip = (req,res) => {
    
    res.render('addTip' , {
        pageTitle : 'ADD tip'
    })

}

exports.tipList = (req,res) => {

    Tip.find()
        .then(data => {
            res.render('tipList' , {
                pageTitle : 'Tips list',
                data
            })
        })


}

exports.saveTip = async function (req, res, next) {
    if (!req.file) {
      // If no file was uploaded, return an error response
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    try {
      // Create a new Blob object from the buffer data
      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
  
      // Create a new FormData instance and append the Blob object
      const formData = new FormData();
      formData.append('file', blob, req.file.originalname);
  
      // Upload the image to telegra.ph using Axios
      const response = await axios.post('https://telegra.ph/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Extract the uploaded image URL from the response
      const imageUrl = response.data[0].src.split('/').pop();
  
      // Return the image URL as the response
      //return res.json({ imageUrl });

      const tipTitle = req.body.title
      const tipCategory = req.body.category
      const tipDescription = req.body.description
      const imageLine = 'https://telegra.ph/file/' + imageUrl
      const tipContent = req.body.content

      const tipData = Tip({
        title : tipTitle,
        category : tipCategory,
        description : tipDescription,
        img_link : imageLine,
        content : tipContent,
        
      })
      tipData.save()
      .then(result => {
        res.redirect('/')
      })







    } catch (error) {
      // Handle any errors that occurred during the upload process
      console.error('Error uploading image:', error);
      return res.status(500).json({ error: 'Image upload failed' });
    }
}

exports.tipDetails = (req,res) => {
    const id = req.params.id;
    Tip.findById(id)
        .then(data => {
            res.render('tip' , {
                pageTitle : 'Tip detail',
                data
            })
            
        })
}