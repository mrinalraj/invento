import { Button, PageHeader, Select, Table, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React from 'react'
import { csvJSON } from '@utils/helpers'

const ImportData = () => {
	const [type, setType] = React.useState()
	const [data, setData] = React.useState([])
	const [column, setColumn] = React.useState([])

	const beforeUpload = file => {
		console.log(file)
		var reader = new FileReader()
		reader.onload = function (e) {
			const [columns, data] = csvJSON(reader.result)
			setColumn(columns.map(key => ({ title: key, dataIndex: key, key })))
			setData(data)
		}
		reader.readAsText(file)
		return false
	}

	const onRemove = () => {
		setData([])
		setColumn([])
	}

	return (
		<div>
			<PageHeader
				backIcon={false}
				title='Import'
				subTitle='Import CSV file for below types of dataset'
				extra={[
					<Button type='primary' shape='round' onClick={() => {}} disabled={!data.length}>
						Save data
					</Button>,
				]}
			/>
			<div style={{ padding: '2rem 1rem' }}>
				<Select style={{ width: 400 }} placeholder='Select type' onSelect={setType}>
					{['Products', 'Inventory'].map(option => (
						<Select.Option key={option} value={option}>
							{option}
						</Select.Option>
					))}
				</Select>

				{!!type && (
					<Upload
						accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
						beforeUpload={beforeUpload}
						onRemove={onRemove}
					>
						<Button icon={<UploadOutlined />}>Select CSV for {type}</Button>
					</Upload>
				)}
			</div>
			{!!data.length && (
				<>
					<h4>Preview</h4>
					<Table columns={column} dataSource={data} />
				</>
			)}
		</div>
	)
}

export default ImportData
