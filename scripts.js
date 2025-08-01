// ✅ Import Firebase (unchanged) add-names.html my-lists.html draw.html 
import { db } from './firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

let nameList = [];

// ✅ DOM references
const nameInput = document.getElementById("nameInput");
const nameListContainer = document.getElementById("nameListContainer");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

// ✅ Add Name
window.addName = function () {
  const name = nameInput.value.trim();
  errorMsg.textContent = "";

  if (!name) return showError("Name cannot be empty.");
  if (name.length > 30) return showError("Name too long (max 30 chars).");
  if (nameList.includes(name)) return showError("Name must be unique.");

  nameList.unshift(name); // Add to top
  nameInput.value = "";
  renderNames();
};

// ✅ Render names in columns (max 10 per column)
function renderNames() {
  nameListContainer.innerHTML = '';

  const columns = Math.ceil(nameList.length / 10);
  for (let i = 0; i < columns; i++) {
    const col = document.createElement('div');
    col.className = 'name-column';

    nameList.slice(i * 10, (i + 1) * 10).forEach((name, index) => {
      const row = document.createElement('div');
      row.className = 'name-item';
      row.textContent = name;

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.textContent = '❌';
      del.onclick = () => {
        nameList.splice(i * 10 + index, 1);
        renderNames();
      };

      row.appendChild(del);
      col.appendChild(row);
    });

    nameListContainer.appendChild(col);
  }
}

// ✅ Show error
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

// ✅ Show success
function showSuccess(msg) {
  if (successMsg) successMsg.textContent = msg;
}

// ✅ Save List
window.saveList = async function () {
  const listName = prompt("Enter List Name")?.trim();
  const listPin = prompt("Enter 4-digit PIN")?.trim();
  const secretCode = prompt("Enter Secret Code")?.trim();

  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (!listName || !listPin || !secretCode) {
    return showError("List name, PIN and secret code are required.");
  }
  if (!/^\d{4}$/.test(listPin)) {
    return showError("PIN must be 4 digits.");
  }
  if (!/^[a-zA-Z0-9]{1,}$/i.test(secretCode)) {
    return showError("Secret code must be alphanumeric.");
  }
  if (nameList.length < 2) {
    return showError("Add at least 2 names.");
  }

  const confirmSave = confirm("Do you want to save this list?");
  if (!confirmSave) return;

  const listId = `${listName}_${listPin}`;
  const listRef = doc(db, "lists", listId);

  try {
    const exists = await getDoc(listRef);
    if (exists.exists()) {
      const overwrite = confirm("List already exists. Overwrite?");
      if (!overwrite) return;
    }

    await setDoc(listRef, {
      name: listName,
      pin: listPin,
      secretCode,
      participants: nameList,
      drawn: [],
      lastDraw: null,
      timestamp: Date.now()
    });

    showSuccess("✅ List saved successfully!");
    nameList = [];
    renderNames();
  } catch (err) {
    console.error("Error saving list:", err);
    showError("Failed to save list.");
  }
};
