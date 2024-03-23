'use strict'

let gElCanvas
let gCtx
var gborderWidth
var gStartPosLine
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function inIt() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
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
function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas() 
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}
function getEvPos(ev) {

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()         // Prevent triggering the mouse events
        ev = ev.changedTouches[0]   // Gets the first touch point

        // Calculate the touch position inside the canvas

        // ev.pageX = distance of touch position from the documents left edge
        // target.offsetLeft = offset of the elemnt's left side from the it's parent
        // target.clientLeft = width of the elemnt's left border

        return {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }

    } else {
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }
}
function onDown(ev) {

    // Save the position we started from...
    // Get the event position from mouse or touch
    gStartPosLine = getEvPos(ev)

    if (!isLineClicked(gStartPosLine)) return

    setLineDrag(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = gMeme.lines[gMeme.selectedLineIdx]
    if (!isDrag) return

    const pos = getEvPos(ev)

    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPosLine.x
    const dy = pos.y - gStartPosLine.y

    moveLine(dx, dy)

    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPosLine = pos

    // The canvas is rendered again after every move
    renderMeme()
}
function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}