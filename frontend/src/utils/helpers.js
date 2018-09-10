export function capitalize (str = '') {
    return typeof str !== 'string'
      ? ''
      : str[0].toUpperCase() + str.slice(1)
}

export function getInitials(str = '') {
  if (str === null || str.length === 0){
    return str
  }
  const splittedWords = str.split(' ')
  if (splittedWords.length < 2){
    return splittedWords[0].charAt(0).toUpperCase()
  }
  return `${ splittedWords[0].charAt(0) }${ splittedWords[splittedWords.length - 1].charAt(0) }`.toUpperCase()
}