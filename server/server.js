var express = require('express'),
    bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose'),
    { Todo } = require('./models/todo'),
    { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log('[POST /todos] Received:');
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
        console.log(`Todo created: ${doc.text}`);
    }, (e) => {
        res.status(400).send(e);
        console.log(`Error creating todo: ${e}`);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
        console.log(`Todos returned`);
    }, (e) => {
        res.status(400).send(e);
        console.log(`Error getting todo: ${e}`);
    })
});


app.listen(3000, () => {
    console.log("Started on port 3000");
});

// Initialize Todo collection with our first todo
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo', e)
// });

// Create a user
// var newUser = new User({
//     email: 'tutros@gmail.com'
// })
// .save()
// .then( (doc) => {
//     console.log('Saved user', doc);
// }, (e) => {
//     console.log('Unable to save user', e);
// });

module.exports = { app };