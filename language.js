// ✅ language.js
const translations = {
  en: {
    title: "Secret Gift Exchange",
    intro: "Welcome! The purpose of the Secret Gift Exchange is to facilitate the drawing of names among a group of participants.",
    createList: "Create a New List",
    goToDraw: "Go to Draw Page",
    myLists: "My Lists",
    help: "Help",
    backHome: "Back to Home",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    drawName: "Draw a Name",
    access: "Access",
    enterPin: "Enter PIN to access list:",
    drawnResult: "You drew:"
  },
  es: {
    title: "Intercambio Secreto de Regalos",
    intro: "¡Bienvenido! El propósito del intercambio secreto es facilitar el sorteo de nombres entre un grupo de participantes.",
    createList: "Crear una nueva lista",
    goToDraw: "Ir a la página de sorteo",
    myLists: "Mis listas",
    help: "Ayuda",
    backHome: "Volver al inicio",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    drawName: "Sortea un nombre",
    access: "Acceder",
    enterPin: "Ingresa el PIN para acceder a la lista:",
    drawnResult: "Has sorteado:"
  },
  // Add more languages here...
};

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('language-selector');
  if (langSelect) {
    langSelect.addEventListener('change', e => setLanguage(e.target.value));
  }

  // Load saved language
  const savedLang = localStorage.getItem('lang') || 'en';
  if (langSelect) langSelect.value = savedLang;
  setLanguage(savedLang);
});

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  const strings = translations[lang];
  if (!strings) return;

  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (strings[key]) {
      el.textContent = strings[key];
    }
  });
}
