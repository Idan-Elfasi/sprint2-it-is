'use strict'
var gSavedMems = []

function saveMeme(){

    var currMeme=getMeme()
    gSavedMems.push(currMeme)
    saveToStorage('savedMemes', gSavedMems)
}
function openMemeInEditor(idx) {
    gSavedMems= loadFromStorage('savedMemes')
    gMeme = gSavedMems[idx]
}
function getCurrIdxSavedmeme(){
    return gSavedMems.length-1
}