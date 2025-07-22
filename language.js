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
    drawIntro: "Enter your PIN to draw a name from your list.",
    drawName: "Draw Name",
    copy: "Copy",
    email: "Send to Email",
    listNameLabel: "List Name:",
    participantsLabel: "Participants:",
    myLists: "My Lists",
    accessList: "Access",
    help: "Help",
    enterPin: "Enter PIN to access list:",
    submit: "Submit",
    errorPin: "Incorrect PIN, please try again.",
    listSaved: "List saved successfully!",
    nameDrawn: "You drew:",
    drawAgain: "You already drew a name.",
    noNamesLeft: "No names left to draw."
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
    drawIntro: "Ingresa tu PIN para sacar un nombre.",
    drawName: "Sacar Nombre",
    copy: "Copiar",
    email: "Enviar por Correo",
    listNameLabel: "Nombre de la Lista:",
    participantsLabel: "Participantes:",
    myLists: "Mis Listas",
    accessList: "Acceder",
    help: "Ayuda",
    enterPin: "Introduce el PIN para acceder a la lista:",
    submit: "Enviar",
    errorPin: "PIN incorrecto, inténtalo de nuevo.",
    listSaved: "¡Lista guardada con éxito!",
    nameDrawn: "Has sacado:",
    drawAgain: "Ya has sacado un nombre.",
    noNamesLeft: "No quedan nombres por sacar."
  },
  fr: {
    title: "Échange de Cadeaux Secret",
    intro: "Bienvenue ! Le but de l'Échange de Cadeaux Secret est de tirer au sort un nom parmi un groupe de participants.",
    createList: "Créer une Nouvelle Liste",
    goToDraw: "Aller à la Page de Tirage",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et ne pas dépasser 30 caractères.",
    addName: "Ajouter un Nom",
    removeName: "Supprimer un Nom",
    saveList: "Enregistrer la Liste",
    backHome: "Retour à l'Accueil",
    drawIntro: "Entrez votre code PIN pour tirer un nom.",
    drawName: "Tirer un Nom",
    copy: "Copier",
    email: "Envoyer par Email",
    listNameLabel: "Nom de la Liste :",
    participantsLabel: "Participants :",
    myLists: "Mes Listes",
    accessList: "Accéder",
    help: "Aide",
    enterPin: "Entrez le code PIN pour accéder à la liste :",
    submit: "Soumettre",
    errorPin: "Code PIN incorrect, veuillez réessayer.",
    listSaved: "Liste enregistrée avec succès !",
    nameDrawn: "Vous avez tiré :",
    drawAgain: "Vous avez déjà tiré un nom.",
    noNamesLeft: "Il ne reste plus de noms à tirer."
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
    drawIntro: "Digite seu PIN para sortear um nome.",
    drawName: "Sortear Nome",
    copy: "Copiar",
    email: "Enviar por Email",
    listNameLabel: "Nome da Lista:",
    participantsLabel: "Participantes:",
    myLists: "Minhas Listas",
    accessList: "Acessar",
    help: "Ajuda",
    enterPin: "Digite o PIN para acessar a lista:",
    submit: "Enviar",
    errorPin: "PIN incorreto, tente novamente.",
    listSaved: "Lista salva com sucesso!",
    nameDrawn: "Você tirou:",
    drawAgain: "Você já tirou um nome.",
    noNamesLeft: "Não há mais nomes para sortear."
  }
};

// Apply translations on page load
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
