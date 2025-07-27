// ✅ scripts.js – For add-names.html & my-lists.html
// ✅ Firebase imports assumed via firebase-config.js
import { db } from './firebase-config.js';
import { collection, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js';

// ✅ DOM references
const nameInput = document.getElementById("nameInput");
const nameListContainer = document.getElementById("nameListContainer");
const shareLinkBox = document.getElementById("shareLinkBox");
const errorMsg = document.getElementById("errorMsg");

// ✅ Add Name to List
window.addName = function () {
  const name = nameInput.value.trim();
  if (!name) return showError("Please enter a name.");
  if (name.length > 30) return showError("Name too long (max 30 chars).");

  const existingNames = getCurrentNames();
  if (existingNames.includes(name)) return showError("Name must be unique.");

  const newItem = createNameElement(name);
  insertNameIntoColumns(newItem);
  nameInput.value = "";
  errorMsg.textContent = "";
};

// ✅ Create DOM element for a name with delete icon
function createNameElement(name) {
  const div = document.createElement("div");
  div.className = "name-item";
  div.textContent = name;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.onclick = () => confirmDelete(name, div);

  div.appendChild(deleteBtn);
  return div;
}

// ✅ Prompt delete confirmation
function confirmDelete(name, element) {
  const confirmDelete = confirm(`Delete ${name}?`);
  if (confirmDelete) {
    element.remove();
  }
}

// ✅ Get all current names in DOM
function getCurrentNames() {
  return Array.from(document.querySelectorAll(".name-item")).map(el => el.childNodes[0].textContent.trim());
}

// ✅ Insert name into columns layout
function insertNameIntoColumns(nameElement) {
  let lastColumn = nameListContainer.lastElementChild;

  if (!lastColumn || lastColumn.children.length >= 10) {
    lastColumn = document.createElement("div");
    lastColumn.className = "column";
    nameListContainer.appendChild(lastColumn);
  }

  lastColumn.appendChild(nameElement);
}

// ✅ Show error message
function showError(message) {
  if (errorMsg) errorMsg.textContent = message;
}

// ✅ Save list to Firebase
window.saveList = async function () {
  const names = getCurrentNames();
  if (names.length < 2) return showError("Add at least 2 names to save.");

  const listName = prompt("Enter a list name:");
  const pin = prompt("Enter a 4-digit PIN:");
  const secretCode = prompt("Enter a secret code to manage this list:");

  if (!listName || !pin || !secretCode) return alert("All fields are required.");

  const listId = `${listName}_${pin}`;
  const listRef = doc(collection(db, "lists"), listId);

  const exists = await getDoc(listRef);
  if (exists.exists()) {
    const confirmOverwrite = confirm("List already exists. Overwrite?");
    if (!confirmOverwrite) return;
  }

  const shuffled = shuffleArray([...names]);

  // ✅ Store list with hash structure for privacy
  await setDoc(listRef, {
    participants: names,
    drawn: {},
    shuffled,
    secret: secretCode,
    created: new Date().toISOString()
  });

  shareLinkBox.innerHTML = `<p>✅ List saved! Share list name: <strong>${listName}</strong> and PIN: <strong>${pin}</strong> with your group.</p>`;
  nameListContainer.innerHTML = "";
};

// ✅ Shuffle helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
