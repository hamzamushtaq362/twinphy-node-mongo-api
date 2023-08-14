var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Friends = new Schema({
    friend_id:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Friend' 
        }
    ],
    user_id:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
});
var Model = mongoose.model('Friends', Friends);
module.exports = Model;