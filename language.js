// ✅ language.js - Full multi-language support

const translations = {
  en: {
    drawNameBtn: "Draw Name",
    drawIntro: "See list and your drawn name. Surprise, surprise!",
    confirmDraw: "Confirm your name and draw one from the list.",
    submit: "Login",
    backHome: "Home",
    help: "Help",
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
    footerContact: "Need help? Contact aniziacarvalino19@gmail.com",
    footerCopyright: "© 2025 All rights reserved"
  },
  es: {
    drawNameBtn: "Sacar un nombre",
    drawIntro: "Consulta la lista y el nombre que te ha tocado. ¡Sorpresa!",
    confirmDraw: "Confirma tu nombre y saca uno de la lista.",
    submit: "Iniciar sesión",
    backHome: "Inicio",
    help: "Ayuda",
    helpIntro: "Consulta cómo funciona el Intercambio Secreto de Regalos. Si necesitas ayuda, ¡contáctanos!",
    howItWorksTitle: "Cómo Funciona",
    how1: "Crea una nueva lista y añade nombres de participantes.",
    how2: "Protege tu lista con un PIN de 4 dígitos y un código secreto.",
    how3: "Comparte el nombre de la lista y el PIN con los participantes.",
    how4: "Los participantes sacan nombres ingresando el nombre de la lista y el PIN.",
    how5: "Los organizadores gestionan las listas con el código secreto.",
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "¿Puedo sacar otro nombre si me equivoqué?",
    faqA1: "No, cada persona solo puede sacar una vez. ¡Asegúrate de ingresar tu nombre correctamente!",
    faqQ2: "¿Qué pasa si olvido el PIN o código?",
    faqA2: "Sin el código o PIN, no puedes acceder a la lista. Guárdalos bien.",
    faqQ3: "¿Puedo editar la lista después de empezar?",
    faqA3: "No, para mantener la equidad, la lista no se puede modificar una vez iniciado el sorteo.",
    footerContact: "¿Necesitas ayuda? Contacta a aniziacarvalino19@gmail.com",
    footerCopyright: "© 2025 Todos los derechos reservados"
  },
  fr: {
    drawNameBtn: "Tirer un nom",
    drawIntro: "Voir la liste et le nom tiré. Surprise !",
    confirmDraw: "Confirmez votre nom et tirez-en un de la liste.",
    submit: "Connexion",
    backHome: "Accueil",
    help: "Aide",
    helpIntro: "Découvrez comment fonctionne l'échange secret de cadeaux. Pour plus d'aide, contactez-nous !",
    howItWorksTitle: "Comment ça marche",
    how1: "Créez une nouvelle liste et ajoutez des noms de participants.",
    how2: "Protégez votre liste avec un code PIN à 4 chiffres et un code secret.",
    how3: "Partagez le nom de la liste et le PIN avec les participants.",
    how4: "Les participants tirent un nom en saisissant le nom de la liste et le PIN.",
    how5: "Les organisateurs gèrent les listes à l'aide du code secret.",
    faqTitle: "Questions Fréquemment Posées",
    faqQ1: "Puis-je tirer à nouveau si je me suis trompé ?",
    faqA1: "Non, chaque personne ne peut tirer qu'une seule fois. Entrez bien votre nom !",
    faqQ2: "Que faire si j'oublie mon PIN ou mon code ?",
    faqA2: "Sans code ni PIN, vous ne pouvez pas accéder à la liste. Gardez-les en sécurité.",
    faqQ3: "Puis-je modifier la liste après avoir commencé ?",
    faqA3: "Non, pour garantir l'équité, la liste ne peut plus être modifiée après le début du tirage.",
    footerContact: "Besoin d’aide ? Contactez aniziacarvalino19@gmail.com",
    footerCopyright: "© 2025 Tous droits réservés"
  },
  pt: {
    drawNameBtn: "Sortear Nome",
    drawIntro: "Veja a lista e o nome sorteado. Surpresa!",
    confirmDraw: "Confirme seu nome e sorteie um da lista.",
    submit: "Entrar",
    backHome: "Início",
    help: "Ajuda",
    helpIntro: "Veja como funciona o Amigo Secreto. Se precisar de ajuda, entre em contato!",
    howItWorksTitle: "Como Funciona",
    how1: "Crie uma nova lista e adicione nomes de participantes.",
    how2: "Proteja sua lista com um PIN de 4 dígitos e um código secreto.",
    how3: "Compartilhe o nome da lista e o PIN com os participantes.",
    how4: "Os participantes sorteiam nomes inserindo o nome da lista e o PIN.",
    how5: "Os organizadores gerenciam listas usando o código secreto.",
    faqTitle: "Perguntas Frequentes",
    faqQ1: "Posso sortear novamente se errar?",
    faqA1: "Não, cada pessoa só pode sortear uma vez. Certifique-se de digitar seu nome corretamente!",
    faqQ2: "E se eu esquecer o PIN ou código?",
    faqA2: "Sem o código ou PIN, você não poderá acessar a lista. Guarde-os com segurança.",
    faqQ3: "Posso editar a lista depois de começar?",
    faqA3: "Não, por justiça, a lista não pode ser alterada após o início do sorteio.",
    footerContact: "Precisa de ajuda? Contate aniziacarvalino19@gmail.com",
    footerCopyright: "© 2025 Todos os direitos reservados"
  },
  zh: {
    drawNameBtn: "抽取名字",
    drawIntro: "查看名单并抽取一个名字。惊喜！",
    confirmDraw: "确认你的名字并从列表中抽取一个。",
    submit: "登录",
    backHome: "主页",
    help: "帮助",
    helpIntro: "了解神秘礼物交换的工作方式。如需更多帮助，请联系我们！",
    howItWorksTitle: "操作说明",
    how1: "创建一个新名单并添加参与者名字。",
    how2: "用4位PIN码和秘密代码保护名单。",
    how3: "与参与者分享名单名称和PIN码。",
    how4: "参与者输入名单名称和PIN码来抽取名字。",
    how5: "组织者使用秘密代码管理名单。",
    faqTitle: "常见问题",
    faqQ1: "如果我弄错了，可以重新抽取吗？",
    faqA1: "不行，每人只能抽取一次。请确保正确输入你的名字！",
    faqQ2: "如果我忘记了PIN或代码怎么办？",
    faqA2: "没有PIN码或代码，你将无法访问名单。请妥善保管。",
    faqQ3: "抽签开始后可以修改名单吗？",
    faqA3: "为了公平起见，名单一旦开始抽签就无法更改。",
    footerContact: "需要帮助？请联系 aniziacarvalino19@gmail.com",
    footerCopyright: "© 2025 保留所有权利"
  }
};

// 🌐 Translate text content and placeholders
function updateLanguage(langCode) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-lang");
    const translation = translations[langCode][key];
    if (translation) el.textContent = translation;
  });

  const placeholders = document.querySelectorAll("[data-lang-placeholder]");
  placeholders.forEach((el) => {
    const key = el.getAttribute("data-lang-placeholder");
    const translation = translations[langCode][key];
    if (translation) el.setAttribute("placeholder", translation);
  });

  localStorage.setItem("selectedLanguage", langCode);
}

document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  selector.value = savedLang;
  updateLanguage(savedLang);

  selector.addEventListener("change", (e) => {
    const newLang = e.target.value;
    updateLanguage(newLang);
  });
});
