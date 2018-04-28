vue.configuration.methods = {
  /*
   * Ajoute les mots du filtre courant à la liste des mots du texte cible
   */
  // @auto-fold here
  addSelectionToTarget: function (event) {
    console.log("adding selection to target", event);
    this.workbench.target.words.push(...event.target.value.split(/\s/));
    this.workbench.selection.value = EMPTY;
    this.updateVisualization();
  },

  /*
   * Supprime un mot de la liste des mots du texte cible
   */
  // @auto-fold here
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
  // @auto-fold here
  incrementCurrentOffset(event) {
    console.log("incrementing current offset", event);
    this.wordlist.currentOffset += NAVIGATION_INCREMENT;
  },

  /*
   * Positionne la fenêtre de visualisation des résultats du filtre (fais remonter la fenêtre)
   */
  // @auto-fold here
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
  // @auto-fold here
  updateVisualization: function (event) {
    console.log("updating visualization", event);

    let sourceSignature = this.sourceSignature;
    let targetSignature = this.targetSignature;

    let canvas = document.getElementById(CANVAS_SELECTOR);

    // TODO: modularise
    // @auto-fold here
    let myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: Object.keys(sourceSignature),
        datasets: [{
          label: 'Occurences des lettes du texte cible',
          data: Object.values(targetSignature),
          backgroundColor: Object.values(sourceSignature)
            .map((sourceOccurences, index) => {
              let color = 'blue';
              if (sourceOccurences === Object.values(targetSignature)[index]) {
                color = 'green';
              } else if (sourceOccurences < Object.values(targetSignature)[index]) {
                color = 'red';
              }
              return color;
            }),
          borderWidth: 1
        }, {
          label: 'Occurences des lettres du texte source',
          data: Object.values(sourceSignature),
          backgroundColor: 'black',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
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
