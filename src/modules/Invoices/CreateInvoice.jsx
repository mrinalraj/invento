import React from 'react'
import { PageHeader, Form, Select, message, Button, InputNumber, Modal } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import { getRetailerList } from '@requests/retailer'
import moment from 'moment'
import { getSKUMasterList } from '@requests/skuMaster'
import { findProductBySku, findProductBySkuList, updateInventoryItem } from '@requests/inventory'
import { getInvoiceNumber, increaseInvoiceNumber, ownerDetails } from '@requests/meta'
import { createNewInvoice } from '@requests/invoice'
import { asyncForEach } from '@utils/helpers'
import InvoiceSuccess from './InvoiceSuccess'
import { CurrencyList } from '@utils/CurrencyList'

const ItemRow = ({ form, field, sku, remove, calculateTotal, onSelectRemoveProduct, setProductsList, productsList }) => {
	const [product, setProduct] = React.useState({})

	const fetchProduct = async sku => {
		try {
			const prod = await findProductBySku(sku)
			setProduct(prod)

			console.log('selecting product', prod)
			let values = form.getFieldValue()
			console.log(values, field)
			values.items[field.name].pricePerUnit = +prod.pricePerUnit
			values.items[field.name].name = prod.name
		} catch (e) {
			message.error('unable to find and select product')
			console.info(e)
		}
	}

	const calculateAmount = () => {
		const discount = form.getFieldValue('items')[field.name]?.discount
		const quantity = form.getFieldValue('items')[field.name]?.quantity
		let values = form.getFieldValue()

		if (discount === undefined || !quantity) {
			return
		}

		const discountAmount = product?.pricePerUnit * (discount / 100)
		const rate = product?.pricePerUnit - discountAmount
		const amount = rate * quantity

		values.items[field.name].amount = +amount.toFixed(2)
		values.items[field.name].rate = +rate.toFixed(2)
		calculateTotal()
	}

	return (
		<div key={field.name} style={{ display: 'flex', border: '1px solid black', margin: '1rem 0' }}>
			<div style={{ flex: '0 1 5%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>{field.name + 1}</div>
			<Form.Item
				{...field}
				style={{ flex: '0 1 43%', borderRight: '1px solid black', margin: 0 }}
				name={[field.name, 'sku']}
				rules={[{ required: true }]}
				placeholder='Item Name'
			>
				<Select showSearch onSelect={fetchProduct}>
					{sku.map((s, i) => (
						<Select.Option key={i} value={s.key}>
							<span>
								<b>{s.key}</b>
								{` (${s.name})`}
							</span>
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item {...field} name={[field.name, 'quantity']} rules={[{ required: true }]} style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0 }}>
				<InputNumber style={{ width: '100%' }} min={0} max={product?.quantity || 0} placeholder={`${product?.quantity || 0} available`} onBlur={calculateAmount} />
			</Form.Item>
			<Form.Item
				{...field}
				name={[field.name, 'pricePerUnit']}
				style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingRight: '8px', textAlign: 'right' }}
				initialValue={product?.pricePerUnit}
			>
				<span>
					{CurrencyList[window.currency]?.symbol_native} {product?.pricePerUnit}
				</span>
			</Form.Item>
			<Form.Item {...field} name={[field.name, 'discount']} rules={[{ required: true }]} style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0 }}>
				<InputNumber style={{ width: '100%' }} onBlur={calculateAmount} />
			</Form.Item>
			<Form.Item
				{...field}
				name={[field.name, 'rate']}
				rules={[{ required: true }]}
				style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}
			>
				<span>
					{CurrencyList[window.currency]?.symbol_native} {form.getFieldValue('items')[field.name]?.rate}
				</span>
			</Form.Item>
			<Form.Item {...field} name={[field.name, 'amount']} style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingRight: '8px', textAlign: 'right' }}>
				<span>
					{CurrencyList[window.currency]?.symbol_native} {form.getFieldValue('items')[field.name]?.amount}
				</span>
			</Form.Item>
			<div
				style={{ display: 'flex', justifyContent: 'center', paddingLeft: '10px', alignItems: 'center', cursor: 'pointer' }}
				onClick={() => {
					remove(field.name)
					calculateTotal()
				}}
			>
				<MinusCircleOutlined />
			</div>
		</div>
	)
}

