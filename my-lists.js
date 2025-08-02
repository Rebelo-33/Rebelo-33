// ✅ my-lists.js
import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let listData = null;
let currentListId = null;

window.verifyListAccess = async function () {
  const listName = document.getElementById('listName').value.trim();
  const listPin = document.getElementById('listPin').value.trim();
  const secretCode = document.getElementById('secretCode').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  if (!listName || !listPin || !secretCode) {
    errorMsg.textContent = "Please fill in all fields.";
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
    if (data.pin !== listPin || data.secretCode !== secretCode) {
      errorMsg.textContent = "Incorrect PIN or Secret Code.";
      return;
    }

    listData = data;
    currentListId = `${listName}_${listPin}`;

    document.getElementById('authSection').style.display = "none";
    document.getElementById('listSection').style.display = "block";

    renderList(data.participants || []);
  } catch (err) {
    errorMsg.textContent = "Error connecting to database.";
    console.error("[verifyListAccess] DB Error:", err);
  }
};

// ✅ Renders current list into <ul>
function renderList(names) {
  const listContainer = document.getElementById('nameList');
  listContainer.innerHTML = '';

  names.forEach(name => {
    const li = document.createElement('li');
    li.className = 'name-item';
    li.textContent = name;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = "❌";
    removeBtn.classList.add("delete-button");
    removeBtn.style.marginLeft = "8px"; // 👈 space between name and ❌
    removeBtn.onclick = () => {
      li.remove();
    };

    li.appendChild(removeBtn);
    listContainer.appendChild(li);
  });
}

// ✅ Adds new name (memory only)
window.addNewName = function () {
  const input = document.getElementById('newNameInput');
  const name = input.value.trim();
  const errorMsgList = document.getElementById('errorMsgList');

  errorMsgList.textContent = '';

  if (!name || name.length > 30) {
    errorMsgList.textContent = "Name must be 1–30 characters.";
    return;
  }

  // Check for duplicate
  const currentNames = Array.from(document.getElementById('nameList').children)
    .map(li => li.firstChild.textContent.trim());

  if (currentNames.includes(name)) {
    errorMsgList.textContent = "Name already in the list.";
    return;
  }

  const li = document.createElement('li');
  li.className = 'name-item';
  li.textContent = name;

  const removeBtn = document.createElement('span');
  removeBtn.textContent = "❌";
  removeBtn.classList.add("delete-button");
  removeBtn.style.marginLeft = "10px";
  removeBtn.onclick = () => {
    li.remove();
  };

  li.appendChild(removeBtn);
  document.getElementById('nameList').appendChild(li);
  input.value = "";
};

// ✅ Save list to Firestore with confirmation
window.saveChanges = async function () {
  const successMsg = document.getElementById('successMsg');
  const errorMsgList = document.getElementById('errorMsgList');

  successMsg.textContent = '';
  errorMsgList.textContent = '';

  const nameList = Array.from(document.getElementById('nameList').children)
    .map(li => li.firstChild.textContent.trim());

  if (nameList.length < 2) {
    errorMsgList.textContent = "List must contain at least two names.";
    return;
  }

  if (!listData || !currentListId) {
    errorMsgList.textContent = "No list loaded.";
    return;
  }

  // 🟨 Ask for confirmation before saving
  const confirmSave = confirm("Do you want to save changes?");
  if (!confirmSave) {
    return; // ❌ Cancel save
  }

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      participants: nameList
    });

    successMsg.textContent = "List updated successfully.";
    successMsg.classList.add("red"); // ✅ Make the text red
  } catch (err) {
    errorMsgList.textContent = "Failed to save changes.";
    console.error("[saveChanges] Update error:", err);
  }
};
