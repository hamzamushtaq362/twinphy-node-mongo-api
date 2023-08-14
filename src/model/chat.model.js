var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Chat = new Schema({
    sender_id:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Friend' 
        }
    ],
    status:{
        type:String,
        required: true
    },
    seen:{
        type:Boolean,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now,
        timestamp: true 
      },
});

var Model = mongoose.model('Chat', Chat);
module.exports = Model;

