export const validateOnLetters = (value) => {
  const RE = /[一-龠]+|[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ]+|[А-ИК-ШЂЈ-ЋЏа-ик-шђј-ћџ]+|[a-zA-ZĂÂÎȘȚăâîșț]+|[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+|[a-pr-uwy-zA-PR-UWY-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+|[a-zA-ZæøåÆØÅ]+|[ぁ-ゔ]+|[a-zA-ZäöüßÄÖÜẞ]+|[ァ-ヴー]+|[a-zA-ZáéíñóúüÁÉÍÑÓÚÜ]+|[ёа-зй-шы-яЁА-ЗЙ-ШЫІіЎў]+|[[A-Za-zÀ-ÿ]+|[а-я]+|[ａ-ｚＡ-Ｚ]+|[々〆〤]+/i
  RE.lastIndex = 0
  return RE.test(value)
}

export const validateOnNumbers = (value) => {
  return !(/^[0-9]+$/.test(value))
}
