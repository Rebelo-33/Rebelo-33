//Handle list access 
window.verifyListAccess = async function () {
  const listName = document.getElementById("listName").value.trim();
  const listPin = document.getElementById("listPin").value.trim();
  const secretCode = document.getElementById("secretCode").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // 🔎 Validation
  if (!listName || !listPin || !secretCode) {
    errorMsg.textContent = "Please enter list name, PIN, and secret code.";
    return;
  }

  try {
    const docRef = doc(db, "giftLists", listName);
    const docSnap = await getDoc(docRef);

    // ❌ If list not found
    if (!docSnap.exists()) {
      errorMsg.textContent = "List not found.";
      return;
    }

    const data = docSnap.data();

    // ✅ Match PIN & secret
    if (data.pin === listPin && data.secretCode === secretCode) {
      errorMsg.textContent = ""; // Clear any previous errors

      // Set current session data
      currentListRef = docRef;
      currentListData = data;

      // 🎯 Toggle sections
      document.getElementById("authSection").style.display = "none";
      document.getElementById("listSection").style.display = "block";
      document.getElementById("loginSubtitle").style.display = "none";
      document.getElementById("editSubtitle").style.display = "block";

      // 🧾 Populate list
      displayCurrentNames(data.participants || []);
    } else {
      errorMsg.textContent = "Incorrect PIN or secret code.";
    }
  } catch (err) {
    console.error("Access error:", err);
    errorMsg.textContent = "An error occurred while verifying access.";
  }
};
