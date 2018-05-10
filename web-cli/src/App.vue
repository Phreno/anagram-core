<template>
<div id="app"
     class="container-fluid">

  <div class="row">
    <div class="col">

      <div class="card">
        <div class="card-header"></div>
        <div class="card-body"
             v-text="words.length"></div>
        <div class="card-body">
          <textarea name="name"
                    rows="8"
                    cols="80"
                    v-model="referenceText"
                    @change="referenceText_changeHandler"></textarea>
        </div>
        <div class="card-footer"></div>
      </div>

    </div>
  </div>

  <app-word-list :words="words"></app-word-list>

</div>
</template>

<script>
import appWordList from './components/word-list.component'
import SignatureHelper from './helper/signature.helper'

export default {
  name: 'app',
  /*
  chargement du dictionnaire lors de la création du composant principal
  */
  // @auto-fold here
  created() {
    let that = this

    function parse(data) {
      console.log("[App] téléchargement des données de travail effectué")
      console.log("[App] données en cours de traitement")
      that.dictionnary = JSON.parse(data)
      console.log("[App] les données ont étés traitées avec succès")
    }

    function catchErr(err) {
      console.error("ERR: lors de la récupération des données")
      console.error(err)
    }

    let options = {
      type: "GET",
      url: "https://raw.githubusercontent.com/Phreno/anagram-core/master/rsc/francais.json",
      success: parse,
      error: catchErr
    }

    $.ajax(options)
  },
  data() {
    console.log("[App] computing data")
    return {
      dictionnary: [], // liste de tous les mots de la langue francaise
      referenceText: "", // texte saisi par l'utilisateur
      words: [], // liste des mots elligibles
      signatureHelper: new SignatureHelper() // utilitaire de travail avec les signatures
    }
  },
  computed: {
    // @auto-fold here
    referenceTextSignature() {
      console.log("[App] mise à jour de la signature du texte de référence")
      return this.signatureHelper.getSignatureFrom(this.referenceText).sign
    }
  },
  methods: {
    /*
    lorsque le texte change, on filtre le dictionnaire
    */
    // @auto-fold here
    referenceText_changeHandler() {
      console.log(`[App] le texte de référence change ${this.referenceText}`)
      console.log(`[App] il a pour signature ${JSON.stringify(this.referenceTextSignature)}`)

      let that = this

      function setup(obj) {
        obj.liked = false
      }

      this.words = this.dictionnary.reduce((accumulator, entry) => {
        if (entry.word.length <= that.referenceText.length) {
          if (that.signatureHelper.isElligible(entry.sign, that.referenceTextSignature)) {
            setup(entry)
            accumulator.push(entry)
          }
        }
        return accumulator
      }, [])

      console.log(`[App] les valeurs ont mises à jour`)
      console.log(this.words)
    }
  },
  components: {
    appWordList
  },
}
</script>

<style lang="scss">

</style>
