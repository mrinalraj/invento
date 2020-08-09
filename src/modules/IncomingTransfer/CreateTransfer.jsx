import React from 'react'
import { PageHeader } from 'antd'

const CreateTransfer = ({ history }) => {
	return (
		<>
			<PageHeader onBack={history.goBack} title='Create incoming transfer' />
		</>
	)
}

export default CreateTransfer
