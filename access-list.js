// ✅ access-list.js
import { db } from './firebase-config.js';
import { collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Local state
let listData = null;
let listId = null;
let currentUser = localStorage.getItem('userId') || generateUserId();
localStorage.setItem('userId', currentUser);

// Generate unique user ID
function generateUserId() {
  return 'user_' + Math.random().toString(36).substring(2, 10);
}

// Submit PIN and load list
window.submitPin = async function () {
  const pin = document.getElementById('pinInput').value.trim();
  const q = query(collection(db, "lists"), where("pin", "==", pin));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    document.getElementById('pinError').textContent = "Invalid PIN.";
    return;
  }

  const docSnap = snapshot.docs[0];
  listId = docSnap.id;
  listData = docSnap.data();

  document.getElementById('pinModal').style.display = 'none';
  renderList(listData);
};

// Render the list and UI
function renderList(data) {
  document.getElementById('listContent').style.display = 'block';
  document.getElementById('listName').textContent = data.name;

  const ul = document.getElementById('participantList');
  ul.innerHTML = '';
  data.participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    ul.appendChild(li);
  });

  // If already drawn
  const drawn = localStorage.getItem(`drawn_${listId}`);
  if (drawn) {
    document.getElementById('drawnName').textContent = `You drew: ${drawn}`;
    document.getElementById('drawBtn').textContent = "View Drawn Name";
    document.getElementById('drawBtn').disabled = true;
  }

  document.getElementById('drawBtn').addEventListener('click', drawName);
}

// Draw a name randomly
async function drawName() {
  if (!listData || !listData.participants) return;

  const drawnAlready = localStorage.getItem(`drawn_${listId}`);
  if (drawnAlready) {
    document.getElementById('drawnName').textContent = `You drew: ${drawnAlready}`;
    return;
  }

  let available = listData.participants.filter(n => n !== currentUser);
  if (available.length === 0) {
    alert("No available names left.");
    return;
  }

  const index = Math.floor(Math.random() * available.length);
  const drawn = available[index];

  document.getElementById('drawnName').textContent = `You drew: ${drawn}`;
  localStorage.setItem(`drawn_${listId}`, drawn);

  // Optional: Remove drawn name from Firebase if you want
  // listData.participants = listData.participants.filter(n => n !== drawn);
  // await updateDoc(doc(db, "lists", listId), { participants: listData.participants });

  document.getElementById('drawBtn').textContent = "View Drawn Name";
  document.getElementById('drawBtn').disabled = true;
}
