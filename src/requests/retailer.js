import { retailerDB as db } from './index'

export const getTotalRetailers = async () => {
	return await db.count({})
}

export const createRetailerRecord = async record => {
	return await db.insert(record)
}

export const getRetailerList = async params => {
	const pageNumber = params?.pageNumber || 0,
		pageSize = params?.pageSize || 0

	console.log(pageSize, pageNumber)

	return await db
		.find({})
		.skip(pageSize * (pageNumber - 1))
		.limit(pageSize)
}

export const deleteRetailerRecord = async _id => {
	return await db.remove({ _id }, {})
}

export const updateRetailerRecord = async record => {
	return await db.update({ _id: record._id }, record, { upsert: true })
}

export const searchRetailer = async term => {
	const exp = new RegExp(term, 'i')
	const query = {
		$or: [{ name: { $regex: exp } }],
	}
	return await db.find(query)
}
