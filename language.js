// ✅ language.js
const translations = {
  en: {
    title: "Secret Gift Exchange",
    intro: "Welcome! The purpose of the Secret Gift Exchange is to facilitate the drawing of names among a group of participants. Each person will receive a random name.",
    createList: "Create a New List",
    goToDraw: "Go to Draw Page",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    drawIntro: "Click the button below to draw a name. You will only be able to draw once.",
    drawName: "Draw Name",
    copy: "Copy",
    email: "Send to Email",
    listNameLabel: "List Name:",
    participantsLabel: "Participants:",
    myLists: "My Lists",
    help: "Help"
  },
  // Repeat structure for 'es', 'fr', 'pt' as needed
};

function applyLanguage(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');
  const savedLang = localStorage.getItem('lang') || 'en';

  if (selector) {
    selector.value = savedLang;
    selector.addEventListener('change', function () {
      applyLanguage(this.value);
    });
  }

  applyLanguage(savedLang);
});
