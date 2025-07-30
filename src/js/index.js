let taskArray = [];

// quickAddModal box
const addTaskBtn = document.querySelector("#addTask");
const quickAddModalBox = document.querySelector("#quickAddModal");
const modalContent = quickAddModalBox.querySelector("#quickModal");
const closeQuickModal = modalContent.querySelector("#closeQuickModal");
const cancelQuickBtn = modalContent.querySelector("#cancelQuick");

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

// addtask click

addTaskBtn.addEventListener("click", () => {
  // remove hidden to show the modal box
	quickAddModalBox.classList.remove("hidden");
	
	// init the addtask for these modal box 
	handleAddTaskFromModalBox();

	// remove the unneccesory event
  quickAddModalBox.addEventListener("click", handleBackgroundClick);
});

// close 	quick modal btn

closeQuickModal.addEventListener("click", closeModal);
cancelQuickBtn.addEventListener("click", closeModal);

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

  // btn for add task
  const addTaskModalBtn = modalContent.querySelector("#addTaskModalBtn");

  addTaskModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
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

		taskArray.push(taskObject)
		console.log(taskArray);

		// claer the fieles
    modalBoxTaskInput.value="";
		taskDescriptionInput.value="";
		taskPriorityInput.value="";
		taskCategoryInput.value="";

  });
}
