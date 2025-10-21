const TodoItem = ({ todo, setRefresh }) => {

  const updateTodo = () => {
    const updatedTodo = { ...todo, done: !todo.done }

    fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTodo)
    }).then((response) => {
      if (response.ok) {
        console.log('Tugas berhasil diperbarui')
        setRefresh(true)
      } else {
        console.error('Gagal memperbarui tugas')
      }
    }).catch((error) => {
      console.error('Kesalahan saat memperbarui tugas:', error)
    })
  }

  const deleteTodo = (e) => {
    e.stopPropagation()
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: "DELETE"
      }).then((response) => {
        if (response.ok) {
          console.log('Tugas berhasil dihapus')
          setRefresh(true)
        } else {
          console.error('Gagal menghapus tugas')
        }
      }).catch((error) => {
        console.error('Kesalahan saat menghapus tugas:', error)
      })
    }
  }

  return (
    <li className={`${todo.done ? "checked" : ""}`}>
      <div className="todo-text" onClick={updateTodo}>
        {todo.title}
      </div>
      <button 
        className="close" 
        onClick={deleteTodo}
        title="Hapus tugas"
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;