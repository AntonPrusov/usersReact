import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { store } from './App';

class UserTr extends Component {
	constructor(props) {
		super(props);
		this.setActiveUser = this.setActiveUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}
	render() {
		return (
				<tr key={this.props.user.id} onClick={this.setActiveUser}>
					<td> <Link to={`/user/${this.props.user.id}`}> {this.props.user.last_name} {this.props.user.first_name} </Link> </td>
					<td> {this.props.user.birth_date} </td>
					<td> {this.props.user.gender} </td>
					<td> <button className="btn btn-danger btn-xs center-block" onClick={this.deleteUser}><i className="glyphicon glyphicon-trash"></i></button> </td>
				</tr>
			)
	}	
	deleteUser() {
		store.dispatch({
		type: 'DELETE_USER',
		userId: this.props.user.id
		});
	}
	setActiveUser() {
		store.dispatch ({
	  		type: 'CHOOSE_USER',
	  		user: this.props.user
	  	});
	}
}

class UsersList extends Component {
  render() {
    return (
    	<div className="usersList container">
	      	<div className="panel panel-default">
				<div className="panel-heading">Все пользователи</div>
				<div className="panel-body">
			      <table className="table table-hover table-bordered">
			      	<thead>
			      		<tr>
				      		<th>ФИО</th>
				      		<th>Дата рождения</th>
				      		<th>Пол</th>
				      		<th>Удалить</th>
			      		</tr>
			      	</thead>
			      	<tbody>
			          { this.props.users.map( (user, index) => < UserTr key={index} user={user} /> ) }
			        </tbody>
			      </table>
			      <Link to='/add-user'><button className="btn btn-success pull-right">Добавить нового пользователя</button></Link>
			    </div>
			</div>
		</div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    users: store.users
  };
}

UsersList = connect(mapStateToProps)(UsersList);

export default UsersList;
