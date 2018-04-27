vue.configuration.methods = {

  addSelectionToTarget: function (event) {
    console.log("adding selection to target", event);
    this.workbench.target.words.push(...event.target.value.split(/\s/));
    this.workbench.selection.value = EMPTY;
    this.updateVisualization();
  },

  removeWordFromTarget: function (event) {
    console.log("removing word from target", event);
    let words = this.workbench.target.words;
    let word = event.target.innerText;
    let index = words.indexOf(word);
    console.log(index);
    words.splice(index, 1);
    this.updateVisualization();
  },

  updateVisualization: function (event) {
    console.log("updating visualization", event);

    let getSignatureFrom = function (text) {
      console.log("getting signature from ", text);
      let sanitized = text.toLowerCase()
        .replace(/\s/g, EMPTY);
      let charArray = sanitized.split(EMPTY);
      let signature = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
        l: 0,
        m: 0,
        n: 0,
        o: 0,
        p: 0,
        q: 0,
        r: 0,
        s: 0,
        t: 0,
        u: 0,
        v: 0,
        w: 0,
        x: 0,
        z: 0
      };

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
