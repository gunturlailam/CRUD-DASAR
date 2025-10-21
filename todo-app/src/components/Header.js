import { useState } from "react";

const Header = ({setRefresh}) => {
    const [title, setTitle] = useState("")

    // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
    const addTodo = () => {
        // Validasi input tidak boleh kosong
        if (!title.trim()) {
            alert('Silakan masukkan judul tugas!')
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
                    alert('Tugas baru berhasil ditambahkan!')
                }, 500)
            } else {
                alert('Gagal menambah tugas. Silakan coba lagi.')
            }
        }).catch((error) => {
            console.error('Error adding todo:', error)
            alert('Terjadi kesalahan. Periksa koneksi internet Anda.')
        })
    }

    return(
        <div id="todo-header" className="header">
            <h2>✨ Daftar Tugas Keren</h2>
            <div className="input-container">
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Apa yang perlu dikerjakan?"
                />
                <button className="add-button" onClick={addTodo}>
                    Tambah
                </button>
            </div>
        </div>
    )
}

export default Header