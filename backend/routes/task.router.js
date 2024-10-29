const express = require('express');
const isAuthToken = require('../middleware/auth');
const taskController = require('../controllers/task.controller');

const router = express.Router();
router.get('/get-user-tasks', isAuthToken, taskController.getAllTasks);
router.post('/create-task', isAuthToken, taskController.create);
router.put('/update-task/:id', isAuthToken, taskController.update);
router.delete('/delete-task/:id', isAuthToken, taskController.delete)

module.exports = router;
