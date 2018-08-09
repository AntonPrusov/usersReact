import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from './App';

class EditUser extends Component {
	constructor(props) {
		super(props);
		this.editUser = this.editUser.bind(this);
		this.validator = this.validator.bind(this);
		this.state = {valid: true};
	}
	validator() {
        return this.first_name.value && this.last_name.value && this.birth_date.value && this.job.value && this.biography.value;
    }
  render() {
  	let style = {
            border: this.state.valid ? '' : '1px solid red'
        }
    return (
      <div className="EditUser container">
      	<div className="panel panel-default">
			<div className="panel-heading">Редактирование польователя {this.props.user.id}</div>
			<div className="panel-body">
				<form className="form-horizontal">
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="first_name">Имя:</label>
				    <div className="col-sm-10">
				      <input style={style} type="text" className="form-control" id="first_name" defaultValue={this.props.user.first_name} maxLength="256" ref={ c => this.first_name = c} required />
				    </div>
				  </div>
				 <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="last_name">Фамилия:</label>
				    <div className="col-sm-10">
				      <input style={style} type="text" className="form-control" id="last_name" defaultValue={this.props.user.last_name} maxLength="256" ref={ c => this.last_name = c} required />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="birth_date">Дата рождения:</label>
				    <div className="col-sm-10">
				      <input style={style} type="date" className="form-control" id="birth_date" defaultValue={this.props.user.birth_date} ref={ c => this.birth_date = c} required />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="gender">Пол:</label>
				    <div className="col-sm-10">
				      <select className="form-control" id="gender" defaultValue={this.props.user.gender} ref={ c => this.gender = c}>
				      	<option>male</option>
				      	<option>female</option>
				      </select>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="job">Профессия:</label>
				    <div className="col-sm-10">
				      <input style={style} type="text" className="form-control" id="job" defaultValue={this.props.user.job} maxLength="256" ref={ c => this.job = c} required />
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="control-label col-sm-2" htmlFor="biography">Биография:</label>
				    <div className="col-sm-10">
				      <textarea style={style} className="form-control" id="biography" defaultValue={this.props.user.biography} maxLength="1024" ref={ c => this.biography = c} required />
				    </div>
				  </div>
				  <div className="form-group"> 
				    <div className="col-sm-offset-2 col-sm-10">
				      <div className="checkbox">
				        <label><input type="checkbox" id="is_active" defaultChecked={this.props.user.is_active}  ref={ c => this.is_active = c}/>Активный?</label>
				      </div>
				    </div>
				  </div>
				  <div className="form-group"> 
				    <div className="col-sm-offset-2 col-sm-10">
				      <Link to='/'><button className="btn btn-info pull-left">К списку</button></Link>
				      <button type="submit" className="btn btn-success pull-right" onClick={this.editUser}>Сохранить</button>
				    </div>
				  </div>
				</form>
			</div>
		</div>
      </div>
    );
  }
  editUser(e) {
  	e.preventDefault();
  	let valid = this.validator();
    this.setState({valid});
    if (valid) {
    	store.dispatch({
  			type: 'EDIT_USER',
  			user: {
  				"id": this.props.user.id,
		        "first_name": this.first_name.value,
		        "last_name": this.last_name.value,
		        "birth_date": this.birth_date.value,
		        "gender": this.gender.value,
		        "job": this.job.value,
		        "biography": this.biography.value,
		        "is_active": (this.is_active.checked) ? true : false
  			},
  			userId: this.props.user.id
  		});
    }  	
  }
}

const mapStateToProps = function(store) {
  return {
    user: store.activeUser
  };
}

EditUser = connect(mapStateToProps)(EditUser);

export default EditUser;
