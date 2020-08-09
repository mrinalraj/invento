import React from 'react'
import { PageHeader, Form } from 'antd'

const CreateInvoice = ({ history }) => {
	const [form] = Form.useForm()
	return (
		<>
			<PageHeader onBack={history.goBack} title='Create new invoice' />
			<Form form={form} name='create-invoice'></Form>
		</>
	)
}

export default CreateInvoice
