// ✅ Full language.js for multilingual support
const translations = {
  en: {
    // General UI
    title: "Secret Gift Exchange",
    addNamesTitle: "Add Names",
    drawTitle: "Draw a Name",
    myLists: "My Lists",
    goToDraw: "Draw Page",
    createList: "New List",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Home",
    help: "Help",
    access: "Access",
    submit: "Submit",
    enterPin: "Enter list name and PIN to continue:",
    drawName: "Draw a Name",
    listNameLabel: "List:",
    cancel: "Cancel",
    confirmCancel: "Do you want to cancel the changes?",
    confirmSave: "Do you want to save the changes?",
    confirmLeave: "Go back to Home? Unsaved changes will be lost.",
    saveChanges: "Save Changes",

    // Footer
    footerContact: "Need help? Contact",
    footerCopyright: "© 2025 All rights reserved",

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
    how5: "Organisers manage lists using the secret code."
  },

  es: {
    title: "Intercambio de Regalos Secreto",
    addNamesTitle: "Agregar Nombres",
    drawTitle: "Sacar un Nombre",
    myLists: "Mis Listas",
    goToDraw: "Página de Sorteo",
    createList: "Nueva Lista",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    backHome: "Inicio",
    help: "Ayuda",
    access: "Acceder",
    submit: "Enviar",
    enterPin: "Ingresa el nombre de la lista y el PIN para continuar:",
    drawName: "Sacar un nombre",
    listNameLabel: "Lista:",
    cancel: "Cancelar",
    confirmCancel: "¿Deseas cancelar los cambios?",
    confirmSave: "¿Deseas guardar los cambios?",
    confirmLeave: "¿Regresar al inicio? Los cambios no guardados se perderán.",
    saveChanges: "Guardar Cambios",

    footerContact: "¿Necesitas ayuda? Contacta a",
    footerCopyright: "© 2025 Todos los derechos reservados",

    helpPageTitle: "Ayuda - Intercambio Secreto",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Puedo participar y organizar?",
    faqA1: "¡Sí! Puedes participar en el sorteo como cualquier otro participante.",
    faqQ2: "¿Puedo sacar un nombre dos veces?",
    faqA2: "No. Cada participante solo puede sacar un nombre. El resultado se guarda en tu navegador.",
    faqQ3: "Olvidé mi PIN o código secreto. ¿Qué hago?",
    faqA3: "No pueden recuperarse. Solicita el enlace al organizador o crea una nueva lista.",
    howItWorksTitle: "Cómo Funciona",
    how1: "Crea una nueva lista y agrega los nombres.",
    how2: "Protege tu lista con un PIN y un código secreto.",
    how3: "Comparte el nombre de la lista y el PIN.",
    how4: "Los participantes ingresan el nombre y PIN para sacar nombres.",
    how5: "Los organizadores gestionan listas con el código secreto."
  },

  fr: {
    title: "Échange de Cadeaux Secret",
    addNamesTitle: "Ajouter des Noms",
    drawTitle: "Tirer un Nom",
    myLists: "Mes Listes",
    goToDraw: "Page de Tirage",
    createList: "Nouvelle Liste",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et contenir au maximum 30 caractères.",
    addName: "Ajouter un nom",
    removeName: "Supprimer un nom",
    saveList: "Enregistrer la liste",
    backHome: "Accueil",
    help: "Aide",
    access: "Accéder",
    submit: "Valider",
    enterPin: "Entrez le nom de la liste et le code PIN pour continuer :",
    drawName: "Tirer un nom",
    listNameLabel: "Liste :",
    cancel: "Annuler",
    confirmCancel: "Voulez-vous annuler les modifications ?",
    confirmSave: "Voulez-vous enregistrer les modifications ?",
    confirmLeave: "Retourner à l'accueil ? Les modifications non sauvegardées seront perdues.",
    saveChanges: "Enregistrer les modifications",

    footerContact: "Besoin d'aide ? Contactez",
    footerCopyright: "© 2025 Tous droits réservés",

    helpPageTitle: "Aide - Échange Secret",
    faqTitle: "Questions Fréquentes",
    faqQ1: "Puis-je participer et organiser ?",
    faqA1: "Oui ! Vous pouvez tirer un nom comme tout autre participant.",
    faqQ2: "Puis-je tirer deux fois ?",
    faqA2: "Non. Le tirage est unique et stocké dans votre navigateur.",
    faqQ3: "J'ai oublié mon code PIN ou mon code secret. Que faire ?",
    faqA3: "Demandez un nouveau lien ou créez une nouvelle liste.",
    howItWorksTitle: "Comment Ça Marche",
    how1: "Créez une liste et ajoutez les participants.",
    how2: "Protégez-la avec un PIN et un code secret.",
    how3: "Partagez le nom et le PIN avec les participants.",
    how4: "Les participants entrent le nom et PIN pour tirer.",
    how5: "Les organisateurs utilisent le code secret pour gérer."
  },

  pt: {
    title: "Amigo Secreto",
    addNamesTitle: "Adicionar Nomes",
    drawTitle: "Sortear Nome",
    myLists: "Minhas Listas",
    goToDraw: "Página do Sorteio",
    createList: "Nova Lista",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    addName: "Adicionar nome",
    removeName: "Remover nome",
    saveList: "Salvar lista",
    backHome: "Início",
    help: "Ajuda",
    access: "Acessar",
    submit: "Enviar",
    enterPin: "Digite o nome da lista e o PIN para continuar:",
    drawName: "Sortear um nome",
    listNameLabel: "Lista:",
    cancel: "Cancelar",
    confirmCancel: "Deseja cancelar as alterações?",
    confirmSave: "Deseja salvar as alterações?",
    confirmLeave: "Voltar à página inicial? As alterações não salvas serão perdidas.",
    saveChanges: "Salvar Alterações",

    footerContact: "Precisa de ajuda? Contate",
    footerCopyright: "© 2025 Todos os direitos reservados",

    helpPageTitle: "Ajuda - Amigo Secreto",
    faqTitle: "Perguntas Frequentes",
    faqQ1: "Posso participar e organizar?",
    faqA1: "Sim! Você pode participar normalmente do sorteio.",
    faqQ2: "Posso sortear duas vezes?",
    faqA2: "Não. O sorteio é único e o resultado é salvo no navegador.",
    faqQ3: "Esqueci meu PIN ou código secreto. O que faço?",
    faqA3: "Peça um novo link ao organizador ou crie uma nova lista.",
    howItWorksTitle: "Como Funciona",
    how1: "Crie uma nova lista e adicione nomes.",
    how2: "Proteja com PIN e código secreto.",
    how3: "Compartilhe o nome da lista e o PIN.",
    how4: "Participantes usam o nome e PIN para sortear.",
    how5: "Organizadores usam o código secreto para editar."
  }
};

// ✅ Apply translation to elements with data-lang attributes
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
}

// ✅ Load stored language preference or default
window.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  if (selector) selector.value = savedLang;
  updateLanguage(savedLang);

  // ✅ Handle language selector change
  selector?.addEventListener("change", (e) => {
    const selected = e.target.value;
    localStorage.setItem("selectedLanguage", selected);
    updateLanguage(selected);
  });
});
