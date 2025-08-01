let tasksArray =[];

// Separate array for quick tasks (no description, medium priority, today due)
let quickTasksArray = [];

// localStorage functions
function saveToLocalStorage() {
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
  localStorage.setItem('quickTasksArray', JSON.stringify(quickTasksArray));
}

function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasksArray');
  const savedQuickTasks = localStorage.getItem('quickTasksArray');
  
  if (savedTasks) {
    tasksArray = JSON.parse(savedTasks);
  }
  
  if (savedQuickTasks) {
    quickTasksArray = JSON.parse(savedQuickTasks);
  }
}

// Cache DOM elements globally for performance
const statsElements = {
  totalTasks: document.querySelector("#totalTasks"),
  completed: document.querySelector("#completedTasks"),
  pending: document.querySelector("#pending"),
  overdue: document.querySelector("#overdue"),
  yourTaskCount: document.querySelector("#yourTaskCount")
};

function rednderStates() {
  const allTasks = [...tasksArray, ...quickTasksArray];
  const completedCount = completedTasks(allTasks);
  const overdueCount = overdueTasks(allTasks);
  statsElements.completed.innerText = completedCount;
  statsElements.pending.innerText = allTasks.length - completedCount;
  statsElements.totalTasks.innerText = allTasks.length;
  statsElements.overdue.innerText = overdueCount;
  statsElements.yourTaskCount.innerText = allTasks.length;
}

function completedTasks(tasks = [...tasksArray, ...quickTasksArray]) {
  return tasks.filter(task => task.isDone).length;
}

function overdueTasks(tasks = [...tasksArray, ...quickTasksArray]) {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter(task => 
    !task.isDone && 
    task.dueDate !== 'today' && 
    task.dueDate < today
  ).length;
}


// add task form quick task section
// function for quieck add task

function handleQuickAddTaskSection() {
  const quickAddTaskInput = document.body.querySelector("#quickAddTask");
  const quickAddTaskBtn = document.body.querySelector("#quickAddTaskBtn");

  quickAddTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // call the quickAddTask
      quickAddTask();
    }
  });

  quickAddTaskBtn.addEventListener("click", () => {
    const taskValue = quickAddTaskInput.value.trim();
    // call the quickAddTask pass the task
    quickAddTask(taskValue);
  });

  // function to quickaddTask ;

  function quickAddTask() {
    const taskValue = quickAddTaskInput.value.trim();
    if (taskValue) {
      const quickTaskObject = {
        task: taskValue,
        id: Date.now(),
        isDone: false,
        description: "",
        priority: "medium",
        dueDate: "today",
        category: "personal",
        isQuickTask: true
      };
      quickTasksArray.push(quickTaskObject);      
      quickAddTaskInput.value = "";
      saveToLocalStorage();
      renderAllTasksSorted();
      rednderStates();
    }
  }
}

// function for open the taskmodalbox

// Cache modal elements globally
const modalElements = {
  taskModalBox: document.querySelector("#taskModalBox"),
  modalContent: document.querySelector("#taskModal"),
  closeModalBox: document.querySelector("#closeModalBox"),
  cancleModalBtn: document.querySelector("#cancleModalBtn"),
  addTaskModalBtn: document.querySelector("#addTaskModalBtn"),
  taskTitle: document.querySelector("#taskTitle"),
  taskDescription: document.querySelector("#taskDescription"),
  taskPriority: document.querySelector("#taskPriority"),
  taskDueDate: document.querySelector("#taskDueDate"),
  taskCategory: document.querySelector("#taskCategory")
};


// function for handle the opening of the modalbox for adding tasks

function handleOpenModalBox() {
  // open the modal box
  modalElements.taskModalBox.classList.remove("hidden");

  // attche the all event of modal box

  // close 	quick modal btn
  modalElements.taskModalBox.addEventListener("click", handleBackgroundClick);
  modalElements.closeModalBox.addEventListener("click", closeModal);
  modalElements.cancleModalBtn.addEventListener("click", closeModal);

  // also hendle data form the modal box

  addTaskModalBtn.addEventListener("click", (e) => {
    handleAddTaskFromModalBox();
  });

  // function back groundclick handler

  function handleBackgroundClick(e) {
    if (!modalElements.modalContent.contains(e.target)) {
      closeModal();
    }
  }
}

