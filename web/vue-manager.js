console.log("dowloading data");
$.ajax({
  type: "GET",
  url: "https://raw.githubusercontent.com/Phreno/anagram-core/master/rsc/francais.txt",
  success: function downloadFrenchWords(data) {
    vue.configuration.data.wordlist.dictionnary = data.split(NEW_LINE);
    console.log("... french words loaded!");
    new Vue({
      el: APPLICATION_SELECTOR,
      data: vue.configuration.data,
      computed: vue.configuration.computed,
      methods: vue.configuration.methods
    });
  }
});;
