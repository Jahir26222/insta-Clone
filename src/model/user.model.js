const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username Already Exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email Already Exists"],
        required: [true, "Email is reuired"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/jahir26/default-user.jpg"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel