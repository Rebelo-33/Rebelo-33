
let participants = [];

function addName() {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();
  if (name && name.length <= 30 && !participants.includes(name)) {
    participants.push(name);
    updateList();
    input.value = '';
  }
}

function removeName() {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();
  const index = participants.indexOf(name);
  if (index > -1) {
    participants.splice(index, 1);
    updateList();
    input.value = '';
  }
}

function updateList() {
  const list = document.getElementById('nameList');
  list.innerHTML = '';
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

function saveList() {
  if (participants.length > 1) {
    localStorage.setItem('participants', JSON.stringify(participants));
    localStorage.removeItem('drawn');
    alert('List saved!');
    window.location.href = 'index.html';
  } else {
    alert('Add at least two participants.');
  }
}

function drawName() {
  if (localStorage.getItem('drawn')) {
    alert('You have already drawn a name.');
    return;
  }
  const list = JSON.parse(localStorage.getItem('participants') || '[]');
  if (list.length < 2) {
    alert('Not enough participants.');
    return;
  }
  const index = Math.floor(Math.random() * list.length);
  const name = list.splice(index, 1)[0];
  localStorage.setItem('drawn', name);
  localStorage.setItem('participants', JSON.stringify(list));
  document.getElementById('drawnName').textContent = 'You got: ' + name;
}

function copyName() {
  const name = document.getElementById('drawnName').textContent;
  navigator.clipboard.writeText(name);
}

function sendEmail() {
  const name = document.getElementById('drawnName').textContent;
  window.location.href = 'mailto:?subject=Your Secret Gift Exchange Name&body=' + encodeURIComponent(name);
}

window.onload = function() {
  const drawBtn = document.getElementById('drawBtn');
  if (drawBtn && localStorage.getItem('participants') && !localStorage.getItem('drawn')) {
    drawBtn.disabled = false;
  }
};
