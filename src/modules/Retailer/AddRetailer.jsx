import React from 'react'
import { Input, Modal, Form } from 'antd'
import { createRetailerRecord } from '@requests/retailer'

const AddRetailer = ({ addRetailerModalVisible, hideRetailerModal }) => {
	const [form] = Form.useForm()
	const addRetailer = () => {
		form.validateFields()
			.then(async values => {
				form.resetFields()
				console.log(values)
				await createRetailerRecord(values).then(console.log)
			})
			.catch(info => {
				console.log('Validate Failed:', info)
			})
	}
	return (
		<Modal title='Add Retailer' visible={addRetailerModalVisible} onCancel={hideRetailerModal} okText='Add' okButtonProps={{ type: 'submit' }} onOk={addRetailer}>
			<Form layout='vertical' form={form} name='register' scrollToFirstError>
				<Form.Item
					name='name'
					label='Name'
					rules={[
						{
							required: true,
							message: `Please input retailer's name`,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='address'
					label='Address'
					rules={[
						{
							required: true,
							message: `Please input retailer's address`,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='phone'
					label='Phone No.'
					rules={[
						{
							required: true,
							message: `Please input retailer's phone number!`,
						},
					]}
				>
					<Input
						addonBefore='+91'
						style={{
							width: '100%',
						}}
					/>
				</Form.Item>
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
	)
}

export default AddRetailer
