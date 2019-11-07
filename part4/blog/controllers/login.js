const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const body = request.body
    
    const user = await User.findOne({ username: body.username })
    
    const passwordCorrect = user === null ?
        false : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!passwordCorrect || !user) {
        return response.status(400).json({
            error: 'incorrect user or pass'
        })
    }

    const tokenInfo = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(tokenInfo, process.env.SECRET)

    response.json({ token,  username: user.username, name: user.name })
})

module.exports = loginRouter