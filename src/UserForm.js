import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import { connect } from 'react-redux';

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.addUser = this.addUser.bind(this);
		this.validator = this.validator.bind(this);
		this.state = {valid: true};
	}
	validator() {
        return this.first_name.value && this.last_name.value && this.birth_date.value && this.job.value && this.biography.value;
    }
  render() {
    return (
      <div className="UserForm container">
        <div className="panel panel-default">
			<div className="panel-heading">Добавление нового польователя</div>
			<div className="panel-body">
				<form className="form-horizontal">
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="first_name">Имя:</label>
				    <div className="col-sm-10">
				      <input type="text" className="form-control" id="first_name" placeholder="Введите имя польователя" maxLength="256" ref={ c => this.first_name = c} required />
				    </div>
				  </div>
				 <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="last_name">Фамилия:</label>
				    <div className="col-sm-10">
				      <input type="text" className="form-control" id="last_name" placeholder="Введите фамилию польователя" maxLength="256" ref={ c => this.last_name = c} required />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="birth_date">Дата рождения:</label>
				    <div className="col-sm-10">
				      <input type="date" className="form-control" id="birth_date" ref={ c => this.birth_date = c} required />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="gender">Пол:</label>
				    <div className="col-sm-10">
				      <select className="form-control" id="gender" ref={ c => this.gender = c}>
				      	<option>male</option>
				      	<option>female</option>
				      </select>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="job">Профессия:</label>
				    <div className="col-sm-10">
				      <input type="text" className="form-control" id="job" maxLength="256" placeholder="Введите профессию польователя" ref={ c => this.job = c} required />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="biography" placeholder="Укажите профессию пользовател">Биография:</label>
				    <div className="col-sm-10">
				      <textarea className="form-control" id="biography" placeholder="Напишите о пользователе" maxLength="1024" ref={ c => this.biography = c} required />
				    </div>
				  </div>
				  <div className="form-group"> 
				    <div className="col-sm-offset-2 col-sm-10">
				      <div className="checkbox">
				        <label><input type="checkbox" id="is_active" ref={ c => this.is_active = c}/>Активный?</label>
				      </div>
				    </div>
				  </div>
				  <div className="form-group"> 
				    <div className="col-sm-offset-2 col-sm-10">
				      <Link to='/'><button className="btn btn-info pull-left">К списку</button></Link>
				      <button type="submit" className="btn btn-success pull-right" onClick={this.addUser}>Добавить</button>
				    </div>
				  </div>
				</form>
			</div>
		</div>
      </div>
    );
  }
  addUser(e) {
  	let valid = this.validator();
    this.setState({valid});
    if (valid) {
		store.dispatch({
		  	type: 'ADD_USER',
		  	user: {
		  		"id": (this.props.users[this.props.users.length -1].id) + 1,
				"first_name": this.first_name.value,
				"last_name": this.last_name.value,
				"birth_date": this.birth_date.value,
				"gender": this.gender.value,
				"job": this.job.value,
				"biography": this.biography.value,
				"is_active": (this.is_active.checked) ? true : false
		  	},
		});
		this.first_name.value = '';
		this.last_name.value = '';
		this.birth_date.value = '';
		this.gender.value = 'male'
		this.job.value = '';
		this.biography.value = '';
		this.is_active.checked = false;
	}
  }
}

const mapStateToProps = function(store) {
  return {
    users: store.users
  };
}

UserForm = connect(mapStateToProps)(UserForm);

export default UserForm;
