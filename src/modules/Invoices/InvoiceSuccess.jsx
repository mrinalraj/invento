import React from 'react'
import { Result, Button } from 'antd'

const InvoiceSuccess = ({ data }) => {
	return (
		<Result
			status='success'
			title='Successfully Created Invoice!'
			subTitle={`Invoice ID: ${data._id}, Invoice Number: ${data.invoiceNo}. You can print the invoice below.`}
			extra={[
				<Button type='primary' key='print'>
					Print
				</Button>,
				<Button key='preview'>Preview</Button>,
			]}
		/>
	)
}

export default InvoiceSuccess