const CreateInvoice = ({ history }) => {
	const [form] = Form.useForm()
	const [retailers, setRetailers] = React.useState([])
	const [sku, setSku] = React.useState([])
	const [selectedRetailer, setSelectedRetailers] = React.useState({})
	const [total, setTotal] = React.useState(0)
	const [invoiceNumber, setInvoiceNumber] = React.useState()
	const [products, setProducts] = React.useState([])

	const retailerList = async () => {
		try {
			const retailers = await getRetailerList()
			setRetailers(retailers)
		} catch (e) {
			message.error('Unable to get retailers, please click refresh data')
		}
	}
	const skuList = async () => {
		try {
			const sku = await getSKUMasterList()

			setSku(sku)
		} catch (e) {
			message.error('Unable to get products, please click refresh data')
		}
	}
	const fetchInvoiceNumber = async () => {
		try {
			const invoiceNumber = await getInvoiceNumber()
			console.log(invoiceNumber)
			setInvoiceNumber(invoiceNumber.value)
		} catch (e) {}
	}

	React.useEffect(() => {
		retailerList()
		skuList()
		fetchInvoiceNumber()
	}, [])

	const onRetailerSelected = value => {
		const selectedRetailer = retailers.find(retailer => retailer.name === value)

		setSelectedRetailers(selectedRetailer)
	}

	const onSelectRemoveProduct = skuName => {
		const skuList = sku.filter(s => s.key !== skuName)
		setSku(skuList)
	}

	const calculateTotal = () => {
		const items = form.getFieldValue('items')
		const total = items.reduce((a, b) => a + b?.amount || 0, 0)
		setTotal(total.toFixed(2))
	}

	const validateAndCreateInvoice = () => {
		form.validateFields()
			.then(async values => {
				const { items } = values
				if (!items || !items.length) return message.error('atleast one item should be entered.')
				values.retailer = retailers.find(retailer => retailer.name === values.retailer)._id
				values.invoiceNo = (invoiceNumber + 1).toString()
				values.totalAmount = total

				try {
					const skuList = items.map(item => item.sku)
					const listOfInventoryItems = await findProductBySkuList(skuList)

					const invoice = await createNewInvoice(values)
					console.log('new invoice', invoice)

					const inventoryUpdate = items.map(item => {
						const inventoryItem = listOfInventoryItems.find(i => i.SKU === item.sku)
						const oldQuantity = inventoryItem?.quantity
						const newQuantity = oldQuantity - item.quantity
						return { ...inventoryItem, quantity: newQuantity }
					})

					asyncForEach(inventoryUpdate, async item => {
						await updateInventoryItem(item)
					})

					await increaseInvoiceNumber()

					const owner = await ownerDetails()

					Modal.success({
						content: (
							<InvoiceSuccess
								data={{
									...invoice,
									currency: CurrencyList[window.currency].symbol_native,
									invoiceDate: moment(invoice.createdAt).format('DD/MM/YYYY'),
									owner: owner.value,
									retailerDetails: retailers.find(r => r._id === invoice.retailer),
								}}
							/>
						),
						icon: null,
						maskClosable: true,
						onOk: history.goBack,
					})
				} catch (e) {
					message.error('not created')
				}
			})
			.catch(e => {
				console.log(e)
				message.error('something went wrong')
			})
	}

	return (
		<>
			<PageHeader onBack={history.goBack} title='Create new invoice' />
			<Form form={form} name='create-invoice'>
				<div style={{ width: '100%', background: '#1b1b1b', textAlign: 'center', padding: '1rem 0', marginBottom: '2rem' }}>
					<h2 style={{ color: 'white', margin: 0, padding: 0, textTransform: 'uppercase', letterSpacing: '1rem' }}>Invoice</h2>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
						<h3>Bill to: </h3>
						<Form.Item name='retailer' rules={[{ required: true }]}>
							<Select showSearch onSelect={onRetailerSelected} placeholder='Select Retailer' style={{ width: '30vw' }}>
								{retailers.map(retailer => (
									<Select.Option key={retailer._id} value={retailer.name}>
										{retailer.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<div style={{ height: '100px', width: '30vw' }}>
							{selectedRetailer?.name || ''}
							<br />
							{selectedRetailer?.address || ''}
							<br />
							{selectedRetailer?.phone || ''}
							<br />
							{selectedRetailer?.email || ''}
						</div>
					</div>
					<div>
						<Form.Item name='invoiceNo' initialValue={invoiceNumber + 1}>
							<p>Invoice No.: #{invoiceNumber + 1}</p>
						</Form.Item>
						<p>Invoice Date: {moment().format('DD/MM/YYYY')}</p>
					</div>
				</div>
				<div id='main-form'>
					<div style={{ display: 'flex', border: '1px solid black' }}>
						<p style={{ flex: '0 0 5%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>S. No.</p>
						<p style={{ flex: '0 0 43%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>Item Name</p>
						<p style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>Quantity (Nos.)</p>
						<p style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>MRP</p>
						<p style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>Discount (%)</p>
						<p style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>Rate</p>
						<p style={{ flex: '0 0 10%', borderRight: '1px solid black', margin: 0, paddingLeft: '8px' }}>Amount</p>
					</div>
					<Form.List name='items'>
						{(fields, { add, remove }) => (
							<div>
								{fields.map(field => (
									<ItemRow
										form={form}
										field={field}
										sku={sku}
										remove={remove}
										calculateTotal={calculateTotal}
										onSelectRemoveProduct={onSelectRemoveProduct}
										setProductsList={setProducts}
										productsList={products}
									/>
								))}

								<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
									<Button shape='round' type='primary' onClick={() => add()}>
										Add Item
									</Button>
								</div>
							</div>
						)}
					</Form.List>
				</div>

				<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
					<h2>
						Total: {CurrencyList[window.currency]?.symbol_native} {total}
					</h2>
				</div>
				<Button shape='round' type='primary' onClick={validateAndCreateInvoice}>
					Create Invoice
				</Button>
			</Form>
		</>
	)
}

export default CreateInvoice
