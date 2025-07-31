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
    dueDate: "2025-08-01",
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

// quickAddModal box
const addTaskBtn = document.querySelector("#addTask");
const quickAddModalBox = document.querySelector("#quickAddModal");
const modalContent = quickAddModalBox.querySelector("#quickModal");
const closeQuickModal = modalContent.querySelector("#closeQuickModal");
const cancelQuickBtn = modalContent.querySelector("#cancelQuick");

// btn for add task
const addTaskModalBtn = modalContent.querySelector("#addTaskModalBtn");
// function for handle the opening of the modalbox for adding tasks

function handleOpenModalBox() {
  // open the modal box
  quickAddModalBox.classList.remove("hidden");

  // attche the all event of modal box

  // close 	quick modal btn
  quickAddModalBox.addEventListener("click", handleBackgroundClick);
  closeQuickModal.addEventListener("click", closeModal);
  cancelQuickBtn.addEventListener("click", closeModal);

  // also hendle data form the modal box

  addTaskModalBtn.addEventListener("click", (e) => {
    handleAddTaskFromModalBox();
  });
}

// function for close the modal
function closeModal() {
  quickAddModalBox.classList.add("hidden");
  quickAddModalBox.removeEventListener("click", handleBackgroundClick);
}

// function back groundclick handler

function handleBackgroundClick(e) {
  if (!modalContent.contains(e.target)) {
    closeModal();
  }
}

// alt +n for adding task

document.addEventListener("keydown", (e) => {
  // Check if alt key is held AND N is pressed
  if (e.altKey && e.key.toUpperCase() == "N") {
    e.preventDefault(); // prevent default browser action (e.g., new window)
    // Toggle or show your modal
    quickAddModalBox.classList.remove("hidden");

    handleOpenModalBox();
  }
});

// addtask click

addTaskBtn.addEventListener("click", () => {
  // remove hidden to show the modal box
  quickAddModalBox.classList.remove("hidden");

  // CALL THE HANDEL MODEL BOX
  handleOpenModalBox();
});

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
    if (taskValue != "") {
      const taskObject = {
        task: taskValue,
        id: Date.now(),
        isDone: false,
        decreption: "",
        priority: "medium",
        dueDate: "today",
        catagory: "personal",
      };
      taskArray.push(taskObject);
      console.log(taskArray);

      quickAddTaskInput.value = "";
    }
  }
}

handleQuickAddTaskSection();

// add task from the model box

function handleAddTaskFromModalBox() {
  // field that is need for make task object;
  const modalBoxTaskInput = modalContent.querySelector("#taskTitle");
  const taskDescriptionInput = modalContent.querySelector("#taskDescription");
  const taskPriorityInput = modalContent.querySelector("#taskPriority");
  const taskDueDateInput = modalContent.querySelector("#taskDueDate");
  const taskCategoryInput = modalContent.querySelector("#taskCategory");

  // vlaue of every filed

  const taskValue = modalBoxTaskInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();
  const taskPriority = taskPriorityInput.value;
  const taskDueDate = taskDueDateInput.value;
  const taskCategory = taskCategoryInput.value;

  // make the object of task

  const taskObject = {
    task: taskValue,
    id: Date.now(),
    isDone: false,
    decreption: taskDescription,
    priority: taskPriority,
    dueDate: taskDueDate,
    catagory: taskCategory,
  };

  tasksArray.push(taskObject);
  console.log(tasksArray);

  // claer the fieles
  modalBoxTaskInput.value = "";
  taskDescriptionInput.value = "";
  taskPriorityInput.value = "";
  taskCategoryInput.value = "";

  closeModal();
}

/// show the tasks if user have else show the ad task componet
const todoListContainer = document.body.querySelector("#todoList-container");
const addTaskBtnOfList = todoListContainer.querySelector("#taskAddBtnNotFound");

addTaskBtnOfList.addEventListener("click", () => {
  handleOpenModalBox();
});

// function for show the todos from the array

// fucntion for redner the task

function renderTask(taskArray, container) {
  container.firstElementChild.classList.add("hidden");

  taskArray.forEach((taskObject) => {
    // make the div of the task
    const div = document.createElement("div");
    div.innerHTML = `<div class="task-hover w-[95%] my-3 flex items-start gap-4 p-5 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 opacity-60 animate-slide-up">
                                <button
                                    class="mt-1 w-5 h-5 rounded border-2 bg-black dark:bg-white border-black dark:border-white flex items-center justify-center transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-110">
                                    <i data-lucide="check" class="w-3 h-3 text-white dark:text-black"></i>
                                </button>

                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-3 mb-2">
                                        <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                                         <h3 class="font-semibold text-black dark:text-white line-through">
                                            ${taskObject.task}
                                         </h3>
                                        <span
                                            class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                            <i data-lucide="home" class="w-3 h-3"></i>
                                            ${taskObject.catagory}
                                        </span>
                                        <span
                                            class="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                            ${taskObject.priority}
                                        </span>
                                    </div>

                                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-through">
                                      ${taskObject.decreption}  
                                    </p>

                                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        <span class="flex items-center gap-1">
                                            <i data-lucide="calendar" class="w-3 h-3"></i>
                                            ${taskObject.dueDate}
                                        </span>
                                        <span class="flex items-center gap-1">
                                            <i data-lucide="clock" class="w-3 h-3"></i>
                                            ${taskObject.dueDate}
                                            
                                        </span>
                                    </div>
                                </div>

                                <div class="flex items-center gap-1">
                                    <button
                                        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200 hover:scale-110"
                                        title="Edit task">
                                        <i data-lucide="edit" class="w-4 h-4"></i>
                                    </button>
                                    <button
                                        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200 hover:scale-110"
                                        title="Delete task">
                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    </button>
                                </div>
                     </div>`;
                     container.appendChild(div);
    });


}

renderTask(tasksArray,todoListContainer)



// function for render the stats 

function rednderStates(){
  const statsContainer=document.body.querySelector('#statics-container');
  const totalTasks=statsContainer.querySelector('#totalTasks');
  const completed=statsContainer.querySelector('#completedTasks');
  const pending=statsContainer.querySelector('#pending');
  completed.innerText=completedTasks();
  pending.innerText=tasksArray.length-completedTasks();
  totalTasks.innerText=tasksArray.length;

}

// function for get count of completed tasks

function completedTasks(){
  const completedTasksCount=tasksArray.filter((taskObject)=>{
    return taskObject.isDone==true;
  })
  return completedTasksCount.length;
}

// function to to see the over due;

rednderStates();