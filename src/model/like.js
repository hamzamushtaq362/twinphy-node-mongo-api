var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Like = new Schema({
    post_id:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post' 
        }
    ],
    user_id:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
});
var Model = mongoose.model('Like', Like);
module.exports = Model;