document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load each task, don't resave
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Event listener to remove a task
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        // Append button and list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save the task to Local Storage if not loading from storage
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
        } else {
            alert("Please enter a task.");
        }
    });

    // Event listener for pressing 'Enter' in the task input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
            } else {
                alert("Please enter a task.");
            }
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
