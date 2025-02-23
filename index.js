document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            addTask(taskText);
            todoInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <input type="text" class="form-control edit-input" style="display: none;" value="${taskText}">
            <div class="btn-group">
                <button class="btn btn-danger btn-sm delete-btn">✕</button>
                <button class="btn btn-primary btn-sm edit-btn">✎</button>
            </div>
        `;

        Swal.fire({
            title: "Berhasil Ditambahkan!",
            icon: "success",
            draggable: true
          });

        todoList.appendChild(li);

        const deleteBtn = li.querySelector('.delete-btn');
        const editBtn = li.querySelector('.edit-btn');
        const editInput = li.querySelector('.edit-input');
        const taskSpan = li.querySelector('.task-text');

        deleteBtn.addEventListener('click', () => deleteTask(li));
        editBtn.addEventListener('click', () => toggleEdit(li, editBtn));

        // Simpan perubahan dengan tombol Enter
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit(li, editBtn);
            }
        });

        // Simpan jika fokus keluar dari input
        editInput.addEventListener('blur', () => saveEdit(li, editBtn));
    }

    function deleteTask(taskElement) {
        taskElement.remove();
        Swal.fire({
            title: "Berhasil Dihapus!",
            icon: "success",
            timer: 1000,
            draggable: true
          });
    }

    function toggleEdit(taskElement, editBtn) {
        const taskText = taskElement.querySelector('.task-text');
        const editInput = taskElement.querySelector('.edit-input');
        const isEditing = editInput.style.display === 'block';

        if (isEditing) {
            saveEdit(taskElement, editBtn);
        } else {
            editInput.style.display = 'block';
            taskText.style.display = 'none';
            editInput.focus();
            editBtn.textContent = '💾'; // Ganti ikon edit ke simpan
        }
    }

    function saveEdit(taskElement, editBtn) {
        const taskText = taskElement.querySelector('.task-text');
        const editInput = taskElement.querySelector('.edit-input');

        taskText.textContent = editInput.value;
        Swal.fire({
            title: "Berhasil Diedit!",
            icon: "success",
            draggable: true
          });
        editInput.style.display = 'none';
        taskText.style.display = 'block';
        editBtn.textContent = '✎'; // Kembalikan ke ikon edit
    }
});
