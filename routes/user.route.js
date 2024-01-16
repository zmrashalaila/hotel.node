const express = require('express')
const app = express()
app.use(express.json())
const userController = require('../controllers/user.controller')
app.post("/login", userController.login)
app.get("/", userController.getAlluser)
app.post("/", userController.adduser)
app.post("/find", userController.finduser)
app.put("/:id", userController.updateuser)
app.delete("/:id", userController.deleteuser)
//app.
module.exports = app