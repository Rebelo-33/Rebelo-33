// ✅ language.js – Handles full multi-language translation on all pages

const translations = {
  en: {
    // General
    title: "Secret Gift Exchange",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Home",
    help: "Help",
    submit: "Submit",
    drawName: "Draw a Name",
    listNameLabel: "List:",
    enterPin: "Enter list name and PIN to continue:",
    footerContact: "Need help? Contact",
    footerCopyright: "© 2025 All rights reserved",

    // Index
    createList: "New List",
    myLists: "My Lists",
    goToDraw: "Draw Page",

    // My Lists
    accessForm: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    cancel: "Cancel",
    confirmCancel: "Do you want to cancel the changes?",
    confirmSave: "Do you want to save the changes?",
    confirmLeave: "Go back to Home? Unsaved changes will be lost.",
    saveChanges: "Save Changes",

    // Help Page
    helpPageTitle: "Help - Secret Gift Exchange",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "Can I participate and organise?",
    faqA1: "Yes! As the organiser, you can also participate in the draw just like any other participant. This keeps the fun inclusive and allows you to be part of the exchange too.",
    faqQ2: "Can I draw twice?",
    faqA2: "No. Each participant can only draw one name. To ensure fairness, your result is stored in your browser (local storage), preventing multiple draws from the same device.",
    faqQ3: "I forgot my PIN or Secret Code. What should I do?",
    faqA3: "For security reasons, PINs and secret codes are not recoverable. If you're a participant, ask the organiser to resend the link. If you're the organiser, create a new list.",
    
    // Draw
    drawTitle: "Draw a Name",
  },

  es: {
    title: "Intercambio de Regalos Secreto",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    backHome: "Inicio",
    help: "Ayuda",
    submit: "Enviar",
    drawName: "Sacar un nombre",
    listNameLabel: "Lista:",
    enterPin: "Ingresa el nombre de la lista y el PIN para continuar:",
    footerContact: "¿Necesitas ayuda? Contacta a",
    footerCopyright: "© 2025 Todos los derechos reservados",

    createList: "Nueva Lista",
    myLists: "Mis Listas",
    goToDraw: "Página de Sorteo",

    accessForm: "Ingresa el nombre de la lista, PIN de 4 dígitos y tu código secreto para administrarla.",
    cancel: "Cancelar",
    confirmCancel: "¿Deseas cancelar los cambios?",
    confirmSave: "¿Deseas guardar los cambios?",
    confirmLeave: "¿Regresar al inicio? Los cambios no guardados se perderán.",
    saveChanges: "Guardar Cambios",

    helpPageTitle: "Ayuda - Intercambio Secreto",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Puedo participar y organizar?",
    faqA1: "¡Sí! Como organizador, también puedes participar en el sorteo como cualquier otro participante.",
    faqQ2: "¿Puedo sacar un nombre dos veces?",
    faqA2: "No. Cada participante solo puede sacar un nombre y el resultado se guarda en tu navegador.",
    faqQ3: "Olvidé mi PIN o código secreto. ¿Qué hago?",
    faqA3: "Por seguridad, no se pueden recuperar. Solicita el enlace al organizador o crea una nueva lista.",

    drawTitle: "Sacar un Nombre",
  },

  fr: {
    title: "Échange de Cadeaux Secret",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et contenir au maximum 30 caractères.",
    addName: "Ajouter un nom",
    removeName: "Supprimer un nom",
    saveList: "Enregistrer la liste",
    backHome: "Accueil",
    help: "Aide",
    submit: "Valider",
    drawName: "Tirer un nom",
    listNameLabel: "Liste :",
    enterPin: "Entrez le nom de la liste et le code PIN pour continuer :",
    footerContact: "Besoin d'aide ? Contactez",
    footerCopyright: "© 2025 Tous droits réservés",

    createList: "Nouvelle Liste",
    myLists: "Mes Listes",
    goToDraw: "Page de Tirage",

    accessForm: "Entrez le nom de la liste, le PIN à 4 chiffres et votre code secret pour la gérer.",
    cancel: "Annuler",
    confirmCancel: "Voulez-vous annuler les modifications ?",
    confirmSave: "Voulez-vous enregistrer les modifications ?",
    confirmLeave: "Retourner à l'accueil ? Les modifications non sauvegardées seront perdues.",
    saveChanges: "Enregistrer les modifications",

    helpPageTitle: "Aide - Échange Secret",
    faqTitle: "Questions Fréquentes",
    faqQ1: "Puis-je participer et organiser ?",
    faqA1: "Oui ! En tant qu'organisateur, vous pouvez également participer au tirage au sort.",
    faqQ2: "Puis-je tirer deux fois ?",
    faqA2: "Non. Chaque participant ne peut tirer qu'un seul nom. Le résultat est stocké dans votre navigateur.",
    faqQ3: "J'ai oublié mon code PIN ou mon code secret. Que faire ?",
    faqA3: "Pour des raisons de sécurité, ils ne sont pas récupérables. Demandez un nouveau lien ou créez une nouvelle liste.",

    drawTitle: "Tirer un Nom",
  },

  pt: {
    title: "Amigo Secreto",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    addName: "Adicionar nome",
    removeName: "Remover nome",
    saveList: "Salvar lista",
    backHome: "Início",
    help: "Ajuda",
    submit: "Enviar",
    drawName: "Sortear um nome",
    listNameLabel: "Lista:",
    enterPin: "Digite o nome da lista e o PIN para continuar:",
    footerContact: "Precisa de ajuda? Contate",
    footerCopyright: "© 2025 Todos os direitos reservados",

    createList: "Nova Lista",
    myLists: "Minhas Listas",
    goToDraw: "Página do Sorteio",

    accessForm: "Digite o nome da lista, o PIN de 4 dígitos e seu código secreto para gerenciar.",
    cancel: "Cancelar",
    confirmCancel: "Deseja cancelar as alterações?",
    confirmSave: "Deseja salvar as alterações?",
    confirmLeave: "Voltar à página inicial? As alterações não salvas serão perdidas.",
    saveChanges: "Salvar Alterações",

    helpPageTitle: "Ajuda - Amigo Secreto",
    faqTitle: "Perguntas Frequentes",
    faqQ1: "Posso participar e organizar?",
    faqA1: "Sim! Como organizador, você também pode participar normalmente do sorteio.",
    faqQ2: "Posso sortear duas vezes?",
    faqA2: "Não. Cada participante só pode sortear uma vez, e o resultado é salvo no navegador.",
    faqQ3: "Esqueci meu PIN ou código secreto. O que faço?",
    faqA3: "Por segurança, eles não podem ser recuperados. Peça um novo link ao organizador ou crie uma nova lista.",

    drawTitle: "Sortear Nome",
  }
};

// Apply translation based on selection
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// Detect language change
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const defaultLang = selector?.value || "en";
  updateLanguage(defaultLang);

  selector?.addEventListener("change", (e) => {
    updateLanguage(e.target.value);
  });
});
