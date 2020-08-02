const database = window.require('electron').remote.getGlobal('db')

export const inventoryDB = database.inventory
export const retailerDB = database.retailers
