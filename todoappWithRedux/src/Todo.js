import React from 'react';
import { Link } from 'react-router-dom'
import { AddTodo } from './AddTodo';
import { ListTodo } from './ListTodo';
import { connect } from 'react-redux';
import { saveTodo, removeTodo, editTodo, getTodo } from './store/actions/todo';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      isUpdate: false,
      buttonValue: 'Add',
      updateId: -1,
    };
  }

  componentDidMount() {
    this.props.getTodo();
  }

  onUserType = event => {
    let value = event.target.value;
    this.setState({
      description: value,
    });
  };

  onAddTodo = () => {
    if (this.state.description === '') {
      alert('Please fill the feilds .');
      return;
    }
    if (this.state.isUpdate) {
      this.props.editTodo(this.state.updateId, this.state.description);
      this.setState({
        description: '',
        isUpdate: false,
        buttonValue: 'Add',
        updateId: -1,
      })
    } else {
      this.props.saveTodo(this.state.description);
      this.setState({
        description: '',
      })
    }
  }

  onDelete = (id) => {
    this.props.removeTodo(id);
  }

  onEdit = (id) => {
    let value = this.props.todoData[id - 1].desc;
    this.setState({
      updateId: id,
      description: value,
      isUpdate: true,
      buttonValue: 'Update',
    });
  }

  onLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  render() {
    return (
      <div>
        <center><br></br>
          <h1>Welcome to our todo app...</h1><br></br>
          <AddTodo buttonValue={this.state.buttonValue} description={this.state.description} onUserType={this.onUserType} onAddTodo={this.onAddTodo}/><br></br><br></br>
          <ListTodo todos={this.props.todoData} onDelete={this.onDelete} onEdit={this.onEdit}  onLogout={this.onLogout}/>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoData: state.todos,
});

const mapDispatchToProps = {
  getTodo,
  saveTodo,
  removeTodo,
  editTodo,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo); 
