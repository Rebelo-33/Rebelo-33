// ✅ scripts.js – Unified logic for add-names.html and others

import { db } from './firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

// ✅ Shared state for names
let nameList = [];

// ✅ DOM Elements
const nameInput = document.getElementById("nameInput");
const nameListContainer = document.getElementById("nameList") || document.getElementById("nameListContainer");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

// ✅ Add Name to List
window.addName = function () {
  const name = nameInput?.value?.trim();
  errorMsg.textContent = "";

  if (!name) return showError("Name cannot be empty.");
  if (name.length > 30) return showError("Name too long (max 30 characters).");
  if (nameList.includes(name)) return showError("Name must be unique.");

  nameList.unshift(name);
  nameInput.value = "";
  renderNames();
};

// ✅ Render Name List in Grid
function renderNames() {
  if (!nameListContainer) return;
  nameListContainer.innerHTML = "";

  nameList.forEach((name, index) => {
    const div = document.createElement("div");
    div.className = "name-item";
    div.textContent = name;

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "❌";
    del.onclick = () => {
      nameList.splice(index, 1);
      renderNames();
    };

    div.appendChild(del);
    nameListContainer.appendChild(div);
  });
}

// ✅ Error display
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

// ✅ Success display
function showSuccess(msg) {
  if (successMsg) successMsg.textContent = msg;
}

// ✅ Open Save Modal (triggered by Save List button)
window.openSavePrompt = function () {
  if (nameList.length < 2) {
    return showError("Add at least 2 names to save a list.");
  }

  const modal = document.getElementById("saveModal");
  const modalError = document.getElementById("modalError");
  if (modal) {
    modal.style.display = "flex";
    modalError.textContent = "";
  }
};

// ✅ Close Save Modal
window.closeSavePrompt = function () {
  const modal = document.getElementById("saveModal");
  if (modal) modal.style.display = "none";
};

// ✅ Final Save List (from modal)
window.submitListDetails = async function () {
  const listName = document.getElementById("modalListName")?.value.trim();
  const pin = document.getElementById("modalPin")?.value.trim();
  const code = document.getElementById("modalCode")?.value.trim();
  const modalError = document.getElementById("modalError");

  if (!listName || !pin || !code) {
    modalError.textContent = "All fields are required.";
    return;
  }

  if (!/^\d{4}$/.test(pin)) {
    modalError.textContent = "PIN must be exactly 4 digits.";
    return;
  }

  if (!/^[a-zA-Z0-9]+$/.test(code)) {
    modalError.textContent = "Secret Code must be alphanumeric.";
    return;
  }

  const listId = `${listName}_${pin}`;
  const listRef = doc(db, "lists", listId);

  try {
    const docSnap = await getDoc(listRef);
    if (docSnap.exists()) {
      const overwrite = confirm("List already exists. Overwrite?");
      if (!overwrite) return;
    }

    await setDoc(listRef, {
      name: listName,
      pin: pin,
      secretCode: code,
      participants: nameList,
      drawn: [],
      lastDraw: null,
      timestamp: Date.now()
    });

    showSuccess("✅ List saved successfully!");
    nameList = [];
    renderNames();

    // Clear modal & inputs
    document.getElementById("modalListName").value = '';
    document.getElementById("modalPin").value = '';
    document.getElementById("modalCode").value = '';
    closeSavePrompt();
  } catch (err) {
    console.error("Error saving list:", err);
    modalError.textContent = "An error occurred while saving. Try again.";
  }
};

// ✅ Global close if user clicks outside modal content
window.addEventListener("click", function (e) {
  const modal = document.getElementById("saveModal");
  if (e.target === modal) {
    closeSavePrompt();
  }
});
