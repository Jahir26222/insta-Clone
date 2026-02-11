const userModel = require('../model/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')



async function registerController(req, res) {

    const { username, email, password, bio, profileImage } = req.body

    const isUserExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserExists) {
        return res.status(409).json({
            message: "User already exists " + (isUserExists.email === email ? " Email already exists" : " Username already exists")
        })
    }

    const hashPass = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hashPass
    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "Registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage

        }
    })


}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hashPass = crypto.createHash("md5").update(password).digest("hex")

    const isPasswordValid = hashPass === user.password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid Password "
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}