// ✅ language.js — Multi-language UI Text Handler

const translations = {
  en: {
    // 🌍 Common
    submit: "Login",
    backHome: "Home",
    help: "Help",
    footerContact: "Need help? Contact ",
    footerCopyright: "© 2025 All rights reserved",

    // 🎁 Draw Page
    drawIntro: "See list and your drawn name.",
    surpriseLine: "<strong>Surprise, surprise!</strong>",
    drawNameBtn: "Draw Name",
    confirmDraw: "Confirm your name and draw one from the list.",
    enterName: "Enter your name",
    enterListName: "Enter list name",
    enterPin: "Enter 4-digit PIN",
    drawErrorRequired: "Please enter your name.",
    drawErrorNotFound: "Your name is not on the list.",
    drawErrorAlready: "You already drew:",
    drawErrorUnavailable: "No available names to draw.",
    drawSaved: "You drew:",
    drawErrorConnect: "Error connecting to database.",
    drawErrorInvalidList: "List not found.",
    drawErrorInvalidPin: "Incorrect PIN.",
    drawErrorSave: "Failed to save draw result.",
    drawErrorEmptyFields: "Please enter both list name and PIN.",

    // ➕ Add Names
    addNamesTitle: "Add Names to List",
    addNameBtn: "Add Name",
    saveListBtn: "Save List",
    enterNewName: "Enter name",
    confirmSaveList: "Do you want to save this list?",
    listSavedSuccess: "List saved successfully.",
    listNameLabel: "List Name",
    pinLabel: "4-digit PIN",
    secretCodeLabel: "Secret Code",
    namePlaceholder: "Enter a name",
    deleteNameTooltip: "Delete this name",

    // 📋 My Lists
    myListsTitle: "Manage My Lists",
    editList: "Edit List",
    saveChangesBtn: "Save Changes",
    deleteEntryTooltip: "Delete this person",
    updateSuccess: "List updated successfully.",
    updateError: "Failed to update list.",
    loginError: "Incorrect list name, PIN or code.",
    loginPrompt: "Enter your list name, PIN and code to continue.",

    // ❓ Help Page
    helpIntro: "Check out how Secret Gift Exchange works. If additional help is needed, feel free to contact us!",
    howItWorksTitle: "How It Works",
    how1: "Create a new list and add participant names.",
    how2: "Protect your list with a 4-digit PIN and a secret code.",
    how3: "Share the list name and PIN with participants.",
    how4: "Participants draw names by entering the list name and PIN.",
    how5: "Organisers manage lists using the secret code.",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "Can I draw again if I made a mistake?",
    faqA1: "No, each person can only draw once. Make sure you enter your name correctly!",
    faqQ2: "What if I forget my list PIN or code?",
    faqA2: "Unfortunately, without the code or PIN, you can’t access the list. Keep it safe.",
    faqQ3: "Can I edit the list after drawing starts?",
    faqA3: "No, for fairness, lists can’t be changed once drawing has begun.",
  },

  es: {
    submit: "Iniciar sesión",
    backHome: "Inicio",
    help: "Ayuda",
    footerContact: "¿Necesitas ayuda? Contacta a ",
    footerCopyright: "© 2025 Todos los derechos reservados",

    drawIntro: "Consulta la lista y el nombre que te ha tocado.",
    surpriseLine: "<strong>¡Sorpresa, sorpresa!</strong>",
    drawNameBtn: "Sacar un nombre",
    confirmDraw: "Confirma tu nombre y saca uno de la lista.",
    enterName: "Introduce tu nombre",
    enterListName: "Introduce el nombre de la lista",
    enterPin: "Introduce el PIN de 4 dígitos",
    drawErrorRequired: "Por favor, introduce tu nombre.",
    drawErrorNotFound: "Tu nombre no está en la lista.",
    drawErrorAlready: "Ya has sacado:",
    drawErrorUnavailable: "No hay nombres disponibles para sacar.",
    drawSaved: "Has sacado:",
    drawErrorConnect: "Error al conectar con la base de datos.",
    drawErrorInvalidList: "Lista no encontrada.",
    drawErrorInvalidPin: "PIN incorrecto.",
    drawErrorSave: "No se pudo guardar el resultado.",
    drawErrorEmptyFields: "Introduce nombre de lista y PIN.",

    addNamesTitle: "Agregar nombres a la lista",
    addNameBtn: "Agregar nombre",
    saveListBtn: "Guardar lista",
    enterNewName: "Introduce un nombre",
    confirmSaveList: "¿Deseas guardar esta lista?",
    listSavedSuccess: "Lista guardada con éxito.",
    listNameLabel: "Nombre de la lista",
    pinLabel: "PIN de 4 dígitos",
    secretCodeLabel: "Código secreto",
    namePlaceholder: "Introduce un nombre",
    deleteNameTooltip: "Eliminar este nombre",

    myListsTitle: "Gestionar Mis Listas",
    editList: "Editar Lista",
    saveChangesBtn: "Guardar cambios",
    deleteEntryTooltip: "Eliminar esta persona",
    updateSuccess: "Lista actualizada correctamente.",
    updateError: "No se pudo actualizar la lista.",
    loginError: "Nombre de lista, PIN o código incorrectos.",
    loginPrompt: "Ingresa nombre de lista, PIN y código para continuar.",

    helpIntro: "Consulta cómo funciona el Intercambio Secreto de Regalos. ¡Contáctanos si necesitas ayuda!",
    howItWorksTitle: "Cómo Funciona",
    how1: "Crea una nueva lista y añade participantes.",
    how2: "Protege la lista con PIN y código secreto.",
    how3: "Comparte el nombre y PIN con los participantes.",
    how4: "Los participantes ingresan datos para sacar nombres.",
    how5: "Los organizadores gestionan con el código.",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Puedo volver a sacar si me equivoqué?",
    faqA1: "No, solo puedes sacar una vez. ¡Escribe bien tu nombre!",
    faqQ2: "¿Qué pasa si olvido el PIN o código?",
    faqA2: "Sin código o PIN, no puedes acceder. Guárdalos bien.",
    faqQ3: "¿Puedo editar la lista después de empezar?",
    faqA3: "No se puede modificar una vez iniciado el sorteo.",
  },

  fr: {
    submit: "Connexion",
    backHome: "Accueil",
    help: "Aide",
    footerContact: "Besoin d’aide ? Contactez ",
    footerCopyright: "© 2025 Tous droits réservés",

    drawIntro: "Voir la liste et le nom tiré.",
    surpriseLine: "<strong>Surprise, surprise !</strong>",
    drawNameBtn: "Tirer un nom",
    confirmDraw: "Confirmez votre nom et tirez-en un.",
    enterName: "Entrez votre nom",
    enterListName: "Nom de la liste",
    enterPin: "Code PIN à 4 chiffres",
    drawErrorRequired: "Entrez votre nom.",
    drawErrorNotFound: "Votre nom n'est pas dans la liste.",
    drawErrorAlready: "Vous avez déjà tiré :",
    drawErrorUnavailable: "Aucun nom disponible.",
    drawSaved: "Vous avez tiré :",
    drawErrorConnect: "Erreur de connexion à la base.",
    drawErrorInvalidList: "Liste introuvable.",
    drawErrorInvalidPin: "PIN incorrect.",
    drawErrorSave: "Erreur lors de la sauvegarde.",
    drawErrorEmptyFields: "Veuillez entrer nom de liste et PIN.",

    addNamesTitle: "Ajouter des noms à la liste",
    addNameBtn: "Ajouter un nom",
    saveListBtn: "Enregistrer la liste",
    enterNewName: "Saisissez un nom",
    confirmSaveList: "Voulez-vous enregistrer cette liste ?",
    listSavedSuccess: "Liste enregistrée.",
    listNameLabel: "Nom de la liste",
    pinLabel: "Code PIN",
    secretCodeLabel: "Code secret",
    namePlaceholder: "Nom du participant",
    deleteNameTooltip: "Supprimer ce nom",

    myListsTitle: "Gérer mes listes",
    editList: "Modifier",
    saveChangesBtn: "Enregistrer les modifications",
    deleteEntryTooltip: "Supprimer cette personne",
    updateSuccess: "Liste mise à jour.",
    updateError: "Échec de la mise à jour.",
    loginError: "Nom, PIN ou code incorrect.",
    loginPrompt: "Entrez les informations pour continuer.",

    helpIntro: "Découvrez comment fonctionne l'échange secret. Contactez-nous si besoin !",
    howItWorksTitle: "Comment ça marche",
    how1: "Créez une liste avec les noms.",
    how2: "Protégez-la avec PIN et code secret.",
    how3: "Partagez nom + PIN avec les participants.",
    how4: "Les participants tirent un nom.",
    how5: "Les organisateurs utilisent le code secret.",
    faqTitle: "Questions fréquentes",
    faqQ1: "Puis-je tirer un autre nom ?",
    faqA1: "Non, un seul tirage autorisé.",
    faqQ2: "J'ai perdu mon PIN ou code ?",
    faqA2: "Vous ne pouvez plus accéder.",
    faqQ3: "Modifier après tirage ?",
    faqA3: "Impossible après le début du tirage.",
  },

  pt: {
    submit: "Entrar",
    backHome: "Início",
    help: "Ajuda",
    footerContact: "Precisa de ajuda? Contate ",
    footerCopyright: "© 2025 Todos os direitos reservados",

    drawIntro: "Veja a lista e o nome sorteado.",
    surpriseLine: "<strong>Surpresa, surpresa!</strong>",
    drawNameBtn: "Sortear Nome",
    confirmDraw: "Confirme seu nome e sorteie um.",
    enterName: "Digite seu nome",
    enterListName: "Nome da lista",
    enterPin: "PIN de 4 dígitos",
    drawErrorRequired: "Digite seu nome.",
    drawErrorNotFound: "Nome não está na lista.",
    drawErrorAlready: "Você já sorteou:",
    drawErrorUnavailable: "Nenhum nome disponível.",
    drawSaved: "Você tirou:",
    drawErrorConnect: "Erro ao conectar com o banco.",
    drawErrorInvalidList: "Lista não encontrada.",
    drawErrorInvalidPin: "PIN incorreto.",
    drawErrorSave: "Erro ao salvar resultado.",
    drawErrorEmptyFields: "Digite nome da lista e PIN.",

    addNamesTitle: "Adicionar nomes à lista",
    addNameBtn: "Adicionar nome",
    saveListBtn: "Salvar lista",
    enterNewName: "Digite um nome",
    confirmSaveList: "Deseja salvar esta lista?",
    listSavedSuccess: "Lista salva com sucesso.",
    listNameLabel: "Nome da lista",
    pinLabel: "PIN",
    secretCodeLabel: "Código secreto",
    namePlaceholder: "Nome do participante",
    deleteNameTooltip: "Excluir nome",

    myListsTitle: "Minhas Listas",
    editList: "Editar",
    saveChangesBtn: "Salvar alterações",
    deleteEntryTooltip: "Excluir participante",
    updateSuccess: "Lista atualizada.",
    updateError: "Erro ao atualizar.",
    loginError: "Nome, PIN ou código incorretos.",
    loginPrompt: "Digite as informações para continuar.",

    helpIntro: "Veja como funciona o Amigo Secreto. Contate-nos se precisar de ajuda!",
    howItWorksTitle: "Como Funciona",
    how1: "Crie uma lista e adicione nomes.",
    how2: "Proteja com PIN e código.",
    how3: "Compartilhe nome e PIN.",
    how4: "Participantes sorteiam nomes.",
    how5: "Organizador usa o código.",
    faqTitle: "Perguntas Frequentes",
    faqQ1: "Posso sortear novamente?",
    faqA1: "Não, apenas uma vez por pessoa.",
    faqQ2: "Esqueci meu PIN ou código?",
    faqA2: "Sem acesso sem eles.",
    faqQ3: "Editar após sorteio?",
    faqA3: "Não é possível.",
  },

  zh: {
    submit: "登录",
    backHome: "主页",
    help: "帮助",
    footerContact: "需要帮助？请联系 ",
    footerCopyright: "© 2025 保留所有权利",

    drawIntro: "查看名单并抽取一个名字。",
    surpriseLine: "<strong>惊喜，惊喜！</strong>",
    drawNameBtn: "抽取名字",
    confirmDraw: "确认你的名字并抽取一个。",
    enterName: "输入你的名字",
    enterListName: "输入名单名称",
    enterPin: "输入4位PIN码",
    drawErrorRequired: "请输入你的名字。",
    drawErrorNotFound: "名单中没有你的名字。",
    drawErrorAlready: "你已抽到：",
    drawErrorUnavailable: "没有可抽取的名字。",
    drawSaved: "你抽到了：",
    drawErrorConnect: "连接数据库失败。",
    drawErrorInvalidList: "名单未找到。",
    drawErrorInvalidPin: "PIN码错误。",
    drawErrorSave: "保存结果失败。",
    drawErrorEmptyFields: "请输入名单名称和PIN码。",

    addNamesTitle: "添加名字到名单",
    addNameBtn: "添加名字",
    saveListBtn: "保存名单",
    enterNewName: "输入名字",
    confirmSaveList: "是否保存名单？",
    listSavedSuccess: "名单已成功保存。",
    listNameLabel: "名单名称",
    pinLabel: "4位PIN码",
    secretCodeLabel: "秘密代码",
    namePlaceholder: "输入名字",
    deleteNameTooltip: "删除此名字",

    myListsTitle: "管理我的名单",
    editList: "编辑名单",
    saveChangesBtn: "保存更改",
    deleteEntryTooltip: "删除此人",
    updateSuccess: "名单更新成功。",
    updateError: "更新失败。",
    loginError: "名单名称、PIN或代码不正确。",
    loginPrompt: "请输入信息以继续。",

    helpIntro: "了解神秘礼物交换方式。如需帮助，请联系我们！",
    howItWorksTitle: "操作说明",
    how1: "创建名单并添加名字。",
    how2: "用PIN码和秘密代码保护名单。",
    how3: "分享名单名和PIN码。",
    how4: "参与者输入后抽取名字。",
    how5: "组织者使用代码管理名单。",
    faqTitle: "常见问题",
    faqQ1: "可以重新抽取吗？",
    faqA1: "不行，每人只能抽一次。",
    faqQ2: "忘记了PIN或代码？",
    faqA2: "将无法访问名单。",
    faqQ3: "抽签后能修改名单吗？",
    faqA3: "不能修改。",
  }
};

// 🌐 Apply translations on load/change
function updateLanguage(langCode) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[langCode][key]) {
      el.innerHTML = translations[langCode][key]; // allow HTML
    }
  });

  const placeholders = document.querySelectorAll("[data-lang-placeholder]");
  placeholders.forEach(el => {
    const key = el.getAttribute("data-lang-placeholder");
    if (translations[langCode][key]) {
      el.setAttribute("placeholder", translations[langCode][key]);
    }
  });

  localStorage.setItem("selectedLanguage", langCode);
}

// 🚀 Init on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  selector.value = savedLang;
  updateLanguage(savedLang);

  selector.addEventListener("change", e => {
    updateLanguage(e.target.value);
  });
});
