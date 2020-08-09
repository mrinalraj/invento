import { invoiceDB as db } from './index'

export const getInvoiceList = async params => {
	const pageNumber = params?.pageNumber || 0,
		pageSize = params?.pageSize || 0

	return await db
		.find({})
		.skip(pageSize * (pageNumber - 1))
		.limit(pageSize)
}

export const getTotalInvoices = async () => {
	return await db.count({})
}

export const createNewInvoice = async record => {
	return await db.insert(record)
}

export const searchInvoice = async term => {
	const exp = new RegExp(term, 'i')
	const query = {
		$or: [{ invoiceNo: { $regex: exp } }],
	}
	return await db.find(query)
}
