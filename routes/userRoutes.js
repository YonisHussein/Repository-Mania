const router = require ('express').Router();
const {getUser, getUserById, addUser, updateUser, deleteUser, addUser, deleteUser, addFriend} = require('../controllers/userController');

router.route('/').get(getUser).post(addUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userID/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;