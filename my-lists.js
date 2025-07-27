<!-- ✅ my-lists.js -->
import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

window.manageList = async function () {
  const listName = document.getElementById("listName").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const secret = document.getElementById("secret").value.trim();

  if (!listName || !pin || !secret) {
    alert("All fields are required.");
    return;
  }

  const docRef = doc(db, "lists", `${listName}_${pin}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().secret !== secret) {
    alert("Invalid credentials.");
    return;
  }

  const data = docSnap.data();
  const participants = data.participants || [];
  const container = document.getElementById("manageContainer");

  container.innerHTML = participants
    .map(
      (name, index) => `
        <div class="name-item">
          <p>${name}</p>
          <button class="delete-btn" onclick="deleteName(${index})">
            🗑️
          </button>
        </div>
      `
    )
    .join("");

  window.deleteName = (index) => {
    const confirmDelete = confirm(`Delete ${participants[index]}?`);
    if (!confirmDelete) return;

    participants.splice(index, 1);
    updateDoc(docRef, { participants });
    manageList();
  };
};

