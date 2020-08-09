import React from 'react'
import { Link } from 'react-router-dom'

export const invoiceColumns = ({ openModal }) => [
	{
		title: 'Invoice No.',
		dataIndex: 'invoiceno',
		key: 'invoiceno',
		render: (invoiceno, record) => (
			<Link to={{}} onClick={() => openModal(record)}>
				{invoiceno}
			</Link>
		),
	},
	{
		title: 'Retailer Name',
		dataIndex: 'retailer',
		key: 'retailername',
	},
	{
		title: `Retailer's Contact`,
		dataIndex: 'phone',
		key: 'retailercontact',
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
		dataIndex: 'amount',
		key: 'amount',
	},
]
