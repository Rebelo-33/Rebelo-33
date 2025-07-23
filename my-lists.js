// ✅ my-lists.js
import { db } from './firebase-config.js';
import { getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentListId = null;
let currentData = null;

// 🔓 Organiser accesses list using list name, pin, and secret
window.accessList = async function () {
  const listName = document.getElementById('listName').value.trim();
  const pin = document.getElementById('pin').value.trim();
  const secret = document.getElementById('secretCode').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  if (!listName || !pin || !secret) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  const listId = `${listName.replace(/\s+/g, '_')}_${pin}`;
  const docRef = doc(db, "lists", listId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    errorMsg.textContent = "List not found.";
    return;
  }

  const data = docSnap.data();
  if (data.secret !== secret) {
    errorMsg.textContent = "Incorrect secret code.";
    return;
  }

  // ✅ Access granted — show UI
  currentListId = listId;
  currentData = data;

  document.getElementById("listContent").style.display = "block";
  document.getElementById("loadedListName").textContent = data.name;

  // Render participants in columns of 10
  const listEl = document.getElementById('participantList');
  listEl.innerHTML = '';
  data.participants.forEach((name, index) => {
    if (index % 10 === 0) {
      const col = document.createElement('ul');
      col.classList.add('column');
      listEl.appendChild(col);
    }
    const li = document.createElement('li');
    li.textContent = name;
    listEl.lastChild.appendChild(li);
  });
};

// 🧹 Remove name from loaded list
window.removeName = async function () {
  const removeInput = document.getElementById('removeInput').value.trim();
  if (!removeInput || !currentData || !currentListId) return;

  const index = currentData.participants.indexOf(removeInput);
  if (index === -1) {
    alert("Name not found.");
    return;
  }

  currentData.participants.splice(index, 1);
  await updateDoc(doc(db, "lists", currentListId), {
    participants: currentData.participants
  });

  document.getElementById('removeInput').value = '';
  accessList(); // Re-render updated list
};
