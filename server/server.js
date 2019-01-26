let express = require('express');
const {ObjectID} = require('mongodb');
let bodyParser = require('body-parser');


let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo');
let {User} = require('./models/user')


let app = express();
const port = process.env.PORT || 3000;


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


// GET /todos/1232434

//404 - send back empty body ie send()

// findById
// success
  // if todo - send it back 
  // if no todo - sned back 404 with emapty body.
// error
  // 400 - and send empty body back


app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  
  // Valid id using isValid
  if(!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo:todo})
  }).catch((e) => {
    res.status(400).send();
  })
    
  
  
})



app.listen(port, () => {
  console.log(`Started on port ${port}`)
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
