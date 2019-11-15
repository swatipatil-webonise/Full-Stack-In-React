import { ADD_TODO, LOAD_TODO, UPDATE_TODO, DELETE_TODO } from './../actions/todo';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_TODO:
      return action.todos;

    case ADD_TODO:
      return [
        ...state, action.data
      ];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case UPDATE_TODO:
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.desc = action.textToSet;
        }
        return todo;
      })

    default:
      return state;
  }
};

export default todoReducer;
