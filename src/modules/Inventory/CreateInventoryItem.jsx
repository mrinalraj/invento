import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, message, Select, Spin, InputNumber } from 'antd'
import styled from 'styled-components'
import { getSKUMasterList, markSKUEntry } from '@requests/skuMaster'
import { createInventoryRecord, updateInventoryItem } from '@requests/inventory'

const FormGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	& .ant-form-item {
		flex: 1 0 45%;
		margin: 0.5rem 1rem;
	}
`

const CreateInventoryItem = ({ visible, closeModal, editing }) => {
	const [form] = Form.useForm()
	const [skuList, setSkuList] = useState([])
	const [loading, setLoading] = useState(false)

	const addInventoryItem = () => {
		form.validateFields().then(async values => {
			try {
				setLoading(true)
				const record = await createInventoryRecord(values)
				if (record) {
					await markSKUEntry(record.SKU)
					getSkuList()
					message.success('Item Added')
					form.resetFields()
				}
			} catch (e) {
				message.error('Could not add item.')
			} finally {
				setLoading(false)
			}
		})
	}

	const editInventoryItem = () => {
		form.validateFields().then(async values => {
			try {
				setLoading(true)
				const record = await updateInventoryItem(values)
				if (record) {
					message.success('Item Updated')
					closeModal()
				}
			} catch (e) {
				message.error('Could not add item.')
			} finally {
				setLoading(false)
			}
		})
	}

	const onClickSave = () => {
		if (editing) {
			editInventoryItem()
		} else {
			addInventoryItem()
		}
	}

	const getSkuList = () => {
		getSKUMasterList()
			.then(docs => {
				setSkuList(docs)
			})
			.catch(error => {
				console.log('error', error)
				message.error('Error getting SKU List')
			})
	}

	useEffect(() => {
		if (!editing) getSkuList()
		else form.setFieldsValue(editing)
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
				<Button type='primary' shape='round' key='save' onClick={onClickSave} disabled={loading}>
					{(!!editing && 'Update') || 'Save'}
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
							{(editing && <Input value={editing.SKU} disabled={true} />) || (
								<Select
									onSelect={value => {
										const name = skuList.find(sku => sku.key === value).name
										form.setFieldsValue({ name })
									}}
									showSearch
									placeholder='Search for SKU'
									optionFilterProp='children'
									filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
								>
									{skuList.map(sku => (
										<Select.Option key={sku.key} value={sku.key} disabled={sku.used}>
											{sku.key}
										</Select.Option>
									))}
								</Select>
							)}
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
							<InputNumber style={{ width: '100%' }} min={0} />
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
							<InputNumber style={{ width: '100%' }} min={0} />
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

export default CreateInventoryItem
