import axios from 'axios';
import { url } from '../../url';
import history from '../../history'

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const LOAD_TODO = 'LOAD_TODO'

export const loadTodo = (todos) => ({
  type: LOAD_TODO,
  todos,
});

export const addTodo = (data) => ({
  type: ADD_TODO,
  data
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});

export const updateTodo = (id, textToSet) => ({
  type: UPDATE_TODO,
  id,
  textToSet,
});

export const getTodo = () => {
  return dispatch => {
    return fetch(`${url}/todos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('webtoken')}`,
      }
    }).then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(loadTodo(json.todos));
        } else if (json.status === 203) {
          alert('Your token is invalid.');
          history.push('/');
          window.location.reload();
        } else {
          alert('You are unauthorized user.');
          history.push('/');
          window.location.reload();
        }
      }).catch((err) => {
        console.log(err);
      })
  }
};

export const saveTodo = (textToAdd) => {
  return dispatch => {
    axios({
      method: 'POST',
      url: `${url}/todos`,
      data: {
        desc: textToAdd,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('webtoken')}`,
      }
    }).then(response => {
      if (response.data.success) {
        dispatch(addTodo(response.data.todo));
      } else if (response.data.status === 203) {
        alert('Your token is invalid.');
        history.push('/');
        window.location.reload();
      } else {
        alert('You are unauthorized user.');
        history.push('/');
        window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const removeTodo = (id) => {
  return dispatch => {
    axios({
      method: 'DELETE',
      url: `${url}/todos/${id}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('webtoken')}`,
      }
    }).then((response) => {
      if (response.data.success) {
        dispatch(deleteTodo(id));
      } else if (response.data.status === 203) {
        alert('Your token is invalid.');
        history.push('/');
        window.location.reload();
      } else {
        alert('You are unauthorized user.');
        history.push('/');
        window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const editTodo = (id, textToSet) => {
  return dispatch => {
    axios({
      method: 'PUT',
      url: `${url}/todos/${id}`,
      data: {
        desc: textToSet,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('webtoken')}`,
      }
    }).then((response) => {
      if (response.data.success) {
        dispatch(updateTodo(id, textToSet));
      } else if (response.data.status === 203) {
        alert('Your token is invalid.');
        history.push('/');
        window.location.reload();
      } else {
        alert('You are unauthorized user.');
        history.push('/');
        window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}
