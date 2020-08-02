import React from 'react'
import { Modal, Button } from 'antd'

const CreateInventoryItem = ({ visible, closeModal }) => {
	return (
		<Modal
			title='Add New Item to Inventory'
			maskClosable={false}
			visible={visible}
			onCancel={closeModal}
			width={900}
			destroyOnClose={true}
			footer={[
				<Button key='close' onClick={closeModal}>
					Close
				</Button>,
			]}
		></Modal>
	)
}

export default CreateInventoryItem
