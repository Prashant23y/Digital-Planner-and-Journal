import { auth, database } from './firebase.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  ref,
  onValue,
  push,
  set
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const logoutBtn = document.getElementById("logoutBtn");
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const userPhoto = document.getElementById("user-photo");
  const taskCount = document.getElementById("task-count");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const prioritySelect = document.getElementById("priority-select");
  const taskList = document.getElementById("task-list");
  const calendarDays = document.querySelectorAll('.calendar-day');

  let currentUserId = null;
  let currentTasks = {};
  let draggedTask = null;

  // Create and return a <li> element for a task
  function createTaskElement(task, key) {
    const li = document.createElement('li');
    li.textContent = `${task.text} (${task.priority})`;
    li.setAttribute('draggable', 'true');
    li.dataset.key = key;
    li.classList.add("draggable-task");

    // Drag start
    li.addEventListener('dragstart', (e) => {
      draggedTask = { ...task, key };
      li.style.opacity = '0.5';
    });

    // Drag end
    li.addEventListener('dragend', (e) => {
      li.style.opacity = '1';
    });

    return li;
  }

  // Enable calendar day drop targets
  function enableCalendarDropTargets() {
    calendarDays.forEach(day => {
      day.addEventListener('dragover', (e) => {
        e.preventDefault();
        day.classList.add("drag-over");
      });

      day.addEventListener('dragleave', () => {
        day.classList.remove("drag-over");
      });

      day.addEventListener('drop', (e) => {
        e.preventDefault();
        day.classList.remove("drag-over");

        if (!draggedTask || !currentUserId) return;

        const date = day.dataset.date;
        const calendarRef = ref(database, `users/${currentUserId}/calendar/${date}`);
        const newEventRef = push(calendarRef);

        set(newEventRef, {
          text: draggedTask.text,
          priority: draggedTask.priority,
          originalTaskKey: draggedTask.key,
          droppedAt: Date.now()
        });

        draggedTask = null;
      });
    });
  }

  // Auth state listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUserId = user.uid;

      // Display user info
      userName.textContent = user.displayName || "Anonymous";
      userEmail.textContent = user.email;
      userPhoto.src = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}`;

      const tasksRef = ref(database, 'users/' + currentUserId + '/tasks');

      // Listen for tasks
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        currentTasks = data || {};

        const taskArray = data ? Object.values(data) : [];
        taskCount.textContent = taskArray.length + " tasks";

        taskList.innerHTML = '';
        for (const key in currentTasks) {
          const li = createTaskElement(currentTasks[key], key);
          taskList.appendChild(li);
        }
      });

      // Add task
      addTaskBtn.addEventListener("click", () => {
        const text = taskInput.value.trim();
        const priority = prioritySelect.value;

        if (text === "") return;

        const newTaskRef = push(ref(database, 'users/' + currentUserId + '/tasks'));
        set(newTaskRef, {
          text,
          priority,
          createdAt: Date.now()
        });

        taskInput.value = "";
      });

      // Enable calendar drop targets
      enableCalendarDropTargets();

    } else {
      window.location.href = "login.html";
    }
  });

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  });
});
