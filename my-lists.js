// ✅ my-lists.js
import { db } from './firebase-config.js';
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Get form elements
const form = document.getElementById('listAccessForm');
const resultDiv = document.getElementById('resultArea');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const listName = document.getElementById('listNameInput').value.trim();
  const pin = document.getElementById('pinInput').value.trim();

  if (!listName || !pin) {
    resultDiv.textContent = "Please enter both list name and PIN.";
    return;
  }

  const listId = `${listName.replace(/\s+/g, '_')}_${pin}`;

  try {
    const docRef = doc(db, 'lists', listId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      resultDiv.textContent = "List not found.";
      return;
    }

    const data = docSnap.data();
    if (data.pin !== pin) {
      resultDiv.textContent = "Incorrect PIN.";
      return;
    }

    // ✅ Redirect to access-list with query params
    window.location.href = `access-list.html?listId=${encodeURIComponent(listId)}&pin=${encodeURIComponent(pin)}`;
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Error accessing the list.";
  }
});
