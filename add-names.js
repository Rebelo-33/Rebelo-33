// ✅ add-names.js

import { db } from './firebase-config.js';
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let nameList = [];

window.addName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = '';

  if (!name) {
    errorMsg.textContent = "Name cannot be empty.";
    return;
  }

  nameList.unshift(name); // Add to beginning
  input.value = '';
  renderNames();
};

function renderNames() {
  const listElement = document.getElementById('nameList');
  listElement.innerHTML = '';

  nameList.forEach((name, index) => {
    const li = document.createElement('li');
    li.textContent = name;

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-button");
    deleteBtn.onclick = () => {
      nameList.splice(index, 1);
      renderNames();
    };

    li.appendChild(deleteBtn);
    listElement.appendChild(li);
  });
}

window.saveList = async function () {
  const listName = document.getElementById('listName').value.trim();
  const listPin = document.getElementById('listPin').value.trim();
  const secretCode = document.getElementById('secretCode').value.trim();
  const successMsg = document.getElementById('successMsg');
  const errorMsg = document.getElementById('errorMsg');

  successMsg.textContent = '';
  errorMsg.textContent = '';

  if (!listName || !listPin || !secretCode) {
    errorMsg.textContent = "List name, PIN and secret code are required.";
    return;
  }

  if (nameList.length < 2) {
    errorMsg.textContent = "Add at least 2 names.";
    return;
  }

  const confirmSave = confirm("Do you want to save this list?");
  if (!confirmSave) return;

  try {
    await setDoc(doc(db, "lists", listName), {
      name: listName,
      pin: listPin,
      secretCode: secretCode,
      participants: nameList,
      drawn: [],
      lastDraw: null,
      timestamp: Date.now()
    });

    successMsg.textContent = "List saved successfully!";
    nameList = [];
    renderNames();
    document.getElementById('listName').value = '';
    document.getElementById('listPin').value = '';
    document.getElementById('secretCode').value = '';
  } catch (err) {
    errorMsg.textContent = "Failed to save list.";
    console.error("[saveList] DB Error:", err);
  }
};
