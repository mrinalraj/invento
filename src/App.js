import React from 'react'

import { Layout, Menu, Breadcrumb } from 'antd'
import styled from 'styled-components'

const { Header, Content, Footer } = Layout
const SiteLayoutContent = styled.div`
	background: #fff;
	padding: 24px;
	min-height: 80vh;
	margin-top: 2rem;
`
const Logo = styled.div`
	width: 120px;
	height: 31px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px 24px 16px 0;
	float: left;
`

function App() {
	return (
		<div className='App'>
			<Layout className='layout'>
				<Header>
					<Logo />
					<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
						<Menu.Item key='1'>Inventory</Menu.Item>
						<Menu.Item key='2'>Invoices</Menu.Item>
						<Menu.Item key='3'>Retails</Menu.Item>
						<Menu.Item key='3'>Products</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<SiteLayoutContent>Content</SiteLayoutContent>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</div>
	)
}

export default App
