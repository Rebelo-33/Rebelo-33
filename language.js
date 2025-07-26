// ✅ language.js – Full multilingual support for all 6 pages
const translations = {
  en: {
    title: "Secret Gift Exchange",
    help: "Help",
    createList: "Create List",
    manageList: "Manage List",
    drawNameBtn: "Draw Name",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Home",
    access: "Access",
    submit: "Submit",
    enterPin: "Enter list name and PIN to continue:",
    listNameLabel: "List:",
    accessForm: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    cancel: "Cancel",
    confirmCancel: "Do you want to cancel the changes?",
    confirmSave: "Do you want to save the changes?",
    confirmLeave: "Go back to Home? Unsaved changes will be lost.",
    saveChanges: "Save Changes",
    // Update only footerContact entries inside your translations object like this:
    footerContact: 'Need help? Contact <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 All rights reserved",
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
    help: "Ayuda",
    createList: "Crear Lista",
    manageList: "Administrar Lista",
    drawNameBtn: "Sacar Nombre",
    addIntro: "Agrega participantes. Cada nombre debe ser único y máximo de 30 caracteres.",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    backHome: "Inicio",
    access: "Acceder",
    submit: "Enviar",
    enterPin: "Ingresa el nombre de la lista y el PIN para continuar:",
    listNameLabel: "Lista:",
    accessForm: "Ingresa el nombre de la lista, PIN de 4 dígitos y tu código secreto.",
    cancel: "Cancelar",
    confirmCancel: "¿Deseas cancelar los cambios?",
    confirmSave: "¿Deseas guardar los cambios?",
    confirmLeave: "¿Regresar al inicio? Cambios no guardados se perderán.",
    saveChanges: "Guardar Cambios",
    footerContact: '¿Necesitas ayuda? Contacta a <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 Todos los derechos reservados",
    helpPageTitle: "Ayuda - Intercambio Secreto",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Puedo participar y organizar?",
    faqA1: "¡Sí! Puedes participar en el sorteo como cualquier otro participante.",
    faqQ2: "¿Puedo sacar un nombre dos veces?",
    faqA2: "No. El sorteo es único y se guarda en tu navegador.",
    faqQ3: "Olvidé mi PIN o código secreto. ¿Qué hago?",
    faqA3: "No se pueden recuperar. Pide un nuevo enlace o crea una nueva lista.",
    howItWorksTitle: "Cómo Funciona",
    how1: "Crea una nueva lista y agrega nombres.",
    how2: "Protege con un PIN y un código secreto.",
    how3: "Comparte el nombre de lista y PIN.",
    how4: "Participantes usan PIN para sacar nombres.",
    how5: "Organizadores usan el código para gestionar."
  },

  fr: {
    title: "Échange de Cadeaux Secret",
    help: "Aide",
    createList: "Créer une Liste",
    manageList: "Gérer la Liste",
    drawNameBtn: "Tirer un Nom",
    addIntro: "Ajoutez des participants. Chaque nom doit être unique et de 30 caractères max.",
    addName: "Ajouter un nom",
    removeName: "Supprimer un nom",
    saveList: "Enregistrer la liste",
    backHome: "Accueil",
    access: "Accéder",
    submit: "Valider",
    enterPin: "Entrez le nom de la liste et le PIN :",
    listNameLabel: "Liste :",
    accessForm: "Entrez nom de liste, PIN à 4 chiffres et code secret.",
    cancel: "Annuler",
    confirmCancel: "Annuler les modifications ?",
    confirmSave: "Enregistrer les modifications ?",
    confirmLeave: "Retourner à l'accueil ? Changements non sauvegardés seront perdus.",
    saveChanges: "Enregistrer",
    footerContact: 'Besoin d\'aide ? Contactez <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 Tous droits réservés",
    helpPageTitle: "Aide - Échange Secret",
    faqTitle: "Questions Fréquentes",
    faqQ1: "Puis-je participer et organiser ?",
    faqA1: "Oui ! Vous pouvez tirer un nom comme les autres.",
    faqQ2: "Puis-je tirer deux fois ?",
    faqA2: "Non. Résultat unique enregistré dans le navigateur.",
    faqQ3: "J'ai oublié le code. Que faire ?",
    faqA3: "Demandez un nouveau lien ou recréez une liste.",
    howItWorksTitle: "Comment Ça Marche",
    how1: "Créez une liste et ajoutez les noms.",
    how2: "Protégez-la avec un PIN et code secret.",
    how3: "Partagez le nom de la liste et PIN.",
    how4: "Participants tirent un nom via le PIN.",
    how5: "Organisateurs modifient via le code."
  },

  pt: {
    title: "Amigo Secreto",
    help: "Ajuda",
    createList: "Criar Lista",
    manageList: "Gerenciar Lista",
    drawNameBtn: "Sortear Nome",
    addIntro: "Adicione participantes. Cada nome deve ser único com até 30 caracteres.",
    addName: "Adicionar nome",
    removeName: "Remover nome",
    saveList: "Salvar lista",
    backHome: "Início",
    access: "Acessar",
    submit: "Enviar",
    enterPin: "Digite o nome da lista e o PIN:",
    listNameLabel: "Lista:",
    accessForm: "Digite o nome, PIN de 4 dígitos e código secreto.",
    cancel: "Cancelar",
    confirmCancel: "Deseja cancelar as alterações?",
    confirmSave: "Deseja salvar as alterações?",
    confirmLeave: "Voltar para início? Alterações não salvas serão perdidas.",
    saveChanges: "Salvar Alterações",
    footerContact: 'Precisa de ajuda? Contate <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 Todos os direitos reservados",
    helpPageTitle: "Ajuda - Amigo Secreto",
    faqTitle: "Perguntas Frequentes",
    faqQ1: "Posso participar e organizar?",
    faqA1: "Sim! Você pode participar normalmente.",
    faqQ2: "Posso sortear duas vezes?",
    faqA2: "Não. O sorteio é único e salvo no navegador.",
    faqQ3: "Esqueci meu PIN ou código. O que faço?",
    faqA3: "Peça um novo link ao organizador ou crie uma nova lista.",
    howItWorksTitle: "Como Funciona",
    how1: "Crie uma nova lista e adicione nomes.",
    how2: "Proteja com PIN e código secreto.",
    how3: "Compartilhe com os participantes.",
    how4: "Use o nome da lista e PIN para sortear.",
    how5: "Organizadores usam o código para editar."
  },

  zh: {
    title: "秘密礼物交换",
    help: "帮助",
    createList: "创建列表",
    manageList: "管理列表",
    drawNameBtn: "抽取名字",
    addIntro: "添加参与者，每个名字唯一，最多30个字符。",
    addName: "添加名字",
    removeName: "移除名字",
    saveList: "保存列表",
    backHome: "首页",
    access: "访问",
    submit: "提交",
    enterPin: "输入列表名和PIN码：",
    listNameLabel: "列表：",
    accessForm: "输入列表名、4位PIN码和密钥。",
    cancel: "取消",
    confirmCancel: "你要取消更改吗？",
    confirmSave: "你要保存更改吗？",
    confirmLeave: "返回首页？未保存更改将丢失。",
    saveChanges: "保存更改",
    footerContact: '需要帮助？联系 <a href="mailto:aniziacarvalino19@gmail.com">aniziacarvalino19@gmail.com</a>',
    footerCopyright: "© 2025 保留所有权利",
    helpPageTitle: "帮助 - 秘密礼物交换",
    faqTitle: "常见问题",
    faqQ1: "我可以参与并组织吗？",
    faqA1: "可以！你和其他人一样可以抽取名字。",
    faqQ2: "我可以抽两次吗？",
    faqA2: "不行。每人只能抽一次，结果保存在浏览器。",
    faqQ3: "忘记PIN或密钥怎么办？",
    faqA3: "为安全起见，无法恢复。请请求新链接或重新创建。",
    howItWorksTitle: "如何运作",
    how1: "创建新列表并添加名字。",
    how2: "用PIN码和密钥保护列表。",
    how3: "将信息分享给参与者。",
    how4: "参与者使用列表名和PIN抽名字。",
    how5: "组织者用密钥管理列表。"
  }
};

// ✅ Apply translations
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      // Use innerHTML only for footerContact to allow email link
      if (key === "footerContact") {
        el.innerHTML = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
  document.documentElement.lang = lang;
}

// ✅ Language selector logic
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
