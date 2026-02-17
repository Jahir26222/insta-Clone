const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
// const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: req.file.originalname,
        folder: "Insta-Clone-Post"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id

    })

    res.status(201).json({
        message: "Post created Successfully.",
        post
    })

}

async function getPostController(req, res) {
    

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post Fetched Successfully",
        posts
    })
}

async function getPostDetailscontroller(req, res) {

   

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden content."
        })
    }

    res.status(200).json({
        message:"Posts Fetched Done",
        post
    })

}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailscontroller
}