// ✅ Global Variables
let participants = [];
let listName = '';
let userId = '';

// ✅ Utility: Get Query Parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ✅ Add Name to List
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

// ✅ Remove Name From List
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

// ✅ Update DOM List Display
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

// ✅ Save the Created List with PIN and show copy link
function saveList() {
  const name = prompt("Enter a name for this list:");
  if (!name) {
    alert("List name is required.");
    return;
  }

  const pin = prompt("Set a 4-digit PIN to protect your list:");
  if (!pin || !/^\d{4}$/.test(pin)) {
    alert("A valid 4-digit numeric PIN is required.");
    return;
  }

  if (participants.length < 2) {
    alert("Add at least two participants.");
    return;
  }

  listName = name;
  localStorage.setItem(`list_${listName}_pin`, pin);
  localStorage.setItem(`list_${listName}_participants`, JSON.stringify(participants));

  let myLists = JSON.parse(localStorage.getItem('myLists') || '[]');
  if (!myLists.includes(listName)) {
    myLists.push(listName);
    localStorage.setItem('myLists', JSON.stringify(myLists));
  }

  const shareUrl = `${window.location.origin}/draw.html?list=${encodeURIComponent(listName)}`;
  navigator.clipboard.writeText(shareUrl);

  alert("List saved! Link copied to clipboard:\n" + shareUrl);
  window.location.href = 'index.html';
}

// ✅ Show My Lists with PIN Access
function showMyLists() {
  const container = document.getElementById('myListsContainer');
  container.innerHTML = '';
  const myLists = JSON.parse(localStorage.getItem('myLists') || '[]');

  if (myLists.length === 0) {
    container.innerHTML = '<p>You have no saved lists.</p>';
    return;
  }

  myLists.forEach(name => {
    const div = document.createElement('div');
    div.style.margin = '10px 0';

    const label = document.createElement('span');
    label.textContent = name + ' ';

    const btn = document.createElement('button');
    btn.textContent = 'Access';
    btn.onclick = () => {
      const pin = prompt(`Enter 4-digit PIN for list \"${name}\"`);
      const storedPin = localStorage.getItem(`list_${name}_pin`);
      if (pin === storedPin) {
        alert(`List: ${name}\n\n` + JSON.parse(localStorage.getItem(`list_${name}_participants`)).join(', '));
      } else {
        alert("Incorrect PIN");
      }
    };

    div.appendChild(label);
    div.appendChild(btn);
    container.appendChild(div);
  });
}

// ✅ Draw a Name from the List
function drawName() {
  if (!listName) {
    alert("No list selected.");
    return;
  }

  const drawnKey = `list_${listName}_drawn_${userId}`;
  const drawn = localStorage.getItem(drawnKey);

  if (drawn) {
    document.getElementById('drawnName').textContent = `🎉 ${drawn}`;
    toggleDrawButton(true);
    return;
  }

  const list = JSON.parse(localStorage.getItem(`list_${listName}_participants`) || '[]');
  if (list.length < 1) {
    alert('Not enough participants remaining.');
    return;
  }

  const index = Math.floor(Math.random() * list.length);
  const name = list.splice(index, 1)[0];

  localStorage.setItem(drawnKey, name);
  localStorage.setItem(`list_${listName}_participants`, JSON.stringify(list));

  document.getElementById('drawnName').textContent = `🎉 ${name}`;
  toggleDrawButton(true);
}

// ✅ Toggle Draw/View Button Text
function toggleDrawButton(drawn) {
  const drawBtn = document.getElementById('drawBtn');
  if (drawn) {
    drawBtn.textContent = "My Drawn Name Is...";
    drawBtn.disabled = true;
  }
}

// ✅ Copy Name to Clipboard
function copyName() {
  const name = document.getElementById('drawnName').textContent;
  navigator.clipboard.writeText(name);
}

// ✅ Send Name via Email
function sendEmail() {
  const name = document.getElementById('drawnName').textContent;
  window.location.href = `mailto:?subject=Your Secret Gift Exchange Name&body=${encodeURIComponent(name)}`;
}

// ✅ On Load: Handle Page Behavior
window.onload = function () {
  // Handle draw.html loading from shared link
  const pageListName = getQueryParam('list');
  if (pageListName) {
    listName = pageListName;
    userId = localStorage.getItem('userId') || crypto.randomUUID();
    localStorage.setItem('userId', userId);

    const savedParticipants = JSON.parse(localStorage.getItem(`list_${listName}_participants`) || '[]');

    if (savedParticipants.length > 0) {
      document.getElementById('drawBtn').disabled = false;
      document.getElementById('currentListName').textContent = listName;

      const ul = document.getElementById('participantList');
      savedParticipants.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        ul.appendChild(li);
      });

      const alreadyDrawn = localStorage.getItem(`list_${listName}_drawn_${userId}`);
      if (alreadyDrawn) {
        document.getElementById('drawnName').textContent = `🎉 ${alreadyDrawn}`;
        toggleDrawButton(true);
      }
    }
  }

  // Handle add-names.html loading
  const nameListEl = document.getElementById('nameList');
  if (nameListEl) {
    const savedListName = localStorage.getItem('listName');
    if (savedListName) {
      listName = savedListName;
      participants = JSON.parse(localStorage.getItem(`list_${listName}_participants`) || '[]');
      updateList();
    }
  }

  // Handle my-lists.html loading
  const myListsSection = document.getElementById('myListsContainer');
  if (myListsSection) {
    showMyLists();
  }
};
