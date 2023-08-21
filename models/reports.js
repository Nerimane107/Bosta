const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    status:{type: String,required : true},
    availability:{type: Number , required : true},
    outages: {type: Number , required : true},
    downtime: {type: Number , required : true}, //in seconds
    uptime: {type: Number , required : true}, // in seconds
    responseTime: {type: Number , required : true},
    //history: Timestamped logs of the polling requests.
});

module.exports = mongoose.model('Reports',reportSchema)