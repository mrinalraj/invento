import React from 'react'
import { Result, Button } from 'antd'
import { onPrint, openPreview } from './invoiceFileFunctions'

const InvoiceSuccess = ({ data }) => {
	return (
		<Result
			status='success'
			title='Successfully Created Invoice!'
			subTitle={`Invoice ID: ${data._id}, 
			Invoice Number: ${data.invoiceNo}.
			You can print the invoice below.`}
			extra={[
				<Button type='primary' key='print' onClick={() => onPrint(data)}>
					Print
				</Button>,
				<Button key='preview' onClick={() => openPreview(data)}>
					Preview
				</Button>,
			]}
		/>
	)
}

export default InvoiceSuccess
