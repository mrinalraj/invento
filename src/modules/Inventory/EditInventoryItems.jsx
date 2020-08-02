import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Select, Spin } from 'antd'
import styled from 'styled-components'
import { updateInventoryItem, getInventoryList } from '@requests/inventory'

const FormGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	& .ant-form-item {
		flex: 1 0 45%;
		margin: 0.5rem 1rem;
	}
`

const EditInventoryItems = ({ visible, closeModal }) => {
	const [form] = Form.useForm()
	const [ineventoryList, setInventoryList] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchInventoryList = () => {
		setLoading(true)
		getInventoryList()
			.then(docs => {
				setInventoryList(docs)
			})
			.catch(error => {
				console.log('error', error)
				message.error('Error getting List')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const editInventoryItem = () => {
		form.validateFields().then(async values => {
			try {
				setLoading(true)
				const record = await updateInventoryItem(values)
				if (record) {
					message.success('Document updated')
					form.resetFields()
				}
			} catch (e) {
				message.error('Could not update.')
			} finally {
				setLoading(false)
			}
		})
	}

	const onSelect = value => {
		const record = ineventoryList.find(item => item.SKU === value)
		form.setFieldsValue(record)
	}

	useEffect(() => {
		fetchInventoryList()
	}, [])

	return (
		<Modal
			title='Add New Item to Inventory'
			maskClosable={false}
			visible={visible}
			onCancel={closeModal}
			width={900}
			destroyOnClose={true}
			footer={[
				<Button type='primary' shape='round' key='save' onClick={editInventoryItem}>
					Save
				</Button>,
				<Button key='close' shape='round' onClick={closeModal}>
					Close
				</Button>,
			]}
		>
			<Spin spinning={loading}>
				<Form layout='vertical' form={form} name='create-inventory-record' scrollToFirstError>
					<FormGrid>
						<Form.Item
							name='SKU'
							label='SKU'
							rules={[
								{
									required: true,
									message: `Please enter SKU`,
								},
							]}
						>
							<Select
								onSelect={onSelect}
								showSearch
								placeholder='Search for SKU'
								optionFilterProp='children'
								filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								{ineventoryList.map(record => (
									<Select.Option key={record.SKU} value={record.SKU}>
										{record.SKU}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name='name'
							label='Name'
							rules={[
								{
									required: true,
									message: `Please input product name`,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name='quantity'
							label='Quantity'
							rules={[
								{
									required: true,
									message: `Please input quantity`,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name='pricePerUnit'
							label='Price per unit'
							rules={[
								{
									required: true,
									message: `Please input price`,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item name='description' label='Additional Description'>
							<Input />
						</Form.Item>
					</FormGrid>
				</Form>
			</Spin>
		</Modal>
	)
}

export default EditInventoryItems
