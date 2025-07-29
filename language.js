// ✅ language.js - Multi-language support with auto UI translation

// All supported translations
const translations = {
  en: {
    drawNameBtn: "Draw Name",
    drawIntro: "See list and your drawn name. Surprise, surprise!",
    confirmDraw: "Confirm your name and draw one from the list.",
    submit: "Login",
    backHome: "Home",
    help: "Help",
    footerContact: "Questions? Contact the organizer.",
    footerCopyright: "© 2025 All rights reserved"
  },
  es: {
    drawNameBtn: "Sacar un nombre",
    drawIntro: "Consulta la lista y el nombre que te ha tocado. ¡Sorpresa!",
    confirmDraw: "Confirma tu nombre y saca uno de la lista.",
    submit: "Iniciar sesión",
    backHome: "Inicio",
    help: "Ayuda",
    footerContact: "¿Preguntas? Contacta al organizador.",
    footerCopyright: "© 2025 Todos los derechos reservados"
  },
  fr: {
    drawNameBtn: "Tirer un nom",
    drawIntro: "Voir la liste et le nom tiré. Surprise !",
    confirmDraw: "Confirmez votre nom et tirez-en un de la liste.",
    submit: "Connexion",
    backHome: "Accueil",
    help: "Aide",
    footerContact: "Des questions ? Contactez l’organisateur.",
    footerCopyright: "© 2025 Tous droits réservés"
  },
  pt: {
    drawNameBtn: "Sortear Nome",
    drawIntro: "Veja a lista e o nome sorteado. Surpresa!",
    confirmDraw: "Confirme seu nome e sorteie um da lista.",
    submit: "Entrar",
    backHome: "Início",
    help: "Ajuda",
    footerContact: "Dúvidas? Contate o organizador.",
    footerCopyright: "© 2025 Todos os direitos reservados"
  },
  zh: {
    drawNameBtn: "抽取名字",
    drawIntro: "查看名单并抽取一个名字。惊喜！",
    confirmDraw: "确认你的名字并从列表中抽取一个。",
    submit: "登录",
    backHome: "主页",
    help: "帮助",
    footerContact: "有问题？请联系组织者。",
    footerCopyright: "© 2025 保留所有权利"
  }
};

// Update the DOM elements with current language
function updateLanguage(langCode) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    const translation = translations[langCode][key];
    if (translation) el.textContent = translation;
  });
  localStorage.setItem("selectedLanguage", langCode);
}

// On load, use saved language or default to English
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  selector.value = savedLang;
  updateLanguage(savedLang);

  // Change language on selector change
  selector.addEventListener("change", (e) => {
    const newLang = e.target.value;
    updateLanguage(newLang);
  });
});
