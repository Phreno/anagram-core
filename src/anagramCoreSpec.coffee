require '../index.js'

describe 'noAccent', ->
  it 'doit retourner une chaine sans accent', ->
    expect('bepo').toBe 'bépo'.noAccent()

describe 'noWhiteSpace', ->
  it 'doit supprimer tous les espaces d\'une chaîne', ->
    expect('bépo').toBe 'b  é \t p \n o'.noWhiteSpace()

describe 'anagramSanitization', ->
  it 'doit supprimer les espaces et les accents', ->
    expect('bepo').toBe 'b épo'.anagramSanitization()

describe 'isAnagram', ->
  it 'vrai si l\'argument est une anagramme', ->
    expect(yes).toBe 'bépo'.isAnagram 'ep\nb ô'
  it 'faux si l\'argument n\'est pas une anagramme', ->
    expect(no).toBe 'bépo'.isAnagram 'auie'

describe 'palindrome', ->
  it 'doit retourner le palindrome', ->
    expect('opéb').toBe 'bépo'.palindrome()

describe 'isPalindrome', ->
  it 'vrai si le texte est réversible', ->
    expect(yes).toBe 'ébe'.isPalindrome()
    expect(yes).toBe 'eb e'.isPalindrome()
  it 'faux si le texte n\'est pas réversible', ->
    expect(no).toBe 'bépo'.isPalindrome()

describe 'isPalindromeOf', ->
  it 'vrai si le texte est un palindrome de l\'argument', ->
    expect(yes).toBe 'be po'.isPalindromeOf 'ô\tpé\nb'
  it 'faux si le texte n\'est pas un palindrome de l\'argument', ->
    expect(no).toBe 'bépo'.isPalindromeOf 'auie'

describe 'palindromicIndexOf', ->
  it 'retourne l\'index de la sous-chaîne assaînie', ->
    expect(1).toBe 'bépo'.palindromicIndexOf 'pe'
    expect(2).toBe 'bépo'.palindromicIndexOf 'op'
  it 'retourne -1 si introuvable', ->
    expect(-1).toBe 'bépo'.palindromicIndexOf 'àyx'

describe 'filterPalindromicLines', ->
  it 'retourne les palindromes d\'un texte sous forme de tableau', ->
    palindromes='''
    bbb
    bépo
    auie
    auieeiau
    bépoopéb
    .àyàyxh.g.
    '''.filterPalindromicLines()
    expect(2).toBe palindromes.length

describe 'signature', ->
  it 'retourne un objet qui dénombre les occurences', ->
    signature=JSON.stringify 'b épo\n\to'.signature()
    expected=JSON.stringify { b: 1, e: 1, p: 1, o: 2 }
    expect(expected).toBe signature

describe 'frequencySort', ->
  it 'retourne une chaîne triée par ordre de fréquence', ->
    expect('eaiioouéppbè').toBe 'bépoopèieaui'.sortByFrequency()

describe 'completion', ->
  it 'retourne tous les mots commençant par le mot', ->
    expect(134).toBe 'ana'.completion().length

describe 'substractWord',->
  it 'renvoie une signature détuite', ->
    expected=JSON.stringify {'b':1,'o':2}
    substract=JSON.stringify 'bépooo'.substractWord 'epo'
    expect(expected).toBe substract
    expect(-2).toBe 'bépo'.substractWord('ooo')['o']
    expect(-1).toBe 'bépo'.substractWord('a')['a']

describe 'containsAllCharsFrom', ->
  it 'vrai si les lettres peuvent servir a la composition du mot', ->
    expect(yes).toBe 'bépo'.containsAllCharsFrom 'obpé'
    expect(yes).toBe 'ébpo'.containsAllCharsFrom 'ôe'
    expect(no).toBe 'bépo'.containsAllCharsFrom   'auie'

describe 'elligiblesForAnagram', ->
  it 'retrouve tous les mots elligibles', ->
    anagrams="analogie".elligiblesForAnagram()
    expect(141).toBe anagrams.length
    expect(-1).not.toBe anagrams.indexOf "analogie"
    expect(-1).not.toBe anagrams.indexOf "loge"

describe 'rawConcatenation', ->
  it 'doit concaténer toutes les valeurs d\'un objet', ->
    expect('abcc').toBe {a:1,b:1,c:2}.rawConcatenation()
