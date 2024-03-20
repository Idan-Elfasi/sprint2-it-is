'use strict'
const gFontSize = 16
const gPxPadding = gFontSize * 1.5
const gpxPaddingInline = gFontSize * 0.5
const gpxPaddingBottom = gFontSize * 0.2

var gborderData = {
  x: 0,
  y: 0,
  width: 0,
  hight: 0
}
var gIds = 1
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Add text Here',
      size: 1.25,
      color: 'red',
      pos: { x: 100, y: 20 }
    }
  ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
function getMeme() {
  return gMeme
}
function getImgbyId(id) {
  var img = gImgs.find(img => img.id === id)
  return img
}
function setlineTxt() {
  const elTxtLine = document.querySelector('.text-line')
  gMeme.lines[gMeme.selectedLineIdx].txt = elTxtLine.value
}
function setImg(img) {
  var nextImag = addImg(img)
  gMeme.selectedImgId = nextImag.id
}
function addImg(img) {
  var Imgurl = img.getAttribute("src");
  console.log(Imgurl);
  var nextImage = { id: gIds + 1, url: Imgurl, keywords: [] }
  gImgs.push(nextImage)
  return nextImage
}
function ChangeTxtColor(inputColor) {
  gMeme.lines[gMeme.selectedLineIdx].color = inputColor.value
}

function DecreaseSizeByBtn() {
  gMeme.lines[gMeme.selectedLineIdx].size += -0.05
  
}
function IncreaseSizeByBtn() {
  gMeme.lines[gMeme.selectedLineIdx].size += 0.05
}
function createLine() {
  var x = gMeme.lines[gMeme.selectedLineIdx - 1].pos.x + gPxPadding
  var y = gMeme.lines[gMeme.selectedLineIdx - 1].pos.y + gPxPadding
  return {
    txt: 'Add text Here',
    size: 1.25,
    color: 'red',
    pos: { x, y }
  }
}
function addLine() {
  if (gMeme.selectedLineIdx != gMeme.lines.length - 1) { gMeme.selectedLineIdx = gMeme.lines.length - 1 }
  gMeme.selectedLineIdx++

  const line = createLine()
  gMeme.lines.push(line)

  document.querySelector('.text-line').value = ''


}

function drawText(line) {
  var { x, y } = line.pos
  gCtx.fillStyle = line.color

  gCtx.font = `${line.size}em Regular `

  gCtx.fillText(line.txt, x, y)
}

function switchLine() {
  var idx = gMeme.selectedLineIdx + 1
  gMeme.selectedLineIdx = (idx < gMeme.lines.length) ? idx : 0
  document.querySelector('.text-line').value = gMeme.lines[gMeme.selectedLineIdx].txt
  // gCtx.clearRect(gborderData.x,gborderData.y,gborderData.width,gborderData.hight)


  // addBorderTxt()


}
function addBorderTxt() {
  var { x, y } = gMeme.lines[gMeme.selectedLineIdx].pos

  var mull = 1.42857 // line hight from bootstrap 
  var size = gMeme.lines[gMeme.selectedLineIdx].size * gFontSize
  
  var borderHieght = (mull * size)


  var widthBorder = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
  console.log(widthBorder);

  gCtx.strokeRect(x, y - 0.5 * borderHieght, widthBorder, borderHieght * 0.5 + gpxPaddingBottom)

gborderData={
x,
y:y - 0.5 * borderHieght,
width:widthBorder + gpxPaddingInline,
hight:borderHieght * 0.5 + gpxPaddingBottom
}
}