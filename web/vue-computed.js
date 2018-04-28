vue.configuration.computed = {
  /*
   * Retourne vrai si la source est un whitespace
   */
  isEmptySource: function () {
    console.log("evaluating empty source");
    return EMPTY === this.workbench.source.value
      .toLowerCase()
      .replace(WHITESPACES, EMPTY);
  },

  /*
   * Retourne vrai si la cible est un whitespace
   */
  isEmptyTarget: function () {
    console.log("evaluating empty target");
    return EMPTY === this.workbench.target.words.join(EMPTY)
      .toLowerCase()
      .replace(WHITESPACES, EMPTY);
  },

  /*
   * Retourne vrai si le filtre est un whitespace
   */
  isSelectionEmpty: function () {
    console.log("evaluating empty selection");
    return EMPTY === this.workbench.selection.value.toLowerCase()
      .replace(WHITESPACES, EMPTY);
  },

  /*
   * Filtre le dictionnaire par rapport au champ «filtre», puis slice.
   */
  wordlistFiltered: function () {
    console.log("evaluating filtered word list");
    let filterWord = (word, index) => {
      let filter = new RegExp(this.workbench.selection.value, "g")
      return word.match(filter);
    };

    return $.grep(this.wordlist.dictionnary, filterWord)
      .slice(this.wordlist.currentOffset, NAVIGATION_PREVIEW_SIZE + this.wordlist.currentOffset);
  }
};
