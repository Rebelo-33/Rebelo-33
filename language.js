// ✅ language.js
// This file handles full dynamic page translation based on selected language.

const translations = {
  en: {
    title: "Secret Gift Exchange",
    intro: "Welcome! The purpose of the Secret Gift Exchange is to facilitate the drawing of names among a group of participants.",
    createList: "Create a New List",
    goToDraw: "Go to Draw Page",
    myLists: "My Lists",
    help: "Help",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    drawInstructions: "Enter the 4-digit PIN to access your list and draw a name.",
    access: "Access",
    cancel: "Cancel",
    accessForm: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    listNameLabel: "List:",
    drawName: "Draw Name",
    yourDraw: "You drew:",
    pinPlaceholder: "Enter 4-digit PIN",
    secretCode: "Secret Code"
  },
  es: {
    title: "Intercambio de Regalos Secreto",
    intro: "¡Bienvenido! El propósito del Intercambio de Regalos Secreto es facilitar el sorteo de nombres entre un grupo de participantes.",
    createList: "Crear una Nueva Lista",
    goToDraw: "Ir a la Página de Sorteo",
    myLists: "Mis Listas",
    help: "Ayuda",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
    addName: "Agregar Nombre",
    removeName: "Eliminar Nombre",
    saveList: "Guardar Lista",
    backHome: "Volver al Inicio",
    drawInstructions: "Ingrese el PIN de 4 dígitos para acceder a su lista y sacar un nombre.",
    access: "Acceder",
    cancel: "Cancelar",
    accessForm: "Ingrese el nombre de la lista, el PIN de 4 dígitos y su código secreto para gestionar la lista.",
    listNameLabel: "Lista:",
    drawName: "Sacar Nombre",
    yourDraw: "Has sacado:",
    pinPlaceholder: "Ingrese PIN de 4 dígitos",
    secretCode: "Código Secreto"
  },
  fr: {
    title: "Échange de Cadeaux Secret",
    intro: "Bienvenue ! L'objectif de l'Échange de Cadeaux Secret est de faciliter le tirage au sort entre participants.",
    createList: "Créer une Nouvelle Liste",
    goToDraw: "Aller à la Page de Tirage",
    myLists: "Mes Listes",
    help: "Aide",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et ne pas dépasser 30 caractères.",
    addName: "Ajouter un Nom",
    removeName: "Supprimer le Nom",
    saveList: "Enregistrer la Liste",
    backHome: "Retour à l'accueil",
    drawInstructions: "Entrez le code PIN à 4 chiffres pour accéder à votre liste et tirer un nom.",
    access: "Accéder",
    cancel: "Annuler",
    accessForm: "Entrez le nom de la liste, le code PIN à 4 chiffres et votre code secret pour gérer la liste.",
    listNameLabel: "Liste :",
    drawName: "Tirer un Nom",
    yourDraw: "Vous avez tiré :",
    pinPlaceholder: "Entrez le PIN à 4 chiffres",
    secretCode: "Code Secret"
  },
  pt: {
    title: "Amigo Secreto",
    intro: "Bem-vindo! O objetivo do Amigo Secreto é facilitar o sorteio de nomes entre os participantes.",
    createList: "Criar Nova Lista",
    goToDraw: "Ir para Página de Sorteio",
    myLists: "Minhas Listas",
    help: "Ajuda",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    addName: "Adicionar Nome",
    removeName: "Remover Nome",
    saveList: "Salvar Lista",
    backHome: "Voltar ao Início",
    drawInstructions: "Digite o PIN de 4 dígitos para acessar sua lista e sortear um nome.",
    access: "Acessar",
    cancel: "Cancelar",
    accessForm: "Digite o nome da lista, PIN de 4 dígitos e seu código secreto para gerenciar a lista.",
    listNameLabel: "Lista:",
    drawName: "Sortear Nome",
    yourDraw: "Você tirou:",
    pinPlaceholder: "Digite o PIN de 4 dígitos",
    secretCode: "Código Secreto"
  }
};

// 🌐 Translate page based on selected language
function translatePage(lang) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const pinInput = document.querySelector("input#pin");
  if (pinInput && translations[lang].pinPlaceholder) {
    pinInput.placeholder = translations[lang].pinPlaceholder;
  }

  const secretInput = document.querySelector("input#secretCode");
  if (secretInput && translations[lang].secretCode) {
    secretInput.placeholder = translations[lang].secretCode;
  }
}

// 🌍 Set language on selection change
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  if (!selector) return;

  selector.addEventListener("change", () => {
    const lang = selector.value;
    localStorage.setItem("selectedLang", lang);
    translatePage(lang);
  });

  // Load saved language
  const savedLang = localStorage.getItem("selectedLang") || "en";
  selector.value = savedLang;
  translatePage(savedLang);
});
