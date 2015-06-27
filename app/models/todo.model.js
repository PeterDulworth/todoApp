var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = Schema({
    text: String
});

module.exports = mongoose.model('Todo', TodoSchema);