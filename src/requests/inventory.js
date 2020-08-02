import { inventoryDB as db } from './index'
import { range } from '@utils/helpers'

db.ensureIndex({ fieldName: 'SKU', unique: true }).catch(console.log)

export const getInventoryList = async params => {
	const pageNumber = params?.pageNumber || 0,
		pageSize = params?.pageSize || 0

	console.log(pageSize, pageNumber)

	return await db
		.find({})
		.skip(pageSize * (pageNumber - 1))
		.limit(pageSize)
}

export const getTotal = async () => {
	return await db.count({})
}

export const createInventoryRecord = async record => {
	return await db.insert(record)
}

export const deleteInventoryRecord = async _id => {
	return await db.remove({ _id }, {})
}

export const deleteAllInventoryRecord = async () => {
	return await db.remove({}, { multi: true })
}

export const searchInventory = async term => {
	const exp = new RegExp(term)
	return await db.find({
		$or: [{ SKU: { $regex: exp } }, { name: { $regex: exp } }],
	})
}

export const fillRandomData = async number => {
	const data = range(0, 10).map(number => {
		const SKU = `PROD-${Math.random()
				.toString(36)
				.replace(/[^a-z]+/g, '')
				.substr(0, 4)
				.toUpperCase()}${Math.random().toString().substr(2, 2)}`,
			name = `Product name ${number}`,
			quantity = Math.floor(Math.random() * 300) + 1,
			pricePerUnit = Math.floor(Math.random() * 400) + 30,
			margin = Math.floor(Math.random() * 6) + 1

		return { SKU, name, quantity, pricePerUnit, margin }
	})
	createInventoryRecord(data)
}
