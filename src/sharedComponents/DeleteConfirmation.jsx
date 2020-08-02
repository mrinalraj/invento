import React from 'react'
import { Popconfirm } from 'antd'
import { DeleteFilled } from '@ant-design/icons'

const text = 'Are you sure to delete this?'
const DeleteConfirmation = ({ action }) => {
	return (
		<Popconfirm placement='topRight' title={text} onConfirm={action} okText='Yes' cancelText='No'>
			<DeleteFilled />
		</Popconfirm>
	)
}

export default DeleteConfirmation
