const router = require('express').Router();
const { users } = require('./user_info');
const { posts } = require('./post');
const { stories } = require('./story');
const { followings } = require('./following');
const { followers } = require('./follower');

router.use('/users', users);
router.use('/posts', posts);
router.use('/stories', stories);
router.use('/followings', followings);
router.use('/followers', followers);

module.exports = { router };