import React from 'react'
import { PageHeader, Button, Table, Input, Modal, Form } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { retailerColumns } from './tableColumns'

const { Search } = Input

const Retailer = () => {
	const [form] = Form.useForm()
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

	// const showRetailerModal = () => {
	// setState({
	// 		visible: true,
	// 	})
	// }

	// const hideRetailerModal = () => {
	// setState({
	// 		visible: false,
	// 	})
	// }

	return (
		<>
			<PageHeader
				onBack={() => null}
				title='View Retailers'
				subTitle='Add or Edit a retailer here'
				extra={[
					<>
						<Search placeholder='Search by Retailer' onSearch={value => console.log(value)} style={{ width: 300, marginRight: '2rem' }} />
						<Button type='primary' shape='round' icon={<UserAddOutlined />} onClick={showRetailerModal}>
							Add Retailer
						</Button>
					</>,
				]}
			/>

			<Table rowKey='key' columns={retailerColumns} dataSource={data} />
			<Modal title='Basic Modal' visible={true} onCancel={hideRetailerModal}>
				<Form
					form={form}
					name='register'
					// onFinish={onFinish}
					initialValues={{
						residence: ['zhejiang', 'hangzhou', 'xihu'],
						prefix: '86',
					}}
					scrollToFirstError
				>
					<Form.Item
						name='email'
						label='E-mail'
						rules={[
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: 'Please input your E-mail!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default Retailer
