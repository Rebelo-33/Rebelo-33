// ✅ language.js - Multi-language support with auto UI translation including placeholders

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
    enterListName: "Enter List Name",
    enterPin: "Enter 4-digit PIN",
    enterYourName: "Enter your name"
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
    enterListName: "Ingresa nombre de lista",
    enterPin: "Ingresa PIN de 4 dígitos",
    enterYourName: "Ingresa tu nombre"
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
    enterListName: "Entrez le nom de la liste",
    enterPin: "Entrez le code PIN à 4 chiffres",
    enterYourName: "Entrez votre nom"
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
    enterListName: "Digite o nome da lista",
    enterPin: "Digite o PIN de 4 dígitos",
    enterYourName: "Digite seu nome"
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
    enterListName: "输入名单名称",
    enterPin: "输入4位数字PIN码",
    enterYourName: "输入你的名字"
  }
};

function updateLanguage(langCode) {
  // Update all elements with data-lang (textContent)
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[langCode][key]) {
      el.textContent = translations[langCode][key];
    }
  });

  // Update all inputs/textareas with data-lang-placeholder (placeholder attr)
  document.querySelectorAll("[data-lang-placeholder]").forEach(el => {
    const key = el.getAttribute("data-lang-placeholder");
    if (translations[langCode][key]) {
      el.placeholder = translations[langCode][key];
    }
  });

  // Save selection
  localStorage.setItem("selectedLanguage", langCode);
}

document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  selector.value = savedLang;
  updateLanguage(savedLang);

  selector.addEventListener("change", (e) => {
    updateLanguage(e.target.value);
  });
});
