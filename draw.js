// ✅ draw.js - Handles participant authentication and anonymous drawing logic
// ✅ draw.js - Secure Anonymous Drawing with Hashing
// ✅ draw.js – Handles secure anonymous drawing of names
// ✅ draw.js – Secure Name Drawing with Login Session
// ✅ draw.js - Handles secure anonymous drawing
import { db } from './firebase-config.js';
import { collection, getDocs, query, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

let listData = null;
let drawnName = null;

// 🔐 Verify list name and pin before showing draw section
window.verifyDrawAccess = async function () {
  const name = document.getElementById("listName").value.trim();
  const pin = document.getElementById("listPin").value.trim();
  const errorBox = document.getElementById("errorMsg");

  if (!name || !pin) {
    errorBox.textContent = "List name and PIN are required.";
    return;
  }

  const q = query(collection(db, "lists"), where("name", "==", name), where("pin", "==", pin));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    listData = querySnapshot.docs[0];
    sessionStorage.setItem("listId", listData.id);
    document.getElementById("authSection").style.display = "none";
    document.getElementById("drawSection").style.display = "block";

    renderNameList(listData.data().participants);
  } else {
    errorBox.textContent = "Incorrect list name or PIN.";
  }
};

// 🎯 Display names to confirm user identity
function renderNameList(names) {
  const container = document.getElementById("nameListContainer");
  container.innerHTML = "";
  const col = document.createElement("div");
  col.className = "column";
  names.forEach(name => {
    const p = document.createElement("p");
    p.textContent = name;
    col.appendChild(p);
  });
  container.appendChild(col);
}

// 🧠 Utility: Hashing function
async function hashValue(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// 🎁 Draw logic
window.drawName = async function () {
  const yourName = document.getElementById("yourName").value.trim();
  const errorBox = document.getElementById("errorMsg");
  const resultBox = document.getElementById("resultBox");

  if (!yourName) {
    errorBox.textContent = "Enter your name first.";
    return;
  }

  const data = listData.data();
  const hashKey = await hashValue(yourName);

  if (data.drawn && data.drawn[hashKey]) {
    resultBox.textContent = `🎉 You previously drew: ${data.drawn[hashKey]}`;
    document.getElementById("drawButton").style.display = "none";
    return;
  }

  const names = data.participants.filter(n => n !== yourName);
  const available = names.filter(n => !Object.values(data.drawn || {}).includes(n));

  if (available.length === 0) {
    resultBox.textContent = "No available names left to draw.";
    return;
  }

  const drawn = available[Math.floor(Math.random() * available.length)];

  // Update Firestore with new draw
  const updatedDraws = data.drawn || {};
  updatedDraws[hashKey] = drawn;

  await updateDoc(doc(db, "lists", listData.id), {
    drawn: updatedDraws,
    lastDraw: new Date()
  });

  resultBox.textContent = `🎉 You drew: ${drawn}`;
  document.getElementById("drawButton").style.display = "none";
};
