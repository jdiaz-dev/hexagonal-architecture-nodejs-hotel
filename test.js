
/* 

    "el texto que quieras".count("111223344555")
    "Contando cuantas veces aparece el número ("3")
    [Out] 3 # el número '3'  aparece 2 veces
*/
const initialText = '111223344555'
function contadorDeCaracteres( text, character ){
    let textSplited = text.split(character)
    textSplited
    let match = textSplited.length - 1

    /* for(let x = 0; x < textSplited.length; x++){
        if(textSplited[x] === character){
            match++
        }
    } */
    return match
}
console.log(contadorDeCaracteres(initialText, '3' ))

