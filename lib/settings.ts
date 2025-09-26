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
    rouletteWheel: "/images/roulette.png",
    pointer: "/images/pointer.png",
    play: "/images/play-btn.png",
    gabbyWin: "/images/gabby-win.png",
    loseIcon: "/images/part-fail.png",
    footerBackground: "/images/footer-bg.png",
    characters: "/images/persos-ensemble.png",
    sparkles: "/images/sparkles.png",
    drawingDownload: "/images/dessin-fail.png",
  },

  // Audio files (paths to audio assets in /public/audio folder)
  audio: {
    spinningWheel: "/audio/spinning-wheel-slow.mp3",
    reveal: "/audio/ding-reveal.wav",
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
      title: "Félicitations!",
      description: "Vous avez gagné vos places de cinéma pour Gabby et la maison magique : le film!",
      formTitle: "Formulaire de Réclamation de Prix",
      childFirstNameLabel: "Prénom",
      childLastNameLabel: "Nom",
      parentEmailLabel: "Adresse e-mail",
      submitButton: "Envoyer",
    },
    lose: {
      title: "C'est perdu !",
      description: "Mais voici un coloriage à télécharger pour colorier à la maison.",
      tryAgainButton: "Réessayer",
      goHomeButton: "Accueil",
      downloadButton: 'Télécharger',
    },
    menu: {
      rulesConditionsLabel: "Règles & Conditions",
      rulesConditionsUrl: "/rules",
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
