// -------------------------
// Toggle between calendar views (month/week/day)
// -------------------------
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show selected view
    const view = btn.getAttribute('data-view');
    document.querySelectorAll('.calendar-view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');
  });
});

// -------------------------
// Render weekly calendar grid (8AM to 5PM for each day of the week)
// -------------------------
function renderWeekGrid() {
  const weekGrid = document.getElementById('week-grid');
  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // Hours: 8 to 17
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  weekGrid.innerHTML = ''; // Clear previous content

  for (let hour of hours) {
    // Add time label
    const timeLabel = document.createElement('div');
    timeLabel.className = 'time-label';
    timeLabel.textContent = `${hour}:00`;
    weekGrid.appendChild(timeLabel);

    // Add calendar cells for each day
    for (let day of days) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell';
      cell.id = `${day}-${hour}`;
      weekGrid.appendChild(cell);
    }
  }
}

renderWeekGrid();

// -------------------------
// Render monthly calendar view
// -------------------------
const monthLabel = document.getElementById("month-label");
const monthGrid = document.getElementById("month-grid");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let currentDate = new Date();

// Generate the full monthly calendar grid
function renderMonth() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // Sunday = 0

  // Adjusting for grid start (Mon-Sun layout)
  const blankDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  // Set label text
  monthLabel.textContent = `${firstDay.toLocaleString("default", {
    month: "long"
  })} ${year}`;

  monthGrid.innerHTML = "";

  // Add blank cells at the start
  for (let i = 0; i < blankDays; i++) {
    const blankCell = document.createElement("div");
    blankCell.classList.add("month-day");
    blankCell.style.backgroundColor = "#1a1a1a"; // Style for blank space
    monthGrid.appendChild(blankCell);
  }

  // Create calendar day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.className = "month-day";
    dayCell.textContent = day;

    // Highlight today
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    // Set data-date for drag-and-drop
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    dayCell.dataset.date = dateStr;
    dayCell.classList.add("calendar-day");

    monthGrid.appendChild(dayCell);
  }
}

// -------------------------
// Month navigation buttons
// -------------------------
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderMonth();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderMonth();
});

// Initial render
renderMonth();
