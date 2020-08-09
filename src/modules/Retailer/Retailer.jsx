import React, { useState, useEffect } from 'react'
import { PageHeader, Button, Table, Input, message } from 'antd'
import { UserAddOutlined, FileSyncOutlined } from '@ant-design/icons'
import { retailerColumns } from './tableColumns'
import { useCustomState } from '@components/useCustomState'
import AddRetailer from './AddRetailer'
import { getRetailerList, getTotalRetailers } from '@requests/retailer'

const { Search } = Input
const DEFAULT_PAGE_SIZE = 50

const initialState = {
	addRetailerModalVisible: 0,
	selectedRows: [],
	loading: false,
	retailerList: [],
	retailerData: undefined,
}

const Retailer = () => {
	const [state, setState] = useCustomState(initialState)
	const [page, setPage] = useState({
		pageSize: DEFAULT_PAGE_SIZE,
		pageNumber: 1,
	})

	useEffect(
		() => {
			fetchRetailerList(page)
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[page],
	)

	const fetchRetailerList = async (currentPage = page) => {
		setState({ loading: true })
		const { pageNumber, pageSize } = page
		console.log(currentPage)
		try {
			const list = await getRetailerList({ pageNumber, pageSize })
			const total = await getTotalRetailers()
			console.log(list, total)
			setState({
				retailerList: list,
				total,
			})
		} catch (e) {
			message.error(e)
		} finally {
			setState({ loading: false })
		}
	}

	const addRetailerModal = () => {
		setState({
			retailerData: undefined,
			addRetailerModalVisible: true,
		})
	}

	const hideRetailerModal = () => {
		setState({
			addRetailerModalVisible: false,
		})
	}

	const editRetailerModal = retailerData => {
		setState({
			retailerData,
			addRetailerModalVisible: true,
		})
	}

	return (
		<>
			<PageHeader
				backIcon={false}
				onBack={() => null}
				title='View Retailers'
				subTitle='Add or Edit a retailer here'
				extra={[
					<>
						<Button type='primary' shape='round' icon={<UserAddOutlined />} onClick={addRetailerModal}>
							Add Retailer
						</Button>
					</>,
				]}
			/>
			<div style={{ marginLeft: '1rem', paddingBottom: '2rem' }}>
				<Search placeholder='Search by Retailer' onSearch={value => console.log(value)} style={{ width: '20vw', marginRight: '2rem' }} />
				<Button
					type='primary'
					shape='round'
					style={{ marginRight: '2rem' }}
					onClick={() => {
						setPage({ pageNumber: 1, ...page })
					}}
				>
					<FileSyncOutlined /> Refresh Records
				</Button>
			</div>
			<Table
				rowKey='_id'
				columns={retailerColumns({ fetchRetailerList, editRetailerModal })}
				dataSource={state.retailerList}
				rowSelection={{
					type: 'checkbox',
					onChange: selectedRows => setState({ selectedRows }),
				}}
				pagination={{
					defaultPageSize: DEFAULT_PAGE_SIZE,
					pageSizeOptions: [20, 50, 100, 150, 200],
					showSizeChanger: true,
					total: state.total,
					onChange: pageNumber => setPage({ pageNumber, ...page }),
					onShowSizeChange: (_, pageSize) => {
						console.log(_, pageSize)
						setPage({ pageNumber: 1, pageSize })
						console.log(page)
					},
				}}
			/>
			<AddRetailer
				addRetailerModalVisible={state.addRetailerModalVisible}
				hideRetailerModal={hideRetailerModal}
				editRetailerData={state.retailerData}
				fetchRetailerList={fetchRetailerList}
			/>
		</>
	)
}

export default Retailer
