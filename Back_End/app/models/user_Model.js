
const mongoose = require('mongoose')
const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                return emailFormat.test(value)
            },
            message: function () {
                return 'Invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
        hide: true,
        trim: true,
        unique: true
    }
}, { timestamps: true })

const UserModel = mongoose.model("UserModel", UserSchema)

module.exports = UserModel