const Product = require('./Product')
const Store = require('./Store')

Product.create([
	{ brandName: 'Coca Cola', name: '390ml Glass Bottle Coke' },
	{ brandName: 'Coca Cola', name: '390ml Glass Bottle Sprite' },
	{ brandName: 'Coca Cola', name: '390ml Glass Bottle Fanta' }
])
	.then((products) => {
		console.log('Created!', products)
	})
	.catch((error) => {
		console.log('Unable to seed products!', error)
	})

Store.create([
	{ storeName: 'My Store', location: 'Coorparoo' },
	{ storeName: 'Your Store', location: 'Archerfield' },
	{ storeName: 'His Store', location: 'Buderim' },
	{ storeName: 'Her Store', location: 'Abbotsford' }
])
	.then((stores) => {
		console.log('Created!', stores)
	})
	.catch((error) => {
		console.log('Unable to seed products!', error)
	})
