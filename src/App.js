import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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

const App = () => {
	const [route, setRoute] = useState()
	useEffect(() => {
		const [, r] = window.location.pathname.split('/')
		setRoute(r)
	}, [])

	return (
		<Layout className='layout'>
			<Header>
				<Logo />
				<Menu theme='dark' mode='horizontal' selectedKeys={[route]}>
					<Menu.Item key='home'>
						<Link onClick={() => setRoute('home')} to='/'>
							Home
						</Link>
					</Menu.Item>
					<Menu.Item key='inventory'>
						<Link onClick={() => setRoute('inventory')} to='/inventory'>
							Inventory
						</Link>
					</Menu.Item>

					<Menu.Item key='invoice'>
						<Link onClick={() => setRoute('invoice')} to='/invoice'>
							Invoices
						</Link>
					</Menu.Item>

					<Menu.Item key='retailers'>
						<Link onClick={() => setRoute('retailers')} to='/retailers'>
							Retailers
						</Link>
					</Menu.Item>
					<Menu.Item key='products'>
						<Link onClick={() => setRoute('products')} to='/products'>
							Products
						</Link>
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
	)
}

export default App
