let participants = [];
let listName = localStorage.getItem('listName') || '';

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
  updateList();
  input.value = '';
}

function removeName() {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name && participants.length > 0) {
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

function updateList() {
  const list = document.getElementById('nameList');
  if (!list) return;

  list.innerHTML = '';
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

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
  localStorage.removeItem(`${listName}_drawn`);

  alert("List saved!");
  window.location.href = 'index.html';
}

function drawName() {
  const drawn = localStorage.getItem(`${listName}_drawn`);
  if (drawn) {
    document.getElementById('drawnName').textContent = "You got: " + drawn;
    toggleDrawButton(true);
    return;
  }

  const list = JSON.parse(localStorage.getItem(`${listName}_participants`) || '[]');
  if (list.length < 2) {
    alert('Not enough participants.');
    return;
  }

  const index = Math.floor(Math.random() * list.length);
  const name = list.splice(index, 1)[0];
  localStorage.setItem(`${listName}_drawn`, name);
  localStorage.setItem(`${listName}_participants`, JSON.stringify(list));

  document.getElementById('drawnName').textContent = "You got: " + name;
  toggleDrawButton(true);
}

function copyName() {
  const name = document.getElementById('drawnName').textContent;
  navigator.clipboard.writeText(name);
}

function sendEmail() {
  const name = document.getElementById('drawnName').textContent;
  window.location.href = `mailto:?subject=Your Secret Gift Exchange Name&body=${encodeURIComponent(name)}`;
}

function toggleDrawButton(drawn) {
  const drawBtn = document.querySelector('[data-lang="drawName"]');
  if (drawn) {
    drawBtn.textContent = "View Name Drawn";
    drawBtn.onclick = () => drawName();
  }
}

window.onload = function () {
  const drawBtn = document.getElementById('drawBtn');
  const drawButton = document.querySelector('[data-lang="drawName"]');

  listName = localStorage.getItem('listName');

  if (drawBtn && listName && localStorage.getItem(`${listName}_participants`)) {
    drawBtn.disabled = false;
  }

  if (drawButton && localStorage.getItem(`${listName}_drawn`)) {
    toggleDrawButton(true);
  }

  if (document.getElementById('nameList')) {
    const savedList = JSON.parse(localStorage.getItem(`${listName}_participants`)) || [];
    participants = savedList;
    updateList();
  }
};
