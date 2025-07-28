const translations = {
  en: {
    title: "Secret Gift Exchange",
    help: "Help",
    helpIntro: "Check out how Secret Gift Exchange works. If additional help is needed, feel free to contact us!",
    createList: "Create List",
    manageList: "Manage List",
    drawNameBtn: "Draw Name",
    access: "Access List",
    seeDrawn: "See list and drawn name",
    drawIntro: "See list and your drawn name. Surprise, surprise!",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Home",
    submit: "Login",
    enterPin: "Enter list name and PIN to continue:",
    listNameLabel: "List:",
    accessForm: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    cancel: "Cancel",
    confirmCancel: "Do you want to cancel the changes?",
    confirmSave: "Do you want to save the changes?",
    confirmLeave: "Go back to Home? Unsaved changes will be lost.",
    saveChanges: "Save Changes",
    confirmDraw: "Confirm your name and draw one from the list.",

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
    how5: "Organisers manage lists using the secret code.",

    footerContact: 'Need help? Contact <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 All rights reserved"
  },

  es: {
    title: "Intercambio de Regalos Secreto",
    help: "Ayuda",
    helpIntro: "Descubre cómo funciona el intercambio secreto. Para más ayuda, contáctanos.",
    createList: "Crear Lista",
    manageList: "Administrar Lista",
    drawNameBtn: "Sacar Nombre",
    access: "Acceder Lista",
    seeDrawn: "Ver lista y nombre sorteado",
    drawIntro: "Ve la lista y tu nombre sorteado. ¡Sorpresa, sorpresa!",
    addIntro: "Agrega participantes. Cada nombre debe ser único y máximo de 30 caracteres.",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    backHome: "Inicio",
    submit: "Iniciar sesión",
    enterPin: "Ingresa el nombre de la lista y el PIN para continuar:",
    listNameLabel: "Lista:",
    accessForm: "Ingresa el nombre de la lista, PIN de 4 dígitos y tu código secreto.",
    cancel: "Cancelar",
    confirmCancel: "¿Deseas cancelar los cambios?",
    confirmSave: "¿Deseas guardar los cambios?",
    confirmLeave: "¿Regresar al inicio? Cambios no guardados se perderán.",
    saveChanges: "Guardar Cambios",
    confirmDraw: "Confirma tu nombre y saca uno de la lista.",

    helpPageTitle: "Ayuda - Intercambio Secreto",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Puedo participar y organizar?",
    faqA1: "¡Sí! Puedes participar como cualquier otro.",
    faqQ2: "¿Puedo sacar un nombre dos veces?",
    faqA2: "No. Solo puedes participar una vez y se guarda en tu navegador.",
    faqQ3: "¿Olvidé mi PIN o código secreto?",
    faqA3: "No se pueden recuperar. Pide un nuevo enlace o crea una lista nueva.",
    howItWorksTitle: "Cómo Funciona",
    how1: "Crea una lista e ingresa los nombres.",
    how2: "Protéjela con un PIN y código secreto.",
    how3: "Comparte el nombre de lista y PIN.",
    how4: "Participantes sacan nombres con el PIN.",
    how5: "Organizadores gestionan con el código.",

    footerContact: '¿Necesitas ayuda? Contáctanos <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 Todos los derechos reservados"
  },

  fr: {
    title: "Échange de Cadeaux Secret",
    help: "Aide",
    drawIntro: "Voir la liste et le nom tiré. Surprise !",
    submit: "Connexion",
    confirmDraw: "Confirmez votre nom et tirez un nom de la liste.",
    // ... add other keys as needed based on en/es above
  },

  pt: {
    title: "Amigo Secreto",
    help: "Ajuda",
    drawIntro: "Veja a lista e o nome sorteado. Surpresa!",
    submit: "Entrar",
    confirmDraw: "Confirme seu nome e sorteie um da lista.",
    // ... add other keys as needed
  },

  zh: {
    title: "秘密礼物交换",
    help: "帮助",
    drawIntro: "查看列表和你抽到的名字。惊喜！",
    submit: "登录",
    confirmDraw: "确认你的名字并从列表中抽取一个。",
    // ... add other keys as needed
  }
};

// ✅ Apply translations
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = key === "footerContact" ? translations[lang][key] : translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
}

// ✅ Language selector logic
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
