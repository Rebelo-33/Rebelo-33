// ✅ language.js – Multilingual Support for All Pages

const translations = {
  en: {
    title: "Secret Gift Exchange",
    help: "Help",
    createList: "Create List",
    manageList: "Manage List",
    drawNameBtn: "Draw Name",
    access: "Access List",
    footerContact: 'Need help? Contact <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 All rights reserved",

    // Page Specific
    indexIntro1: "Welcome! Start your Secret Gift Exchange. Create, share, draw name and enjoy.",
    indexIntro2: "Keep the surprise alive!",

    addTitle: "Add Names",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    saveList: "Save List",
    backHome: "Home",

    accessTitle: "Access List",
    accessSubtitle: "Access your list, see your name and start the fun!",
    enterListPin: "Enter List Name and 4-digit PIN:",
    seeList: "See List",

    drawTitle: "Draw Name",
    drawSubtitle: "See list and your drawn name. Surprise, Surprise!",
    yourNameIs: "You are:",
    yourDrawnName: "You drew:",
    confirmIdentity: "Confirm your name as it appears on the list:",
    drawNow: "Draw Name",

    myListTitle: "My List",
    myListSubtitle: "See list and drawn name. Surprise, Surprise!",
    saveChanges: "Save Changes",
    confirmDelete: "Are you sure you want to delete",

    helpPageTitle: "Help",
    helpIntro: "Check out how Secret Gift Exchange works. If additional information is needed, please contact us!",
    howItWorks: "How It Works",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "Can I participate and organise?",
    faqA1: "Yes! You can draw a name just like any participant.",
    faqQ2: "Can I draw twice?",
    faqA2: "No. Each participant can only draw once. The result is saved on your browser.",
    faqQ3: "I forgot my PIN or Secret Code. What should I do?",
    faqA3: "Unfortunately, these cannot be recovered. Ask the organiser to resend or create a new list.",
    how1: "Create a new list and add participant names.",
    how2: "Protect your list with a 4-digit PIN and a secret code.",
    how3: "Share the list name and PIN with participants.",
    how4: "Participants draw names by entering the list name and PIN.",
    how5: "Organisers manage lists using the secret code."
  },

  es: {
    title: "Intercambio de Regalos Secreto",
    help: "Ayuda",
    createList: "Crear Lista",
    manageList: "Administrar Lista",
    drawNameBtn: "Sacar Nombre",
    access: "Acceder Lista",
    footerContact: '¿Necesitas ayuda? Contacta a <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 Todos los derechos reservados",

    indexIntro1: "¡Bienvenido! Comienza tu Intercambio de Regalos Secreto. Crea, comparte, saca un nombre y disfruta.",
    indexIntro2: "¡Mantén la sorpresa viva!",

    addTitle: "Agregar Nombres",
    addIntro: "Agrega participantes. Cada nombre debe ser único y tener hasta 30 caracteres.",
    addName: "Agregar Nombre",
    saveList: "Guardar Lista",
    backHome: "Inicio",

    accessTitle: "Acceder Lista",
    accessSubtitle: "Accede a tu lista, ve tu nombre y empieza la diversión.",
    enterListPin: "Ingresa el nombre de la lista y el PIN de 4 dígitos:",
    seeList: "Ver Lista",

    drawTitle: "Sacar Nombre",
    drawSubtitle: "Ver la lista y tu nombre asignado. ¡Sorpresa, sorpresa!",
    yourNameIs: "Eres:",
    yourDrawnName: "Te tocó:",
    confirmIdentity: "Confirma tu nombre como aparece en la lista:",
    drawNow: "Sacar Nombre",

    myListTitle: "Mi Lista",
    myListSubtitle: "Ver lista y nombre asignado. ¡Sorpresa, sorpresa!",
    saveChanges: "Guardar Cambios",
    confirmDelete: "¿Seguro que deseas eliminar",

    helpPageTitle: "Ayuda",
    helpIntro: "Consulta cómo funciona el Intercambio Secreto. Si necesitas más información, contáctanos.",
    howItWorks: "Cómo Funciona",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Puedo participar y organizar?",
    faqA1: "¡Sí! Puedes participar como cualquier persona.",
    faqQ2: "¿Puedo sacar nombre dos veces?",
    faqA2: "No. Solo puedes hacerlo una vez. El resultado se guarda en tu navegador.",
    faqQ3: "Olvidé mi PIN o código secreto. ¿Qué hago?",
    faqA3: "No se pueden recuperar. Solicita un nuevo enlace o crea una nueva lista.",
    how1: "Crea una nueva lista y agrega nombres.",
    how2: "Protégela con un PIN y código secreto.",
    how3: "Comparte el nombre de la lista y el PIN.",
    how4: "Los participantes sacan nombres con PIN.",
    how5: "Organizadores gestionan con el código secreto."
  },

  // Additional translations for fr, pt, zh can be added as needed
};

// ✅ Apply translations
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      // Allow HTML injection only for footer contact
      if (key === "footerContact") {
        el.innerHTML = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  document.documentElement.lang = lang;
}

// ✅ Language Selector Initialization
window.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  if (selector) selector.value = savedLang;
  updateLanguage(savedLang);

  selector?.addEventListener("change", (e) => {
    const selected = e.target.value;
    localStorage.setItem("selectedLanguage", selected);
    updateLanguage(selected);
  });
});
