// ✅ scripts.js
import { db } from "./firebase-config.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// -------------------------
// GLOBALS
// -------------------------
let currentList = null;
let currentPin = null;
let drawnName = null;

// -------------------------
// ADD NAME TO PARTICIPANT LIST
// -------------------------
window.addName = () => {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return alert("Please enter a name.");
  if (name.length > 30) return alert("Name must be 30 characters or fewer.");

  if (!currentList) currentList = [];
  if (currentList.includes(name)) return alert("Name already added.");

  currentList.push(name);
  updateNameList();
  input.value = "";
};

function updateNameList() {
  const listEl = document.getElementById("nameList");
  if (!listEl) return;
  listEl.innerHTML = "";
  currentList.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    listEl.appendChild(li);
  });
}

// -------------------------
// REMOVE NAME
// -------------------------
window.removeName = () => {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();

  if (!name && currentList.length > 0) {
    const removed = currentList.pop();
    alert(`Removed: ${removed}`);
  } else {
    const index = currentList.indexOf(name);
    if (index > -1) {
      currentList.splice(index, 1);
      alert(`Removed: ${name}`);
    } else {
      alert("Name not found in list.");
    }
  }

  updateNameList();
  input.value = "";
};

// -------------------------
// SAVE LIST TO FIREBASE
// -------------------------
window.saveList = async () => {
  const listName = prompt("Enter a name for this list:");
  const pin = prompt("Enter a 4-digit PIN to protect this list:");

  if (!listName || !pin || pin.length !== 4 || isNaN(pin)) {
    alert("Invalid list name or PIN. Please try again.");
    return;
  }

  if (!currentList || currentList.length < 2) {
    alert("Add at least two participants.");
    return;
  }

  const docRef = doc(db, "lists", `${listName}_${pin}`);
  await setDoc(docRef, {
    listName,
    pin,
    participants: currentList,
    drawn: [],
    createdAt: Date.now()
  });

  const link = `${window.location.origin}/draw.html?list=${listName}&pin=${pin}`;
  alert("List saved! Share this link: " + link);
  localStorage.setItem("myList", JSON.stringify({ listName, pin }));

  // Optionally redirect to draw
  window.location.href = link;
};

// -------------------------
// LOAD LIST FOR DRAW
// -------------------------
window.loadListForDraw = async () => {
  const pinInput = document.getElementById("listPinInput");
  const queryPin = new URLSearchParams(window.location.search).get("pin");
  const queryList = new URLSearchParams(window.location.search).get("list");

  const listName = pinInput?.value || queryList;
  const pin = pinInput?.value || queryPin;

  if (!listName || !pin) return alert("PIN and list name required.");
  const docRef = doc(db, "lists", `${listName}_${pin}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("List not found.");
    return;
  }

  const listData = docSnap.data();
  currentList = listData.participants;
  currentPin = pin;

  const alreadyDrawn = localStorage.getItem(`${listName}_${pin}_drawn`);
  if (alreadyDrawn) {
    document.getElementById("drawnName").textContent = `You got: ${alreadyDrawn}`;
  }

  document.getElementById("drawSection").style.display = "block";
};

// -------------------------
// DRAW NAME FROM LIST
// -------------------------
window.drawName = async () => {
  const listName = new URLSearchParams(window.location.search).get("list");
  const pin = new URLSearchParams(window.location.search).get("pin");
  const key = `${listName}_${pin}_drawn`;

  const docRef = doc(db, "lists", `${listName}_${pin}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return alert("List no longer available.");

  const listData = docSnap.data();
  const remaining = listData.participants.filter(name => !listData.drawn.includes(name));

  if (remaining.length === 0) return alert("All names have been drawn.");

  // Anti-redraw
  if (localStorage.getItem(key)) {
    document.getElementById("drawnName").textContent = `You got: ${localStorage.getItem(key)}`;
    return;
  }

  const randomIndex = Math.floor(Math.random() * remaining.length);
  const selectedName = remaining[randomIndex];

  await updateDoc(docRef, {
    drawn: arrayUnion(selectedName)
  });

  localStorage.setItem(key, selectedName);
  document.getElementById("drawnName").textContent = `You got: ${selectedName}`;
};

// -------------------------
// COPY TO CLIPBOARD
// -------------------------
window.copyName = () => {
  const text = document.getElementById("drawnName").textContent;
  navigator.clipboard.writeText(text);
};

// -------------------------
// EMAIL NAME
// -------------------------
window.sendEmail = () => {
  const name = document.getElementById("drawnName").textContent;
  window.location.href = `mailto:?subject=Your Secret Gift Exchange Name&body=${encodeURIComponent(name)}`;
};

// -------------------------
// LOAD MY LISTS ON my-lists.html
// -------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("myListsContainer");
  const myList = localStorage.getItem("myList");

  if (container && myList) {
    const { listName, pin } = JSON.parse(myList);
    const link = `draw.html?list=${listName}&pin=${pin}`;
    container.innerHTML = `<li><strong>${listName}</strong> (PIN: ${pin}) - <a href="${link}">Access</a></li>`;
  }
});
