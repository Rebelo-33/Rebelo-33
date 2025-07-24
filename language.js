// ✅ language.js

// All translatable text is stored in this object.
// Each key represents an element's data-lang value.
const translations = {
  title: {
    en: "Secret Gift Exchange",
    es: "Intercambio de Regalos Secreto",
    fr: "Échange de Cadeaux Secret",
    pt: "Amigo Secreto"
  },
  addIntro: {
    en: "Add participants to your list. Each name must be unique and no longer than 30 characters.",
    es: "Agrega participantes a tu lista. Cada nombre debe ser único y tener un máximo de 30 caracteres.",
    fr: "Ajoutez des participants à votre liste. Chaque nom doit être unique et ne pas dépasser 30 caractères.",
    pt: "Adicione participantes à sua lista. Cada nome deve ser único e ter no máximo 30 caracteres."
  },
  addName: {
    en: "Add Name", es: "Agregar Nombre", fr: "Ajouter un Nom", pt: "Adicionar Nome"
  },
  removeName: {
    en: "Remove Name", es: "Eliminar Nombre", fr: "Supprimer le Nom", pt: "Remover Nome"
  },
  saveList: {
    en: "Save List", es: "Guardar Lista", fr: "Enregistrer la Liste", pt: "Salvar Lista"
  },
  backHome: {
    en: "Back to Home", es: "Volver al Inicio", fr: "Retour à l'Accueil", pt: "Voltar ao Início"
  },
  help: {
    en: "Help", es: "Ayuda", fr: "Aide", pt: "Ajuda"
  },
  createList: {
    en: "Create New List", es: "Crear Nueva Lista", fr: "Créer une Nouvelle Liste", pt: "Criar Nova Lista"
  },
  myLists: {
    en: "My Lists", es: "Mis Listas", fr: "Mes Listes", pt: "Minhas Listas"
  },
  goToDraw: {
    en: "Go to Draw Page", es: "Ir a la Página de Sorteo", fr: "Aller à la Page de Tirage", pt: "Ir para Página de Sorteio"
  },
  intro: {
    en: "Welcome! The purpose of the Secret Gift Exchange is to facilitate the drawing of names among a group of participants.",
    es: "¡Bienvenido! El propósito del Intercambio de Regalos Secreto es facilitar el sorteo de nombres entre un grupo de participantes.",
    fr: "Bienvenue ! L'objectif de l'Échange de Cadeaux Secret est de faciliter le tirage au sort entre les participants.",
    pt: "Bem-vindo! O objetivo do Amigo Secreto é facilitar o sorteio de nomes entre os participantes."
  },
  accessForm: {
    en: "Enter list name, 4-digit PIN, and your secret code to manage the list.",
    es: "Ingrese el nombre de la lista, PIN de 4 dígitos y su código secreto para administrar la lista.",
    fr: "Entrez le nom de la liste, le code PIN à 4 chiffres et votre code secret pour gérer la liste.",
    pt: "Insira o nome da lista, o PIN de 4 dígitos e seu código secreto para gerenciar a lista."
  },
  access: {
    en: "Access", es: "Acceder", fr: "Accéder", pt: "Acessar"
  },
  cancel: {
    en: "Cancel", es: "Cancelar", fr: "Annuler", pt: "Cancelar"
  },
  listNameLabel: {
    en: "List:", es: "Lista:", fr: "Liste :", pt: "Lista:"
  },
  drawNow: {
    en: "Draw Name", es: "Sortea un Nombre", fr: "Tirer au Sort", pt: "Sortear Nome"
  },
  footerContact: {
    en: "Need help? Contact <a href='mailto:aniziacarvalino19@gmail.com'>aniziacarvalino19@gmail.com</a>",
    es: "¿Necesitas ayuda? Contacta con <a href='mailto:aniziacarvalino19@gmail.com'>aniziacarvalino19@gmail.com</a>",
    fr: "Besoin d’aide ? Contactez <a href='mailto:aniziacarvalino19@gmail.com'>aniziacarvalino19@gmail.com</a>",
    pt: "Precisa de ajuda? Contate <a href='mailto:aniziacarvalino19@gmail.com'>aniziacarvalino19@gmail.com</a>"
  },
  footerCopyright: {
    en: "&copy; 2025 All rights reserved",
    es: "&copy; 2025 Todos los derechos reservados",
    fr: "&copy; 2025 Tous droits réservés",
    pt: "&copy; 2025 Todos os direitos reservados"
  }
};

// Function to apply the selected language to the page
function applyTranslations(lang) {
  // For all elements with data-lang attribute
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[key] && translations[key][lang]) {
      // Set placeholder for input fields
      if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
        el.placeholder = translations[key][lang];
      } else {
        // Set inner text for normal elements
        el.innerHTML = translations[key][lang];
      }
    }
  });
}

// Setup translation on page load and language change
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-selector");
  const storedLang = localStorage.getItem("selectedLang") || "en";
  selector.value = storedLang;
  applyTranslations(storedLang);

  // Listen for language change
  selector.addEventListener("change", (e) => {
    const newLang = e.target.value;
    localStorage.setItem("selectedLang", newLang);
    applyTranslations(newLang);
  });
});
