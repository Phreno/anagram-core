<template>
<a class="word-item-component list-group-item list-group-item-action">

  <div class="row">
    <!-- Affichage du mot -->
    <div class="col">
      <p class="text-left"
         v-text="value.word">
      </p>
    </div>

    <!-- Actions sur le mot -->
    <div class="col">
      <p class="text-right">

        <!-- Ajout à la selection -->
        <!-- <span @click="onCheckClick_handler"
              class="pointer">
           <i class="material-icons text-primary"
              v-if="value.selected" :title="VIEW.selection.msgRemove">add_box</i>
           <i class="material-icons text-secondary"
              v-else :title="VIEW.selection.msgAdd">check_box_outline_blank</i>
        </span> -->

        <!-- Ajout aux favoris -->
        <span @click="onFavoriteClick_handler"
              class="pointer">
             <i class="material-icons text-danger"
                v-if="value.liked" :title="VIEW.favorite.msgRemove">favorite</i>
             <i class="material-icons text-secondary"
                v-else :title="VIEW.favorite.msgAdd">favorite_border</i>
        </span>

      </p>
    </div>
  </div>

</a>
</template>
<script>
import SignatureHelper from '../helper/signature.helper';

export default {
  data: () => ({
    VIEW: {
      // @auto-fold here
      favorite: {
        msgAdd: "Ajouter aux favoris",
        msgRemove: "Retirer des favoris"
      },
      // @auto-fold here
      selection: {
        msgAdd: "Ajouter à la selection",
        msgRemove: "Retirer de la selection"
      }
    },
    helper: new SignatureHelper()
  }),
  props: {
    /*
    Possibilité d'utiliser v-model
    */
    // @auto-fold here
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    /*
    Retourne un objet qui dénombre l'occurence des lettres présentes dans this.word
    */
    // @auto-fold here
    // signature() {
    //   console.log("[word-item] signature()")
    //   return this.helper.getSignatureFrom(this.value.word)
    // },
    /*
    Retourne une signature simplifiée destinée à l'affichage
    */
    // @auto-fold here
    // signatureSimple() {
    //   console.log("[word-item] signatureSimple()")
    //   return this.helper.simplify(this.signature)
    // }
  },
  methods: {
    /*
    Capture la (dé)sélection de l'icone favoris
    */
    // @auto-fold here
    onFavoriteClick_handler(event) {
      console.log(`[word-item] click sur l'icone favorite`)
      console.log(event)
      this.value.liked = !this.value.liked
      this.$emit('input', this.value) // v-model binding
    },
    /*
    Capture la (dé)sélection de l'icone check
    */
    // @auto-fold here
    onCheckClick_handler(event) {
      // console.log(`[word-item] click sur l'icone de selection`)
      // console.log(event)
      // this.value.selected = !this.value.selected
      // this.$emit('input', this.value) // v-model binding
    }
  }
}
</script>


<style lang="scss" scoped>
/*
On souhaite afficher une main au dessus des icônes cliquables
*/
.pointer {
    cursor: pointer;
}
</style>
