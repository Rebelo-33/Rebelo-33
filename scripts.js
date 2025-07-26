// ✅ scripts.js – Handles participant name input & list saving
import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🟦 Store participant names
let nameList = [];

// ✅ Add a name to the list
window.addName = function () {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();

  if (!name || name.length > 30 || nameList.includes(name)) {
    alert("Name must be unique, not empty, and under 30 characters.");
    return;
  }

  nameList.push(name);
  input.value = "";
  renderNameList(); // Re-render the name list with updated items
};

// ✅ Render names in columns (10 per column), each with a delete button (trash icon)
function renderNameList() {
  const container = document.getElementById("nameListContainer");
  container.innerHTML = ""; // Clear previous display

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

      // ✅ Replace 🗑️ emoji with trash can lid SVG
      deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M5.5 5.5a.5.5 0 011 0v7a.5.5 0 01-1 0v-7zm3 0a.5.5 0 011 0v7a.5.5 0 01-1 0v-7z"/>
          <path fill-rule="evenodd"
            d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 010-2h3.09a1 1 0 01.91.59l.26.52h2.48l.26-.52a1 1 0 01.91-.59H14a1 1 0 011 1zM12 4H4v9a1 1 0 001 1h6a1 1 0 001-1V4z"/>
        </svg>
      `;
      deleteBtn.title = "Delete name";

      // ✅ Use actual index for delete (j might shift due to re-rendering)
      // Capture the current name in closure, not index
      deleteBtn.addEventListener("click", () => {
        nameList = nameList.filter(n => n !== name);
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
