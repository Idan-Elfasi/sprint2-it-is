'use strict'

let gElCanvas
let gCtx



function inIt() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    renderMeme()
    editorPage()
    renderGallery()

}

function renderMeme() {
    var meme = getMeme()
    var imgObject = getImgbyId(meme.selectedImgId)

    const img = new Image()
    img.src = imgObject.url
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach( line => drawText(line))
    }
  
}
function onSetlineTxt() {
    setlineTxt()
    renderMeme()
}
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}
function onChangeTxtColor(inputColor) {
    ChangeTxtColor(inputColor)
    renderMeme()
}
function OndecreaseSizeByBtn() {
    DecreaseSizeByBtn()
    renderMeme()
}
function OnincreaseSizeByBtn() {
    IncreaseSizeByBtn()
    renderMeme()
}
function onAddLine(){
    addLine()
    console.log(gMeme);
    renderMeme()
}
function onSwitchLine(){
    switchLine()
    addBorderTxt()
}