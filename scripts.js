// Global list state
let participants = [];
let listName = localStorage.getItem("listName") || "";

// ✅ Add a participant name
function addName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return alert("Please enter a name.");
  if (name.length > 30) return alert("Name must be 30 characters or fewer.");
  if (participants.includes(name)) return alert("Name already exists.");

  participants.push(name);
  updateList();
  input.value = "";
}

// ✅ Remove by name or pop last
function removeName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  let removed;

  if (!name && participants.length > 0) {
    removed = participants.pop();
  } else {
    const index = participants.indexOf(name);
    if (index > -1) removed = participants.splice(index, 1)[0];
  }

  if (removed) alert(`Removed: ${removed}`);
  else alert("Name not found in list.");

  updateList();
  input.value = "";
}

// ✅ Display participant names
function updateList() {
  const list = document.getElementById("nameList");
  if (!list) return;
  list.innerHTML = "";
  participants.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

// ✅ Save list with name and PIN
function saveList() {
  const name = prompt("Enter a name for this list:").trim();
  if (!name) return alert("List name is required.");
  if (participants.length < 2) return alert("Add at least two participants.");

  const pin = prompt("Set a 4-digit PIN to protect your list:").trim();
  if (!/^\d{4}$/.test(pin)) return alert("Please enter a valid 4-digit PIN.");

  listName = name;
  localStorage.setItem("listName", listName);
  localStorage.setItem(`list_${listName}_participants`, JSON.stringify(participants));
  localStorage.setItem(`list_${listName}_pin`, pin);

  const userId = Date.now().toString();
  localStorage.setItem("userId", userId);

  // Show share link
  const link = `${window.location.origin}/draw.html?list=${encodeURIComponent(listName)}`;
  document.getElementById("shareLink").value = link;
  document.getElementById("shareContainer").style.display = "block";
  alert("List saved! Share the link below with your participants.");
}

// ✅ Draw a name randomly
function drawName() {
  const urlParams = new URLSearchParams(window.location.search);
  const listName = urlParams.get("list") || localStorage.getItem("listName");
  const userId = localStorage.getItem("userId") || Date.now().toString();
  localStorage.setItem("userId", userId);

  const drawnKey = `list_${listName}_drawn_${userId}`;
  if (localStorage.getItem(drawnKey)) {
    alert("You already drew a name.");
    return;
  }

  const listKey = `list_${listName}_participants`;
  const list = JSON.parse(localStorage.getItem(listKey) || "[]");
  if (list.length < 1) return alert("No names left to draw.");

  const index = Math.floor(Math.random() * list.length);
  const drawn = list.splice(index, 1)[0];

  localStorage.setItem(drawnKey, drawn);
  localStorage.setItem(listKey, JSON.stringify(list));
  document.getElementById("drawnName").textContent = `You got: ${drawn}`;

  const drawBtn = document.getElementById("drawBtn");
  if (drawBtn) {
    drawBtn.textContent = "My Drawn Name Is";
    drawBtn.disabled = true;
  }
}

// ✅ Copy drawn name text
function copyName() {
  const name = document.getElementById("drawnName").textContent;
  navigator.clipboard.writeText(name).then(() => alert("Copied!"));
}

// ✅ Send drawn name to email
function sendEmail() {
  const name = document.getElementById("drawnName").textContent;
  window.location.href = `mailto:?subject=Your Secret Gift Exchange Name&body=${encodeURIComponent(name)}`;
}

// ✅ Copy share link
function copyShareLink() {
  const input = document.getElementById("shareLink");
  input.select();
  document.execCommand("copy");
  alert("Link copied to clipboard!");
}
