const mongoose = require('mongoose')

const checkSchema = new mongoose.Schema({

name :{
type : String,
required : true
},

url :{
    type : String,
    required : true
},

protocol:{
    type: String,
    enum: ['HTTP', 'HTTPS', 'TCP'],
    required : true
},

path:{
  type : String,
  
},
port :{
    type : Number,
    
},

webhook:{
    type : String,
    

},
timeout :{
    type : Number,
    default : 5,  //in seconds
    
},

interval :{
    type : Number,
    default : 600,  //in seconds
    
},
threshold :{
    type : Number,
    default : 1,
  
},
authentication :{
username :{type :String},
password:{type :String},

},

httpHeaders :[
    {
      key: { type: String },
      value: { type: String }
    }
  ],

assert:{
statusCode :{type:Number},

},
tags:[{ type: String }],
ignoreSSL:{
  type : Boolean,
  required: true,
  default : false
},
userToken : {type: String}



})

module.exports = mongoose.model('Checks',checkSchema)