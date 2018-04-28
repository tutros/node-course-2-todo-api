const { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');

const tutro1Id = new ObjectID();
const tutro2Id = new ObjectID();
const users = [{
    _id: tutro1Id,
    email: 'tutro1@example.com',
    password: 'tutro1pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: tutro1Id, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: tutro2Id,
    email: 'tutro2@example.com',
    password: 'tutro2pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: tutro2Id, access: 'auth'}, 'abc123').toString()
    }]    
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: tutro1Id
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: tutro2Id
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
};

module.exports = {users, todos, populateUsers, populateTodos};