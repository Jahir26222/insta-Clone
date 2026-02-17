const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.constroller')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middleware/auth.middleware')

postRouter.post('/', upload.single("imgUrl"), identifyUser, postController.createPostController)
postRouter.get('/', identifyUser, postController.getPostController)
postRouter.get('/details/:postId', identifyUser, postController.getPostDetailscontroller)

module.exports = postRouter