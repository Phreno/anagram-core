vue.configuration.computed = {
  isEmptySource: function () {
    return EMPTY === this.workbench.source.value
      .toLowerCase()
      .replace(WHITESPACES, EMPTY);
  },
  isEmptyTarget: function () {
    return EMPTY === this.workbench.target.words.join(EMPTY)
      .toLowerCase()
      .replace(WHITESPACES, EMPTY);
  },
  isSelectionEmpty: function () {
    return EMPTY === this.workbench.selection.value.toLowerCase()
      .replace(WHITESPACES, EMPTY);
  },
  wordlistFiltered: function () {
    let filterWord = (word, index) => {
      let filter = new RegExp(this.workbench.selection.value, "g")
      return word.match(filter);
    };
    return $.grep(this.wordlist.dictionnary, filterWord)
      .slice(0, 14);
  }
};
