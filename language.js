// ✅ language.js
// Manages multi-language translations for the entire site

const translations = {
  en: {
    title: "Secret Gift Exchange",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    home: "Home",
    help: "Help",
    helpText: "Need help? Contact",
    rights: "© 2025 All rights reserved"
  },
  es: {
    title: "Intercambio de Regalos",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
    addName: "Agregar Nombre",
    removeName: "Eliminar Nombre",
    saveList: "Guardar Lista",
    home: "Inicio",
    help: "Ayuda",
    helpText: "¿Necesitas ayuda? Contacta",
    rights: "© 2025 Todos los derechos reservados"
  },
  fr: {
    title: "Échange de Cadeaux",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et comporter au maximum 30 caractères.",
    addName: "Ajouter un nom",
    removeName: "Supprimer un nom",
    saveList: "Enregistrer la liste",
    home: "Accueil",
    help: "Aide",
    helpText: "Besoin d'aide ? Contactez",
    rights: "© 2025 Tous droits réservés"
  },
  pt: {
    title: "Amigo Secreto",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    addName: "Adicionar Nome",
    removeName: "Remover Nome",
    saveList: "Salvar Lista",
    home: "Início",
    help: "Ajuda",
    helpText: "Precisa de ajuda? Contate",
    rights: "© 2025 Todos os direitos reservados"
  }
};

// 🔄 Apply translations
function applyTranslations(lang) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}

// 🌐 On language selector change
document.getElementById("language-selector").addEventListener("change", (e) => {
  const selectedLang = e.target.value;
  localStorage.setItem("lang", selectedLang);
  applyTranslations(selectedLang);
});

// 🚀 On page load
window.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "en";
  document.getElementById("language-selector").value = lang;
  applyTranslations(lang);
});
