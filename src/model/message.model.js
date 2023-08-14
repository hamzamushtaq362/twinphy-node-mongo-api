var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    text:{
        type:String,
        required: true
    },
    chat_id:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Chat' 
        }
    ],

});
var Model = mongoose.model('Message', Message);
module.exports = Model;

