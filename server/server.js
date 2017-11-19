var express = require('express'),
    bodyParser = require('body-parser'),
    { ObjectID }  = require('mongodb');

var { mongoose } = require('./db/mongoose'),
    { Todo } = require('./models/todo'),
    { User } = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

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

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                res.sendStatus(404);
            } else {
                res.send({todo})
            }
        }).catch(() => {
            res.sendStatus(400);
        });
    } else {
        res.sendStatus(404);
    }
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.sendStatus(404);
            } else {
                res.send({todo})
            }
        }).catch(() => {
            res.sendStatus(400);
        });
    } else {
        res.sendStatus(404);
    }    
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };