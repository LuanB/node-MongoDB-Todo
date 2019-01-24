//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
   return console.log('unable to connect to mondodb server'); 
  }
  console.log('connected to mongodb server')

 // db.collection('Todos').findOneAndUpdate({
 //   _id: new ObjectID("5c4947c1f340fbeeb94a27ce")
 // }, {
 //   $set: {
 //     completed: true
 //   }
 // }, {
 //   returnOriginal: false
 // }).then((result) => {
 //   console.log(result)
 // })
 // 
 
 db.collection('Users').findOneAndUpdate({
   name:'Jen'
 },{
   $set: {
     name: 'Andrew'
   },
   $inc: {age: 1}
 }, {
   returnOriginal: false
 }).then((result) => {
   console.log(result)
 })
 

 
 
 //db.close();
 });
