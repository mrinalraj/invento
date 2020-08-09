import { metaDB as db } from './index'

db.insert([
	{ _id: 'invoiceNumber', value: 0 },
	{ _id: 'currency', value: 'INR' },
])

export const getInvoiceNumber = async () => {
	const query = { _id: 'invoiceNumber' }
	return await db.findOne(query)
}

export const increaseInvoiceNumber = async () => {
	const query = { _id: 'invoiceNumber' }
	return await db.update(query, { $inc: { value: 1 } })
}

export const getCurrency = async () => {
	const query = { _id: 'currency' }
	return await db.findOne(query)
}
