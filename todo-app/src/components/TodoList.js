import { useEffect, useState} from "react";
import TodoItem from "./TodoItem"

const TodoList = ({isRefresh, setRefresh}) => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        // memanggil API untuk mengambil data todos
        fetch("http://localhost:8000/todos")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setRefresh(false)
                // ketika REST API sukses, simpan data dari response ke dalam state lokal
                setTodos(data)
            })
            .catch((err) => {
                if(err.name === "AbortError"){
                    console.log("fetch aborted.")
                }
            })
    }, [isRefresh, setRefresh])

    return (
        <div>
            {todos.length === 0 ? (
                <div className="empty-state">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <h3>Belum ada tugas</h3>
                    <p>Tambahkan tugas pertama Anda di atas untuk memulai!</p>
                </div>
            ) : (
                <ul id="todo-list">
                    {todos.map((todo) => (
                        <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh}/>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TodoList