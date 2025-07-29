// ✅ draw.js - Handle Draw Page Logic

import { db } from "./firebase-config.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentListData = null;
let currentListRef = null;

// ✅ Verify List Access
window.verifyDrawAccess = async function () {
  const listName = document.getElementById("listName").value.trim();
  const listPin = document.getElementById("listPin").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = ""; // Clear old error

  if (!listName || !listPin) {
    errorMsg.textContent = "List name and PIN are required.";
    return;
  }

  try {
    const ref = doc(db, "giftLists", listName);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      errorMsg.textContent = "List not found. Check name and try again.";
      return;
    }

    const data = snap.data();
    if (data.pin === listPin) {
      // ✅ Auth successful
      currentListRef = ref;
      currentListData = data;
      document.getElementById("authSection").style.display = "none";
      document.getElementById("drawSection").style.display = "block";
    } else {
      errorMsg.textContent = "Incorrect PIN.";
    }
  } catch (err) {
    console.error("Login error:", err);
    errorMsg.textContent = "An error occurred during login.";
  }
};

// ✅ Draw a name from the list
window.drawName = async function () {
  const yourName = document.getElementById("yourName").value.trim();
  const drawErrorMsg = document.getElementById("drawErrorMsg");
  const resultBox = document.getElementById("resultBox");

  drawErrorMsg.textContent = "";
  resultBox.textContent = "";

  if (!yourName) {
    drawErrorMsg.textContent = "Please enter your name.";
    return;
  }

  const allNames = currentListData.participants;
  const drawn = currentListData.drawn || {};

  if (!allNames.includes(yourName)) {
    if (!window._nameRetry) {
      window._nameRetry = true;
      drawErrorMsg.textContent = "Name not found. Try again.";
    } else {
      drawErrorMsg.textContent = "Confirm name is on the list.";
    }
    return;
  }

  if (drawn[yourName]) {
    resultBox.textContent = `🎉 You already drew: ${drawn[yourName]}`;
    return;
  }

  const available = allNames.filter(name => name !== yourName && !Object.values(drawn).includes(name));

  if (available.length === 0) {
    drawErrorMsg.textContent = "No names left to draw!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const assignedName = available[randomIndex];

  drawn[yourName] = assignedName;

  try {
    await updateDoc(currentListRef, { drawn });
    resultBox.textContent = `🎉 You drew: ${assignedName}`;
  } catch (err) {
    console.error("Draw error:", err);
    drawErrorMsg.textContent = "Failed to save draw. Try again.";
  }
};
