import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from './App';

class User extends Component {
	constructor(props) {
		super(props);
		this.isActive = this.isActive.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}
  render() {
    return (
      <div className="User container">
          	<div className="panel panel-default">
				<div className="panel-heading">Пользователь {this.props.user.id}</div>
				<div className="panel-body">
			      <table className="table table-hover table-bordered">
			      	<thead>
			      		<tr>
				      		<th>Текущий пользователь</th>
					      	<th>{this.props.user.last_name} {this.props.user.first_name}</th>
			      		</tr>
			      	</thead>
			      	<tbody>
			          <tr>
				          <td>Имя:</td>
				          <td>{this.props.user.first_name}</td>
			          </tr>
			          <tr>
				          <td>Фамилия:</td>
				          <td>{this.props.user.last_name}</td>
			          </tr>
			          <tr>
				          <td>Дата рождения:</td>
				          <td>{this.props.user.birth_date}</td>
			          </tr>
			          <tr>
				          <td>Пол:</td>
				          <td>{this.props.user.gender}</td>
			          </tr>
			          <tr>
				          <td>Профессия:</td>
				          <td>{this.props.user.job}</td>
			          </tr>
			          <tr>
				          <td>Биография:</td>
				          <td>{this.props.user.biography}</td>
			          </tr>
			          <tr>
				          <td>Активный?</td>
				          <td>{this.isActive()}</td>
			          </tr>
			        </tbody>
			      </table>
			      <Link to='/'><button className="btn btn-danger pull-right" onClick={this.deleteUser}>Удалить</button></Link>
			      <Link to={`/edit-user/${this.props.user.id}`}><button id="edit" className="btn btn-warning pull-right">Редактировать</button></Link>
			      <Link to='/'><button className="btn btn-info pull-left">К списку</button></Link>
			    </div>
			</div>
      </div>
    );
  }
  isActive() {
	return (this.props.user.is_active === true) ? "Да" : "Нет";
  }
  deleteUser() {
	store.dispatch({
		type: 'DELETE_USER',
		userId: this.props.user.id
	});
  }
}

const mapStateToProps = function(store) {
  return {
    user: store.activeUser
  };
}

User = connect(mapStateToProps)(User);

export default User;
