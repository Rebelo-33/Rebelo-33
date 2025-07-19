// Holds all participant names added
let participants = [];

// Load the saved list name from localStorage if it exists
let listName = localStorage.getItem('listName') || '';

// === Function: Add a new participant ===
function addName() {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  if (participants.includes(name)) {
    alert("Name already exists in the list. Please enter a unique name.");
    return;
  }

  if (name.length > 30) {
    alert("Name must be 30 characters or fewer.");
    return;
  }

  participants.push(name);
  updateList(); // Update the display
  input.value = ''; // Clear the input
}

// === Function: Remove a participant ===
function removeName() {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name && participants.length > 0) {
    // If no name is typed, remove the last name
    const removed = participants.pop();
    alert(`Removed: ${removed}`);
  } else {
    const index = participants.indexOf(name);
    if (index > -1) {
      participants.splice(index, 1);
      alert(`Removed: ${name}`);
    } else {
      alert("Name not found in list.");
    }
  }

  updateList();
  input.value = '';
}

// === Function: Update the displayed list ===
function updateList() {
  const list = document.getElementById('nameList');
  if (!list) return;

  list.innerHTML = ''; // Clear old list
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

// === Function: Save the list to localStorage ===
function saveList() {
  const name = prompt("Enter a name for this list:");
  if (!name) {
    alert("List name is required.");
    return;
  }

  if (participants.length < 2) {
    alert("Add at least two participants.");
    return;
  }

  listName = name;
  localStorage.setItem('listName', listName);
  localStorage.setItem(`${listName}_participants`, JSON.stringify(participants));
  localStorage.removeItem(`${listName}_drawn`); // Reset any previous draw

  alert("List saved!");
  window.location.href = 'index.html'; // Redirect to home
}

// === Function: Draw a name randomly from the saved list ===
function drawName() {
  if (!listName) {
    alert("No list selected or saved.");
    return;
  }

  const drawn = localStorage.getItem(`${listName}_drawn`);
  if (drawn) {
    // Already drawn
    document.getElementById('drawnName').textContent = "You got: " + drawn;
    toggleDrawButton(true);
    return;
  }

  const list = JSON.parse(localStorage.getItem(`${listName}_participants`) || '[]');
  if (list.length < 2) {
    alert('Not enough participants.');
    return;
  }

  // Draw a random name and remove it from the pool
  const index = Math.floor(Math.random() * list.length);
  const name = list.splice(index, 1)[0];
  localStorage.setItem(`${listName}_drawn`, name);
  localStorage.setItem(`${listName}_participants`, JSON.stringify(list));

  document.getElementById('drawnName').textContent = "You got: " + name;
  toggleDrawButton(true);
}

// === Function: Copy the drawn name to clipboard ===
function copyName() {
  const name = document.getElementById('drawnName').textContent;
  if (name) {
    navigator.clipboard.writeText(name);
    alert("Copied to clipboard!");
  }
}

// === Function: Open default mail client with drawn name in body ===
function sendEmail() {
  const name = document.getElementById('drawnName').textContent;
  if (name) {
    window.location.href = `mailto:?subject=Your Secret Gift Exchange Name&body=${encodeURIComponent(name)}`;
  }
}

// === Function: Change draw button text after drawing ===
function toggleDrawButton(drawn) {
  const drawBtn = document.querySelector('[data-lang="drawName"]');
  if (drawn && drawBtn) {
    drawBtn.textContent = "View Name Drawn";
    drawBtn.onclick = () => drawName();
  }
}

// === Initialization logic on page load ===
window.onload = function () {
  listName = localStorage.getItem('listName');

  const drawBtn = document.getElementById('drawBtn');
  const drawButton = document.querySelector('[data-lang="drawName"]');

  // Enable draw button only if a saved list exists
  if (drawBtn && listName && localStorage.getItem(`${listName}_participants`)) {
    drawBtn.disabled = false;
  }

  // Change button if name already drawn
  if (drawButton && localStorage.getItem(`${listName}_drawn`)) {
    toggleDrawButton(true);
  }

  // Load saved participant list for "add names" page
  if (document.getElementById('nameList')) {
    const savedList = JSON.parse(localStorage.getItem(`${listName}_participants`)) || [];
    participants = savedList;
    updateList();
  }

  // Clear name input on load
  if (document.getElementById('nameInput')) {
    document.getElementById('nameInput').value = '';
  }
};
