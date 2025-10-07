export const settings = {
  // Branding & Design
  title: "Roulette Game",
  subtitle: "Try your luck!",

  // CSS Classes (SCSS classes)
  classes: {
    // Layout classes
    container: "gabby-home",
    gameContainer: "gabby-game",
    winContainer: "gabby-win",
    loseContainer: "gabby-lose",
    rulesContainer: "gabby-rules",
    
    // Page specific classes
    home: {
      content: "gabby-home__content",
      main: "gabby-home__main",
      logo: "logo",
      title: "gabby-home__title",
      description: "gabby-home__description",
      startButton: "gabby-home__start-button"
    },
    
    game: {
      content: "gabby-game__content",
      main: "gabby-game__main",
      logo: "logo",
      wheelContainer: "gabby-game__wheel-container",
      pointer: "roulette-pointer",
      playButton: "roulette-play-button",
      wheel: "roulette-wheel",
      characters: "gabby-game__characters"
    },
    
    win: {
      content: "gabby-win__content",
      main: "gabby-win__main",
      icon: "gabby-win__icon",
      title: "gabby-win__title",
      description: "gabby-win__description",
      form: "gabby-win__form",
      formTitle: "gabby-win__form-title",
      formGroup: "gabby-win__form-group",
      label: "gabby-win__label",
      input: "gabby-win__input",
      submitButton: "gabby-win__submit-button",
      playAgain: "gabby-win__play-again",
      success: "gabby-win__success",
      successTitle: "gabby-win__success-title",
      successDescription: "gabby-win__success-description",
      successButtons: "gabby-win__success-buttons",
      successPrimary: "gabby-win__success-primary",
      successSecondary: "gabby-win__success-secondary"
    },
    
    lose: {
      content: "gabby-lose__content",
      main: "gabby-lose__main",
      icon: "gabby-lose__icon",
      title: "gabby-lose__title",
      description: "gabby-lose__description",
      buttons: "gabby-lose__buttons",
      tryAgain: "gabby-lose__try-again",
      download: "gabby-lose__download",
      form: "gabby-lose__form",
      encouragement: "gabby-lose__encouragement"
    },
    
    rules: {
      content: "gabby-rules__content",
      main: "gabby-rules__main",
      header: "gabby-rules__header",
      title: "gabby-rules__title",
      subtitle: "gabby-rules__subtitle",
      contentCard: "gabby-rules__content-card",
      section: "gabby-rules__section",
      sectionTitle: "gabby-rules__section-title",
      list: "gabby-rules__list",
      backButton: "gabby-rules__back-button"
    },
    
    footer: {
      footer: "gabby-footer",
      overlay: "gabby-footer__overlay",
      content: "gabby-footer__content",
      container: "gabby-footer__container",
      links: "gabby-footer__links",
      link: "gabby-footer__link",
      separator: "gabby-footer__separator",
      copyright: "gabby-footer__copyright"
    }
  },

  // Images (paths to assets in /public folder)
  images: {
    titleImage: "/images/logo.png",
    backgroundImage: "/images/background.png",
    backgroundDesktop: "/images/background-desktop.jpg",
    rouletteWheel: "/images/roulette.png",
    pointer: "/images/pointer.png",
    play: "/images/play-btn.png",
    gabbyWin: "/images/gabby-win.png",
    loseIcon: "/images/part-fail.png",
    footerBackground: "/images/footer-bg.png",
    characters: "/images/persos-ensemble.png",
    sparkles: "/images/sparkles.png",
    // Coloring drawings - array of all available drawings
    drawings: [
      "/images/GAB-dessin-01.png",
      "/images/GAB-dessin-02.jpg",
      "/images/GAB-dessin-03.jpg",
      "/images/GAB-dessin-04.jpg",
      "/images/GAB-dessin-05.jpg",
      "/images/GAB-dessin-06.jpg",
      "/images/GAB-dessin-07.jpg",
    ],
  },

  // Audio files (paths to audio assets in /public/audio folder)
  audio: {
    spinningWheel: "/audio/spinning-wheel-slow.mp3",
    reveal: "/audio/ding-reveal.wav",
  },

  // PDF files (paths to PDF assets in /public/pdf folder)
  pdf: {
    // Coloring books - array of all available PDFs
    coloringBooks: [
      "/pdf/GAB-dessin-01.pdf",
      "/pdf/GAB-dessin-02.pdf",
      "/pdf/GAB-dessin-03.pdf",
      "/pdf/GAB-dessin-04.pdf",
      "/pdf/GAB-dessin-05.pdf",
      "/pdf/GAB-dessin-06.pdf",
      "/pdf/GAB-dessin-07.pdf",
    ],
  },

  // Text Content
  content: {
    intro: {
      title: "Tentez de gagner vos places de cinéma pour Gabby et la maison magique : le film",
      startButton: "JOUER",
    },
    game: {
      title: "Faites tourner la roue!",
      description: "Cliquez sur le bouton ci-dessous pour faire tourner la roue de la roulette",
      spinButton: "Tourner maintenant",
      spinning: "Spinning...",
    },
    win: {
      title: "Félicitations !",
      description: "Tu as gagné deux places de cinéma pour Gaby et la Maison Magique !",
      formTitle: "Formulaire de Réclamation de Prix",
      childFirstNameLabel: "Prénom",
      childLastNameLabel: "Nom",
      parentEmailLabel: "Adresse e-mail",
      addressLabel: "Adresse",
      postalCodeLabel: "Code postal",
      phoneNumberLabel: "Numéro de téléphone",
      submitButton: "Envoyer",
      successTitle: "Merci !",
      successDescription: "Votre demande de prix a été soumise avec succès. Vous recevrez un e-mail avec les instructions pour récupérer vos places de cinéma.",
      goHomeButton: "Retour à l'accueil",
    },
    lose: {
      title: "Tu as perdu mais ce n’est pas grave !",
      description: "Télécharge gratuitement un coloriage Gaby et la Maison Magique !",
      tryAgainButton: "Réessayer",
      goHomeButton: "Accueil",
      downloadButton: 'Télécharger',
    },
    menu: {
      rulesConditionsLabel: "Règlement du jeu-concours",
      rulesConditionsUrl: "/pdf/game_rules_leclerc.pdf",
      rulesText: "Le règlement complet du présent jeu-concours est disponible et consultable gratuitement à tout moment dans l'application en cliquant ici",
      rulesAcceptance: "La participation au jeu implique l'acceptation sans réserve du présent règlement.",
      leclercStoreLabel: "Produits E.Leclerc",
      leclercStoreUrl: "https://www.e.leclerc/recherche?q=gabby%20et%20la%20maison%20magique",
      universalLabel: "Universal Pictures",
      universalUrl: "https://www.youtube.com/watch?v=lBI0EjXB98o",
      copyright: "DREAMWORKS GABBY'S DOLLHOUSE © DREAMWORKS ANIMATION LLC. ALL RIGHTS RESERVED.",
    }
  },

  // Game Settings
  game: {
    winProbability: 0.3, // 30% chance to win (adjust as needed)
    spinDuration: 5000, // 3 seconds spin animation
    // Roulette Wheel Segments (true = win, false = lose)
    wheelSegments: {
      0: true,   // Win
      1: false,  // Lose
      2: false,  // Lose
      3: true,   // Win
      4: false,  // Lose
      5: false,  // Lose
    },
    numberOfSpins: 10,
  },

} as const;

export type Settings = typeof settings;

// Function to get a random coloring book
export function getRandomColoring() {
  const randomIndex = Math.floor(Math.random() * settings.images.drawings.length);
  console.log(randomIndex)
  return {
    image: settings.images.drawings[randomIndex],
    pdf: settings.pdf.coloringBooks[randomIndex],
    filename: `GAB-dessin-${String(randomIndex + 1).padStart(2, '0')}.pdf`
  };
}
