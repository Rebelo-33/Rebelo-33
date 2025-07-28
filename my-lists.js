// ✅ my-lists.js - Secure access and list update

import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Global variable to hold current list reference
let currentListRef = null;
let currentListData = null;

// ✅ Handle List Access Verification
window.verifyListAccess = async function () {
  const listName = document.getElementById("listName").value.trim();
  const listPin = document.getElementById("listPin").value.trim();
  const secretCode = document.getElementById("secretCode").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Basic validation
  if (!listName || !listPin || !secretCode) {
    errorMsg.textContent = "Please enter list name, PIN and secret code.";
    return;
  }

  try {
    const docRef = doc(db, "giftLists", listName);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      errorMsg.textContent = "List not found.";
      return;
    }

    const data = docSnap.data();
    if (data.pin === listPin && data.secretCode === secretCode) {
      // ✅ Access granted
      errorMsg.textContent = "";
      currentListRef = docRef;
      currentListData = data;

      // Hide login and show list
      document.getElementById("authSection").style.display = "none";
      document.getElementById("listSection").style.display = "block";

      displayCurrentNames(data.participants || []);
    } else {
      errorMsg.textContent = "Incorrect PIN or secret code.";
    }
  } catch (err) {
    console.error("Access error:", err);
    errorMsg.textContent = "An error occurred while verifying access.";
  }
};

// ✅ Display Names in Columns
function displayCurrentNames(names) {
  const container = document.getElementById("currentNames");
  container.innerHTML = "";

  if (names.length === 0) {
    container.textContent = "No names in the list.";
    return;
  }

  // Sort and break into columns of 10
  const columns = Math.ceil(names.length / 10);
  for (let i = 0; i < columns; i++) {
    const colDiv = document.createElement("div");
    colDiv.className = "column";
    const start = i * 10;
    const end = start + 10;
    names.slice(start, end).forEach((name) => {
      const row = document.createElement("div");
      row.className = "name-row";
      row.textContent = name;

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.className = "delete-button";
      delBtn.onclick = () => removeName(name);

      row.appendChild(delBtn);
      colDiv.appendChild(row);
    });
    container.appendChild(colDiv);
  }
}

// ✅ Add Name to List (in memory)
window.addNameToList = function () {
  const input = document.getElementById("newNameInput");
  const newName = input.value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!newName || newName.length > 30) {
    errorMsg.textContent = "Name must be 1–30 characters.";
    return;
  }

  if (!currentListData.participants.includes(newName)) {
    currentListData.participants.push(newName);
    displayCurrentNames(currentListData.participants);
    input.value = "";
    errorMsg.textContent = "";
  } else {
    errorMsg.textContent = "Name already exists in the list.";
  }
};

// ✅ Remove name (in memory only)
function removeName(name) {
  currentListData.participants = currentListData.participants.filter(
    (n) => n !== name
  );
  displayCurrentNames(currentListData.participants);
}

// ✅ Save Changes to Firebase
window.saveUpdatedList = async function () {
  if (!currentListRef || !currentListData) return;

  try {
    await updateDoc(currentListRef, {
      participants: currentListData.participants,
    });

    document.getElementById("errorMsg").textContent = "List updated successfully.";
  } catch (err) {
    console.error("Save error:", err);
    document.getElementById("errorMsg").textContent =
      "Failed to save changes. Try again.";
  }
};
