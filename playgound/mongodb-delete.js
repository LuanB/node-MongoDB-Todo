//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
   return console.log('unable to connect to mondodb server'); 
  }
  console.log('connected to mongodb server')

// deleteMany

// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// });


// deteteOne

// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// });

// findOneAndDelete

// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//   console.log(result);
// })

  // db.close();
 
 
  // db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
  //   console.log(result);
  // });
 
  db.collection('Users').findOneAndDelete({_id: new ObjectID("5c482888ce552963d6ba4455")}).then((result) => {
    console.log(JSON.stringify(results, undefined, 2));
 });
 
 });
