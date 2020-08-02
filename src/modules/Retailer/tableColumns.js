import React from 'react'
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { deleteRetailerRecord } from '@requests/retailer'

export const retailerColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Phone No.',
		dataIndex: 'phone',
		key: 'phone',
	},
	{
		title: 'E-Mail',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: '',
		dataIndex: 'edit',
		key: 'edit',
		render: view => <EditOutlined />,
	},
	{
		title: '',
		dataIndex: 'view',
		key: 'view',
		render: (_, record) => <UserDeleteOutlined onClick={async () => await deleteRetailerRecord(record._id)} />,
	},
]
