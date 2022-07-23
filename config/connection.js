const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userDB', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connections;