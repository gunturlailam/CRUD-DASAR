import { useState } from "react";

const Header = ({setRefresh}) => {
    const [title, setTitle] = useState("")

    // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
    const addTodo = () => {
        // Validasi input tidak boleh kosong
        if (!title.trim()) {
            alert('Please enter a todo title!')
            return
        }

        const newTodo = {title: title.trim(), done: false}

        fetch('http://localhost:8000/todos', {
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(newTodo)
        }).then((response) => {
            if (response.ok) {
                // ketika sukses menambah data, reset form dengan mengeset state title menjadi empty string
                setTitle("")
                setRefresh(true)

                setTimeout(() => {
                    alert('New todo added successfully!')
                }, 500)
            } else {
                alert('Failed to add todo. Please try again.')
            }
        }).catch((error) => {
            console.error('Error adding todo:', error)
            alert('Error adding todo. Please check your connection.')
        })
    }

    return(
        <div id="todo-header" className="header">
            <h2>Simple Todo App</h2>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Enter todo title..."
            />
            <span className="add-button" onClick={addTodo}>Add</span>
        </div>
    )
}

export default Header