// Bring in our environment variables
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const { initialize } = require('./middleware/auth')

const app = express()

// Plugins 
app.use(bodyParser.json()) // Allows me to have JSON uploads (POST/PUT)


// Routes
app.use([
	require('./routes/products'),
	require('./routes/auth'),
	require('./routes/stores')
])

// JSON error hanling
app.use((error, req, res, next) => {
	res.send({ error: error.mesage})
})

app.use((req, res, next) => {
	// No other routes left, must be a 404
	res.status(404).send({
		error: `No route found for ${req.method} ${req.url}`
	})
})

// Server
app.listen(7000, (error) => {
	if (error) {
		console.log('There was a problem starting the server', error)
	} else {
		console.log('Server is listening on http://localhost:7000/')
	}
})