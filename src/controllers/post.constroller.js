const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName : req.file.originalname
    })
 
    res.send(file)
}

module.exports ={
    createPostController
}