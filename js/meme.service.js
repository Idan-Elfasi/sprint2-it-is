'use strict'
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
      pos: { x: 150, y: 20 }
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
  gMeme.lines[gMeme.selectedLineIdx].size += -0.1
}
function IncreaseSizeByBtn() {
  gMeme.lines[gMeme.selectedLineIdx].size += 0.1
}
function createLine() {
  var x = gMeme.lines[gMeme.selectedLineIdx - 1].pos.x + 15
  var y = gMeme.lines[gMeme.selectedLineIdx - 1].pos.y + 15
  return {
    txt: 'Add text Here',
    size: 1.25,
    color: 'red',
    pos: { x, y }
  }
}
function addLine() {
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

function switchLine(){
   var idx =gMeme.selectedLineIdx+1
   gMeme.selectedLineIdx= (idx<gMeme.lines.length)?idx:0
   document.querySelector('.text-line').value =gMeme.lines[gMeme.selectedLineIdx].txt
   addBorderTxt()
}
function addBorderTxt(){
  var{x,y}=gMeme.lines[gMeme.selectedLineIdx].pos
  var mull=
gCtx.strokeRect(x-20,y-20,)


}