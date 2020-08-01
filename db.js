// main/src/db.js
const { app } = require('electron')
const Datastore = require('nedb-promises')

const dbFactory = fileName =>
	Datastore.create({
		filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('userData')}/data/${fileName}`,
		timestampData: true,
		autoload: true,
	})

module.exports = {
	inventory: dbFactory('inventory.db'),
	skuMaster: dbFactory('skuMaster.db'),
	retailers: dbFactory('retailers'),
}
