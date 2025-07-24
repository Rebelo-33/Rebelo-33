// ✅ my-lists.js

import { db } from './firebase-config.js';
import {
  getDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentListId = null;
let currentData = null;
let originalData = null;

// 🔑 Authenticate and load the list
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

  currentListId = listId;
  currentData = { ...data };
  originalData = JSON.stringify(data); // 🧾 Save for cancel/undo

  document.getElementById("accessForm").style.display = "none";
  document.getElementById("listContent").style.display = "block";
  document.getElementById("loadedListName").textContent = data.name;
  renderParticipants();
};

// 👥 Display participants in columns
function renderParticipants() {
  const container = document.getElementById("participantList");
  container.innerHTML = '';

  const columns = [];
  const maxPerColumn = 10;

  currentData.participants.forEach((name, index) => {
    const colIndex = Math.floor(index / maxPerColumn);
    if (!columns[colIndex]) {
      const colDiv = document.createElement("div");
      colDiv.className = "column";
      columns[colIndex] = colDiv;
      container.appendChild(colDiv);
    }

    const item = document.createElement("div");
    item.className = "name-item";
    item.textContent = name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => {
      currentData.participants = currentData.participants.filter(n => n !== name);
      renderParticipants();
    };

    item.appendChild(removeBtn);
    columns[colIndex].appendChild(item);
  });
}

// ➕ Add new name
window.addNewName = () => {
  const input = document.getElementById("newNameInput");
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name.");
    return;
  }
  if (currentData.participants.includes(name)) {
    alert("Name already exists.");
    return;
  }
  if (name.length > 30) {
    alert("Name too long.");
    return;
  }

  currentData.participants.push(name);
  input.value = '';
  renderParticipants();
};

// 💾 Save changes to Firestore
window.confirmSaveChanges = async () => {
  const confirmSave = confirm("Do you want to save the changes?");
  if (!confirmSave) return;

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      participants: currentData.participants
    });
    alert("List updated successfully.");
    originalData = JSON.stringify(currentData);
  } catch (err) {
    console.error("Error saving list:", err);
    alert("Error updating list.");
  }
};

// ❌ Undo unsaved changes
window.confirmCancelChanges = () => {
  const confirmCancel = confirm("Undo all unsaved changes?");
  if (!confirmCancel) return;

  currentData = JSON.parse(originalData);
  renderParticipants();
};

// ⬅️ Return to home warning
window.confirmGoBack = () => {
  const confirmBack = confirm("Changes not saved will be lost. Go back?");
  if (confirmBack) {
    window.location.href = 'index.html';
  }
};
