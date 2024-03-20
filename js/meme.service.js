'use strict'
const gFontSize = 16
const gPxPadding = gFontSize * 1.5
const gpxPaddingInline = gFontSize * 0.5
const gpxPaddingBottom = gFontSize * 0.2


var gIds = 1
var gImgs = [{ id: 1, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/3.jpg', keywords: ['animals', 'cute'], },
{ id: 3, url: 'img/4.jpg', keywords: ['funny', 'animals', 'cute'] },
{ id: 4, url: 'img/5.jpg', keywords: ['animals'] },
{ id: 5, url: 'img/6.jpg', keywords: ['funny', 'sad', 'cute'] },
{ id: 6, url: 'img/7.jpg', keywords: ['funny', 'crazy'] },
{ id: 7, url: 'img/8.jpg', keywords: ['funny', 'sarcastic'] },
{ id: 8, url: 'img/9.jpg', keywords: ['happy', 'sarcastic'] },
{ id: 9, url: 'img/10.jpg', keywords: ['funny', 'happy', 'cute'] },
{ id: 10, url: 'img/11.jpg', keywords: ['happy'] },
{ id: 11, url: 'img/12.jpg', keywords: ['guilty'] },
{ id: 12, url: 'img/13.jpg', keywords: ['success'] },
{ id: 13, url: 'img/14.jpg', keywords: ['guilty'] },
{ id: 14, url: 'img/15.jpg', keywords: [] },
{ id: 15, url: 'img/16.jpg', keywords: ['happy'] },
{ id: 16, url: 'img/17.jpg', keywords: ['guilty'] },
{ id: 17, url: 'img/18.jpg', keywords: ['happy', 'sad'] }]
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

  gborderData = {
    x,
    y: y - 0.5 * borderHieght,
    width: widthBorder + gpxPaddingInline,
    hight: borderHieght * 0.5 + gpxPaddingBottom
  }
}