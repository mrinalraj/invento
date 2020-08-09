import Handlebars from 'handlebars'
import invoiceTemplate from './pdfInvoice'

const fs = window.require('fs')

export const createInvoiceFile = async record => {
	const src = invoiceTemplate
	const template = Handlebars.compile(src)
	const result = template(record)
	console.log(result)

	const path = window.require('electron').remote.getGlobal('userDataPath')

	return new Promise((resolve, reject) => {
		fs.promises
			.access(path + '/invoices')
			.then(() => {
				console.log('folder present')
			})
			.catch(() => {
				fs.mkdir(path + '/invoices', err => {
					if (err) reject()
				})
			})
			.finally(() => {
				fs.writeFileSync(path + `/invoices/${record._id}.html`, result)
				resolve(`${path}/invoices/${record._id}.html`)
			})
	})
}

export const openPreview = record => {
	createInvoiceFile(record).then(file => {
		const BrowserWindow = window.require('electron').remote.BrowserWindow
		const win = new BrowserWindow({
			height: 600,
			width: 800,
		})
		win.loadURL(`file:///${file}`)
	})
}

export const onPrint = record => {
	createInvoiceFile(record)
		.then(file => {
			console.log('file', file)
			const BrowserWindow = window.require('electron').remote.BrowserWindow
			const win = new BrowserWindow({
				height: 600,
				width: 800,
			})
			win.loadURL(`file:///${file}`)

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
				pageSize: 'A5',
			}
			win.webContents.on('did-finish-load', () => {
				win.webContents.print(options, (success, failureReason) => {
					if (!success) console.log(failureReason)
					console.log('Print Initiated')
				})
			})
		})
		.catch(console.log)
}
