import React from 'react'
import { PageHeader, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomState } from '@components/useCustomState'

const initialState = {}

const Invoices = ({ history }) => {
	const [state, setState] = useCustomState(initialState)
	return (
		<>
			<PageHeader
				backIcon={false}
				title='Inventory'
				subTitle='View previously generated invoices here'
				extra={[
					<Button
						type='primary'
						shape='round'
						icon={<PlusOutlined />}
						onClick={() => {
							history.push('/invoice/new')
						}}
					>
						Create Invoice
					</Button>,
				]}
			/>
		</>
	)
}

export default Invoices
