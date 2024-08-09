const User = require('../models/user_Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


require('dotenv').config()
const userController = {}

userController.show = (req, res) => {
    const { id } = req.user
    User.findById(id)
        .then((user) => {
            if (user) {
                res.json(user)
            } else {
                res.json({})
            }
        }).catch((err) => {
            res.json(err)
        });
}

userController.register = async (req, res) => {
    try {
        const { body } = req
        const { email, username } = body;
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const userObj = new User(body)
        const salt = await bcrypt.genSalt()
        const hashpassword = await bcrypt.hash(userObj.password, salt)
        userObj.password = hashpassword
        const user = await userObj.save()
        res.json(user)

    } catch (error) {
        res.json(error)
    }
}


userController.login = (req, res) => {
    const { body } = req
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.json({ error: 'invalid password or email' })
            } else {
                bcrypt.compare(body.password, user.password)
                    .then((match) => {
                        if (match) {
                            const tokenData = {
                                id: user._id,
                                email: user.email,
                                name: user.name
                            }
                            const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: '1h' })
                            res.json({
                                token: `Bearer ${token}`
                            })
                        } else {
                            res.json({ error: 'invalid email or password' })
                        }

                    })
            }
        }).catch((err) => {
            res.json(err)
        })
}

userController.deleteAccount = async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOneAndDelete({ _id: req.user.id })
        const compare = await bcrypt.compare(body.password, user.password)
        if (compare) {
            const category = Category.deleteMany({ userId: req.user.id })
            const expense = Expense.deleteMany({ userId: req.user.id })
            const result = await Promise.all([user, category, expense])
            res.json(result[0])
        } else {
            res.json({ error: "Check Your Password" })
        }
    } catch (error) {
        res.json(error)
    }
}
module.exports = userController