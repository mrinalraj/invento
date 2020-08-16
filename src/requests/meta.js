import { metaDB as db } from './index'

db.insert([
	{ _id: 'invoiceNumber', value: 0 },
	{ _id: 'currency', value: 'INR' },
	{
		_id: 'owner',
		value: {
			name: 'Raj Enterprises',
			phone: '9931229235',
			address: 'Jhandapur, Bhagalpur',
		},
	},
])

export const getInvoiceNumber = async () => {
	const query = { _id: 'invoiceNumber' }
	return await db.findOne(query)
}

export const increaseInvoiceNumber = async () => {
	const query = { _id: 'invoiceNumber' }
	return await db.update(query, { $inc: { value: 1 } })
}

export const ownerDetails = async () => {
	const query = { _id: 'owner' }
	return await db.findOne(query)
}

export const getCurrency = async () => {
	const query = { _id: 'currency' }
	return await db.findOne(query)
}
