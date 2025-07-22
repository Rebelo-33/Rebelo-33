// ✅ add-names.js
import { db } from './firebase-config.js';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let participants = [];

// Add a name to the list
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

// Remove name from list or pop last
window.removeName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name) {
    if (participants.length > 0) {
      const removed = participants.pop();
      alert(`Removed: ${removed}`);
    }
  } else {
    const index = participants.indexOf(name);
    if (index > -1) {
      participants.splice(index, 1);
      alert(`Removed: ${name}`);
    } else {
      alert("Name not found.");
    }
  }

  input.value = '';
  updateList();
};

// Update name list in UI
function updateList() {
  const list = document.getElementById('nameList');
  list.innerHTML = '';
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

// Show modal for list name + pin
window.openSaveForm = function () {
  if (participants.length < 2) {
    alert("Add at least two participants.");
    return;
  }
  document.getElementById('saveModal').style.display = 'block';
};

// Hide modal
window.closeSaveForm = function () {
  document.getElementById('saveModal').style.display = 'none';
  document.getElementById('saveError').textContent = '';
};

// Submit and save list to Firebase
window.submitList = async function () {
  const name = document.getElementById('listNameInput').value.trim();
  const pin = document.getElementById('pinInput').value.trim();

  if (!name || !pin || pin.length !== 4 || isNaN(pin)) {
    document.getElementById('saveError').textContent = 'Please enter a valid list name and 4-digit PIN.';
    return;
  }

  const listId = `${name}_${pin}`;

  try {
    await setDoc(doc(db, "lists", listId), {
      name,
      pin,
      participants,
      timestamp: serverTimestamp()
    });

    document.getElementById('saveModal').style.display = 'none';
    showShareLink(listId);
  } catch (error) {
    console.error("Error saving list:", error);
    alert("Failed to save list.");
  }
};

// Show generated list share link
function showShareLink(listId) {
  const url = `${window.location.origin}/my-lists.html?listId=${encodeURIComponent(listId)}`;
  document.getElementById('shareSection').style.display = 'block';
  document.getElementById('shareLink').value = url;
}

// Copy link to clipboard
window.copyLink = function () {
  const input = document.getElementById('shareLink');
  input.select();
  document.execCommand("copy");
  alert("Link copied!");
};
