const Product = require('./Product');

Product.deleteMany()
	.then(() => {
		console.log('Wiped Products')
	})
	.catch((error) => {
		console.log('Unable to delete products!', error)
	})
