//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
   return console.log('unable to connect to mondodb server'); 
  }
  console.log('connected to mongodb server')
  
  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  // 
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // 
  // })
  // 
  // 
  // db.collection('Users').insertOne({
  //   name: 'JohnB',
  //   age: 23,
  //   location: 'Perth'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert User')
  //   }
  // 
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()))
  // 
  // })


   db.close();
 
 });
