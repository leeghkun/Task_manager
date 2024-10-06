// Toggle the task form visibility
function toggleForm() {
    const form = document.getElementById('task-form');
    form.classList.toggle('hidden');
}

// Task array to hold the tasks
let tasks = [];
let taskId = 0; // Unique ID for each task

// Add task to the task list
function addTask() {
    // Get values from the form
    const title = document.getElementById('task-title').value;
    const category = document.getElementById('category').value;
    const dueDate = document.getElementById('due-date').value;
    const reminder = document.getElementById('reminder').value;

    // Check if the required fields are filled
    if (title && dueDate) {
        const task = {
            id: taskId++,  // Incrementing task ID
            title,
            category,
            dueDate,
            reminder,
            completed: false
        };

        // Push the new task into the tasks array
        tasks.push(task);
        renderTasks(); // Render tasks to the UI
        resetForm();   // Reset the form after submission
        toggleForm();  // Hide the form
    } else {
        alert("Please enter both task title and due date.");
    }
}

// Reset form fields after adding task
function resetForm() {
    document.getElementById('task-title').value = '';
    document.getElementById('category').value = 'Work';
    document.getElementById('due-date').value = '';
    document.getElementById('reminder').value = '';
}

// Render tasks in the task lists (pending and completed)
function renderTasks() {
    const pendingTasksContainer = document.getElementById('pending-tasks');
    const completedTasksContainer = document.getElementById('completed-tasks');

    // Clear both containers before re-rendering
    pendingTasksContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        // Task card content
        taskElement.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>Due: ${task.dueDate}</p>
                <span class="category">${task.category}</span>
            </div>
            <div class="task-actions">
                <button class="edit-task-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-task-btn" onclick="deleteTask(${task.id})">Delete</button>
                ${!task.completed ? `<button class="complete-task-btn" onclick="completeTask(${task.id})">Complete</button>` : ''}
            </div>
        `;

        // Append task either to pending or completed list
        if (task.completed) {
            completedTasksContainer.appendChild(taskElement);
        } else {
            pendingTasksContainer.appendChild(taskElement);
        }
    });
}

// Mark task as completed
function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = true; // Mark task as completed
    renderTasks(); // Re-render the task lists
}

// Delete task from the list
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id); // Remove the task from array
    renderTasks(); // Re-render the task lists
}

// Edit task - load the task data into the form and delete the old task
function editTask(id) {
    const task = tasks.find(t => t.id === id);

    // Load task data into the form for editing
    document.getElementById('task-title').value = task.title;
    document.getElementById('category').value = task.category;
    document.getElementById('due-date').value = task.dueDate;
    document.getElementById('reminder').value = task.reminder;

    // Delete the old task before adding the edited task
    deleteTask(id);
    toggleForm(); // Show the form for editing
}
