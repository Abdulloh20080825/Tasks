const express = require('express');
const authController = require('../controllers/auth.controller');
const isAuthToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-account', authController.createAccount);
router.post('/login', authController.login);
router.post('/activation', isAuthToken, authController.activation);
router.get('/get-user-info', isAuthToken, authController.getUserInfo);

module.exports = router;
