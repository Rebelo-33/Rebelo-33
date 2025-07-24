// ✅ language.js

// 🌍 Supported translations
const translations = {
  en: {
    title: "Secret Gift Exchange",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    help: "Help",
    goToDraw: "Go to Draw Page",
    myLists: "My Lists",
    createList: "Create a New List",
    access: "Access",
    accessForm: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    listNameLabel: "List:",
    cancel: "Cancel",
    footerContact: "Need help? Contact",
    footerCopyright: "© 2025 All rights reserved"
  },
  // ➕ Add your other languages here...
  es: {
    title: "Intercambio Secreto de Regalos",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y no tener más de 30 caracteres.",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    backHome: "Volver al inicio",
    help: "Ayuda",
    goToDraw: "Ir a la página del sorteo",
    myLists: "Mis listas",
    createList: "Crear una nueva lista",
    access: "Acceder",
    accessForm: "Ingresa el nombre de la lista, el PIN de 4 dígitos y tu código secreto para administrarla.",
    listNameLabel: "Lista:",
    cancel: "Cancelar",
    footerContact: "¿Necesitas ayuda? Contacta a",
    footerCopyright: "© 2025 Todos los derechos reservados"
  }
  // fr, pt...
};

// 🌐 Change language dynamically
function updateLanguage(lang) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// 🔁 Watch language selector changes
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  if (selector) {
    selector.addEventListener("change", e => {
      const selected = e.target.value;
      updateLanguage(selected);
      localStorage.setItem("language", selected);
    });

    // 🌍 Load saved language or default to English
    const saved = localStorage.getItem("language") || "en";
    selector.value = saved;
    updateLanguage(saved);
  }
});