// function for close the modal
function closeModal() {
  modalElements.taskModalBox.classList.add("hidden");
  // modalElements.taskModalBox.removeEventListener("click", handleBackgroundClick);
}

// triggers for opining addtask modal box
// open from alt +n for adding task

document.addEventListener("keydown", (e) => {
  // Check if alt key is held AND N is pressed
  if (e.altKey && e.key.toUpperCase() == "N") {
    e.preventDefault(); // prevent default browser action (e.g., new window)
    // Toggle or show your modal
    handleOpenModalBox();
  }
});

// open from addTaskFloatingBtn click
const addTaskFloatingBtn= document.querySelector("#addTaskFloatingBtn");
addTaskFloatingBtn.addEventListener("click", () => {
  // CALL THE HANDEL MODEL BOX
  handleOpenModalBox();
});

// open from if tasklist container if zero task in array
/// show the tasks if user have else show the ad task componet
const todoListContainer = document.body.querySelector("#todoList-container");
const addTaskBtnOfList = todoListContainer.querySelector("#taskAddBtnNotFound");

addTaskBtnOfList.addEventListener("click", () => {
  handleOpenModalBox();
});



// function for handle task add form modal box goes in task array;

function handleAddTaskFromModalBox() {
  const taskTitle = modalElements.taskTitle.value.trim();
  const taskDescription = modalElements.taskDescription.value.trim();
  const taskPriority = modalElements.taskPriority.value;
  const taskDueDate = modalElements.taskDueDate.value;
  const taskCategory = modalElements.taskCategory.value;
  const editId = modalElements.addTaskModalBtn.getAttribute('data-edit-id');

  if (!taskTitle) return alert("Task title is required!");

  if (editId) {
    // Edit existing task
    let taskIndex = tasksArray.findIndex(task => task.id == editId);
    let isQuickTask = false;
    
    if (taskIndex === -1) {
      taskIndex = quickTasksArray.findIndex(task => task.id == editId);
      isQuickTask = true;
    }
    
    if (taskIndex !== -1) {
      const targetArray = isQuickTask ? quickTasksArray : tasksArray;
      targetArray[taskIndex] = {
        ...targetArray[taskIndex],
        task: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        dueDate: taskDueDate || new Date().toISOString().split("T")[0],
        category: taskCategory
      };
    }
    
    // Reset modal button
    modalElements.addTaskModalBtn.textContent = 'Add Task';
    modalElements.addTaskModalBtn.removeAttribute('data-edit-id');
  } else {
    // Add new task
    const taskObject = {
      task: taskTitle,
      id: Date.now(),
      isDone: false,
      description: taskDescription,
      priority: taskPriority,
      dueDate: taskDueDate || new Date().toISOString().split("T")[0],
      category: taskCategory,
    };
    tasksArray.push(taskObject);
  }

  // Clear form
  modalElements.taskTitle.value = "";
  modalElements.taskDescription.value = "";
  modalElements.taskPriority.value = "medium";
  modalElements.taskCategory.value = "personal";

  saveToLocalStorage();
  renderAllTasksSorted();
  rednderStates();
  closeModal();
}

// function for clear all task 

  const clearAllTasksBtn=document.querySelector('#clearAllTasks');
  clearAllTasksBtn.addEventListener('click',()=>{
    tasksArray=[];
    quickTasksArray=[];
    saveToLocalStorage();
    renderAllTasksSorted();
    rednderStates();
  })


// function for render the task with proper priority and completion states

