// ✅ my-lists.js
import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentListId = null;
let currentData = null;
let originalParticipants = [];

// 🔓 Access list with list name, pin, and secret code
window.accessList = async function () {
  const listName = document.getElementById('listName').value.trim();
  const pin = document.getElementById('pin').value.trim();
  const secret = document.getElementById('secretCode').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  if (!listName || !pin || !secret) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  const listId = `${listName.replace(/\s+/g, '_')}_${pin}`;
  const docRef = doc(db, "lists", listId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    errorMsg.textContent = "List not found.";
    return;
  }

  const data = docSnap.data();
  if (data.secretCode !== secret) {
    errorMsg.textContent = "Incorrect secret code.";
    return;
  }

  // 🎉 Valid credentials
  currentListId = listId;
  currentData = data;
  originalParticipants = [...data.participants];
  document.getElementById("accessForm").style.display = "none";
  document.getElementById("listContent").style.display = "block";
  document.getElementById("loadedListName").textContent = data.name;

  renderParticipantColumns(data.participants);
};

// 👥 Render names in columns of 10 with delete button
function renderParticipantColumns(participants) {
  const container = document.getElementById("participantList");
  container.innerHTML = '';

  const columns = Math.ceil(participants.length / 10);
  for (let i = 0; i < columns; i++) {
    const col = document.createElement("div");
    col.classList.add("column");
    for (let j = i * 10; j < Math.min((i + 1) * 10, participants.length); j++) {
      const name = participants[j];
      const item = document.createElement("div");
      item.className = "name-item";
      item.textContent = name;

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.textContent = "✖";
      removeBtn.onclick = () => removeName(name);

      item.appendChild(removeBtn);
      col.appendChild(item);
    }
    container.appendChild(col);
  }
}

// ➕ Add new name
window.addNewName = function () {
  const input = document.getElementById("newNameInput");
  const name = input.value.trim();
  if (!name || currentData.participants.includes(name)) {
    alert("Invalid or duplicate name.");
    return;
  }

  if (name.length > 30) {
    alert("Name must be 30 characters or fewer.");
    return;
  }

  currentData.participants.push(name);
  input.value = '';
  renderParticipantColumns(currentData.participants);
};

// ❌ Remove name (only from currentData, not Firebase until save)
function removeName(name) {
  currentData.participants = currentData.participants.filter(n => n !== name);
  renderParticipantColumns(currentData.participants);
}

// ✅ Save updates to Firestore
window.confirmSaveChanges = async function () {
  const confirmed = confirm("Do you want to save the changes to the list?");
  if (!confirmed) return;

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      participants: currentData.participants
    });
    alert("List updated successfully!");
    originalParticipants = [...currentData.participants];
  } catch (err) {
    console.error(err);
    alert("Failed to update list.");
  }
};

// 🔄 Cancel changes and reset view
window.confirmCancelChanges = function () {
  const confirmed = confirm("Cancel all changes?");
  if (!confirmed) return;

  currentData.participants = [...originalParticipants];
  renderParticipantColumns(currentData.participants);
  document.getElementById("newNameInput").value = '';
};

// 🔙 Go back to home
window.confirmGoBack = function () {
  const confirmed = confirm("Go back to home? Changes won’t be saved.");
  if (confirmed) {
    window.location.href = 'index.html';
  }
};
