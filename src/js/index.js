let tasksArray = [
  {
    task: "Buy groceries",
    id: 1001,
    isDone: false,
    decreption: "Milk, eggs, bread",
    priority: "high",
    dueDate: "2025-07-30",
    catagory: "personal",
  },
  {
    task: "Finish portfolio page",
    id: 1002,
    isDone: false,
    decreption: "Complete the about section",
    priority: "medium",
    dueDate: "2025-07-31",
    catagory: "work",
  },
  {
    task: "Morning run",
    id: 1003,
    isDone: true,
    decreption: "5km in park",
    priority: "low",
    dueDate: "2025-07-29",
    catagory: "health",
  },
  {
    task: "Doctor appointment",
    id: 1004,
    isDone: true,
    decreption: "At 10:00 AM",
    priority: "high",
    dueDate: "2023-08-01",
    catagory: "health",
  },
  {
    task: "Prepare Instagram post",
    id: 1005,
    isDone: false,
    decreption: "Topic: Quick Add Task UI",
    priority: "medium",
    dueDate: "2025-07-29",
    catagory: "work",
  },
  {
    task: "Call plumber",
    id: 1006,
    isDone: false,
    decreption: "",
    priority: "medium",
    dueDate: "today",
    catagory: "personal",
  },
  {
    task: "Design task modal",
    id: 1007,
    isDone: false,
    decreption: "Add inputs for priority, category, due date",
    priority: "high",
    dueDate: "2025-07-30",
    catagory: "work",
  },
  {
    task: "Book cab for meeting",
    id: 1008,
    isDone: true,
    decreption: "",
    priority: "low",
    dueDate: "2025-07-29",
    catagory: "work",
  },
  {
    task: "Water plants",
    id: 1009,
    isDone: false,
    decreption: "Don’t forget balcony ones",
    priority: "low",
    dueDate: "today",
    catagory: "personal",
  },
  {
    task: "Push today’s Git commits",
    id: 1010,
    isDone: false,
    decreption: "Include quick add feature",
    priority: "medium",
    dueDate: "2025-07-29",
    catagory: "work",
  },
  {
    task: "Update resume",
    id: 1011,
    isDone: false,
    decreption: "Add recent JavaScript projects",
    priority: "medium",
    dueDate: "2025-08-02",
    catagory: "work",
  },
  {
    task: "Stretching exercises",
    id: 1012,
    isDone: true,
    decreption: "10-minute yoga routine",
    priority: "low",
    dueDate: "today",
    catagory: "health",
  },
  {
    task: "Write LinkedIn post",
    id: 1013,
    isDone: false,
    decreption: "Night post about quick task add UI",
    priority: "high",
    dueDate: "2025-07-29",
    catagory: "work",
  },
  {
    task: "Read JavaScript article",
    id: 1014,
    isDone: false,
    decreption: "Deep dive into closures",
    priority: "medium",
    dueDate: "2025-07-30",
    catagory: "work",
  },
  {
    task: "Clean desktop",
    id: 1015,
    isDone: true,
    decreption: "",
    priority: "low",
    dueDate: "2025-07-28",
    catagory: "personal",
  },
  {
    task: "Test modal open shortcut",
    id: 1016,
    isDone: false,
    decreption: "Try Alt + N and Ctrl + Shift + N",
    priority: "high",
    dueDate: "2025-07-29",
    catagory: "work",
  },
  {
    task: "Watch tutorial on PWA",
    id: 1017,
    isDone: false,
    decreption: "Convert site into installable app",
    priority: "medium",
    dueDate: "2025-08-03",
    catagory: "work",
  },
  {
    task: "Pay electricity bill",
    id: 1018,
    isDone: false,
    decreption: "",
    priority: "high",
    dueDate: "2025-07-31",
    catagory: "personal",
  },
  {
    task: "Daily English practice",
    id: 1019,
    isDone: true,
    decreption: "Read aloud for 30 mins",
    priority: "medium",
    dueDate: "2025-07-29",
    catagory: "personal",
  },
  {
    task: "Set up new project repo",
    id: 1020,
    isDone: false,
    decreption: "Init git, push base files",
    priority: "high",
    dueDate: "2025-07-30",
    catagory: "work",
  },
];

// Separate array for quick tasks (no description, medium priority, today due)
let quickTasksArray = [];

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
  modalElements.taskModalBox.removeEventListener("click", handleBackgroundClick);
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

  renderAllTasksSorted();
  rednderStates();
  closeModal();
}


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
          renderAllTasksSorted();
          rednderStates();
        }, 300);
      } else {
        targetArray.splice(taskIndex, 1);
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
  // Clear existing tasks
  const existingTasks = todoListContainer.querySelectorAll('.task-item');
  existingTasks.forEach(task => task.remove());
  
  const allTasks = [...tasksArray, ...quickTasksArray];
  
  if (allTasks.length === 0) {
    todoListContainer.firstElementChild.classList.remove("hidden");
    return;
  }
  
  todoListContainer.firstElementChild.classList.add("hidden");
  
  // Sort tasks: incomplete first, then by priority (high->medium->low), then by due date
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  const sortedTasks = allTasks.sort((a, b) => {
    // Completed tasks go to bottom
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }
    
    // Sort by priority (high to low)
    if (a.priority !== b.priority) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    // Sort by due date (earliest first)
    const dateA = a.dueDate === 'today' ? new Date().toISOString().split('T')[0] : a.dueDate;
    const dateB = b.dueDate === 'today' ? new Date().toISOString().split('T')[0] : b.dueDate;
    
    return new Date(dateA) - new Date(dateB);
  });
  
  sortedTasks.forEach((taskObject) => {
    renderTask(taskObject);
  });
  
  // Reinitialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Initialize the app
renderAllTasksSorted();
rednderStates();
handleQuickAddTaskSection();
