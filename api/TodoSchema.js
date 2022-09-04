const mongoose = require('mongoose')


const todoListSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: [true, "Please check your data entry, no userId specified."]
  },
  todos: {
    type: [String], 
    required: [true, "Please check your data entry, no todo specified."]
  }
  // omit _id, we use email instead
}, {_id : false})

const Todo = mongoose.model('Todo', todoListSchema)

module.exports = Todo