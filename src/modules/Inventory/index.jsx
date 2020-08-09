import React, { useState, useEffect } from 'react'
import { PageHeader, Button, Table, message, Input } from 'antd'
import { PlusOutlined, EditFilled, DeleteOutlined, FileSyncOutlined, FolderAddFilled, IdcardOutlined } from '@ant-design/icons'
import { inventoryColumns } from './inventoryColumns'
import { getInventoryList, deleteInventoryRecord, getTotal, searchInventory, deleteInventoryRecordList } from '@requests/inventory'
import CreateInventoryItem from './CreateInventoryItem'
import { useCustomState } from '@components/useCustomState'
import CreateSKU from './CreateSKU'
import { markSKUDelink, delinkSKUList } from '@requests/skuMaster'
import EditInventoryItems from './EditInventoryItems'
const DEFAULT_PAGE_SIZE = 500

const initialState = {
	inventoryList: [],
	total: 0,
	loading: false,
	selectedRows: [],
	addItemVisible: false,
	multiEditOpen: false,
	addSKUVisible: false,
	editingRow: false,
}

const Inventory = props => {
	const [state, setState] = useCustomState(initialState)
	const [page, setPage] = useState({
		pageSize: DEFAULT_PAGE_SIZE,
		pageNumber: 1,
	})

	useEffect(() => {
		fetchList(page)
	}, [page])

	console.log(props)

	const fetchList = async (currentPage = page) => {
		setState({ loading: true })
		const { pageNumber, pageSize } = page
		try {
			const list = await getInventoryList({ pageNumber, pageSize })
			const total = await getTotal()
			setState({
				inventoryList: list,
				total,
			})
			console.log(list)
		} catch (e) {
			message.error(e)
		} finally {
			setState({ loading: false })
		}
	}

	const onDelete = async (id, sku) => {
		try {
			const rows = await deleteInventoryRecord(id)
			if (rows && rows < 2) {
				message.success('Deleted Row')
				await markSKUDelink(sku)
			}
		} catch (e) {
			message.error(e)
		} finally {
			fetchList()
		}
	}

	const onEditClicked = record => {
		setState({ editingRow: record, addItemVisible: true })
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
		const rows = selectedRows.map(row => row._id)
		const skuList = selectedRows.map(row => row.SKU)
		try {
			const record = await deleteInventoryRecordList(rows)
			if (record) {
				message.success(record + ' rows deleted.')
				await delinkSKUList(skuList)
					.then(records => console.log('delinnked ids', records))
					.catch(console.error)
			} else {
				message.warn('Nothing deleted')
			}
			fetchList()
		} catch (e) {
			message.erorr('Something went wrong')
		}
	}

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
						icon={<IdcardOutlined />}
						onClick={() => {
							setState({ addSKUVisible: true })
						}}
					>
						Add New SKU
					</Button>,
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
							setState({ multiEditOpen: true })
						}}
					>
						Edit Items
					</Button>,
				]}
			/>

			<div style={{ marginLeft: '1rem', paddingBottom: '2rem' }}>
				<Input.Search placeholder='Input search text' style={{ width: '20vw', marginRight: '2rem' }} onSearch={onSearch} />
				<Button type='primary' shape='round' style={{ marginRight: '1rem' }} onClick={() => props.history.push('/incoming-trnasfer')}>
					<FolderAddFilled /> Incoming Transfer
				</Button>
				<Button
					shape='round'
					style={{ marginRight: '1rem' }}
					onClick={() => {
						setPage({ pageNumber: 1, ...page })
					}}
				>
					<FileSyncOutlined /> Refresh Records
				</Button>
				{!!state.selectedRows?.length && (
					<>
						<Button shape='round' style={{ marginRight: '1rem' }} onClick={deleteSelectedRows}>
							<DeleteOutlined /> Delete Rows
						</Button>
					</>
				)}
			</div>
			<Table
				rowKey='_id'
				loading={state.loading}
				columns={inventoryColumns({ onDelete, onEditClicked })}
				dataSource={state.inventoryList}
				rowSelection={{
					type: 'checkbox',
					onChange: (_, selectedRows) => setState({ selectedRows }),
				}}
				pagination={{
					defaultPageSize: DEFAULT_PAGE_SIZE,
					total: state.total,
				}}
				scroll={{ y: '60vh' }}
			/>
			{state.addItemVisible && (
				<CreateInventoryItem
					visible={state.addItemVisible}
					closeModal={() => {
						setState({ addItemVisible: false, editingRow: false })
						setPage({ pageNumber: 1, ...page })
					}}
					destroyOnClose={true}
					editing={state.editingRow}
				/>
			)}
			{state.multiEditOpen && (
				<EditInventoryItems
					visible={state.multiEditOpen}
					closeModal={() => {
						setState({ multiEditOpen: false })
						setPage({ pageNumber: 1, ...page })
					}}
				/>
			)}
			<CreateSKU
				visible={state.addSKUVisible}
				closeModal={() => {
					setState({ addSKUVisible: false })
				}}
			/>
		</>
	)
}

export default Inventory
