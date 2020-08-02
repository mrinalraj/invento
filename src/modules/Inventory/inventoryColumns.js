import React from 'react'
import DeleteConfirmation from '@components/DeleteConfirmation'
import { EditFilled } from '@ant-design/icons'

export const inventoryColumns = ({ onDelete, onEditClicked }) => [
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
		title: '',
		dataIndex: 'edit',
		key: 'edit',
		width: 50,
		render: (view, record) => <EditFilled type='primary' style={{ cursor: 'pointer' }} onClick={() => onEditClicked(record)} />,
	},
	{
		title: '',
		dataIndex: '_id',
		key: '_id',
		width: 50,
		render: (id, { SKU }) => <DeleteConfirmation action={() => onDelete(id, SKU)} />,
	},
]
