import React from 'react'
import { PageHeader, Button, Table } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { retailerColumns } from './tableColumns'

const Retailer = () => {
	const data = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	]

	return (
		<>
			<PageHeader
				onBack={() => null}
				title='View Retailers'
				subTitle='Add or Edit a retailer here'
				extra={[
					<Button type='primary' shape='round' icon={<UserAddOutlined />}>
						Add Retailer
					</Button>,
				]}
			/>
			<Table columns={retailerColumns} dataSource={data} />
		</>
	)
}

export default Retailer
