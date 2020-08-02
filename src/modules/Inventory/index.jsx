import React, { useState, useEffect } from 'react'
import { PageHeader, Button, Table, message, Input } from 'antd'
import { PlusOutlined, EditFilled, DeleteFilled, FileSyncOutlined } from '@ant-design/icons'
import { inventoryColumns } from './inventoryColumns'
import { getInventoryList, deleteInventoryRecord, getTotal, searchInventory, deleteInventoryRecordList } from '@requests/inventory'
import CreateInventoryItem from './CreateInventoryItem'
import { useCustomState } from '@components/useCustomState'
const DEFAULT_PAGE_SIZE = 50

const initialState = {
	inventoryList: [],
	total: 0,
	loading: false,
	selectedRows: [],
	addItemVisible: false,
}

const Inventory = () => {
	const [state, setState] = useCustomState(initialState)
	const [page, setPage] = useState({
		pageSize: DEFAULT_PAGE_SIZE,
		pageNumber: 1,
	})

	useEffect(() => {
		fetchList(page)
	}, [page])

	const fetchList = async (currentPage = page) => {
		setState({ loading: true })
		const { pageNumber, pageSize } = page
		console.log(currentPage)
		try {
			const list = await getInventoryList({ pageNumber, pageSize })
			const total = await getTotal()
			setState({
				inventoryList: list,
				total,
			})
		} catch (e) {
			message.error(e)
		} finally {
			setState({ loading: false })
		}
	}

	const onDelete = async id => {
		try {
			const rows = await deleteInventoryRecord(id)
			if (rows && rows < 2) {
				message.success('Deleted Row')
			} else {
				message.warn(rows + ' deleted.')
			}
		} catch (e) {
			message.error(e)
		} finally {
			fetchList()
		}
	}

	const onSearch = async term => {
		setState({ loading: true })
		try {
			const list = await searchInventory(term)
			setState({
				inventoryList: list,
				total: list.length,
			})
		} catch (e) {
			message.error(e)
		} finally {
			setState({ loading: false })
		}
	}

	const deleteSelectedRows = async () => {
		const { selectedRows } = state
		try {
			const record = await deleteInventoryRecordList(selectedRows)
			if (record) {
				message.success(record + ' rows deleted.')
			} else {
				message.warn('Nothing deleted')
			}
			fetchList()
		} catch (e) {
			message.erorr('Something went wrong')
		}
	}

	// Add Item modal functions
	const setModalVisibility = value => setState({ addItemVisible: value })

	return (
		<>
			<PageHeader
				backIcon={false}
				title='Inventory'
				subTitle='View the full details fo your inventory.'
				extra={[
					<Button
						type='primary'
						shape='round'
						icon={<PlusOutlined />}
						onClick={() => {
							setState({ addItemVisible: true })
						}}
					>
						Add Items
					</Button>,
					<Button
						shape='round'
						icon={<EditFilled />}
						onClick={() => {
							setState({ addItemVisible: true })
						}}
					>
						Edit Items
					</Button>,
				]}
			/>

			<div style={{ marginLeft: '1rem', paddingBottom: '2rem' }}>
				<Input.Search placeholder='Input search text' style={{ width: '20vw', marginRight: '2rem' }} onSearch={onSearch} />
				<Button
					shape='round'
					style={{ marginRight: '2rem' }}
					onClick={() => {
						setPage({ pageNumber: 1, ...page })
					}}
				>
					<FileSyncOutlined /> Refresh Records
				</Button>
				{!!state.selectedRows?.length && (
					<>
						<Button type='primary' shape='round' style={{ marginRight: '2rem' }} onClick={deleteSelectedRows}>
							<DeleteFilled /> Delete Rows
						</Button>
					</>
				)}
			</div>
			<Table
				rowKey='_id'
				loading={state.loading}
				columns={inventoryColumns({ onDelete })}
				dataSource={state.inventoryList}
				rowSelection={{
					type: 'checkbox',
					onChange: selectedRows => setState({ selectedRows }),
				}}
				pagination={{
					defaultPageSize: DEFAULT_PAGE_SIZE,
					total: state.total,
				}}
				scroll={{ y: '60vh' }}
			/>
			<CreateInventoryItem visible={state.addItemVisible} closeModal={() => setModalVisibility(false)} />
		</>
	)
}

export default Inventory
