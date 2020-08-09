const database = window.require('electron').remote.getGlobal('db')

export const inventoryDB = database.inventory
export const retailerDB = database.retailers
export const skuMasterDB = database.skuMaster
export const invoiceDB = database.invoice
