// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Event listener to add tasks when the button is clicked
    addButton.addEventListener('click', addTask);

    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input and trim whitespace
        if (taskText === '') {
            alert('Please enter a task.'); // Alert if input is empty
            return;
        }

        // Create a new task element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a remove button for each task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function () {
            taskList.removeChild(taskItem); // Remove task from DOM
            removeTaskFromLocalStorage(taskText); // Remove task from Local Storage
        };

        // Append the remove button to the task item and the task item to the list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save the task to Local Storage
        saveTaskToLocalStorage(taskText);

        // Clear the input field
        taskInput.value = '';
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(task) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            // Create a task item for each stored task
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;

            // Create a remove button for each stored task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.onclick = function () {
                taskList.removeChild(taskItem); // Remove task from DOM
                removeTaskFromLocalStorage(taskText); // Remove task from Local Storage
            };

            // Append the remove button to the task item and the task item to the list
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(task) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(storedTask => storedTask !== task);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
