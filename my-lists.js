import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Shared state
let listData = null;
let currentListId = null;

// ✅ Handle login for list editing
window.verifyListAccess = async function () {
  const listName = document.getElementById('listName').value.trim();
  const listPin = document.getElementById('listPin').value.trim();
  const secretCode = document.getElementById('secretCode').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  clearMessages();

  if (!listName || !listPin || !secretCode) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const docRef = doc(db, "lists", `${listName}_${listPin}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      errorMsg.textContent = "List not found.";
      return;
    }

    const data = docSnap.data();
    if (data.pin !== listPin || data.secretCode !== secretCode) {
      errorMsg.textContent = "Incorrect PIN or Secret Code.";
      return;
    }

    listData = data;
    currentListId = `${listName}_${listPin}`;

    document.getElementById('authSection').style.display = "none";
    document.getElementById('listSection').style.display = "block";

    renderList(data.participants || []);
  } catch (err) {
    errorMsg.textContent = "Error connecting to database.";
    console.error("[verifyListAccess] DB Error:", err);
  }
};

// ✅ Render name list
function renderList(names) {
  const listContainer = document.getElementById('nameList');
  listContainer.innerHTML = "";

  names.forEach(name => {
    const item = document.createElement('div');
    item.className = "name-item";
    item.textContent = name;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = "❌";
    removeBtn.classList.add("delete-button");
    removeBtn.onclick = () => {
      item.remove();
    };

    item.appendChild(removeBtn);
    listContainer.appendChild(item);
  });
}

// ✅ Save list updates with confirmation
window.saveChanges = async function () {
  const nameList = Array.from(document.getElementById('nameList').children)
    .map(div => div.firstChild.textContent.trim())
    .filter(name => name.length > 0 && name.length <= 30);

  const successMsg = document.getElementById('successMsg');
  const errorMsgList = document.getElementById('errorMsgList');

  clearMessages();

  if (!listData || !currentListId) {
    errorMsgList.textContent = "No list loaded.";
    return;
  }

  if (nameList.length < 2) {
    errorMsgList.textContent = "Please enter at least two names.";
    return;
  }

  const confirmSave = confirm("Do you want to save the changes?");
  if (!confirmSave) return;

  try {
    await updateDoc(doc(db, "lists", currentListId), {
      participants: nameList
    });
    successMsg.textContent = "List updated successfully.";
  } catch (err) {
    errorMsgList.textContent = "Failed to save changes.";
    console.error("[saveChanges] Update error:", err);
  }
};

// ✅ Clear both success and error messages
function clearMessages() {
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');
  const errorMsgList = document.getElementById('errorMsgList');

  if (errorMsg) errorMsg.textContent = "";
  if (successMsg) successMsg.textContent = "";
  if (errorMsgList) errorMsgList.textContent = "";
}
