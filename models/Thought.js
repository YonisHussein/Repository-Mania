const { time } = require('console');
const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: time => dateFormat(time)
    },
});

const thoughtScheme = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: time => dateFormat(time)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],

},
{
    toJSON: {
        virtuals: true
    },
    id: false,
});
thoughtScheme.virtual('reactionCount').get(function(){
    return this.reaction.length;
});

const Thought = model('Thought', thoughtScheme);
module.exports = Thought