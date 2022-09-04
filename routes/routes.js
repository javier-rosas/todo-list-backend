const express = require('express')
const TodosDAO = require('../api/TodosDAO.js');
const { checkUserValidity } = require("../middleware/auth.middleware");
const router = express.Router()

router.post("/authenticate", TodosDAO.authenticateUser)
router.get("/:email", checkUserValidity, TodosDAO.getTodos)
router.put("/todo", checkUserValidity, TodosDAO.addTodo)

module.exports = router