function renderTask(taskObject) {
  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500', 
    low: 'bg-green-500'
  };
  
  const completionClasses = taskObject.isDone 
    ? 'opacity-60 line-through' 
    : 'opacity-100';
    
  const checkboxClasses = taskObject.isDone
    ? 'bg-green-500 border-green-500'
    : 'bg-transparent border-gray-300 dark:border-gray-600';
    
  const checkIcon = taskObject.isDone ? 'check' : '';

  const div = document.createElement("div");
  div.innerHTML = `<div
                      id="task-${taskObject.id}" 
                      class="task-item w-[95%] my-3 flex items-start gap-4 p-5 border border-gray-200 dark:border-stone-500 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 ${completionClasses} animate-slide-up">
                                <button
                                    onclick="handleTaskDone(${taskObject.id})"
                                    class="task-checkbox mt-1 w-5 h-5 rounded border-2 ${checkboxClasses} flex items-center justify-center transition-all duration-200 hover:scale-110">
                                    ${taskObject.isDone ? '<i data-lucide="check" class="w-3 h-3 text-white"></i>' : ''}
                                </button>

                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-3 mb-2">
                                        <div class="w-2 h-2 rounded-full ${priorityColors[taskObject.priority]}"></div>
                                         <h3 class="font-semibold text-black dark:text-white ${taskObject.isDone ? 'line-through' : ''}">
                                            ${taskObject.task}
                                         </h3>
                                        <span
                                            class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                            <i data-lucide="home" class="w-3 h-3"></i>
                                            ${taskObject.category || taskObject.catagory || 'personal'}
                                        </span>
                                        <span
                                            class="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                            ${taskObject.priority}
                                        </span>
                                    </div>

                                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 ${taskObject.isDone ? 'line-through' : ''}">
                                      ${taskObject.description || taskObject.decreption || ''}  
                                    </p>

                                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        <span class="flex items-center gap-1">
                                            <i data-lucide="calendar" class="w-3 h-3"></i>
                                            ${taskObject.dueDate}
                                        </span>
                                    </div>
                                </div>

                                <div class="flex items-center gap-1">
                                    <button
                                        onclick="handleTaskEdit(${taskObject.id})"
                                        class="edit-btn p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200 hover:scale-110"
                                        title="Edit task">
                                        <i data-lucide="edit" class="w-4 h-4"></i>
                                    </button>
                                    <button
                                        onclick="handleTaskDelete(${taskObject.id})"
                                        class="delete-btn p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                                        title="Delete task">
                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    </button>
                                </div>
                     </div>`;
  todoListContainer.appendChild(div);
}


// function for handle task done with animation

function handleTaskDone(taskId) {
  const allTasks = [...tasksArray, ...quickTasksArray];
  let taskIndex = tasksArray.findIndex((task) => task.id == taskId);
  let isQuickTask = false;
  
  if (taskIndex === -1) {
    taskIndex = quickTasksArray.findIndex((task) => task.id == taskId);
    isQuickTask = true;
  }
  
  if (taskIndex !== -1) {
    const targetArray = isQuickTask ? quickTasksArray : tasksArray;
    targetArray[taskIndex].isDone = !targetArray[taskIndex].isDone;
    
    // Add fade animation for completed tasks
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
      if (targetArray[taskIndex].isDone) {
        taskElement.style.transition = 'all 0.3s ease';
        taskElement.style.opacity = '0.6';
        taskElement.classList.add('line-through');
      } else {
        taskElement.style.opacity = '1';
        taskElement.classList.remove('line-through');
      }
    }
    
    saveToLocalStorage();
    renderAllTasksSorted();
    rednderStates();
  }
}

// function for handle task delete with confirmation

function handleTaskDelete(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    let taskIndex = tasksArray.findIndex((task) => task.id == taskId);
    let isQuickTask = false;
    
    if (taskIndex === -1) {
      taskIndex = quickTasksArray.findIndex((task) => task.id == taskId);
      isQuickTask = true;
    }
    
    if (taskIndex !== -1) {
      const targetArray = isQuickTask ? quickTasksArray : tasksArray;
      const taskElement = document.getElementById(`task-${taskId}`);
      
      // Add slide-out animation
      if (taskElement) {
        taskElement.style.transition = 'all 0.3s ease';
        taskElement.style.transform = 'translateX(100%)';
        taskElement.style.opacity = '0';
        
        setTimeout(() => {
          targetArray.splice(taskIndex, 1);
          saveToLocalStorage();
          renderAllTasksSorted();
          rednderStates();
        }, 300);
      } else {
        targetArray.splice(taskIndex, 1);
        saveToLocalStorage();
        renderAllTasksSorted();
        rednderStates();
      }
    }
  }
}

