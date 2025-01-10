const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {uploadImageController, fetchImageController, deleteImageController} = require("../controllers/image-controllers")

const router = express.Router();

//upload the image
router.post('/upload', 
    authMiddleware, 
    adminMiddleware, 
    uploadMiddleware.single('image'), 
    uploadImageController
);

//fetch all images
router.get('/get', authMiddleware, fetchImageController);
router.get("/:id", authMiddleware, adminMiddleware, deleteImageController);


module.exports = router;