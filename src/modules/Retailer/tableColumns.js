import React from 'react'
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { deleteRetailerRecord } from '@requests/retailer'
import { message } from 'antd'

export const retailerColumns = ({ fetchRetailerList, editRetailerModal }) => [
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
		render: (_, record) => <EditOutlined onClick={() => editRetailerModal(record)} />,
	},
	{
		title: '',
		dataIndex: 'view',
		key: 'view',
		render: (_, record) => (
			<UserDeleteOutlined
				onClick={async () => {
					try {
						await deleteRetailerRecord(record._id)
						message.success('Retailer Deleted Successfully')
						fetchRetailerList()
					} catch (e) {
						message.error('Unable to Delete Retailer')
					}
				}}
			/>
		),
	},
]
