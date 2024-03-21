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

            gCtx.font = `${line.size}em Regular `

            gCtx.fillText(line.txt, x, y)
            if (idx === gMeme.selectedLineIdx && meme.lines.length > 1) {


                var mull = 1.42857 // line hight from bootstrap 
                var size = textSize * gFontSize

                 gborderHieght = (mull * size)


                 gborderWidth = gCtx.measureText(txt).width

                gCtx.strokeRect(x, y - 0.5 * gborderHieght, gborderWidth + gpxPaddingInline, gborderHieght * 0.5 + gpxPaddingBottom)
                
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
function onUploadImg() {

}
function CheckOnlineClick(ev) {
    const { offsetX, offsetY } = ev

    gMeme.lines.forEach((line,idx) => {
        var { x, y } = line.pos
        console.log('x: '+ x,'y: '+y,'offsetX: '+ offsetX,'offsety: '+ offsetY);
        if (offsetX >= x && offsetX <= (gborderWidth+gpxPaddingInline) + x && offsetY>=y && offsetY<= y+(gborderHieght*0.5+gpxPaddingBottom) ){
            switchLineClicked(idx)
            renderMeme()
            console.log('this is the line clicked')
        }
})
}
function onDeleteLine(){
    deleteLine()
    renderMeme()
}