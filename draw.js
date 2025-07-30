// ✅ draw.js - Handle Draw Page Logic
// ✅ draw.js
import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let listData = null;
let currentListId = null;

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
    const docRef = doc(db, "lists", listName);
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

    listData = data;
    currentListId = listName;
    document.getElementById('authSection').style.display = "none";
    document.getElementById('drawSection').style.display = "block";
    populateNameList(data.names);

  } catch (err) {
    errorMsg.textContent = "Error connecting to database.";
    console.error(err);
  }
};

function populateNameList(names) {
  const container = document.getElementById('nameListContainer');
  container.innerHTML = '';

  names.forEach(name => {
    const div = document.createElement('div');
    div.textContent = name;
    container.appendChild(div);
  });
}

window.drawName = async function () {
  const yourName = document.getElementById('yourName').value.trim();
  const resultBox = document.getElementById('resultBox');
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';
  resultBox.textContent = '';

  if (!yourName) {
    errorMsg.textContent = "Please enter your name.";
    return;
  }

  if (!listData || !listData.names.includes(yourName)) {
    errorMsg.textContent = "Your name is not on the list.";
    return;
  }

  if (listData.drawn && listData.drawn[yourName]) {
    resultBox.textContent = `You already drew: ${listData.drawn[yourName]}`;
    return;
  }

  const available = listData.names.filter(name =>
    name !== yourName && !Object.values(listData.drawn || {}).includes(name)
  );

  if (available.length === 0) {
    resultBox.textContent = "No available names to draw.";
    return;
  }

  const drawnName = available[Math.floor(Math.random() * available.length)];
  listData.drawn = { ...(listData.drawn || {}), [yourName]: drawnName };

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      drawn: listData.drawn
    });
    resultBox.textContent = `You drew: ${drawnName}`;
  } catch (err) {
    errorMsg.textContent = "Failed to update draw.";
    console.error(err);
  }
};
