import React from "react";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      <h2>Hiya</h2>
      {todos
        .map((todo) => {
          const doneInfo = (
            <>
              <span>This todo is done</span>
              <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
              </span>
            </>
          );

          const notDoneInfo = (
            <>
              <span>This todo is not done</span>
              <span>
                <button onClick={onClickDelete(todo)}> Delete </button>
                <button onClick={onClickComplete(todo)}> Set as done </button>
              </span>
            </>
          );

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "70%",
                margin: "auto",
              }}
            >
              <span>{todo.text}</span>
              {todo.done ? doneInfo : notDoneInfo}
            </div>
          );
        })
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
      <h2>RIGHT URLS NEEDED</h2>
    </>
  );
};

export default TodoList;
