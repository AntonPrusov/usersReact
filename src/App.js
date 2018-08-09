import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
 
function getUsersList() {
    axios.get("https://cors-anywhere.herokuapp.com/http://frontend-candidate.dev.sdh.com.ua/v1/contact/")
    .then(function (response) {
        const data = response.data;
        store.dispatch({type: 'INIT_LIST_OF_USERS', data:data})
    })
    .catch(function (error) {
        alert(error);
    });
}

getUsersList();

function usersListReducer(state, action) {
  if (action.type === 'INIT_LIST_OF_USERS'){
       return action.data
    }
  if (action.type === 'EDIT_USER') {
    axios.put(`https://cors-anywhere.herokuapp.com/http://frontend-candidate.dev.sdh.com.ua/v1/contact/${action.userId}/`, action.user)
    .catch(function (error) {
        alert(error);
    });
    const newUserList = state;
    newUserList.forEach(function(user) {
      if (user.id === action.userId) {
        newUserList[newUserList.indexOf(user)] = action.user;
      }      
    return newUserList;
    });
  }
  if (action.type === 'ADD_USER') {
    axios.post(`https://cors-anywhere.herokuapp.com/http://frontend-candidate.dev.sdh.com.ua/v1/contact/`, action.user)
    .catch(function (error) {
        alert(error);
    });/*
    .then(function (response) {
        store.dispatch({
            type: 'ADD_ADDED_USER',
            userId: action.user.id
        })
    })
    .catch(function (error) {
        alert(error);
    });;*/
    /*axios.get(`https://cors-anywhere.herokuapp.com/http://frontend-candidate.dev.sdh.com.ua/v1/contact/${action.user.id}/`)
    .then(function (response) {
        const data = response.data;
        const newUserList = state;
        newUserList.push(data)
        return newUserList;
    })
    .catch(function (error) {
        alert(error);
    });*/
    const newUserList = state;
    newUserList.push(action.user)
    return newUserList;
  }/*
  if (action.type === 'ADD_ADDED_USER') {
    axios.get(`https://cors-anywhere.herokuapp.com/http://frontend-candidate.dev.sdh.com.ua/v1/contact/${action.userId}/`)
    .then(function (response) {
        const data = response.data;
        const newUserList = state;
        newUserList.push(data)
        return newUserList;
    })
    .catch(function (error) {
        alert(error);
    })
  }*/
  if (action.type === 'DELETE_USER') {
    axios.delete(`https://cors-anywhere.herokuapp.com/http://frontend-candidate.dev.sdh.com.ua/v1/contact/${action.userId}/`)
    .catch(function (error) {
        alert(error);
    });
      const newUserList = [];
      state.forEach(function(user, index) {
        if (user.id !== action.userId) {
          newUserList.push(state[index]);
        }      
    });
      return newUserList;
  }
  return state || [];
}

function activeUserReducer(state, action) {
    if (action.type === 'CHOOSE_USER') {
        return action.user;
    }
    return state || null;
}

const reducers = combineReducers({
    users: usersListReducer,
    activeUser: activeUserReducer,
});

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  render() {
    return (      
        <div className="App container">    
            <div className="page-header">
              <h1>Список пользователей</h1>
            </div>          
        </div>            
    );
  }
}

export default App;
