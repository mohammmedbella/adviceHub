const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TipSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },
    
    img_link : {
        type : String,
        required : true
    },

    content : {
        type : String,
        required : true
    },
}, {timestamps : true})

const Tip = mongoose.model('tip' , TipSchema)
module.exports = Tip;
