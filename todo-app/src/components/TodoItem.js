const TodoItem = ({ todo }) => {
  return (
    <li className={todo.done === "true" ? "checked" : ""}>
      {todo.title} <span className="close">x</span>
    </li>
  )
}

export default TodoItem