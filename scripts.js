// ✅ scripts.js – Handles participant name input & list saving
import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🟦 Store participant names
let nameList = [];

// ✅ Add a name
window.addName = function () {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();

  if (!name || name.length > 30 || nameList.includes(name)) {
    alert("Name must be unique, not empty, and under 30 characters.");
    return;
  }

  nameList.push(name);
  input.value = "";
  renderNameList();
};

// ✅ Render names in columns with delete buttons
function renderNameList() {
  const container = document.getElementById("nameListContainer");
  container.innerHTML = "";

  const maxPerColumn = 10;
  const columns = Math.ceil(nameList.length / maxPerColumn);

  for (let i = 0; i < columns; i++) {
    const column = document.createElement("div");
    column.className = "column";

    const start = i * maxPerColumn;
    const end = Math.min(start + maxPerColumn, nameList.length);

    for (let j = start; j < end; j++) {
      const name = nameList[j];

      const nameDiv = document.createElement("div");
      nameDiv.className = "name-item";

      const p = document.createElement("p");
      p.textContent = name;
      p.style.margin = "0";

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.title = "Delete name";

      // Important: capture index at this moment for proper deletion
      deleteBtn.addEventListener("click", () => {
        nameList.splice(j, 1);
        renderNameList();
      });

      nameDiv.appendChild(p);
      nameDiv.appendChild(deleteBtn);
      column.appendChild(nameDiv);
    }

    container.appendChild(column);
  }
}

// ✅ Save list to Firebase
window.saveList = async function () {
  if (nameList.length < 2) {
    alert("Please add at least two names to save the list.");
    return;
  }

  const listName = prompt("Enter a unique name for your list:");
  const pin = prompt("Set a 4-digit PIN:");
  const secret = prompt("Set a secret code (for organiser access):");

  if (!listName || !pin || pin.length !== 4 || !secret) {
    alert("All fields are required. PIN must be 4 digits.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "lists"), {
      name: listName,
      pin,
      secret,
      participants: nameList,
      createdAt: new Date().toISOString(),
    });

    const shareLink = `${location.origin}/draw.html?list=${encodeURIComponent(listName)}`;
    document.getElementById("shareLinkBox").innerHTML = `
      <p>List saved! Share this link with participants:</p>
      <input type="text" readonly value="${shareLink}" style="width:100%; padding:10px;" />
    `;
  } catch (e) {
    console.error("Error saving list:", e);
    alert("There was an error saving your list. Try again.");
  }
};
