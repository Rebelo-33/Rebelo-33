// ✅ draw.js — Draw Name Functionality

import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔒 In-memory state for the current list
let listData = null;
let currentListId = null;

// 🧪 Verify access before drawing
window.verifyDrawAccess = async function () {
  const listName = document.getElementById('listName').value.trim();
  const listPin = document.getElementById('listPin').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  // 🧼 Reset message
  errorMsg.textContent = '';

  if (!listName || !listPin) {
    errorMsg.textContent = "Please enter both list name and PIN.";
    return;
  }

  try {
    const docRef = doc(db, "lists", listName); // 🧾 Assume collection is named "lists"
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

    // 🧠 Save current list data and ID
    listData = data;
    currentListId = listName;

    // 💡 Hide login, show draw
    document.getElementById('authSection').style.display = "none";
    document.getElementById('drawSection').style.display = "block";

    populateNameList(data.names || []);
  } catch (err) {
    errorMsg.textContent = "Error connecting to database.";
    console.error("[verifyDrawAccess] DB Error:", err);
  }
};

// 🧾 Display names in column list
function populateNameList(names) {
  const container = document.getElementById('nameListContainer');
  container.innerHTML = ''; // 🔄 Clear old list

  names.forEach(name => {
    const div = document.createElement('div');
    div.textContent = name;
    container.appendChild(div);
  });
}

// 🎁 Handle drawing name for user
window.drawName = async function () {
  const yourName = document.getElementById('yourName').value.trim();
  const resultBox = document.getElementById('resultBox');
  const drawErrorMsg = document.getElementById('drawErrorMsg');

  // 🧼 Reset display
  drawErrorMsg.textContent = '';
  resultBox.textContent = '';

  if (!yourName) {
    drawErrorMsg.textContent = "Please enter your name.";
    return;
  }

  if (!listData || !Array.isArray(listData.names)) {
    drawErrorMsg.textContent = "List data is not loaded.";
    return;
  }

  if (!listData.names.includes(yourName)) {
    drawErrorMsg.textContent = "Your name is not on the list.";
    return;
  }

  // ✅ Check if name was already drawn
  const alreadyDrawn = listData.drawn?.[yourName];
  if (alreadyDrawn) {
    resultBox.textContent = `You already drew: ${alreadyDrawn}`;
    return;
  }

  const alreadyPicked = new Set(Object.values(listData.drawn || {}));
  const available = listData.names.filter(name =>
    name !== yourName && !alreadyPicked.has(name)
  );

  if (available.length === 0) {
    drawErrorMsg.textContent = "No available names to draw.";
    return;
  }

  // 🎯 Random draw
  const drawnName = available[Math.floor(Math.random() * available.length)];

  // 💾 Save result locally
  listData.drawn = {
    ...(listData.drawn || {}),
    [yourName]: drawnName
  };

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      drawn: listData.drawn
    });

    resultBox.textContent = `You drew: ${drawnName}`;
  } catch (err) {
    drawErrorMsg.textContent = "Failed to save draw result.";
    console.error("[drawName] Update error:", err);
  }
};
