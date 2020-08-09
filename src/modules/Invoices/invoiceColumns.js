import React from 'react'
import { Link } from 'react-router-dom'
import { CurrencyList } from '@utils/CurrencyList'
import { PrinterFilled } from '@ant-design/icons'
import { Button } from 'antd'

export const invoiceColumns = ({ openPreview, onPrint }) => [
	{
		title: 'Invoice No.',
		dataIndex: 'invoiceNo',
		key: 'invoiceNo',
		render: (invoiceno, record) => (
			<Link to={{}} onClick={() => openPreview(record)}>
				{invoiceno}
			</Link>
		),
	},
	{
		title: 'Retailer Name',
		dataIndex: 'retailerDetails',
		key: 'retailerDetails',
		render: retailerDetails => retailerDetails?.name,
	},
	{
		title: `Retailer's Contact`,
		dataIndex: 'retailerDetails',
		key: 'retailerDetails',
		render: retailerDetails => retailerDetails?.phone,
	},
	{
		title: 'Date',
		dataIndex: 'createdAt',
		key: 'date',
		render: createdAt => {
			const date = new Date(createdAt)
			return date.toLocaleString('en-IN')
		},
	},
	{
		title: 'Amount',
		dataIndex: 'totalAmount',
		key: 'totalAmount',
		render: totalAmount => `${CurrencyList[window.currency].symbol_native} ${totalAmount}`,
	},
	{
		title: '',
		dataIndex: '_id',
		key: '_id',
		render: (id, record) => (
			<Button type='link' onClick={() => onPrint(record)}>
				<PrinterFilled />
			</Button>
		),
	},
]
