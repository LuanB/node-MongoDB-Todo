const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')


Todo.remove({}).then((result) => {
  console.log(result);
})


// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5c4be65f5d0d2bc2090b387c'}).then((todo) => {
  
});

Todo.findByIdAndRemove('5c4be65f5d0d2bc2090b387c').then((todo) => {
  console.log(todo);
})
