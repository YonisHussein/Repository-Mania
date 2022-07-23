const router = require('express').Router();
const {getThought, getThoughtById, addThought, updateThought, deleteThought, addReaction, deleteReaction} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(addThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/thoughtID/reactions/:reactionId').delete(deleteReaction);

module.exports = router
