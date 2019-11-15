import React from 'react';

export const AddTodo = ({
  buttonValue,
  description,
  onUserType,
  onAddTodo,
}) => {
  return (
    <div>
      <input type="text" name="desc" value={description} onChange={onUserType} />
      <input type="button" value={buttonValue} onClick={onAddTodo} />
    </div>
  );
}
