import React from 'react'
import { EyeOutlined } from '@ant-design/icons'

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
		title: 'View',
		dataIndex: 'view',
		key: 'view',
		render: view => <EyeOutlined />,
	},
]
