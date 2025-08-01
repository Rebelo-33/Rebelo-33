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

  const combinedId = `${listName}_${listPin}`;

  try {
    const docRef = doc(db, "lists", combinedId);
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
    currentListId = combinedId;

    document.getElementById('authSection').style.display = "none";
    document.getElementById('listSection').style.display = "block";

    renderList(data.participants || []);
  } catch (err) {
    errorMsg.textContent = "Error connecting to database.";
    console.error("[verifyListAccess] DB Error:", err);
  }
};

function renderList(names) {
  const container = document.getElementById('nameListContainer');
  container.innerHTML = '';

  names.forEach(name => {
    const div = document.createElement('div');
    div.className = 'name-item';
    div.textContent = name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-button';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.onclick = () => {
      div.remove();
    };

    div.appendChild(deleteBtn);
    container.appendChild(div);
  });
}

window.addNameToList = function () {
  const input = document.getElementById('newNameInput');
  const newName = input.value.trim();
  const msg = document.getElementById('nameErrorMsg');

  msg.textContent = '';

  if (!newName) {
    msg.textContent = "Name cannot be empty.";
    return;
  }

  const existing = Array.from(document.getElementById('nameListContainer').children)
    .map(div => div.firstChild.textContent.trim());

  if (existing.includes(newName)) {
    msg.textContent = "Name already exists.";
    return;
  }

  const div = document.createElement('div');
  div.className = 'name-item';
  div.textContent = newName;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-button';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.onclick = () => {
    div.remove();
  };

  div.appendChild(deleteBtn);
  document.getElementById('nameListContainer').appendChild(div);
  input.value = '';
};

window.saveChanges = async function () {
  const nameList = Array.from(document.getElementById('nameListContainer').children)
    .map(div => div.firstChild.textContent.trim());

  const successMsg = document.getElementById('successMsg');
  const errorMsgList = document.getElementById('errorMsgList');

  successMsg.textContent = '';
  errorMsgList.textContent = '';

  if (!listData || !currentListId) {
    errorMsgList.textContent = "No list loaded.";
    return;
  }

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      participants: nameList
    });

    successMsg.textContent = "List updated successfully.";
  } catch (err) {
    errorMsgList.textContent = "Failed to save changes.";
    console.error("[saveChanges] Update error:", err);
  }
};