// function for handle task edit
function handleTaskEdit(taskId) {
  const allTasks = [...tasksArray, ...quickTasksArray];
  const task = allTasks.find(t => t.id == taskId);
  
  if (task) {
    // Populate modal with existing task data
    modalElements.taskTitle.value = task.task;
    modalElements.taskDescription.value = task.description || task.decreption || '';
    modalElements.taskPriority.value = task.priority;
    modalElements.taskDueDate.value = task.dueDate === 'today' ? new Date().toISOString().split('T')[0] : task.dueDate;
    modalElements.taskCategory.value = task.category || task.catagory || 'personal';
    
    // Change modal button text and add edit mode
    modalElements.addTaskModalBtn.textContent = 'Update Task';
    modalElements.addTaskModalBtn.setAttribute('data-edit-id', taskId);
    
    handleOpenModalBox();
  }
}

// function for tasks count

function tasksCountAndRender() {
  const taskcount = document.body.querySelector("#yourTaskCount");
  taskcount.innerText = tasksArray.length;
}

// function for render all tasks sorted by priority and due date
function renderAllTasksSorted() {
  // Reset filters and search when rendering all tasks
  currentSearchTerm = '';
  currentFilters = { status: 'all', category: 'all', priority: 'all' };
  
  // Reset filter inputs
  if (elementsOfFilter.searchInput) elementsOfFilter.searchInput.value = '';
  if (elementsOfFilter.filterStatus) elementsOfFilter.filterStatus.value = 'all';
  if (elementsOfFilter.filterCategory) elementsOfFilter.filterCategory.value = 'all';
  if (elementsOfFilter.filterPriority) elementsOfFilter.filterPriority.value = 'all';
  
  renderFilteredTasks();
}

// functions for search task and sort tarsk 

const filterContainer = document.body.querySelector("#filter-container");
const elementsOfFilter = {
  searchInput: filterContainer.querySelector("#searchTask"),
  filterStatus: filterContainer.querySelector("#filterStatus"),// all ,completed ,pending 
  filterCategory: filterContainer.querySelector("#category"),// personal,work ,shoping 
  filterPriority: filterContainer.querySelector("#priorities"),// low high midium
};

// Global variables for filtering
let currentSearchTerm = '';
let currentFilters = {
  status: 'all',
  category: 'all',
  priority: 'all'
};

// function for handle search with real-time highlighting
function handleSearch() {
  const searchTerm = elementsOfFilter.searchInput.value.toLowerCase().trim();
  currentSearchTerm = searchTerm;
  renderFilteredTasks();
}

// function for handle filter
function handleFilter() {
  currentFilters = {
    status: elementsOfFilter.filterStatus.value,
    category: elementsOfFilter.filterCategory.value,
    priority: elementsOfFilter.filterPriority.value
  };
  renderFilteredTasks();
}

// Function to highlight search terms in text
function highlightText(text, searchTerm) {
  if (!searchTerm || !text) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">$1</mark>');
}

// Function to filter tasks based on current filters and search
function getFilteredTasks() {
  const allTasks = [...tasksArray, ...quickTasksArray];
  
  return allTasks.filter(task => {
    // Search filter
    if (currentSearchTerm) {
      const searchableText = [
        task.task,
        task.description || task.decreption || '',
        task.category || task.catagory || 'personal',
        task.priority
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(currentSearchTerm)) {
        return false;
      }
    }
    
    // Status filter
    if (currentFilters.status !== 'all') {
      if (currentFilters.status === 'completed' && !task.isDone) return false;
      if (currentFilters.status === 'pending' && task.isDone) return false;
    }
    
    // Category filter
    if (currentFilters.category !== 'all') {
      const taskCategory = task.category || task.catagory || 'personal';
      if (taskCategory !== currentFilters.category) return false;
    }
    
    // Priority filter
    if (currentFilters.priority !== 'all') {
      if (task.priority !== currentFilters.priority) return false;
    }
    
    return true;
  });
}

