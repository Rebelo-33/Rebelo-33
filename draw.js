// ✅ draw.js — Draw Name Functionality

import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔒 Current list context
let listData = null;
let currentListId = null;

// ✅ Login verification
window.verifyDrawAccess = async function () {
  const listName = document.getElementById('listName').value.trim();
  const listPin = document.getElementById('listPin').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  if (!listName || !listPin) {
    errorMsg.textContent = "Please enter both list name and PIN.";
    return;
  }

  try {
    const docRef = doc(db, "lists", `${listName}_${listPin}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      errorMsg.textContent = "List not found.";
      return;
    }

    const data = docSnap.data();

    if (data.pin !== listPin) {
      errorMsg.textContent = "Incorrect PIN.";
      return;
    }

    // ✅ Auth success
    listData = data;
    currentListId = `${listName}_${listPin}`;

    document.getElementById('authSection').style.display = "none";
    document.getElementById('drawSection').style.display = "block";

    populateNameList(data.participants || []);
  } catch (err) {
    console.error("[verifyDrawAccess] DB Error:", err);
    errorMsg.textContent = "Error connecting to database.";
  }
};

// ✅ Display participants
function populateNameList(names) {
  const container = document.getElementById('nameListContainer');
  container.innerHTML = '';

  if (!names.length) return;

  const columns = Math.ceil(names.length / 10);
  for (let i = 0; i < columns; i++) {
    const col = document.createElement('div');
    col.className = 'column';

    names.slice(i * 10, i * 10 + 10).forEach(name => {
      const item = document.createElement('div');
      item.textContent = name;
      col.appendChild(item);
    });

    container.appendChild(col);
  }
}

// ✅ Step 1: Validate name before draw
window.validateUserName = function () {
  const yourName = document.getElementById('yourName').value.trim();
  const drawErrorMsg = document.getElementById('drawErrorMsg');
  const confirmText = document.getElementById('confirmText');
  const confirmPrompt = document.getElementById('confirmPrompt');

  drawErrorMsg.textContent = '';
  confirmPrompt.style.display = 'none';

  if (!yourName) {
    drawErrorMsg.textContent = "Please enter your name.";
    return;
  }

  if (!listData?.participants.includes(yourName)) {
    drawErrorMsg.textContent = "Your name is not on the list.";
    return;
  }

  // ✅ Show confirmation prompt
  confirmText.textContent = `Is your name "${yourName}"?`;
  confirmPrompt.style.display = "block";
};

// ✅ Step 2: Confirm identity
window.confirmUserName = function (confirmed) {
  const confirmPrompt = document.getElementById('confirmPrompt');
  confirmPrompt.style.display = "none";

  if (!confirmed) {
    document.getElementById('yourName').value = '';
    return;
  }

  const yourName = document.getElementById('yourName').value.trim();
  executeDraw(yourName);
};

// ✅ Step 3: Execute draw after confirmation
async function executeDraw(yourName) {
  const drawErrorMsg = document.getElementById('drawErrorMsg');
  const resultBox = document.getElementById('resultBox');

  drawErrorMsg.textContent = '';
  resultBox.textContent = '';

  const alreadyDrawn = listData.drawn?.[yourName];
  if (alreadyDrawn) {
    resultBox.textContent = `Hi ${yourName}, you already drew: ${alreadyDrawn}`;
    return;
  }

  const alreadyPicked = new Set(Object.values(listData.drawn || {}));
  const available = listData.participants.filter(name =>
    name !== yourName && !alreadyPicked.has(name)
  );

  if (available.length === 0) {
    drawErrorMsg.textContent = "No available names to draw.";
    return;
  }

  const drawnName = available[Math.floor(Math.random() * available.length)];
  listData.drawn = { ...(listData.drawn || {}), [yourName]: drawnName };

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      drawn: listData.drawn
    });

    resultBox.textContent = `Hi ${yourName}, you drew: ${drawnName}`;
  } catch (err) {
    drawErrorMsg.textContent = "Failed to save draw result.";
    console.error("[drawName] Update error:", err);
  }
}
