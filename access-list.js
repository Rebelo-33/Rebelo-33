// ✅ access-list.js
import { db } from './firebase-config.js';
import { collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const pinInput = document.getElementById("pinInput");
const pinBtn = document.getElementById("pinSubmitBtn");
const pinError = document.getElementById("pinError");
const listNameHeading = document.getElementById("listNameHeading");
const participantList = document.getElementById("participantList");
const listSection = document.getElementById("listSection");
const pinSection = document.getElementById("pinSection");
const drawBtn = document.getElementById("drawBtn");
const drawnNameDisplay = document.getElementById("drawnNameDisplay");

let loadedList = null;
let docId = null;

pinBtn.addEventListener("click", async () => {
  const enteredPin = pinInput.value.trim();

  if (enteredPin.length !== 4 || isNaN(enteredPin)) {
    pinError.textContent = "Please enter a 4-digit number PIN.";
    return;
  }

  // Query Firestore for list by PIN
  const q = query(collection(db, "lists"), where("pin", "==", enteredPin));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    pinError.textContent = "No list found with that PIN.";
    return;
  }

  // Use first match
  querySnapshot.forEach((docSnap) => {
    loadedList = docSnap.data();
    docId = docSnap.id;
  });

  pinSection.style.display = "none";
  listSection.style.display = "block";

  // Show list name and participants
  listNameHeading.textContent = loadedList.name;
  participantList.innerHTML = loadedList.participants.map(p => `<li>${p}</li>`).join("");

  const alreadyDrawn = localStorage.getItem(`drawn_${docId}`);
  if (alreadyDrawn) {
    drawnNameDisplay.textContent = `🎁 You drew: ${alreadyDrawn}`;
    drawBtn.style.display = "none";
  } else {
    drawBtn.style.display = "inline-block";
  }
});

// Draw name logic
drawBtn.addEventListener("click", async () => {
  if (!loadedList || !docId) return;

  const names = [...loadedList.participants];
  const drawn = localStorage.getItem(`drawn_${docId}`);

  if (drawn) {
    drawnNameDisplay.textContent = `🎁 You drew: ${drawn}`;
    drawBtn.style.display = "none";
    return;
  }

  // Draw random name
  const index = Math.floor(Math.random() * names.length);
  const picked = names.splice(index, 1)[0];

  // Save locally (anonymously per device)
  localStorage.setItem(`drawn_${docId}`, picked);

  // Update Firestore
  await updateDoc(doc(db, "lists", docId), {
    participants: names
  });

  drawnNameDisplay.textContent = `🎁 You drew: ${picked}`;
  drawBtn.style.display = "none";
});
