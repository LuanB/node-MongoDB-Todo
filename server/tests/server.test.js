const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')
const {app} = require('./../server');

const {Todo} = require('./../models/todo');


// create todos for the test
const todos = [{
  _id: new ObjectID(),
  text: 'First test to do'
},
{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];


//before each empty the database before testing.
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

// Create CRUD operation

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';
    
    // test the express server response
    request(app)
    .post('/todos')
    .send({text:text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
       return done(err)
      }
      
      // test the mongodb data
      
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
      
    })
  })
  
  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        
        return done(err);
      }
    
    
    Todo.find().then((todos) => {
      expect(todos.length).toBe(2);
      done();
    }).catch((e) => {
      done(e)
    })
    
  })
  
})
});



// READ CRUD operation

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  })
})


describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  })
  
  it('should return 404 if todo not found by id', (done) => {
    let hexId = new ObjectID().toHexString();
  
    console.log(hexId)
  
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  })

  it('should return 404 for non-object ids', (done) => {
        request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  })

  
})


// DELETE CRUD operation

describe('DELETE /todos/:id', () => {
  it('shold remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();
    
    let idHex = new ObjectID(hexId);
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    }).end((err,res) => {
      if (err) {
        return done(err)
      }
      
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
      
      
    })

  })
  


    

  // 
  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();
    
      console.log(hexId)
    
      request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
   });
  
  it('should return 404 if object id is invalid', (done) => {
request(app)
.delete(`/todos/123`)
.expect(404)
.end(done);
  })
    
});


// Update CRUD operation


describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    let hexId = todos[0]._id.toHexString();
    let text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text:text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)
      
      
    })
  
    
    

  
  it('should clear completedAt when todo is not completed', (done) =>{
    let hexId = todos[1]._id.toHexString();
    let text = 'This is the update test to item 2'
    
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed:false,
      text:text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done)
    
    
    
  })
  
})
  
  
