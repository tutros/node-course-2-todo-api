const {ObjectID}  = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');
var id = '5a0fd947844ecf5b3012226b';

// if (!ObjectID.isValid(id)) {
//     console.log("Invalid Id");
// } //else {

//     Todo.find({_id: id}).then(todos => console.log('Todos (find):', todos))
//         .catch(e => console.log('[find]Error', e.message));

//     Todo.findOne({_id: id}).then((todo) => {
//         if (!todo) {
//             console.log('[findone]Todo not found');
//         } else {
//             console.log('Todo (find one):', todo);
//         }
//     }).catch(e => console.log('[findone]Error', e.message));

//     Todo.findById(id).then((todo) => {
//         if (!todo) {
//             console.log('[findbyid]Todo By Id: \'Todo not found\'');
//         } else {
//             console.log('Todo (findbyid):', todo);
//         }
//     }).catch(e => {
//         console.log('[findbyid]Error', e.message);
//     });
// //}

// user not found
// print errors
// handle errors
User.findById(id).then((user) => {
    if (!user) {
        console.log('User not found');
    } else {
        console.log('User', user);
    }
}).catch((e) => {
    console.log('Error getting user by id: ', e.message);
})