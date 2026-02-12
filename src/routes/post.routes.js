const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.constroller')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

postRouter.post('/', upload.single("imgUrl"), postController.createPostController)

module.exports = postRouter