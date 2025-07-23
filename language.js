// ✅ language.js
const translations = {
  en: {
    title: "Secret Gift Exchange",
    intro: "Welcome! The purpose of the Secret Gift Exchange is to facilitate the drawing of names among a group of participants.",
    createList: "Create a New List",
    goToDraw: "Go to Draw Page",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    drawIntro: "Enter the PIN below to view the list and draw a name.",
    drawName: "Draw Name",
    copy: "Copy",
    email: "Send to Email",
    listNameLabel: "List Name:",
    participantsLabel: "Participants:",
    myLists: "My Lists",
    help: "Help",
    accessList: "Access",
    enterPinToAccess: "Enter the 4-digit PIN and list name to access your list:"
  },
  es: {
    title: "Intercambio de Regalos Secreto",
    intro: "¡Bienvenido! El propósito del Intercambio de Regalos Secreto es facilitar el sorteo de nombres entre un grupo de participantes.",
    createList: "Crear una Nueva Lista",
    goToDraw: "Ir a la Página de Sorteo",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y no mayor de 30 caracteres.",
    addName: "Agregar Nombre",
    removeName: "Eliminar Nombre",
    saveList: "Guardar Lista",
    backHome: "Volver al Inicio",
    drawIntro: "Ingresa el PIN para ver la lista y sacar un nombre.",
    drawName: "Sacar Nombre",
    copy: "Copiar",
    email: "Enviar por Correo",
    listNameLabel: "Nombre de la Lista:",
    participantsLabel: "Participantes:",
    myLists: "Mis Listas",
    help: "Ayuda",
    accessList: "Acceder",
    enterPinToAccess: "Ingrese el nombre de la lista y el PIN de 4 dígitos para acceder:"
  },
  fr: {
    title: "Échange de Cadeaux Secret",
    intro: "Bienvenue ! L'objectif de l'Échange de Cadeaux Secret est de tirer au sort un nom parmi un groupe de participants.",
    createList: "Créer une Nouvelle Liste",
    goToDraw: "Aller à la Page de Tirage",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et ne pas dépasser 30 caractères.",
    addName: "Ajouter un Nom",
    removeName: "Supprimer un Nom",
    saveList: "Enregistrer la Liste",
    backHome: "Retour à l'Accueil",
    drawIntro: "Entrez le code PIN pour voir la liste et tirer un nom.",
    drawName: "Tirer un Nom",
    copy: "Copier",
    email: "Envoyer par Email",
    listNameLabel: "Nom de la Liste :",
    participantsLabel: "Participants :",
    myLists: "Mes Listes",
    help: "Aide",
    accessList: "Accéder",
    enterPinToAccess: "Entrez le nom de la liste et le code PIN à 4 chiffres :"
  },
  pt: {
    title: "Amigo Secreto",
    intro: "Bem-vindo! O objetivo do Amigo Secreto é sortear nomes entre um grupo de participantes.",
    createList: "Criar Nova Lista",
    goToDraw: "Ir para Sorteio",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    addName: "Adicionar Nome",
    removeName: "Remover Nome",
    saveList: "Salvar Lista",
    backHome: "Voltar ao Início",
    drawIntro: "Digite o PIN abaixo para ver a lista e sortear um nome.",
    drawName: "Sortear Nome",
    copy: "Copiar",
    email: "Enviar por Email",
    listNameLabel: "Nome da Lista:",
    participantsLabel: "Participantes:",
    myLists: "Minhas Listas",
    help: "Ajuda",
    accessList: "Acessar",
    enterPinToAccess: "Digite o nome da lista e o PIN de 4 dígitos para acessar:"
  }
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
