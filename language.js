
const translations = {
  en: {
    title: "Secret Gift Exchange",
    intro: "Welcome! The purpose of the Secret Gift Exchange is to facilitate the drawing of names among a group of participants. Each person will receive a random name — without seeing the full list.",
    createList: "Create a New List",
    goToDraw: "Go to Draw Page",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    drawIntro: "Click the button below to draw a name. You will only be able to draw once and cannot see the full list.",
    drawName: "Draw Name",
    copy: "Copy",
    email: "Send to Email"
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
    drawIntro: "Haz clic en el botón para sacar un nombre. Solo podrás hacerlo una vez.",
    drawName: "Sacar Nombre",
    copy: "Copiar",
    email: "Enviar por Correo"
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
    drawIntro: "Cliquez sur le bouton pour tirer un nom. Vous ne pouvez le faire qu'une seule fois.",
    drawName: "Tirer un Nom",
    copy: "Copier",
    email: "Envoyer par Email"
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
    drawIntro: "Clique no botão para sortear um nome. Você só poderá fazer isso uma vez.",
    drawName: "Sortear Nome",
    copy: "Copiar",
    email: "Enviar por Email"
  }
};

document.getElementById('language-selector').addEventListener('change', function() {
  const lang = this.value;
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
});
