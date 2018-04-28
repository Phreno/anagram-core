vue.configuration.data = {
  visualization: {
    canvas: {
      context: document.getElementById(CANVAS_SELECTOR)
        .getContext('2d')
    }
  },
  wordlist: {
    currentOffset: 0,
    navigationInterval: null
  },
  workbench: {
    // @auto-fold here
    source: {
      label: "Texte source",
      value: "",
      placeholder: "Ici, saisir un texte source ..."
    },
    // @auto-fold here
    selection: {
      label: "Filtre",
      value: "",
      placeholder: "Ici, saisir un filtre ...",
      small: "[Entrée] pour valider"
    },
    // @auto-fold here
    target: {
      words: [],
      small: "[double-click] pour supprimer un élément"
    }
  },
}
