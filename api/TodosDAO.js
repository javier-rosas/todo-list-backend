const jwt = require("jsonwebtoken");
const Todo = require('./TodoSchema.js')

class TodoDAO {

  static async authenticateUser(req, res, next) {
    const user = req.body.user;
    jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1h'}, (err, token) => {
      if (err) {
        res.status(400).json("Unable to authenticate user")
      } else {
        res.status(200).json({
          message: 'User Authenticated',
          token
        })
      }
    })
  }

  static async getTodos(req, res, next) {
    try {
      const email = req.params.email
      const query = { email: email }
      const projection = { todos: 1 }
      Todo.find(query, projection, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Unable to get todos in Todo.find" })
          console.log(err)
        } else if ( !result ){
          res.status(404).json({ error: "Todos not found" })
        } else {
          res.json(result)
        }
      })
    } catch(e) {
      res.status(500).json({ error: "Unable to get todos" })
      console.log(e)
    }
  }

  static async addTodo(req, res, next) {
    try {
      const email = req.body.email
      const todo = req.body.todo
      const query = { email : email }
      const update = { 
        $set:  { email: email },
        $push: { todos: todo }
      }
      const options = { upsert : true }
      Todo.updateOne(query, update, options, (err, data) => {
        if (err) {
          res.status(500).json({ error: "Unable to update user" })
          console.log(err)
        } else {
          console.log(data)
          res.json({ status: "success" })
        }
      })
    } catch(e) {
      console.log(e)
      res.status(500).json({ error: e })
    }
  }

}

module.exports = TodoDAO