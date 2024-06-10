let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks in the sidebar
function renderSidebarTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.onclick = () => viewDetails(index);
        taskList.appendChild(li);
    });
}

// Function to render tasks in the main content
function renderTasks() {
    const taskUl = document.getElementById('tasks');
    taskUl.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${task.name} [${task.priority}]`;

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.onclick = () => updateTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);
        taskUl.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskPriority = document.getElementById('task-priority');
    if (taskInput.value.trim() !== '') {
        tasks.push({
            name: taskInput.value,
            priority: taskPriority.value,
            details: ''
        });
        taskInput.value = '';
        saveTasks();
        renderTasks();
        renderSidebarTasks();
    }
}

// Function to update a task
function updateTask(index) {
    const newName = prompt('Update task name:', tasks[index].name);
    const newPriority = prompt('Update task priority:', tasks[index].priority);
    if (newName && newPriority) {
        tasks[index].name = newName;
        tasks[index].priority = newPriority;
        saveTasks();
        renderTasks();
        renderSidebarTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    renderSidebarTasks();
}

// Function to view task details
function viewDetails(index) {
    localStorage.setItem('currentTask', index);
    window.location.href = 'details.html';
}

// Function to load task details on details page
function loadDetails() {
    const currentTaskIndex = localStorage.getItem('currentTask');
    if (currentTaskIndex !== null) {
        const task = tasks[currentTaskIndex];
        const taskDetailsDiv = document.getElementById('task-details');
        taskDetailsDiv.textContent = `Task: ${task.name} [${task.priority}]`;
        const taskNotes = document.getElementById('task-notes');
        taskNotes.value = task.details;
    }
}

// Function to save task details
function saveDetails() {
    const currentTaskIndex = localStorage.getItem('currentTask');
    if (currentTaskIndex !== null) {
        const taskNotes = document.getElementById('task-notes').value;
        tasks[currentTaskIndex].details = taskNotes;
        saveTasks();
        alert('Details saved!');
    }
}

// Function to navigate to the home page
function goHome() {
    window.location.href = 'index.html';
}

// Initial rendering of tasks
if (document.getElementById('task-list')) {
    renderSidebarTasks();
}

if (document.getElementById('tasks')) {
    renderTasks();
}

if (document.getElementById('task-details')) {
    loadDetails();
}