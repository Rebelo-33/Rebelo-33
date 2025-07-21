// ✅ draw.js
import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const listCode = urlParams.get("code");
const drawnNameDisplay = document.getElementById("drawnNameDisplay");
const drawBtn = document.getElementById("drawBtn");

let alreadyDrawn = localStorage.getItem(`drawn_${listCode}`);
if (alreadyDrawn) {
  drawnNameDisplay.textContent = "You got: " + alreadyDrawn;
  drawBtn.textContent = "My Drawn Name";
}

drawBtn.addEventListener("click", async () => {
  if (alreadyDrawn) return;

  const listRef = doc(db, "lists", listCode);
  const docSnap = await getDoc(listRef);

  if (!docSnap.exists()) {
    alert("List not found.");
    return;
  }

  const data = docSnap.data();
  let pool = data.participants || [];

  if (!pool.length) {
    alert("No participants left to draw.");
    return;
  }

  const index = Math.floor(Math.random() * pool.length);
  const drawn = pool.splice(index, 1)[0];

  // Save back to Firestore
  await updateDoc(listRef, { participants: pool });

  // Display & save locally
  localStorage.setItem(`drawn_${listCode}`, drawn);
  drawnNameDisplay.textContent = "You got: " + drawn;
  drawBtn.textContent = "My Drawn Name";
});

window.copyName = function () {
  navigator.clipboard.writeText(drawnNameDisplay.textContent);
};

window.sendEmail = function () {
  const name = drawnNameDisplay.textContent;
  window.location.href = `mailto:?subject=Your Drawn Name&body=${encodeURIComponent(name)}`;
};
