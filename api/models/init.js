const mongoose = require('mongoose')

// Use the promise functionality built into Node
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/myshop', { useMongoClient: true })
	.then(() => {
		console.log('Succesfully connected to the database!')
	})
	.catch(error => {
		// Something went wrong
		console.log('Error connecting to MongoDB database', error)
	})

	module.exports = mongoose;