// ✅ language.js - Multi-language UI with full translations

const translations = {
  en: {
    drawNameBtn: "Draw Name",
    drawIntro: "See list and your drawn name. Surprise, surprise!",
    confirmDraw: "Confirm your name and draw one from the list.",
    submit: "Login",
    backHome: "Home",
    help: "Help",
    footerContact: "Questions? Contact the organizer.",
    footerCopyright: "© 2025 All rights reserved",
    helpIntro: "Check out how Secret Gift Exchange works. If additional help is needed, feel free to contact us!",
    howItWorksTitle: "How It Works",
    how1: "Create a new list and add participant names.",
    how2: "Protect your list with a 4-digit PIN and a secret code.",
    how3: "Share the list name and PIN with participants.",
    how4: "Participants draw names by entering the list name and PIN.",
    how5: "Organisers manage lists using the secret code.",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "How do I reset my list?",
    faqA1: "Only the list creator with the secret code can reset it.",
    faqQ2: "Can I draw twice?",
    faqA2: "No, once you draw a name, it's stored and can’t be redone.",
    faqQ3: "Is my data safe?",
    faqA3: "Yes, we store only what’s needed and never share your data."
  },
  es: {
    drawNameBtn: "Sacar un nombre",
    drawIntro: "Consulta la lista y el nombre que te ha tocado. ¡Sorpresa!",
    confirmDraw: "Confirma tu nombre y saca uno de la lista.",
    submit: "Iniciar sesión",
    backHome: "Inicio",
    help: "Ayuda",
    footerContact: "¿Preguntas? Contacta al organizador.",
    footerCopyright: "© 2025 Todos los derechos reservados",
    helpIntro: "Consulta cómo funciona el Intercambio Secreto de Regalos. Si necesitas más ayuda, ¡contáctanos!",
    howItWorksTitle: "Cómo Funciona",
    how1: "Crea una nueva lista y agrega los nombres de los participantes.",
    how2: "Protege tu lista con un PIN de 4 dígitos y un código secreto.",
    how3: "Comparte el nombre de la lista y el PIN con los participantes.",
    how4: "Los participantes sacan nombres ingresando el nombre y el PIN.",
    how5: "Los organizadores gestionan listas con el código secreto.",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Cómo reinicio mi lista?",
    faqA1: "Solo el creador de la lista con el código secreto puede hacerlo.",
    faqQ2: "¿Puedo sacar dos veces?",
    faqA2: "No, una vez que sacas un nombre, se guarda y no se puede repetir.",
    faqQ3: "¿Mis datos están seguros?",
    faqA3: "Sí, solo almacenamos lo necesario y nunca compartimos tus datos."
  },
  fr: {
    drawNameBtn: "Tirer un nom",
    drawIntro: "Voir la liste et le nom tiré. Surprise !",
    confirmDraw: "Confirmez votre nom et tirez-en un de la liste.",
    submit: "Connexion",
    backHome: "Accueil",
    help: "Aide",
    footerContact: "Des questions ? Contactez l’organisateur.",
    footerCopyright: "© 2025 Tous droits réservés",
    helpIntro: "Découvrez comment fonctionne l’échange de cadeaux secret. Pour plus d’aide, contactez-nous !",
    howItWorksTitle: "Comment ça marche",
    how1: "Créez une nouvelle liste et ajoutez les noms des participants.",
    how2: "Protégez votre liste avec un code PIN à 4 chiffres et un code secret.",
    how3: "Partagez le nom de la liste et le code PIN avec les participants.",
    how4: "Les participants tirent un nom en entrant le nom de la liste et le code PIN.",
    how5: "Les organisateurs gèrent les listes avec le code secret.",
    faqTitle: "Questions Fréquentes",
    faqQ1: "Comment réinitialiser ma liste ?",
    faqA1: "Seul le créateur de la liste avec le code secret peut la réinitialiser.",
    faqQ2: "Puis-je tirer deux fois ?",
    faqA2: "Non, une fois tiré, le nom est enregistré et ne peut pas être refait.",
    faqQ3: "Mes données sont-elles sécurisées ?",
    faqA3: "Oui, nous ne stockons que l’essentiel et ne partageons jamais vos données."
  },
  pt: {
    drawNameBtn: "Sortear Nome",
    drawIntro: "Veja a lista e o nome sorteado. Surpresa!",
    confirmDraw: "Confirme seu nome e sorteie um da lista.",
    submit: "Entrar",
    backHome: "Início",
    help: "Ajuda",
    footerContact: "Dúvidas? Contate o organizador.",
    footerCopyright: "© 2025 Todos os direitos reservados",
    helpIntro: "Veja como funciona o Amigo Secreto. Se precisar de ajuda, entre em contato!",
    howItWorksTitle: "Como Funciona",
    how1: "Crie uma nova lista e adicione os nomes dos participantes.",
    how2: "Proteja sua lista com um PIN de 4 dígitos e um código secreto.",
    how3: "Compartilhe o nome da lista e o PIN com os participantes.",
    how4: "Os participantes sorteiam nomes inserindo o nome da lista e o PIN.",
    how5: "Os organizadores gerenciam listas usando o código secreto.",
    faqTitle: "Perguntas Frequentes",
    faqQ1: "Como redefinir minha lista?",
    faqA1: "Somente o criador da lista com o código secreto pode redefini-la.",
    faqQ2: "Posso sortear duas vezes?",
    faqA2: "Não, uma vez sorteado, o nome é salvo e não pode ser refeito.",
    faqQ3: "Meus dados estão seguros?",
    faqA3: "Sim, armazenamos apenas o necessário e nunca compartilhamos seus dados."
  },
  zh: {
    drawNameBtn: "抽取名字",
    drawIntro: "查看名单并抽取一个名字。惊喜！",
    confirmDraw: "确认你的名字并从列表中抽取一个。",
    submit: "登录",
    backHome: "主页",
    help: "帮助",
    footerContact: "有问题？请联系组织者。",
    footerCopyright: "© 2025 保留所有权利",
    helpIntro: "了解秘密交换礼物的工作原理。如需帮助，请联系我们！",
    howItWorksTitle: "操作指南",
    how1: "创建一个新名单并添加参与者姓名。",
    how2: "使用4位数PIN码和密钥保护你的名单。",
    how3: "将名单名称和PIN码分享给参与者。",
    how4: "参与者通过输入名单和PIN码抽取名字。",
    how5: "组织者使用密钥管理名单。",
    faqTitle: "常见问题",
    faqQ1: "如何重置我的名单？",
    faqA1: "只有拥有密钥的创建者可以重置名单。",
    faqQ2: "我可以抽两次吗？",
    faqA2: "不可以，抽取后将被保存，不能重复。",
    faqQ3: "我的数据安全吗？",
    faqA3: "安全。我们只存储必要信息，绝不分享您的数据。"
  }
};

// ✅ Update all elements with data-lang
function updateLanguage(langCode) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    const translation = translations[langCode]?.[key];
    if (translation) {
      el.textContent = translation;
    }
  });
  localStorage.setItem("selectedLanguage", langCode);
}

// ✅ Auto apply saved language on page load
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  selector.value = savedLang;
  updateLanguage(savedLang);

  selector.addEventListener("change", (e) => {
    updateLanguage(e.target.value);
  });
});
