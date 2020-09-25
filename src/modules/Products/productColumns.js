import React from 'react'
import DeleteConfirmation from '@components/DeleteConfirmation'
import { EditFilled } from '@ant-design/icons'

export const productColumns = ({ onDelete }) => [
	{
		title: 'SKU',
		dataIndex: 'key',
		key: 'key',
		width: 400,
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '',
		dataIndex: '_id',
		key: '_id',
		width: 50,
		render: (id, { key }) => <DeleteConfirmation action={() => onDelete(id, key)} />,
	},
]
