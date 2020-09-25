import React from 'react'
import { PageHeader, Table, message, Button, Input } from 'antd'
import { IdcardOutlined, FileSyncOutlined } from '@ant-design/icons'
import { useCustomState } from '@components/useCustomState'
import CreateSKU from '@modules/Inventory/CreateSKU'
import { productColumns } from './productColumns'
import { deleteSKU, getSKUMasterList, searchSKU } from '@requests/skuMaster'

const DEFAULT_PAGE_SIZE = 500
const initialState = {
	list: [],
	total: 0,
	loading: false,
	selectedRows: [],
	addSKUVisible: false,
}

const ProductsList = () => {
	const [state, setState] = useCustomState(initialState)

	React.useEffect(() => {
		fetchList()
	}, [])

	const fetchList = async () => {
		setState({ loading: true })
		try {
			const list = await getSKUMasterList()
			const total = list?.length || 0
			setState({ list, total })
			console.log(list)
		} catch (e) {
			message.error(e)
		} finally {
			setState({ loading: false })
		}
	}

	const onDelete = async (id, key) => {
		try {
			const rows = await deleteSKU(key)
			if (rows && rows < 2) {
				message.success('Deleted Row')
			}
		} catch (e) {
			message.error('Error')
		} finally {
			fetchList()
		}
	}

	const onSearch = async term => {
		setState({ loading: true })
		try {
			const list = await searchSKU(term)
			setState({ list, total: list.length })
		} catch (e) {
			message.error(e)
		} finally {
			setState({ loading: false })
		}
	}

	return (
		<>
			<PageHeader
				backIcon={false}
				title='Products'
				subTitle='View the list of products here.'
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
				]}
			/>

			<div style={{ marginLeft: '1rem', paddingBottom: '2rem' }}>
				<Input.Search placeholder='Input search text' style={{ width: '20vw', marginRight: '2rem' }} onSearch={onSearch} />

				<Button shape='round' style={{ marginRight: '1rem' }} onClick={fetchList}>
					<FileSyncOutlined /> Refresh Records
				</Button>
			</div>
			<Table
				rowKey='_id'
				loading={state.loading}
				columns={productColumns({ onDelete })}
				dataSource={state.list}
				pagination={{
					defaultPageSize: DEFAULT_PAGE_SIZE,
					total: state.total,
				}}
				scroll={{ y: '60vh' }}
			/>
			<CreateSKU
				visible={state.addSKUVisible}
				closeModal={() => {
					setState({ addSKUVisible: false })
					fetchList()
				}}
			/>
		</>
	)
}

export default ProductsList
