// ✅ language.js - Handles UI translation when language is selected
const translations = {
  en: {
    title: "Secret Gift Exchange",
    intro: "Welcome! The purpose of the Secret Gift Exchange is to facilitate the drawing of names among a group of participants.",
    createList: "New List", // ✅ UPDATED TEXT
    myLists: "My Lists",
    goToDraw: "Draw Page", // ✅ UPDATED TEXT
    help: "Help",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    accessForm: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    submit: "Submit",
    listNameLabel: "List:",
    drawName: "Draw a Name",
    drawTitle: "Draw a Name",
    enterPin: "Enter list name and PIN to continue:",
    cancel: "Cancel",
    footerHelp: "Need help? Contact",
    rights: "All rights reserved",
  },
  es: {
    title: "Intercambio de Regalos Secreto",
    intro: "¡Bienvenido! El propósito del intercambio de regalos secreto es facilitar el sorteo de nombres entre un grupo de participantes.",
    createList: "Nueva Lista",
    myLists: "Mis Listas",
    goToDraw: "Página del Sorteo",
    help: "Ayuda",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener como máximo 30 caracteres.",
    addName: "Agregar Nombre",
    removeName: "Eliminar Nombre",
    saveList: "Guardar Lista",
    backHome: "Volver al Inicio",
    accessForm: "Ingrese el nombre de la lista, el PIN de 4 dígitos y su código secreto para gestionar la lista.",
    submit: "Enviar",
    listNameLabel: "Lista:",
    drawName: "Sacar un Nombre",
    drawTitle: "Sacar un Nombre",
    enterPin: "Ingrese el nombre de la lista y el PIN para continuar:",
    cancel: "Cancelar",
    footerHelp: "¿Necesitas ayuda? Contacta",
    rights: "Todos los derechos reservados",
  },
  fr: {
    title: "Échange de Cadeaux Secret",
    intro: "Bienvenue ! Le but de l'échange de cadeaux secret est de faciliter le tirage au sort des noms entre les participants.",
    createList: "Nouvelle Liste",
    myLists: "Mes Listes",
    goToDraw: "Page de Tirage",
    help: "Aide",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et ne pas dépasser 30 caractères.",
    addName: "Ajouter un Nom",
    removeName: "Supprimer le Nom",
    saveList: "Enregistrer la Liste",
    backHome: "Retour à l'Accueil",
    accessForm: "Entrez le nom de la liste, le code PIN à 4 chiffres et votre code secret pour gérer la liste.",
    submit: "Soumettre",
    listNameLabel: "Liste :",
    drawName: "Tirer un Nom",
    drawTitle: "Tirer un Nom",
    enterPin: "Entrez le nom de la liste et le PIN pour continuer :",
    cancel: "Annuler",
    footerHelp: "Besoin d'aide ? Contactez",
    rights: "Tous droits réservés",
  },
  pt: {
    title: "Amigo Secreto",
    intro: "Bem-vindo! O objetivo do amigo secreto é facilitar o sorteio de nomes entre um grupo de participantes.",
    createList: "Nova Lista",
    myLists: "Minhas Listas",
    goToDraw: "Página do Sorteio",
    help: "Ajuda",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    addName: "Adicionar Nome",
    removeName: "Remover Nome",
    saveList: "Salvar Lista",
    backHome: "Voltar para Início",
    accessForm: "Insira o nome da lista, o PIN de 4 dígitos e seu código secreto para gerenciar a lista.",
    submit: "Enviar",
    listNameLabel: "Lista:",
    drawName: "Sortear Nome",
    drawTitle: "Sortear Nome",
    enterPin: "Insira o nome da lista e o PIN para continuar:",
    cancel: "Cancelar",
    footerHelp: "Precisa de ajuda? Contate",
    rights: "Todos os direitos reservados",
  }
};

// Apply translations based on selected language
function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem('selectedLanguage', lang);
}

// Restore previously selected language
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  document.getElementById('language-selector').value = savedLang;
  applyLanguage(savedLang);
  document.getElementById('language-selector').addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });
});
