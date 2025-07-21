// ✅ language.js

const translations = {
  en: {
    title: "Secret Gift Exchange",
    addIntro: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    addName: "Add Name",
    removeName: "Remove Name",
    saveList: "Save List",
    backHome: "Back to Home",
    help: "Help",
    addParticipants: "Add Participants"
  },
  es: {
    title: "Intercambio de Regalos Secreto",
    addIntro: "Agrega participantes a tu lista. Cada nombre debe ser único y no mayor de 30 caracteres.",
    addName: "Agregar Nombre",
    removeName: "Eliminar Nombre",
    saveList: "Guardar Lista",
    backHome: "Volver al Inicio",
    help: "Ayuda",
    addParticipants: "Agregar Participantes"
  },
  fr: {
    title: "Échange de Cadeaux Secret",
    addIntro: "Ajoutez des participants à votre liste. Chaque nom doit être unique et ne pas dépasser 30 caractères.",
    addName: "Ajouter un Nom",
    removeName: "Supprimer un Nom",
    saveList: "Enregistrer la Liste",
    backHome: "Retour à l'Accueil",
    help: "Aide",
    addParticipants: "Ajouter des Participants"
  },
  pt: {
    title: "Amigo Secreto",
    addIntro: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres.",
    addName: "Adicionar Nome",
    removeName: "Remover Nome",
    saveList: "Salvar Lista",
    backHome: "Voltar ao Início",
    help: "Ajuda",
    addParticipants: "Adicionar Participantes"
  }
};

// ✅ Function to apply the selected language
function applyLanguage(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem('lang', lang);
}

// ✅ On page load: apply saved/default language
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');
  const savedLang = localStorage.getItem('lang') || 'en';

  if (selector) {
    selector.value = savedLang;
    selector.addEventListener('change', function () {
      applyLanguage(this.value);
    });
  }

  applyLanguage(savedLang);
});
