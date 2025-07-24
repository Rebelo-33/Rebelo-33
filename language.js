// ✅ language.js — Full Multilingual Support for All HTML Pages const translations = { en: { // General title: "Secret Gift Exchange", addNamesTitle: "Add Names", drawTitle: "Draw a Name", myLists: "My Lists", goToDraw: "Draw Page", createList: "New List", addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.", addName: "Add Name", removeName: "Remove Name", saveList: "Save List", backHome: "Home", help: "Help", access: "Access", submit: "Submit", enterPin: "Enter list name and PIN to continue:", drawName: "Draw a Name", listNameLabel: "List:", cancel: "Cancel", confirmCancel: "Do you want to cancel the changes?", confirmSave: "Do you want to save the changes?", confirmLeave: "Go back to Home? Unsaved changes will be lost.", saveChanges: "Save Changes",

// Footer
footerContact: "Need help? Contact",
footerCopyright: "© 2025 All rights reserved",

// Help Page
helpPageTitle: "Help - Secret Gift Exchange",
faqTitle: "Frequently Asked Questions",
faqQ1: "Can I participate and organise?",
faqA1: "Yes! You can draw a name just like any participant.",
faqQ2: "Can I draw twice?",
faqA2: "No. Each participant can only draw once. The result is saved on your browser.",
faqQ3: "I forgot my PIN or Secret Code. What should I do?",
faqA3: "Unfortunately, these cannot be recovered. Ask the organiser to resend or create a new list.",

howItWorksTitle: "How It Works",
how1: "Create a new list and add participant names.",
how2: "Protect your list with a 4-digit PIN and a secret code.",
how3: "Share the list name and PIN with participants.",
how4: "Participants draw names by entering the list name and PIN.",
how5: "Organisers manage lists using the secret code."

} // You can expand with es, fr, pt the same way };

// ✅ Applies translation to each element with data-lang function updateLanguage(lang) { document.querySelectorAll("[data-lang]").forEach((el) => { const key = el.getAttribute("data-lang"); if (translations[lang] && translations[lang][key]) { el.textContent = translations[lang][key]; } }); document.documentElement.lang = lang; }

// ✅ Load stored language or default window.addEventListener("DOMContentLoaded", () => { const selector = document.getElementById("language-selector"); const savedLang = localStorage.getItem("selectedLanguage") || "en"; if (selector) selector.value = savedLang; updateLanguage(savedLang);

selector?.addEventListener("change", (e) => { const selected = e.target.value; localStorage.setItem("selectedLanguage", selected); updateLanguage(selected); }); });

