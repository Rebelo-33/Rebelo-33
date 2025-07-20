let participants = [];
let listName = '';
let listPin = '';
let drawnName = '';

function addName() {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  if (participants.includes(name)) {
    alert("Name already exists in the list.");
    return;
  }

  if (name.length > 30) {
    alert("Name must be 30 characters or fewer.");
    return;
  }

  participants.push(name);
  input.value = '';
  updateList();
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

  input.value = '';
  updateList();
}

function updateList() {
  const list = document.getElementById('nameList') || document.getElementById('participantsListDisplay');
  if (!list) return;

  list.innerHTML = '';
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

function saveList() {
  if (participants.length < 2) {
    alert("Add at least two participants.");
    return;
  }

  const name = prompt("Enter a name for this list:");
  if (!name) {
    alert("List name is required.");
    return;
  }

  const pin = prompt("Set a 4-digit PIN to protect this list:");
  if (!/^\d{4}$/.test(pin)) {
    alert("Invalid PIN. Please enter exactly 4 digits.");
    return;
  }

  listName = name.trim();
  listPin = pin.trim();

  const listKey = `list_${listName}_${listPin}`;
  localStorage.setItem(listKey, JSON.stringify({ participants }));
  localStorage.setItem('currentListKey', listKey);

  const shareURL = `${window.location.origin}/draw.html?list=${encodeURIComponent(listKey)}`;
  document.getElementById('shareContainer').style.display = 'block';
  document.getElementById('shareLink').value = shareURL;

  alert("List saved successfully!");
}

function copyShareLink() {
  const link = document.getElementById('shareLink');
  link.select();
  document.execCommand('copy');
  alert("Link copied to clipboard!");
}

function shareWhatsApp() {
  const link = document.getElementById('shareLink').value;
  const text = encodeURIComponent(`Join our Secret Gift Exchange: ${link}`);
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareEmail() {
  const link = document.getElementById('shareLink').value;
  const subject = encodeURIComponent("Secret Gift Exchange Invitation");
  const body = encodeURIComponent(`Hi! Join our Secret Gift Exchange:\n\n${link}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function loadListByPin() {
  const pinInput = document.getElementById('pinInput');
  const pin = pinInput.value.trim();

  if (!pin || pin.length !== 4) {
    alert("Please enter your 4-digit PIN.");
    return;
  }

  const allKeys = Object.keys(localStorage).filter(key => key.startsWith("list_") && key.endsWith(`_${pin}`));
  if (allKeys.length === 0) {
    alert("No list found for this PIN.");
    return;
  }

  const key = allKeys[0];
  const listData = JSON.parse(localStorage.getItem(key));
  listName = key;
  participants = listData.participants;

  document.getElementById('listDetails').style.display = 'block';
  document.getElementById('listNameDisplay').textContent = key.split('_')[1];
  updateList();
}

function goToDrawPage() {
  const key = listName || localStorage.getItem('currentListKey');
  if (!key) {
    alert("No list found.");
    return;
  }
  window.location.href = `draw.html?list=${encodeURIComponent(key)}`;
}

function drawName() {
  const urlParams = new URLSearchParams(window.location.search);
  const listKey = urlParams.get('list');

  if (!listKey || !localStorage.getItem(listKey)) {
    alert("Invalid or missing list.");
    return;
  }

  const drawnKey = `${listKey}_drawn`;
  if (localStorage.getItem(drawnKey)) {
    document.getElementById('drawnName').textContent = `You got: ${localStorage.getItem(drawnKey)}`;
    return;
  }

  const listData = JSON.parse(localStorage.getItem(listKey));
  const list = listData.participants;

  if (list.length < 2) {
    alert("Not enough participants to draw.");
    return;
  }

  const index = Math.floor(Math.random() * list.length);
  const name = list.splice(index, 1)[0];

  localStorage.setItem(drawnKey, name);
  listData.participants = list;
  localStorage.setItem(listKey, JSON.stringify(listData));

  document.getElementById('drawnName').textContent = `You got: ${name}`;
}

function copyName() {
  const name = document.getElementById('drawnName').textContent;
  navigator.clipboard.writeText(name);
}

function sendEmail() {
  const name = document.getElementById('drawnName').textContent;
  window.location.href = `mailto:?subject=Your Secret Gift Exchange Name&body=${encodeURIComponent(name)}`;
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const listKey = urlParams.get('list');
  const listData = localStorage.getItem(listKey);

  if (listData && document.getElementById('listDisplayName')) {
    const list = JSON.parse(listData);
    document.getElementById('listDisplayName').textContent = listKey.split('_')[1];
    const ul = document.getElementById('participantsList');
    list.participants.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    });

    const drawn = localStorage.getItem(`${listKey}_drawn`);
    if (drawn) {
      document.getElementById('drawnName').textContent = `You got: ${drawn}`;
      const drawBtn = document.getElementById('drawNameBtn');
      if (drawBtn) drawBtn.textContent = "My Drawn Name";
    }
  }

  const drawBtn = document.getElementById('drawBtn');
  if (drawBtn && listKey) {
    drawBtn.disabled = false;
  }
};
