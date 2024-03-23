'use strict'

let gElCanvas
let gCtx
var gborderHieght
var gborderWidth


function inIt() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    renderMeme()
    editorPage()
    renderGallery()
    renderKeyWords()
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function renderMeme() {
    var meme = getMeme()
    var imgObject = getImgbyId(meme.selectedImgId)

    const img = new Image()
    img.src = imgObject.url

    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {

            const txt = line.txt
            const textSize = line.size
            var { x, y } = line.pos

            gCtx.fillStyle = line.color
            gCtx.strokeStyle = line.borderColor
            gCtx.font = `${line.size}em Regular `

            gCtx.strokeText(txt, x, y)
            gCtx.fillText(txt, x, y)

            if (idx === gMeme.selectedLineIdx) {

                var size = textSize * gFontSize
                gborderWidth = gCtx.measureText(txt).width

                gCtx.strokeStyle = 'black';
                gCtx.strokeRect(x, gpxPaddingBottom + (y - size), gborderWidth, size)

            }

        })
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
function onChangeTxtStrokeColor(inputColor) {
    changeTxtStrokeColor(inputColor)
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
function onAddLine() {
    addLine()
    console.log(gMeme);
    renderMeme()
}
function onSwitchLine() {
    switchLine()
    renderMeme()
}
function onUploadImg() {

}
function CheckOnlineClick(ev) {
    const { offsetX, offsetY } = ev

    gMeme.lines.forEach((line, idx) => {
        var txt=line.txt
        var widthLine=gCtx.measureText(txt).width
        var size=line.size*gFontSize
        var { x, y } = line.pos
        console.log('x: ' + x, 'y: ' + y, 'offsetX: ' + offsetX, 'offsety: ' + offsetY);
        // if (offsetX >= x && offsetX <= (gborderWidth + gpxPaddingInline) + x && offsetY >= y && offsetY <= y + (gborderHieght * 0.5 + gpxPaddingBottom)) 
        if(offsetX >= x && offsetX<= x+widthLine && offsetY<=(y+gpxPaddingBottom) && offsetY>gpxPaddingBottom + (y - size))
        {
            switchLineClicked(idx)
            renderMeme()
            console.log('this is the line clicked')
        }
    })
}
function onDeleteLine() {
    deleteLine()
    renderMeme()
}
function onRightLine() {
    rightLine()
    renderMeme()
}
function onLeftLine() {
    leftLine()
    renderMeme()
}
function onCenterLine() {
    centerLine()
    renderMeme()
}