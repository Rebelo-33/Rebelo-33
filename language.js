const translations = {
  en: {
    title: "Secret Gift Exchange",
    intro: "Welcome! This site helps groups organize a fun and fair Secret Gift Exchange. Easily create a list, draw names anonymously, and manage your list.",
    createList: "Create List",
    manageList: "Manage List",
    drawNameBtn: "Draw Name",
    help: "Help",
    submit: "Submit",
    backHome: "Home",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    enterPin: "Enter list name and PIN to continue:",
    listNameLabel: "List:",
    access: "Access",
    footerContact: "Need help? Contact",
    footerCopyright: "© 2025 All rights reserved"
  },
  es: {
    title: "Intercambio de Regalos Secreto",
    intro: "¡Bienvenido! Este sitio ayuda a organizar un Intercambio de Regalos Secreto justo y divertido. Crea una lista, saca nombres y administra tu lista.",
    createList: "Crear Lista",
    manageList: "Administrar Lista",
    drawNameBtn: "Sacar Nombre",
    help: "Ayuda",
    submit: "Enviar",
    backHome: "Inicio",
    addName: "Agregar nombre",
    removeName: "Eliminar nombre",
    saveList: "Guardar lista",
    enterPin: "Ingresa el nombre de la lista y el PIN para continuar:",
    listNameLabel: "Lista:",
    access: "Acceder",
    footerContact: "¿Necesitas ayuda? Contacta a",
    footerCopyright: "© 2025 Todos los derechos reservados"
  },
  fr: {
    title: "Échange de Cadeaux Secret",
    intro: "Bienvenue ! Ce site vous aide à organiser un échange de cadeaux secret amusant et équitable. Créez une liste, tirez des noms, et gérez votre liste.",
    createList: "Créer une Liste",
    manageList: "Gérer la Liste",
    drawNameBtn: "Tirer un Nom",
    help: "Aide",
    submit: "Valider",
    backHome: "Accueil",
    addName: "Ajouter un nom",
    removeName: "Supprimer un nom",
    saveList: "Enregistrer la liste",
    enterPin: "Entrez le nom de la liste et le PIN pour continuer :",
    listNameLabel: "Liste :",
    access: "Accéder",
    footerContact: "Besoin d'aide ? Contactez",
    footerCopyright: "© 2025 Tous droits réservés"
  },
  pt: {
    title: "Amigo Secreto",
    intro: "Bem-vindo! Este site ajuda a organizar um Amigo Secreto justo e divertido. Crie uma lista, sorteie nomes e gerencie sua lista.",
    createList: "Criar Lista",
    manageList: "Gerenciar Lista",
    drawNameBtn: "Sortear Nome",
    help: "Ajuda",
    submit: "Enviar",
    backHome: "Início",
    addName: "Adicionar nome",
    removeName: "Remover nome",
    saveList: "Salvar lista",
    enterPin: "Digite o nome da lista e o PIN para continuar:",
    listNameLabel: "Lista:",
    access: "Acessar",
    footerContact: "Precisa de ajuda? Contate",
    footerCopyright: "© 2025 Todos os direitos reservados"
  },
  zh: {
    title: "秘密礼物交换",
    intro: "欢迎！这个网站帮助组织一个公平有趣的秘密礼物交换。创建名单，抽取名字，并管理你的名单。",
    createList: "创建列表",
    manageList: "管理列表",
    drawNameBtn: "抽取名字",
    help: "帮助",
    submit: "提交",
    backHome: "首页",
    addName: "添加名字",
    removeName: "移除名字",
    saveList: "保存列表",
    enterPin: "请输入列表名称和PIN码继续：",
    listNameLabel: "列表：",
    access: "访问",
    footerContact: "需要帮助？请联系",
    footerCopyright: "© 2025 保留所有权利"
  }
};

function updateLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
}

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
