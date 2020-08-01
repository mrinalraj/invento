import React from 'react'

import { Route, BrowserRouter, Switch } from 'react-router-dom'

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/'></Route>
				<Route path='/inventory'></Route>
				<Route path='/invoice'></Route>
				<Route path='/retailers'></Route>
				<Route path='/products'></Route>
			</Switch>
		</BrowserRouter>
	)
}

export default AppRoutes
