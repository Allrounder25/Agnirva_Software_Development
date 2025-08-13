document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        let filteredTasks = [];

        if (filter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else {
            filteredTasks = tasks.slice().sort((a, b) => a.completed - b.completed);
        }

        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.id = task.id;

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            taskText.addEventListener('click', () => toggleTaskCompletion(task.id));

            const taskButtons = document.createElement('div');
            taskButtons.className = 'task-buttons';

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.addEventListener('click', () => editTask(task.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskButtons.appendChild(editBtn);
            taskButtons.appendChild(deleteBtn);
            taskItem.appendChild(taskText);
            taskItem.appendChild(taskButtons);
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ id: Date.now(), text, completed: false });
            saveTasks();
            renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
            taskInput.value = '';
        }
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
    };

    const toggleTaskCompletion = (id) => {
        tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        saveTasks();
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
    };

    const editTask = (id) => {
        const task = tasks.find(task => task.id === id);
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            tasks = tasks.map(task => task.id === id ? { ...task, text: newText.trim() } : task);
            saveTasks();
            renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
        }
    };

    const clearAllTasks = () => {
        tasks = [];
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());
    clearAllBtn.addEventListener('click', clearAllTasks);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            renderTasks(btn.dataset.filter);
        });
    });

    renderTasks();
});