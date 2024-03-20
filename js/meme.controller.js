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
        meme.lines.forEach((line, idx) => {
            const txt = line.txt
            const textSize = line.size
            var { x, y } = line.pos
            gCtx.fillStyle = line.color

            gCtx.font = `${line.size}em Regular `

            gCtx.fillText(line.txt, x, y)
            if (idx === gMeme.selectedLineIdx && meme.lines.length > 1) {


                var mull = 1.42857 // line hight from bootstrap 
                var size = textSize * gFontSize

                var borderHieght = (mull * size)


                var widthBorder = gCtx.measureText(txt).width
                console.log(widthBorder);

                gCtx.strokeRect(x, y - 0.5 * borderHieght, widthBorder+gpxPaddingInline, borderHieght * 0.5 + gpxPaddingBottom)
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