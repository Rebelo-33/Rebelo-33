// ✅ language.js

// Translation dictionary
const translations = {
  en: {
    title: "Secret Gift Exchange",
    drawTitle: "Draw a Name",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    help: "Help",
    enterPin: "Enter list name and PIN to continue:",
    submit: "Submit",
    drawName: "Draw a Name",
    listNameLabel: "List:",
    access: "Access",
    cancel: "Cancel",
    myLists: "My Lists",
    goToDraw: "Go to Draw",
    createList: "Create a New List",
    accessForm: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    contact: "Need help? Contact",
    rights: "All rights reserved",
    back: "Go Back"
  },
  es: {
    title: "Intercambio de Regalos Secreto",
    drawTitle: "Sortea un Nombre",
    addIntro: "Agrega participantes. Cada nombre debe ser único y tener menos de 30 caracteres.",
    addName: "Agregar Nombre",
    removeName: "Eliminar Nombre",
    saveList: "Guardar Lista",
    backHome: "Volver al Inicio",
    help: "Ayuda",
    enterPin: "Ingresa el nombre de la lista y el PIN:",
    submit: "Enviar",
    drawName: "Sortea un Nombre",
    listNameLabel: "Lista:",
    access: "Acceder",
    cancel: "Cancelar",
    myLists: "Mis Listas",
    goToDraw: "Ir a Sorteo",
    createList: "Crear una Nueva Lista",
    accessForm: "Ingresa el nombre de la lista, PIN de 4 dígitos y tu código secreto para administrar.",
    contact: "¿Necesitas ayuda? Contacta a",
    rights: "Todos los derechos reservados",
    back: "Volver"
  },
  fr: {
    title: "Échange de Cadeaux Secret",
    drawTitle: "Tirer un Nom",
    addIntro: "Ajoutez des participants. Chaque nom doit être unique et avoir 30 caractères max.",
    addName: "Ajouter un Nom",
    removeName: "Supprimer un Nom",
    saveList: "Enregistrer la Liste",
    backHome: "Retour à l'accueil",
    help: "Aide",
    enterPin: "Entrez le nom de la liste et le code PIN :",
    submit: "Valider",
    drawName: "Tirer un Nom",
    listNameLabel: "Liste :",
    access: "Accéder",
    cancel: "Annuler",
    myLists: "Mes Listes",
    goToDraw: "Aller au Tirage",
    createList: "Créer une Nouvelle Liste",
    accessForm: "Entrez le nom de la liste, un code PIN et votre code secret pour gérer.",
    contact: "Besoin d'aide ? Contactez",
    rights: "Tous droits réservés",
    back: "Retour"
  },
  pt: {
    title: "Amigo Secreto",
    drawTitle: "Sortear um Nome",
    addIntro: "Adicione participantes. Cada nome deve ser único e com até 30 caracteres.",
    addName: "Adicionar Nome",
    removeName: "Remover Nome",
    saveList: "Salvar Lista",
    backHome: "Voltar ao Início",
    help: "Ajuda",
    enterPin: "Digite o nome da lista e o PIN:",
    submit: "Enviar",
    drawName: "Sortear um Nome",
    listNameLabel: "Lista:",
    access: "Acessar",
    cancel: "Cancelar",
    myLists: "Minhas Listas",
    goToDraw: "Ir para Sorteio",
    createList: "Criar Nova Lista",
    accessForm: "Digite o nome da lista, PIN de 4 dígitos e código secreto para gerenciar.",
    contact: "Precisa de ajuda? Contato",
    rights: "Todos os direitos reservados",
    back: "Voltar"
  }
};

// Function to update all translatable elements
function translatePage(lang) {
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'TITLE') {
        document.title = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
  localStorage.setItem("selectedLanguage", lang);
}

// Load saved language on page load
window.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  selector.value = savedLang;
  translatePage(savedLang);

  selector.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    translatePage(selectedLang);
  });
});
