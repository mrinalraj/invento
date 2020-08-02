import { skuMasterDB as db } from './index'

db.ensureIndex({ fieldName: 'key', unique: true }).catch(console.log)

export const getSKUMasterList = async () => {
	return await db.find({})
}

export const createNewSKU = async record => {
	return await db.insert(record)
}

export const markSKUEntry = async key => {
	const query = { key }
	return await db.update(query, { $set: { used: 1 } }, {})
}

export const markSKUDelink = async key => {
	const query = { key }
	return await db.update(query, { $set: { used: 0 } }, {})
}

export const delinkSKUList = async sukList => {
	const query = { key: { $in: sukList } }
	return await db.update(query, { $set: { used: 0 } }, { multi: true })
}

export const deleteAllSKU = async () => {
	const query = {}
	return db.remove(query, { multi: true })
}
