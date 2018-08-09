import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { store } from './App';
import User from './User';
import UserForm from './UserForm';
import EditUser from './EditUser';
import UsersList from './UsersList';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
		        <Route path='/' component={App} />
		        <Route exact path='/' component={UsersList} />
		      	<Route path='/user' component={User} />
		      	<Route exact path='/add-user' component={UserForm} />
		      	<Route path='/edit-user' component={EditUser} />
	      	</div>
    	</Router>
      </Provider>
	, document.getElementById('root'));
registerServiceWorker();
