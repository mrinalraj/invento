import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

const { Header, Content, Footer } = Layout
const SiteLayoutContent = styled.div`
	background: #fff;
	padding: 24px;
	min-height: 80vh;
	margin-top: 4rem;
`
const Logo = styled.div`
	width: 120px;
	height: 31px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px 24px 16px 0;
	float: left;
`

function App(props) {
	return (
		<BrowserRouter>
			<Layout className='layout' style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
				<Header>
					<Logo />
					<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['0']}>
						<Menu.Item key='0'>
							<Link to='/'>Home</Link>
						</Menu.Item>
						<Menu.Item key='1'>
							<Link to='/inventory'>Inventory</Link>
						</Menu.Item>

						<Menu.Item key='2'>
							<Link to='/invoice'>Invoices</Link>
						</Menu.Item>

						<Menu.Item key='3'>
							<Link to='/retailers'>Retailers</Link>
						</Menu.Item>
						<Menu.Item key='4'>
							<Link to='/products'>Products</Link>
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<SiteLayoutContent>
						<Routes />
					</SiteLayoutContent>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Invento ©2018 Created by Ant UED</Footer>
			</Layout>
		</BrowserRouter>
	)
}

export default App
