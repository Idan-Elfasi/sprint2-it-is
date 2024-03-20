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
        
        gCtx.fillText(meme.lines[meme.selectedLineIdx].txt, 150, 20)
        gCtx.fillText(meme.lines[meme.selectedLineIdx+1].txt, 150, 50)
    }
    gCtx.fillStyle = meme.lines[meme.selectedLineIdx].color
    gCtx.font = `${meme.lines[meme.selectedLineIdx].size}em Regular `
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
