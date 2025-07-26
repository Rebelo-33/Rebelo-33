// ✅ draw.js - Secure Anonymous Drawing with Hashed Results

// Utility to hash names using SHA-256
async function hashName(name) {
  const encoder = new TextEncoder();
  const data = encoder.encode(name);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Fetch participant list from Firebase (pseudo)
async function getParticipants(listId) {
  const snapshot = await firebase.database().ref(`lists/${listId}/participants`).once("value");
  return snapshot.val() || [];
}

// Get already drawn names (hashed)
async function getDrawnHashes(listId) {
  const snapshot = await firebase.database().ref(`lists/${listId}/draws`).once("value");
  return snapshot.val() || {};
}

// Handle draw
async function drawName() {
  const listName = document.getElementById("listName").value.trim();
  const pin = document.getElementById("pinInput").value.trim();
  const userName = document.getElementById("userName").value.trim();

  if (!listName || !pin || !userName) {
    document.getElementById("pinError").textContent = "Please fill all fields.";
    return;
  }

  try {
    const listRef = firebase.database().ref(`lists/${listName}`);
    const listSnap = await listRef.once("value");
    const listData = listSnap.val();

    if (!listData || listData.pin !== pin) {
      document.getElementById("pinError").textContent = "Invalid list name or PIN.";
      return;
    }

    const participants = await getParticipants(listName);
    if (!participants.includes(userName)) {
      document.getElementById("pinError").textContent = "Name not found in list.";
      return;
    }

    const drawsRef = firebase.database().ref(`lists/${listName}/draws`);
    const existingDraw = await drawsRef.child(userName).once("value");

    if (existingDraw.exists()) {
      document.getElementById("drawnName").textContent = "You already drew a name.";
      return;
    }

    const drawnHashes = Object.values(await getDrawnHashes(listName));
    const remaining = participants.filter(p => p !== userName && !drawnHashes.includes(await hashName(p)));

    if (remaining.length === 0) {
      document.getElementById("pinError").textContent = "No available names left to draw.";
      return;
    }

    const drawn = remaining[Math.floor(Math.random() * remaining.length)];
    const drawnHash = await hashName(drawn);

    await drawsRef.child(userName).set(drawnHash);

    document.getElementById("drawnName").textContent = `🎁 You drew: ${drawn}`;
  } catch (err) {
    console.error(err);
    document.getElementById("pinError").textContent = "An error occurred. Try again later.";
  }
}
