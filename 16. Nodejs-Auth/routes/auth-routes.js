const express = require('express');
const {loginUser, registerUser, changePassword} = require('../controllers/auth-controllers')
const authMiddleware = require("../middleware/auth-middleware")
const router = express.Router();



// all routes are related to authentication and authorization
router.post('/register', registerUser);
router.post("/login", loginUser);
router.post("/change-password",authMiddleware, changePassword);





module.exports = router;