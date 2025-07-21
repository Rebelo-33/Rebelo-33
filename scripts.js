// ✅ scripts.js
import { db } from './firebase-config.js';
import { collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let participants = [];

window.addName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();
  if (!name) {
    alert("Please enter a name.");
    return;
  }
  if (participants.includes(name)) {
    alert("Name already exists.");
    return;
  }
  if (name.length > 30) {
    alert("Name must be 30 characters or fewer.");
    return;
  }
  participants.push(name);
  updateList();
  input.value = '';
};

window.removeName = function () {
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
      alert("Name not found.");
    }
  }
  updateList();
  input.value = '';
};

function updateList() {
  const list = document.getElementById('nameList');
  list.innerHTML = '';
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

window.saveList = async function () {
  const listName = document.getElementById('listNameInput').value.trim();
  const pin = document.getElementById('pinInput').value.trim();

  if (!listName || pin.length !== 4 || isNaN(pin)) {
    alert("Please provide a list name and a 4-digit PIN.");
    return;
  }
  if (participants.length < 2) {
    alert("Please add at least 2 participants.");
    return;
  }

  const listData = {
    name: listName,
    pin: pin,
    participants,
    timestamp: Date.now()
  };

  try {
    const listRef = doc(db, "lists", `${listName}_${pin}`);
    await setDoc(listRef, listData);
    alert("List saved! Share your list code to participants.");
    localStorage.setItem("lastList", `${listName}_${pin}`);
    window.location.href = 'index.html';
  } catch (err) {
    alert("Failed to save list: " + err.message);
  }
};

window.goToDrawPage = function () {
  const listCode = localStorage.getItem("lastList");
  if (!listCode) {
    alert("No list found. Please create or enter a list.");
    return;
  }
  window.location.href = `draw.html?code=${listCode}`;
};
