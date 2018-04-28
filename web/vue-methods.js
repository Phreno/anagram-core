vue.configuration.methods = {
  /*
   * Ajoute les mots du filtre courant à la liste des mots du texte cible
   */
  addSelectionToTarget: function (event) {
    console.log("adding selection to target", event);
    this.workbench.target.words.push(...event.target.value.split(/\s/));
    this.workbench.selection.value = EMPTY;
    this.updateVisualization();
  },

  /*
   * Supprime un mot de la liste des mots du texte cible
   */
  removeWordFromTarget: function (event) {
    console.log("removing word from target", event);
    let words = this.workbench.target.words;
    let word = event.target.innerText;
    let index = words.indexOf(word);
    console.log(index);
    words.splice(index, 1);
    this.updateVisualization();
  },

  /*
   * Positionne la fenêtre de visualisation des résulats du filtre (fais descendre la fenêtre)
   */
  incrementCurrentOffset(event) {
    console.log("incrementing current offset", event);
    this.wordlist.currentOffset += NAVIGATION_INCREMENT;
  },

  /*
   * Positionne la fenêtre de visualisation des résultats du filtre (fais remonter la fenêtre)
   */
  decrementCurrentOffset(event) {
    console.log("decrementing current offset", event);
    if (0 >= this.wordlist.currentOffset) {
      this.wordlist.currentOffset = 0;
      // on ne souhaite pas effectuer un slice négatif
      return;
    }
    this.wordlist.currentOffset -= NAVIGATION_INCREMENT;
  },

  /*
   * Met à jour le composant de visualisation
   * TODO: modulariser
   */
  updateVisualization: function (event) {
    console.log("updating visualization", event);

    let getSignatureFrom = function (text) {
      console.log("getting signature from ", text);
      let sanitized = text.toLowerCase()
        .replace(/\s/g, EMPTY);
      let charArray = sanitized.split(EMPTY);
      let signature = toolbox.getNewEmptySignature();

      if (EMPTY === sanitized) {
        return signature;
      }

      let populate = function (letter) {
        let increment = 1;
        if (undefined === signature[letter]) {
          console.log(`"${letter}" is out of bound! adding "${letter}" to the dictionnary`);
          signature[letter] = increment;
        } else signature[letter] += increment;
      }
      charArray.forEach(populate);
      console.log(signature);
      return signature;
    };

    let sourceSignature = getSignatureFrom(this.workbench.source.value);
    let targetSignature = getSignatureFrom(this.workbench.target.words.join(EMPTY));

    let canvas = document.getElementById("canvas");

    let myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: Object.keys(sourceSignature),
        datasets: [{
          label: 'Occurences des lettres du texte source',
          data: Object.values(sourceSignature),
          backgroundColor: 'black',
          borderWidth: 1
        }, {
          label: 'Occurences des lettes du texte cible',
          data: Object.values(targetSignature),
          backgroundColor: 'blue',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
};
