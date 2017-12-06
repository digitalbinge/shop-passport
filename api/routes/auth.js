const express = require('express')
const { register, signJWTForUser, signIn } = require('../middleware/auth')

const router = new express.Router()

router.post('/auth/register', register, signJWTForUser)

router.post('/auth', signIn, signJWTForUser)

module.exports = router