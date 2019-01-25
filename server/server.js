let express = require('express');

let bodyParser = require('body-parser');


let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo');
let {User} = require('./models/user')


let app = express();

app.use(bodyParser.json());

// create
app.post('/todos', (req, res) => {
  //console.log(req.body);
  let todo = new Todo({
    text: req.body.text
  });
  
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
    
  });
    
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos:todos})
  }, (e) => {
    res.status(400).send(e);
  })
})



app.listen(3000, () => {
  console.log('Started on port 3000')
});






// 
// 
// // create mongoose model
// 
// 
// 
// // create new instance of model
// 
// let newUser = new User({
// //  email: 'hotmail@hotmail.com'
// })
// 
// // let newTodo = new Todo({
// //   text: 'Cook dinner'
// // });
// // 
// // let mynewTodo = new Todo({
// //   text: 'shopping',
// //   completed: true,
// //   completedAt: 12
// // })
// 
// 
// let mynewTodo = new Todo({
// 
// })
// 
// 
// 
// 
// // 
// // mynewTodo.save().then((doc) => {
// //   console.log('Saved todo', doc);
// // }, (e) => {
// //   console.log('Unable to save todo')
// // });
// 
// 
// newUser.save().then((doc) => {
//   console.log('Saved New User', doc);
// }, (e) => {
//   console.log('Unable to save new User')
// });



module.exports = {app};
