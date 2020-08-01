import React from 'react'

import { Route, Switch } from 'react-router-dom'

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact>
				<div>home</div>
			</Route>
			<Route path='/inventory' exact>
				<div>inventory</div>
			</Route>
			<Route path='/invoice' exact>
				<div>invoice</div>
			</Route>
			{/* <Route path='/retailers'></Route>
			<Route path='/products'></Route> */}
		</Switch>
	)
}

export default Routes
