import React from 'react';

export const ListTodo = ({
  todos,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.map(todo =>
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.desc}</td>
              <td><button onClick={onEdit.bind(null, todo.id)}>Edit</button></td>
              <td><button onClick={onDelete.bind(null, todo.id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