// Function to render filtered and sorted tasks
function renderFilteredTasks() {
  // Clear existing tasks
  const existingTasks = todoListContainer.querySelectorAll('.task-item');
  existingTasks.forEach(task => task.remove());
  
  const filteredTasks = getFilteredTasks();
  
  if (filteredTasks.length === 0) {
    todoListContainer.firstElementChild.classList.remove("hidden");
    return;
  }
  
  todoListContainer.firstElementChild.classList.add("hidden");
  
  // Sort filtered tasks
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }
    
    if (a.priority !== b.priority) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    const dateA = a.dueDate === 'today' ? new Date().toISOString().split('T')[0] : a.dueDate;
    const dateB = b.dueDate === 'today' ? new Date().toISOString().split('T')[0] : b.dueDate;
    
    return new Date(dateA) - new Date(dateB);
  });
  
  sortedTasks.forEach((taskObject) => {
    renderTask(taskObject);
  });
  
  // Add highlighting after rendering
  if (currentSearchTerm) {
    addHighlighting();
  }
  
  // Reinitialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Function to add highlihting to rendered tsks
function addHighlighting() {
  const taskElements = todoListContainer.querySelectorAll('.task-item');
  
  taskElements.forEach(taskElement => {
    const title = taskElement.querySelector('h3');
    const description = taskElement.querySelector('p');
    const categorySpan = taskElement.querySelector('span:nth-of-type(1)');
    const prioritySpan = taskElement.querySelector('span:nth-of-type(2)');
    
    if (title) title.innerHTML = highlightText(title.textContent, currentSearchTerm);
    if (description) description.innerHTML = highlightText(description.textContent, currentSearchTerm);
    if (categorySpan) {
      const icon = categorySpan.querySelector('i');
      const text = categorySpan.textContent.trim();
      categorySpan.innerHTML = icon.outerHTML + ' ' + highlightText(text, currentSearchTerm);
    }
    if (prioritySpan) prioritySpan.innerHTML = highlightText(prioritySpan.textContent, currentSearchTerm);
  });
}



// Add event listeners for search and filter
function initializeEventListeners() {
  // Real-time search
  if (elementsOfFilter.searchInput) {
    elementsOfFilter.searchInput.addEventListener('input', handleSearch);
  }
  
  // Filter event listeners
  if (elementsOfFilter.filterStatus) {
    elementsOfFilter.filterStatus.addEventListener('change', handleFilter);
  }
  
  if (elementsOfFilter.filterCategory) {
    elementsOfFilter.filterCategory.addEventListener('change', handleFilter);
  }
  
  if (elementsOfFilter.filterPriority) {
    elementsOfFilter.filterPriority.addEventListener('change', handleFilter);
  }
}

// Initialize the app
loadFromLocalStorage();
renderAllTasksSorted();
rednderStates();
handleQuickAddTaskSection();
initializeEventListeners();
initializeMobileFilters();

// Toggle filters function for mobile UX
function toggleFilters() {
  const filterContent = document.getElementById('filter-content');
  const toggleIcon = document.getElementById('filter-toggle');
  
  if (window.innerWidth < 1024) { // Only on mobile/tablet
    filterContent.classList.toggle('hidden');
    toggleIcon.classList.toggle('rotate-180');
  }
}

// Auto-hide filters on mobile by default
function initializeMobileFilters() {
  const filterContent = document.getElementById('filter-content');
  
  if (window.innerWidth < 1024) {
    filterContent.classList.add('hidden');
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  const filterContent = document.getElementById('filter-content');
  
  if (window.innerWidth >= 1024) {
    filterContent.classList.remove('hidden');
  } else {
    filterContent.classList.add('hidden');
  }
});