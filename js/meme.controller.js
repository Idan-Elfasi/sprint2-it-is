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
    // resizeCanvas()
    renderMeme()
    editorPage()
    renderGallery()
    renderKeyWords()
    renderEmojisButtons()
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

function CheckOnlineClick(ev) {
    const { offsetX, offsetY } = ev

    gMeme.lines.forEach((line, idx) => {
        var txt = line.txt
        var widthLine = gCtx.measureText(txt).width
        var size = line.size * gFontSize
        var { x, y } = line.pos
        if (offsetX >= x && offsetX <= x + widthLine && offsetY <= (y + gpxPaddingBottom) && offsetY > gpxPaddingBottom + (y - size)) {
            switchLineClicked(idx)
            renderMeme()
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

//drag and drop line
function addListeners() {
    addMouseListeners()
    addTouchListeners()

    // window.addEventListener('resize', () => {
    //     resizeCanvas() 
    //     renderMeme()
    // })
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
function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
function renderEmojisButtons() {
    const elEmojis=document.querySelector('.emojis-container')
     var strHtmls=gEmojis.map(emoji => `<button class="btn" onclick="onRenderEmojiTotxt(this)">${emoji}</button>`)
    elEmojis.innerHTML=strHtmls.join('')
}
function onRenderEmojiTotxt(btn){
renderEmojiTotxt(btn)
renderMeme()
}
