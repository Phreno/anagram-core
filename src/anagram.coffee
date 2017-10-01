#!/usr/bin/env node
# coffeelint: disable=max_line_length
require '../index.js'
program=require 'commander'

program
  .option '-t, --text <text>', 'texte source'
  .option '-l, --list', 'cache les détaille'
  #.option '-a, --anagramme', 'liste les candidats pour anagramme'
  #.option '-p, --palindrome', 'liste les candidats pour palindrome'
  .option '-f, --filter <filter>', 'filtre a appliquer lors de la recherche de résultat'
  .parse process.argv

displayAnagrammes=(candidate)->
  output=""

  if not program.list
    #output+="#{program.text} ; "
    output+="#{
      program
        .text
        .anagramSanitization()
        .sortByFrequency()
        .reverse()
    } ; "


  output+="#{candidate}"

  if not program.list
    substraction=source
      .substractWord candidate
      .rawConcatenation()
      .sortByFrequency()
      .reverse()

    output+=" ; #{substraction}"

    if program.filter
      output+=" ; «#{program.filter}»"

  console.log output

if not program.text?
  console.error 'Un texte de travail est obligatoire (-t)'
  process.exit 1


if program.filter
  filter=
    substraction:program.text.substractWord(program.filter)
    outOfPerimeter:[]

  Object
    .keys filter.substraction
    .forEach (key)->
      if filter.substraction[key]<0
        filter.outOfPerimeter.push "#{key}: #{filter.substraction[key]}"


source = (
  if program.filter then filter.substraction.rawConcatenation()
  else program.text
)

source
  .elligiblesForAnagram()
  .sort (a, b)->return a.length-b.length
  .forEach displayAnagrammes

if program.filter
  filter
    .outOfPerimeter
    .forEach (r)-> console.log r
