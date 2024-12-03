// Select elements
const form = document.querySelector('.list-form');
const input = document.querySelector('#list-element');
const toggleButton = document.querySelector('#toggle-list');
const mainDiv = document.querySelector('.main-div');

// Create and style the todo container
const todoContainer = document.createElement('ul');
todoContainer.id = 'todo-container';
todoContainer.style.listStyleType = 'none';
todoContainer.style.padding = '0';
mainDiv.appendChild(todoContainer);

// Function to save items to localStorage
const saveToLocalStorage = () => {
    const items = [...todoContainer.querySelectorAll('li')].map(
        (li) => li.firstChild.textContent
    );
    localStorage.setItem('todo-list', JSON.stringify(items));
};

// Function to load items from localStorage
const loadFromLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('todo-list')) || [];
    items.forEach((itemText) => addListItem(itemText));
};

// Function to create and add a list item
const addListItem = (itemText) => {
    const listItem = document.createElement('li');
    listItem.textContent = itemText;
    listItem.style.padding = '20px';
    listItem.style.margin = '5px';
    listItem.style.border = '1px solid #ccc';
    listItem.style.borderRadius = '5px';
    listItem.style.display = 'flex';
    listItem.style.justifyContent = 'space-between';
    listItem.style.alignItems = 'center';

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.backgroundColor = '#ff4d4d';
    deleteButton.style.color = '#fff';
    deleteButton.style.border = 'none';
    deleteButton.style.padding = '10px 10px';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.cursor = 'pointer';

    // Handle delete button click
    deleteButton.addEventListener('click', () => {
        todoContainer.removeChild(listItem);
        saveToLocalStorage(); // Update localStorage
    });

    listItem.appendChild(deleteButton);
    todoContainer.appendChild(listItem);
};

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const itemText = input.value.trim();
    if (itemText !== '') {
        addListItem(itemText);
        saveToLocalStorage(); // Save to localStorage
        input.value = '';
    } else {
        alert('Please enter a valid item.'); // Alert for empty input
    }
});

// Handle the toggle button to show/hide the list
toggleButton.addEventListener('click', () => {
    if (todoContainer.style.display === 'none' || todoContainer.style.display === '') {
        todoContainer.style.display = 'block';
        toggleButton.textContent = 'Hide List';
    } else {
        todoContainer.style.display = 'none';
        toggleButton.textContent = 'Show List';
    }
});

// Load items on page load
loadFromLocalStorage();
