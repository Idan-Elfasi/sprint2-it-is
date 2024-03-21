'use strict'
const gFontSize = 16
const gPxPadding = gFontSize * 1.5
const gpxPaddingInline = gFontSize * 0.5
const gpxPaddingBottom = gFontSize * 0.2


var gIds = 1
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Add text Here',
      size: 1.25,
      color: 'red',
      pos: { x: 100, y: 20 },
    }
  ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
function getMeme() {
  return gMeme
}

function setlineTxt() {
  const elTxtLine = document.querySelector('.text-line')
  gMeme.lines[gMeme.selectedLineIdx].txt = elTxtLine.value
}
function setImg(id) {
  gMeme.selectedImgId =id
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
    pos: { x, y },

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

}
function switchLineClicked(idx){
gMeme.selectedLineIdx=idx
document.querySelector('.text-line').value = gMeme.lines[gMeme.selectedLineIdx].txt
}
 function deleteLine(){
  gMeme.lines.splice(gMeme.selectedLineIdx,1)
 }