import React, { useState, useEffect } from 'react'
import { PageHeader, Button, Table, message, Input } from 'antd'
import { PlusOutlined, FileSyncOutlined } from '@ant-design/icons'
import { useCustomState } from '@components/useCustomState'
import { invoiceColumns } from './invoiceColumns'
import { getInvoiceList, getTotalInvoices, searchInvoice } from '@requests/invoice'
import { getRetailerList } from '@requests/retailer'
import { openPreview, onPrint } from './invoiceFileFunctions'
import { CurrencyList } from '@utils/CurrencyList'
import moment from 'moment'
import { ownerDetails } from '@requests/meta'

const { Search } = Input

const DEFAULT_PAGE_SIZE = 500

const initialState = {
	openViewModal: false,
	loading: false,
	invoiceList: [],
	total: 0,
}

const Invoices = ({ history }) => {
	const [state, setState] = useCustomState(initialState)
	const [page, setPage] = useState({
		pageSize: DEFAULT_PAGE_SIZE,
		pageNumber: 1,
	})

	useEffect(
		() => {
			fetchInvoiceList(page)
		},
		//eslint-disable-next-line react-hooks/exhaustive-deps
		[page],
	)

	const fetchInvoiceList = async (currentPage = page) => {
		setState({ loading: true })
		const { pageNumber, pageSize } = page
		console.log(currentPage)
		try {
			const list = await getInvoiceList({ pageNumber, pageSize })
			const retailerList = await getRetailerList()
			const owner = await ownerDetails()

			const invoiceList = list.map(invoice => ({
				...invoice,
				currency: CurrencyList[window.currency].symbol_native,
				invoiceDate: moment(invoice.createdAt).format('DD/MM/YYYY'),
				owner: owner.value,
				retailerDetails: retailerList.find(r => r._id === invoice.retailer),
			}))

			const total = await getTotalInvoices()
			console.log(invoiceList, total)
			setState({ invoiceList, total })
		} catch (e) {
			console.log(e)
			message.error('Something went wrong')
		} finally {
			setState({ loading: false })
		}
	}

	const onSearch = async value => {
		setState({ loading: true })
		try {
			const list = await searchInvoice(value)
			const retailerList = await getRetailerList()
			const owner = await ownerDetails()

			const invoiceList = list.map(invoice => ({
				...invoice,
				currency: CurrencyList[window.currency].symbol_native,
				invoiceDate: moment(invoice.createdAt).format('DD/MM/YYYY'),
				owner: owner.value,
				retailerDetails: retailerList.find(r => r._id === invoice.retailer),
			}))

			console.log(list)
			setState({
				invoiceList,
				total: list.length,
			})
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
				title='Invoices'
				subTitle='View previously generated invoices here'
				extra={[
					<Button
						type='primary'
						shape='round'
						icon={<PlusOutlined />}
						onClick={() => {
							history.push('/invoice/new')
							// fillRandomData()
						}}
					>
						Create Invoice
					</Button>,
				]}
			/>
			<div style={{ marginLeft: '1rem', paddingBottom: '2rem' }}>
				<Search placeholder='Search by Retailer or Invoice No.' onSearch={onSearch} style={{ width: '20vw', marginRight: '2rem' }} />
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
				columns={invoiceColumns({ openPreview, onPrint })}
				dataSource={state.invoiceList}
				pagination={{
					defaultPageSize: DEFAULT_PAGE_SIZE,
					pageSizeOptions: [20, 50, 100, 150, 200],
					showSizeChanger: true,
					total: state.total,
					onChange: pageNumber => setPage({ pageNumber, ...page }),
					onShowSizeChange: (_, pageSize) => {
						setPage({ pageNumber: 1, pageSize })
					},
				}}
			/>
		</>
	)
}

export default Invoices
