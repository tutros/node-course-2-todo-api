require('./config/config');

const _ = require('lodash'),
    express = require('express'),
    bodyParser = require('body-parser'),
    { ObjectID }  = require('mongodb');

const { mongoose } = require('./db/mongoose'),
    { Todo } = require('./models/todo'),
    { User } = require('./models/user');

var app = express();
var port = process.env.PORT;

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

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick((req.body), ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            console.log('Todo not found');
            return res.setStatus(404);
        }
        console.log('Found and updated todo');

        res.send({todo});
    }).catch((e) => {
        res.sendStatus(400);
    })
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };