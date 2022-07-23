const { Thought, User } = require('../models')

const thoughtController = {
    getThought(req, res) {
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({params}, res){
        Thought.findOne({_id: params.thoughtId})
        .then(thoughtData => res.json(thoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    addThought({ params, body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate (
                {_id: params.userId},
                {$push: {thought: _id}},
                {new: true}
            );
        })
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    },
    updateThought({params}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {runValidators: true, new: true})
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    },
    deleteThought({params}, res){
        Thought.findByIdAndDelete({_id: params.thoughtId}, {runValidators: true, new: true})
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    },
    addReaction({params}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: {reactionId: params.reactionId}}}, {new: true})
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    }
}

module.exports = thoughtController;