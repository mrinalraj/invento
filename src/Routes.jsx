import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Retailer from './modules/Retailer/Retailer'
import Inventory from './modules/Inventory'

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact>
				<div>home</div>
			</Route>
			<Route path='/inventory' exact>
				<Inventory />
			</Route>
			<Route path='/invoice' exact>
				<div>invoice</div>
			</Route>
			<Route path='/retailers' exact component={Retailer}></Route>
			<Route path='/products'></Route>
		</Switch>
	)
}

export default Routes
