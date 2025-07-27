// ✅ my-lists.js – Manage List Logic (View, Add, Delete, Save)
import { db } from "./firebase-config.js";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js";

let currentListId = "";
let participants = [];

const authSection = document.getElementById("auth-section");
const listSection = document.getElementById("list-section");
const tableBody = document.getElementById("table-body");
const listNameDisplay = document.getElementById("list-name-display");

const listNameInput = document.getElementById("listName");
const pinInput = document.getElementById("listPin");
const codeInput = document.getElementById("secretCode");

const manageBtn = document.getElementById("manage-btn");
const saveBtn = document.getElementById("save-changes-btn");
const addNameBtn = document.getElementById("add-name-btn");
const newNameInput = document.getElementById("new-name");

manageBtn.addEventListener("click", async () => {
  const listName = listNameInput.value.trim();
  const pin = pinInput.value.trim();
  const secretCode = codeInput.value.trim();

  if (!listName || !pin || !secretCode) {
    alert("Please enter all fields.");
    return;
  }

  const docRef = doc(db, "lists", listName);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("List not found.");
    return;
  }

  const data = docSnap.data();

  if (data.pin !== pin || data.secretCode !== secretCode) {
    alert("Invalid credentials.");
    return;
  }

  currentListId = listName;
  participants = data.participants || [];
  showList();
});

function showList() {
  authSection.style.display = "none";
  listSection.style.display = "block";

  listNameDisplay.textContent = `List: ${currentListId}`;
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = "";
  participants.forEach((name, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    nameCell.className = "name-cell";

    const deleteCell = document.createElement("td");
    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = "🗑️";
    deleteIcon.className = "delete-icon";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.title = `Delete ${name}`;

    deleteIcon.addEventListener("click", () => {
      if (confirm(`Delete ${name}?`)) {
        participants.splice(index, 1);
        renderTable();
      }
    });

    deleteCell.appendChild(deleteIcon);
    row.appendChild(nameCell);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
}

addNameBtn.addEventListener("click", () => {
  const newName = newNameInput.value.trim();
  if (!newName) {
    alert("Please enter a name.");
    return;
  }
  if (newName.length > 30) {
    alert("Name must be less than 30 characters.");
    return;
  }
  if (participants.includes(newName)) {
    alert("Name already exists in the list.");
    return;
  }

  participants.push(newName);
  newNameInput.value = "";
  renderTable();
});

saveBtn.addEventListener("click", async () => {
  if (!confirm("Do you want to save the changes?")) return;

  try {
    const docRef = doc(db, "lists", currentListId);
    await updateDoc(docRef, { participants });
    alert("List updated successfully.");
  } catch (err) {
    console.error("Error updating list:", err);
    alert("Failed to update the list.");
  }
});
