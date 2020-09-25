import Handlebars from 'handlebars'
import invoiceTemplate from './pdfInvoice'

export const createInvoiceFile = record => {
	const src = invoiceTemplate
	const template = Handlebars.compile(src)
	const result = template(record)

	return URL.createObjectURL(new Blob([result], { type: 'text/html' }))
}

export const openPreview = record => {
	const file = createInvoiceFile(record)

	const BrowserWindow = window.require('electron').remote.BrowserWindow
	const win = new BrowserWindow({
		height: 800,
		width: 800,
	})
	win.loadURL(file)
}

export const onPrint = record => {
	const file = createInvoiceFile(record)

	const BrowserWindow = window.require('electron').remote.BrowserWindow
	const win = new BrowserWindow({
		height: 800,
		width: 800,
	})
	win.loadURL(file)

	var options = {
		silent: false,
		printBackground: true,
		color: false,
		margin: {
			marginType: 'printableArea',
		},
		landscape: false,
		pagesPerSheet: 1,
		collate: false,
		copies: 1,
		header: 'Header of the Page',
		footer: 'Footer of the Page',
		pageSize: 'A4',
	}
	win.webContents.on('did-finish-load', () => {
		win.webContents.print(options, (success, failureReason) => {
			if (!success) console.log(failureReason)
			console.log('Print Initiated')
		})
	})
}
