#!/usr/bin/env node
# coffeelint: disable=max_line_length
require '../index.js'
program=require 'commander'

program
  .option '-t, --text <text>', 'texte source'
  #.option '-l, --lazy', 'ne considère pas les accents'
  #.option '-a, --anagramme', 'liste les candidats pour anagramme'
  #.option '-p, --palindrome', 'liste les candidats pour palindrome'
  .option '-f, --filter <filter>', 'filtre a appliquer lors de la recherche de résultat'
  .option '-d, --detail', 'détail les résultats'
  .parse process.argv


displayAnagrammes=(candidate)->
  output=""

  if program.detail
    output+="#{program.text} ; "

  output+="#{candidate}"

  if program.detail
    substraction=program
      .text
      .substractWord candidate
      .rawConcatenation()
      .sortByFrequency()
    output+=" ; #{substraction}"
    if program.filter
      output+=" ; #{program.filter}"

  console.log output

if not program.text?
  console.error 'Un texte de travail est obligatoire (-t)'
  process.exit 1

source = (
  if program.filter then program.text.substractWord(program.filter).rawConcatenation()
  else program.text
)

source
  .elligiblesForAnagram()
  .sort (a, b)->return a.length-b.length
  .forEach displayAnagrammes
