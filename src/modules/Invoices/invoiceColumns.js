import React from 'react'
import { Link } from 'react-router-dom'
import { CurrencyList } from '@utils/CurrencyList'

export const invoiceColumns = ({ openModal }) => [
	{
		title: 'Invoice No.',
		dataIndex: 'invoiceNo',
		key: 'invoiceNo',
		render: (invoiceno, record) => (
			<Link to={{}} onClick={() => openModal(record)}>
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
]
