import React from 'react'
import DeleteConfirmation from '@components/DeleteConfirmation'

export const inventoryColumns = ({ onDelete }) => [
	{
		title: 'SKU',
		dataIndex: 'SKU',
		key: 'SKU',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		key: 'quantity',
	},
	{
		title: 'Price per unit',
		dataIndex: 'pricePerUnit',
		key: 'pricePerUnit',
	},
	{
		title: 'Margin',
		dataIndex: 'margin',
		key: 'margin',
	},
	{
		title: '',
		dataIndex: '_id',
		key: '_id',
		render: id => <DeleteConfirmation action={() => onDelete(id)} />,
	},
]
