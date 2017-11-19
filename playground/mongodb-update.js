// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
const {Todo} = require('../server/models/todo');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a0fb47d6c2b1517a8a2a101')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // var todos = db.collection('Users');
    // todos.findOneAndUpdate({
    //     _id: new ObjectID('5a0fb82a6c2b1517a8a2a305')
    // }, {
    //     $set: {
    //         name: 'James',
    //         location: 'Washington'
    //     },
    //     $inc: {
    //         age: 1
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( (result) => {
    //     var updated = result.lastErrorObject;
    //     if (updated.updatedExisting) {
    //         console.log(`Updated: ${updated.n} documents to ${JSON.stringify(result.value, undefined, 2)}`);
    //     } else {
    //         console.log(`Not updated: value is ${result.value}`);
    //     }
    // })


    var id = new ObjectID('5a1145cfae202fe654302b7b');
    Todo.findByIdAndUpdate(id, {$set: {text: "Updated", completed: true}}, {new: true}).then((todo) => {
        if (!todo) {
            return console.log('Todo not found');
        }
        console.log('Found and updated todo');
        console.log(todo);
    }).catch((e) => {
        console.log(e.message)
    })


    //db.close();
});