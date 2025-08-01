import { db } from './firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

/* ✅ Shared state */
let nameList = [];

/* ✅ DOM references */
const nameInput = document.getElementById("nameInput");
const nameListContainer = document.getElementById("nameList");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");
const shareBox = document.getElementById("shareLinkBox");

/* ✅ Add name to in-memory list */
window.addName = function () {
  const name = nameInput.value.trim();
  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (!name) return showError("Name cannot be empty.");
  if (name.length > 30) return showError("Name too long (max 30 chars).");
  if (nameList.includes(name)) return showError("Name must be unique.");

  nameList.unshift(name); // Add to top
  nameInput.value = "";
  renderNames();
};

/* ✅ Display all names above input */
function renderNames() {
  nameListContainer.innerHTML = ""; // Clear

  nameList.forEach((name, index) => {
    const div = document.createElement("div");
    div.className = "name-item";
    div.textContent = name;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => {
      nameList.splice(index, 1);
      renderNames();
    };

    div.appendChild(delBtn);
    nameListContainer.appendChild(div);
  });
}

/* ✅ Show error message */
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

/* ✅ Show success message */
function showSuccess(msg) {
  if (successMsg) successMsg.textContent = msg;
}

/* ✅ Save list with validation */
window.saveList = async function () {
  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (nameList.length < 2) {
    return showError("Please add at least 2 names.");
  }

  const listName = prompt("Enter a unique list name:");
  const listPin = prompt("Enter a 4-digit PIN:");
  const secretCode = prompt("Enter a secret code (letters and numbers):");

  if (!listName || !listPin || !secretCode) {
    return showError("List name, PIN and secret code are required.");
  }

  const listId = `${listName}_${listPin}`;
  const listRef = doc(db, "lists", listId);

  try {
    const existing = await getDoc(listRef);
    if (existing.exists()) {
      return showError("List name with this PIN already exists. Choose a new name.");
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
    if (shareBox) {
      shareBox.innerHTML = `<p>Share this list name: <strong>${listName}</strong> and PIN: <strong>${listPin}</strong>.</p>`;
    }
  } catch (err) {
    console.error("[saveList] Firebase error:", err);
    showError("An error occurred while saving. Try again.");
  }
};
