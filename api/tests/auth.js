const request = require('supertest')
const app = require('../server.js')
const User = require('../models/User')
const Product = require('../models/Product')
const chai = require('chai')

const should = chai.should()

let token
let adminToken
let currentProduct

describe('Test routes', () => {

	it('should return a 404 for an indivdual URL', (done) => {
		request(app)
			.get('/nothing-to-see-here')
			.expect(404, done)
	})

	it('should register a user', (done) => {
		request(app)
			.post('/auth/register')
			.send({ 
				firstName: 'Jane',
				lastName: 'Doe',
				email: 'jane@doe.com',
				password: 'edison123'
						})
			.expect(200, done)
	})

	it('should log a user in', (done) => {
		request(app)
			.post('/auth')
			.send({ 
				email: 'jane@doe.com',
				password: 'edison123'
						})
			.expect(200)
			.then((response) => {
				token = response.body.token
				done()
			})
	})

	// Admin login

	it('should log an admin in', (done) => {
		request(app)
			.post('/auth')
			.send({ 
				email: 'admin@admin.com',
				password: 'edison123'
						})
			.expect(200)
			.then((response) => {
				adminToken = response.body.token
				console.log(adminToken)
				done()
			})
	})

	it('should validate credentials', (done) => {
		request(app)
			.post('/auth')
			.send({ 
				email: 'janet@doe.com',
				password: 'edison123'
						})
			.expect(401, done)
	})

	// CRUD

	// Create

	it('should use a token to be able to create a new product', (done) => {
		request(app)
			.post('/products')
			.expect(401, done)
	})

	it('should create a new product with a valid token', (done) => {
		request(app)
			.post('/products')
			.set('Authorization', 'Bearer ' + adminToken)
			.send({ 
				brandName: 'Wild Rhino',
				name: 'Booty'
						})
			.expect(200)
			.then((response) => {
				response.body.should.be.an('object')
				console.log(response.body)
				currentProduct = response.body
				done()
			})
	})

	// Read

	it('should require a token to view products', (done) => {
		request(app)
			.get('/products')
			.expect(401, done)
	})

	it('should use token to display products', (done) => {
		request(app)
			.get('/products')
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then((response) => {
				response.body.should.be.an('array')
				done()
			})
	})

	// Update

	it('should require a token to update products', (done) => {
		request(app)
			.patch('/products')
			.expect(401, done)
	})

	it('should use token to update products', (done) => {
		request(app)
			.patch('/products')
			.set('Authorization', 'Bearer ' + adminToken)
			.send({ 
				_id: currentProduct._id,
				brandName: 'Wild Rigdog',
				name: 'Booty'
						})
			.expect(200)
			.then((response) => {
				console.log(response.body)
				response.body.should.be.an('object')
				done()
			})
	})

	// Delete


	it('should require a token to delete products', (done) => {
		request(app)
			.delete(`/products/${currentProduct._id}`)
			.expect(401, done)
	})

	it('should use token and delete products', (done) => {
		request(app)
			.delete(`/products/${currentProduct._id}`)
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(200)
			.then((response) => {
				console.log(response.body)
				// response.body.should.be.an('object')
				done()
			})
	})


	it('should not let a randomthrough to /admin', (done) => {
		request(app)
			.get('/admin')
			.expect(401, done)
	})

	it('should not let a randomthrough to /admin', (done) => {
		request(app)
			.get('/admin')
			.expect(401, done)
	})

	after(() => {
		User.remove({ email: 'jane@doe.com' }).then(() => {
			console.log('Removed test email entry from DB.')
		})
	})
})