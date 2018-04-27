vue.configuration.data = {
  visualization: {
    canvas: {
      context: document.getElementById("canvas")
    }
  },
  wordlist: {
    dictionnary: []
  },
  workbench: {
    source: {
      label: "Texte source",
      value: "",
      placeholder: "Ici, saisir un texte source ..."
    },
    selection: {
      label: "Filtre",
      value: "",
      placeholder: "Ici, saisir un filtre ...",
      small: "[Entrée] pour valider"
    },
    target: {
      words: [],
      small: "[double-click] pour supprimer un élément"
    }
  },
}
