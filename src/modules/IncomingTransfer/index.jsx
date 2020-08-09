import React from 'react'
import { PageHeader, Button, Input, Table } from 'antd'
import { PlusOutlined, FileSyncOutlined, DeleteOutlined } from '@ant-design/icons'
import { useCustomState } from '@components/useCustomState'
const DEFAULT_PAGE_SIZE = 500

const initialState = {
	selectedRows: [],
	transferList: [],
	loading: false,
}

const IncomingTransfer = ({ history }) => {
	const [state, setState] = useCustomState(initialState)

	return (
		<>
			<PageHeader
				onBack={() => history.goBack()}
				title='Incoming Transfer'
				subTitle='List of all incoming goods'
				extra={[
					<Button type='primary' shape='round' icon={<PlusOutlined />} onClick={() => history.push('/incoming-trnasfer/create')}>
						Create new transfer
					</Button>,
				]}
			/>
			<div style={{ marginLeft: '1rem', paddingBottom: '2rem' }}>
				<Input.Search placeholder='Input search text' style={{ width: '20vw', marginRight: '2rem' }} onSearch={false} />
				<Button
					shape='round'
					style={{ marginRight: '1rem' }}
					// onClick={() => {
					// 	setPage({ pageNumber: 1, ...page })
					// }}
				>
					<FileSyncOutlined /> Refresh Records
				</Button>
				{!!state.selectedRows?.length && (
					<>
						<Button shape='round' style={{ marginRight: '1rem' }}>
							<DeleteOutlined /> Delete Rows
						</Button>
					</>
				)}
			</div>
			<Table
				rowKey='_id'
				loading={state.loading}
				// columns={inventoryColumns({ onDelete, onEditClicked })}
				dataSource={state.transferList}
				rowSelection={{
					type: 'checkbox',
					onChange: (_, selectedRows) => setState({ selectedRows }),
				}}
				pagination={{
					defaultPageSize: DEFAULT_PAGE_SIZE,
				}}
				scroll={{ y: '60vh' }}
			/>
		</>
	)
}

export default IncomingTransfer
