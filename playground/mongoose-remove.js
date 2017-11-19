const {ObjectID}  = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Remove all documents from collection
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Remove one and remove
// Todo.findOneAndRemove({}).then((result) => {})

Todo.findByIdAndRemove('5a112ae46c2b1517a8a3c4d0').then((todo) => {
    console.log(todo);
});