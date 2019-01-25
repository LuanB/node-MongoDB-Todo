const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/todo')

const {User} = require('./../server/models/user')



// let id = "5c4a9e68b633bc3d3c7609c51";
// 
// //ObjectID.isValid
// 
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }


// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
// 
// 
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos', todo);
// });


// Todo.findById(id).then((todo) => {
//   if( !todo) {
//     return console.log('Id not found')
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => { console.log(e)})


let id = '5c496c3278238e665b743a36';

User.findById(id).then((user) => {
  if(!user) {
    return console.log('user not found')
  }
  console.log(JSON.stringify(user, undefined, 2))
  
}).catch((e) => { 
console.log(e)});
