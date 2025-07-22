// ✅ my-lists.js
import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Extract DOM elements
const form = document.getElementById('pinAccessForm');
const pinInput = document.getElementById('accessPin');
const errorDisplay = document.getElementById('pinAccessError');

// Handle form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const pin = pinInput.value.trim();
  if (!pin || pin.length !== 4) {
    errorDisplay.textContent = "Please enter a valid 4-digit PIN.";
    return;
  }

  try {
    // 🔍 Search through the 'lists' collection for a matching pin
    const listsRef = db.collection('lists');
    const snapshot = await listsRef.get();

    let foundListId = null;
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.pin === pin) {
        foundListId = doc.id;
      }
    });

    if (foundListId) {
      // ✅ Redirect to draw.html with the correct listId
      window.location.href = `draw.html?listId=${foundListId}`;
    } else {
      errorDisplay.textContent = "List not found or incorrect PIN.";
    }

  } catch (error) {
    console.error("Error accessing list:", error);
    errorDisplay.textContent = "Error accessing list. Please try again.";
  }
});
