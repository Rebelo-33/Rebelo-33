// ✅ Handle List Access Verification
window.verifyListAccess = async function () {
  const listName = document.getElementById("listName").value.trim();
  const listPin = document.getElementById("listPin").value.trim();
  const secretCode = document.getElementById("secretCode").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!listName || !listPin || !secretCode) {
    errorMsg.textContent = "Please enter list name, PIN and secret code.";
    return;
  }

  try {
    const docRef = doc(db, "giftLists", listName);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      errorMsg.textContent = "List not found.";
      return;
    }

    const data = docSnap.data();
    if (data.pin === listPin && data.secretCode === secretCode) {
      // ✅ Access granted
      errorMsg.textContent = "";
      currentListRef = docRef;
      currentListData = data;

      // Switch visibility
      document.getElementById("authSection").style.display = "none";
      document.getElementById("listSection").style.display = "block";
      document.getElementById("loginSubtitle").style.display = "none";
      document.getElementById("editSubtitle").style.display = "block";

      displayCurrentNames(data.participants || []);
    } else {
      errorMsg.textContent = "Incorrect PIN or secret code.";
    }
  } catch (err) {
    console.error("Access error:", err);
    errorMsg.textContent = "An error occurred while verifying access.";
  }
};
