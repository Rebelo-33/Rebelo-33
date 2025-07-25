// ✅ language.js – Full multilingual support across all pages
const translations = {
  en: {
    // General UI
    title: "Secret Gift Exchange",
    addNamesTitle: "Add Names",
    drawTitle: "Draw a Name",
    help: "Help",
    createList: "Create List",
    manageList: "Manage List",
    drawNameBtn: "Draw Name",
    myLists: "My Lists",
    goToDraw: "Draw Page",
    backHome: "Home",
    access: "Access",
    submit: "Submit",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    confirmCancel: "Do you want to cancel the changes?",
    confirmSave: "Do you want to save the changes?",
    confirmLeave: "Go back to Home? Unsaved changes will be lost.",
    errorInvalid: "Invalid credentials. Please check again.",

    // Form Instructions
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    enterPin: "Enter list name and PIN to continue:",
    listNameLabel: "List:",

    // Buttons
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    drawName: "Draw a Name",

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
    help: "Ayuda",
    createList: "Crear Lista",
    manageList: "Administrar Lista",
    drawNameBtn: "Sacar Nombre",
    myLists: "Mis Listas",
    goToDraw: "Página de Sorteo",
    backHome: "Inicio",
    access: "Acceder",
    submit: "Enviar",
    cancel: "Cancelar",
    saveChanges: "Guardar Cambios",
    confirmCancel: "¿Deseas cancelar los cambios?",
    confirmSave: "¿Deseas guardar los cambios?",
    confirmLeave: "¿Regresar al inicio? Los cambios no guardados se perderán.",
    errorInvalid: "Credenciales inválidas. Verifica nuevamente.",

    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
    enterPin: "Ingresa el nombre de la lista y el PIN para continuar:",
    listNameLabel: "Lista:",

    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    drawName: "Sacar un nombre",

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
    help: "Aide",
    createList: "Créer une Liste",
    manageList: "Gérer la Liste",
    drawNameBtn: "Tirer un Nom",
    myLists: "Mes Listes",
    goToDraw: "Page de Tirage",
    backHome: "Accueil",
    access: "Accéder",
    submit: "Valider",
    cancel: "Annuler",
    saveChanges: "Enregistrer les modifications",
    confirmCancel: "Voulez-vous annuler les modifications ?",
    confirmSave: "Voulez-vous enregistrer les modifications ?",
    confirmLeave: "Retourner à l'accueil ? Les modifications non sauvegardées seront perdues.",
    errorInvalid: "Identifiants invalides. Veuillez vérifier à nouveau.",

    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et contenir au maximum 30 caractères.",
    enterPin: "Entrez le nom de la liste et le code PIN pour continuer :",
    listNameLabel: "Liste :",

    addName: "Ajouter un nom",
    removeName: "Supprimer un nom",
    saveList: "Enregistrer la liste",
    drawName: "Tirer un nom",

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
    help: "Ajuda",
    createList: "Criar Lista",
    manageList: "Gerenciar Lista",
    drawNameBtn: "Sortear Nome",
    myLists: "Minhas Listas",
    goToDraw: "Página do Sorteio",
    backHome: "Início",
    access: "Acessar",
    submit: "Enviar",
    cancel: "Cancelar",
    saveChanges: "Salvar Alterações",
    confirmCancel: "Deseja cancelar as alterações?",
    confirmSave: "Deseja salvar as alterações?",
    confirmLeave: "Voltar à página inicial? As alterações não salvas serão perdidas.",
    errorInvalid: "Credenciais inválidas. Verifique novamente.",

    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    enterPin: "Digite o nome da lista e o PIN para continuar:",
    listNameLabel: "Lista:",

    addName: "Adicionar nome",
    removeName: "Remover nome",
    saveList: "Salvar lista",
    drawName: "Sortear um nome",

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
  },

  zh: {
    title: "秘密礼物交换",
    addNamesTitle: "添加名字",
    drawTitle: "抽取名字",
    help: "帮助",
    createList: "创建列表",
    manageList: "管理列表",
    drawNameBtn: "抽取名字",
    myLists: "我的列表",
    goToDraw: "抽签页面",
    backHome: "主页",
    access: "访问",
    submit: "提交",
    cancel: "取消",
    saveChanges: "保存更改",
    confirmCancel: "你想取消更改吗？",
    confirmSave: "你想保存更改吗？",
    confirmLeave: "返回主页？未保存的更改将会丢失。",
    errorInvalid: "凭据无效。请重新检查。",

    addIntro: "向您的列表中添加参与者。每个名称必须是唯一的，且长度不超过30个字符。",
    enterPin: "请输入列表名称和PIN以继续：",
    listNameLabel: "列表：",

    addName: "添加名字",
    removeName: "移除名字",
    saveList: "保存列表",
    drawName: "抽取名字",

    footerContact: "需要帮助？请联系",
    footerCopyright: "© 2025 保留所有权利",

    helpPageTitle: "帮助 - 秘密礼物交换",
    faqTitle: "常见问题",
    faqQ1: "我可以同时参与和组织吗？",
    faqA1: "可以！您可以像其他参与者一样抽取一个名字。",
    faqQ2: "我可以抽两次名字吗？",
    faqA2: "不行。每位参与者只能抽一次，并且结果会保存在您的浏览器中。",
    faqQ3: "我忘记了PIN或密钥，该怎么办？",
    faqA3: "出于安全考虑，这些无法恢复。请请求组织者重新发送或重新创建列表。",
    howItWorksTitle: "操作指南",
    how1: "创建新列表并添加参与者名字。",
    how2: "使用4位PIN码和密钥保护列表。",
    how3: "与参与者共享列表名称和PIN。",
    how4: "参与者使用名称和PIN抽取名字。",
    how5: "组织者使用密钥来管理列表。"
  }
};

// ✅ Apply translations to elements with data-lang
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
}

// ✅ Initialize translation on page load and handle changes
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
