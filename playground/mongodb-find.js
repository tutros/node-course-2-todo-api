// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    db.collection('Users').find({_id: new ObjectID('5a0fb82a6c2b1517a8a2a305')}).toArray().then((doc) => {
        console.log('Users with name: \'James\'');
        console.log(JSON.stringify(doc, undefined, 2));
    });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    //     // console.log(JSON.stringify(count, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });
    
    // db.close();
});