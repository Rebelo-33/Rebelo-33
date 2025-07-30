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
    const docRef = doc(db, "lists", listName);
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
    currentListId = listName;

    document.getElementById('authSection').style.display = "none";
    document.getElementById('listSection').style.display = "block";

    renderList(data.names || []);
  } catch (err) {
    errorMsg.textContent = "Error connecting to database.";
    console.error("[verifyListAccess] DB Error:", err);
  }
};

function renderList(names) {
  const listContainer = document.getElementById('nameList');
  listContainer.innerHTML = '';

  names.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = "❌";
    removeBtn.classList.add("delete-button");
    removeBtn.onclick = () => {
      li.remove();
    };

    li.appendChild(removeBtn);
    listContainer.appendChild(li);
  });
}

window.saveChanges = async function () {
  const nameList = Array.from(document.getElementById('nameList').children)
    .map(li => li.firstChild.textContent.trim());

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
      names: nameList
    });

    successMsg.textContent = "List updated successfully.";
  } catch (err) {
    errorMsgList.textContent = "Failed to save changes.";
    console.error("[saveChanges] Update error:", err);
  }
};
