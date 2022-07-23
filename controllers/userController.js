const { User, Thought } = require('../models');

const userController = {
    getUser(req, res) {
        User.find({})
        .then((userData) => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    addUser({body}, res){
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    getUserById({params}, res){
        User.findOne({_id: params.id})
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: prarams.id}, body, {new: true}, {runValidators: true})
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    },
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    },
    addFriend({params}, res){
        User.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendID}}, {new:true, runValidators: true})
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    },
    removeFriend({params}, res){
        User.findOneAndUpdate({_id: params.id}, {$pull:{friends: params.friendID}}, {new: true})
        .then(userData =>{
            if(!userData){
                res.status(404).json({message: 'Error'});
                return;
            }
        })
    }
}

module.exports = userController;