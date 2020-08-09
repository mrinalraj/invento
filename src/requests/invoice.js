import { invoiceDB as db } from './index'
import { range } from '@utils/helpers'

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

export const fillRandomData = async () => {
	const data = range(0, 2).map(number => {
		const invoiceno = Math.floor(Math.random() * 100).toString(),
			retailer = `Retailer name ${number}`,
			phone = `99999999999`,
			amount = Math.floor(Math.random() * 6) + 1

		return { invoiceno, retailer, amount, phone }
	})
	return await db.insert(data)
}

export const searchInvoice = async term => {
	const exp = new RegExp(term, 'i')
	const query = {
		$or: [{ retailer: { $regex: exp } }, { invoiceno: { $regex: exp } }],
	}
	return await db.find(query)
}
