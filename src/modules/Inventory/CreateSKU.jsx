import React from 'react'
import { Modal, Button, Form, Input, message } from 'antd'
import { createNewSKU } from '@requests/skuMaster'

const CreateSKU = ({ visible, closeModal }) => {
	const [form] = Form.useForm()

	const createSKUEntry = () => {
		form.validateFields()
			.then(async values => {
				try {
					const record = await createNewSKU(values)
					if (record) {
						form.resetFields()
						message.success(`${record.key} created.`)
					}
				} catch (e) {
					message.error('Something wwent wrong')
					console.log(e)
				}
			})
			.catch(info => {
				console.log('Validate Failed:', info)
			})
	}

	return (
		<Modal
			title='Add New Item to Inventory'
			maskClosable={false}
			visible={visible}
			onCancel={closeModal}
			destroyOnClose={true}
			footer={[
				<Button type='primary' shape='round' key='save' onClick={createSKUEntry}>
					Save
				</Button>,
				<Button key='close' shape='round' onClick={closeModal}>
					Close
				</Button>,
			]}
		>
			<Form layout='vertical' form={form} name='create-sku-master' scrollToFirstError>
				<Form.Item
					name='key'
					label='SKU'
					rules={[
						{
							required: true,
							message: `Please enter SKU`,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='name'
					label='Name'
					rules={[
						{
							required: true,
							message: `Please enter SKU`,
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default CreateSKU
