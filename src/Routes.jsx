import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Retailer from '@modules/Retailer/Retailer'
import Inventory from '@modules/Inventory'
import IncomingTransfer from '@modules/IncomingTransfer'
import CreateTransfer from '@modules/IncomingTransfer/CreateTransfer'
import Invoices from '@modules/Invoices'
import CreateInvoice from '@modules/Invoices/CreateInvoice'
import ProductsList from '@modules/Products/index'
import ImportData from '@modules/Import/index'

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact>
				<Redirect to='/inventory' />
			</Route>
			<Route path='/inventory' component={Inventory} exact />
			<Route path='/incoming-trnasfer' component={IncomingTransfer} exact />
			<Route path='/incoming-trnasfer/create' component={CreateTransfer} exact />

			<Route path='/retailers' exact component={Retailer} />

			<Route path='/invoice' exact component={Invoices} />
			<Route path='/invoice/new' exact component={CreateInvoice} />

			<Route path='/products' exact component={ProductsList} />

			<Route path='/import' exact component={ImportData} />
		</Switch>
	)
}

export default Routes
