// ✅ language.js – Full multilingual support for all pages

const translations = {
  en: {
    // Common UI
    title: "Secret Gift Exchange",
    help: "Help",
    createList: "Create List",
    manageList: "Manage List",
    drawNameBtn: "Draw Name",
    backHome: "Home",
    submit: "Submit",
    access: "Access",
    saveList: "Save List",
    addName: "Add Name",
    removeName: "Remove Name",
    enterPin: "Enter list name and PIN to continue:",
    listNameLabel: "List:",
    drawTitle: "Draw a Name",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
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

  pt: {
    title: "Amigo Secreto",
    help: "Ajuda",
    createList: "Criar Lista",
    manageList: "Gerenciar Lista",
    drawNameBtn: "Sortear Nome",
    backHome: "Início",
    submit: "Enviar",
    access: "Acessar",
    saveList: "Salvar lista",
    addName: "Adicionar nome",
    removeName: "Remover nome",
    enterPin: "Digite o nome da lista e o PIN para continuar:",
    listNameLabel: "Lista:",
    drawTitle: "Sortear Nome",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
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

  es: {
    title: "Intercambio de Regalos Secreto",
    help: "Ayuda",
    createList: "Crear Lista",
    manageList: "Administrar Lista",
    drawNameBtn: "Sacar Nombre",
    backHome: "Inicio",
    submit: "Enviar",
    access: "Acceder",
    saveList: "Guardar lista",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    enterPin: "Ingresa el nombre de la lista y el PIN para continuar:",
    listNameLabel: "Lista:",
    drawTitle: "Sacar un Nombre",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
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
    help: "Aide",
    createList: "Créer une Liste",
    manageList: "Gérer la Liste",
    drawNameBtn: "Tirer un Nom",
    backHome: "Accueil",
    submit: "Valider",
    access: "Accéder",
    saveList: "Enregistrer la liste",
    addName: "Ajouter un nom",
    removeName: "Supprimer un nom",
    enterPin: "Entrez le nom de la liste et le code PIN pour continuer :",
    listNameLabel: "Liste :",
    drawTitle: "Tirer un Nom",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et contenir au maximum 30 caractères.",
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

  zh: {
    title: "秘密礼物交换",
    help: "帮助",
    createList: "创建列表",
    manageList: "管理列表",
    drawNameBtn: "抽取名字",
    backHome: "首页",
    submit: "提交",
    access: "访问",
    saveList: "保存列表",
    addName: "添加姓名",
    removeName: "移除姓名",
    enterPin: "请输入列表名称和 PIN 码继续：",
    listNameLabel: "列表：",
    drawTitle: "抽取名字",
    addIntro: "向您的列表中添加参与者。每个名字必须是唯一的，并且不超过30个字符。",
    footerContact: "需要帮助？请联系",
    footerCopyright: "© 2025 保留所有权利",

    helpPageTitle: "帮助 - 秘密礼物交换",
    faqTitle: "常见问题",
    faqQ1: "我可以参与和组织吗？",
    faqA1: "可以！您可以像其他参与者一样抽取名字。",
    faqQ2: "我可以抽两次吗？",
    faqA2: "不行。每个参与者只能抽一次，结果将保存在浏览器中。",
    faqQ3: "我忘记了 PIN 或密钥。怎么办？",
    faqA3: "出于安全原因无法找回。请联系组织者或创建新列表。",
    howItWorksTitle: "如何运作",
    how1: "创建新列表并添加参与者。",
    how2: "使用 PIN 和密钥保护您的列表。",
    how3: "与参与者分享列表名称和 PIN。",
    how4: "参与者输入信息抽取名字。",
    how5: "组织者使用密钥进行管理。"
  }
};

// ✅ Load stored language preference or default
window.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  if (selector) selector.value = savedLang;
  updateLanguage(savedLang);

  // ✅ Handle language change
  selector?.addEventListener("change", (e) => {
    const selected = e.target.value;
    localStorage.setItem("selectedLanguage", selected);
    updateLanguage(selected);
  });
});

function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
}
