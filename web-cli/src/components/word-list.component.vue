<template>
<div class="row">
  <div class="col">
    <div class="card"
         style="height:100%">
      <div class="card-header">

      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="inputWordFilter">Filtre</label>
          <input type="text"
                 class="form-control"
                 id="inputWordFilter"
                 placeholder="mot(s) ..."
                 v-model="filter"
                 @keyup.enter="onInputEnter_handler">
          <small id="emailHelp"
                 class="form-text text-muted">
              <kbd>enter</kbd> pour ancrer le texte
          </small>
        </div>
      </div>
      <div class="card-body">
        <div class="list-group">

          <!-- navigation vers le haut -->
          <a class="list-group-item list-group-item-action list-group-item-light"
             @click="onTopListClick_handler">
            <p class="text-center">
              <i class="material-icons">keyboard_arrow_up</i>
            </p>
          </a>

          <!-- liste des mots disponnibles pour le filtre -->
          <app-word-item v-for="(word,index) of filteredWords"
                         :value="word"
                         @input="word = $event"
                         :key="index"></app-word-item>

          <!-- navigation vers le bas -->
          <a class="list-group-item list-group-item-action list-group-item-light"
             @click="onBottomListClick_handler">
            <p class="text-center">
              <i class="material-icons">keyboard_arrow_down</i>
            </p>
          </a>

        </div>
      </div>
      <div class="card-footer"></div>
    </div>
  </div>


  <div class="col">

    <div class="card"
         style="height:100%">
      <div class="card-header">

      </div>

      <div class="card-body">
        <div class="list-group">

          <!-- liste des mots disponnibles pour le filtre -->
          <app-word-item v-for="(word,index) of likedWords"
                         :value="word"
                         @input="word = $event"
                         :key="index"></app-word-item>

        </div>
      </div>
      <div class="card-footer"></div>
    </div>
  </div>

</div>
</template>
<script>
import appWordItem from './word-item.component.vue'
export default {
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    filter: '',
    navigation: {
      previewSize: 20,
      increment: 10,
      offset: 0
    },
  }),
  computed: {
    /*
    Filtre le tableau pour récupérer un résultat affichable
    */
    // @auto-fold here
    filteredWords() {
      console.log("[word-list] applique le filtre sur la liste")
      let regexp = new RegExp(this.filter)

      function filterWords(value) {
        return value.word.match(regexp)
      }

      return $.grep(this.words, filterWords).slice(this.navigation.offset, this.navigation.offset + this.navigation.previewSize)

      //return this.words.filter(filterWords).slice(this.navigation.offset, this.navigation.offset + this.navigation.previewSize)
    },
    /*
    Filtre les seuls mots sélectionnés
    */
    // @auto-fold here
    selectedWords() {
      console.log("[word-list] calcule la liste des mots sélectionnés")

      function filterSelected(value) {
        return true === value.selected
      }
      return this.words.filter(filterSelected)
    },
    /*
     */
    // @auto-fold here
    likedWords() {
      console.log("[word-list] calcule la liste des mots préférrés")

      function filterLiked(value) {
        return true === value.liked
      }
      return this.words.filter(filterLiked)
    }
  },
  components: {
    appWordItem
  },
  methods: {
    /*
    Capture la validation du filtre
    */
    // @auto-fold here
    onInputEnter_handler(event) {
      console.log("[word-list] validation du filtre")
      console.log(event)
      let empty = ""

      function likeIfExist(element) {
        let elementFound = event.target.value === element.word

        if (elementFound && !element.liked) {
          element.liked = true
          return true
        } else return false
      }

      if (this.filteredWords.some(likeIfExist)) {
        this.filter = empty
      }
    },
    /*
    Capture le click sur le haut de la liste
    */
    // @auto-fold here
    onTopListClick_handler(event) {
      if (0 >= this.navigation.offset) {
        this.navigation.offset = 0
      } else {
        this.navigation.offset -= this.navigation.increment
      }
    },
    /*
    Capture le click sur le bas de la liste
    */
    // @auto-fold here
    onBottomListClick_handler(event) {
      this.navigation.offset += this.navigation.increment
    },
    /*
    Positionne la fenêtre de visualisation des résulats du filtre (fais descendre la fenêtre)
    */
    // @auto-fold here
    incrementCurrentOffset(event) {
      console.log("incrementing current offset", event);
      this.currentOffset += this.navigationIncrement;
    },
    /*
    Positionne la fenêtre de visualisation des résultats du filtre (fais remonter la fenêtre)
    */
    // @auto-fold here
    decrementCurrentOffset(event) {
      console.log("decrementing current offset", event);
      if (0 >= this.currentOffset) {
        this.currentOffset = 0;
        // on ne souhaite pas effectuer un slice négatif
        return;
      }
      this.currentOffset -= this.navigationIncrement;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
