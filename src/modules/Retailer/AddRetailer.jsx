import React, { useEffect } from 'react'
import { Input, Modal, Form, message } from 'antd'
import { createRetailerRecord, updateRetailerRecord } from '@requests/retailer'

const AddRetailer = ({ addRetailerModalVisible, hideRetailerModal, editRetailerData, fetchRetailerList }) => {
	const [form] = Form.useForm()

	useEffect(() => {
		!!editRetailerData &&
			form.setFieldsValue({
				name: editRetailerData.name,
				address: editRetailerData.address,
				phone: editRetailerData.phone,
				email: editRetailerData.email,
			})
	})
	const editMode = !!editRetailerData ? true : false
	const addRetailer = () => {
		form.validateFields()
			.then(async values => {
				form.resetFields()
				console.log(values)
				if (!editMode) {
					createRetailerRecord(values)
						.then(() => {
							message.success('Retailer Added Successfully')
							fetchRetailerList()
						})
						.catch(e => {
							message.error('Unable to add retailer')
						})
				} else {
					const data = {
						...editRetailerData,
						...values,
					}
					console.log(data)
					updateRetailerRecord(data)
						.then(() => {
							message.success('Retailer Updated Successfully')
							fetchRetailerList()
						})
						.catch(e => {
							message.error('Unable to edit retailer')
						})
				}
			})
			.catch(info => {
				console.log('Validate Failed:', info)
			})
	}

	return (
		<Modal
			title={editMode ? 'Edit Retailer' : 'Add Retailer'}
			visible={addRetailerModalVisible}
			onCancel={hideRetailerModal}
			okText={editMode ? 'Update' : 'Add'}
			onOk={addRetailer}
			destroyOnClose={editMode ? true : false}
		>
			<Form layout='vertical' form={form} name='register' scrollToFirstError preserve={false}>
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
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default AddRetailer
