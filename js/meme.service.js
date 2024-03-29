'use strict'
const gFontSize = 16
const gPxPadding = gFontSize * 1.5
const gpxPaddingInline = gFontSize * 0.5
const gpxPaddingBottom = gFontSize * 0.2
const startLineX = 100
const startLineY = 20

var gEmojis=['😎','😂','😙', '😀', '🎉','⚽','🤠','😇']

var gIds = 1
var gMeme = createDefulatMeme()

function getMeme() {
  return gMeme
}

function setlineTxt() {
  const elTxtLine = document.querySelector('.text-line')
  gMeme.lines[gMeme.selectedLineIdx].txt = elTxtLine.value
}
function setImg(id) {
 gMeme=createDefulatMeme()
  gMeme.selectedImgId = id
}
function createDefulatMeme(){
return {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Add text Here',
      size: 1.25,
      color: 'white',
      borderColor: 'black',
      pos: { x: startLineX, y: startLineY },
      originalPos: { x: startLineX, y: startLineY },
      isDrag:false
    }
  ]
}
}
function SetOtherText(txt) {
  gMeme.lines[0].txt = txt
}

function ChangeTxtColor(inputColor) {
  gMeme.lines[gMeme.selectedLineIdx].color = inputColor.value
}
function changeTxtStrokeColor(inputColor) {
  gMeme.lines[gMeme.selectedLineIdx].borderColor = inputColor.value
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
    color: 'white',
    borderColor: 'black',
    pos: { x, y },
    originalPos: { x, y },
    isDrag:false,

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
function switchLineClicked(idx) {
  gMeme.selectedLineIdx = idx
  document.querySelector('.text-line').value = gMeme.lines[gMeme.selectedLineIdx].txt
}
function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}
function rightLine() {
  // only 3 clickes you can
  if (gMeme.lines[gMeme.selectedLineIdx].pos.x > gMeme.lines[gMeme.selectedLineIdx].originalPos.x + 60) return
  gMeme.lines[gMeme.selectedLineIdx].pos.x += 30
}
function leftLine() {
  // only 3 clickes you can
  if (gMeme.lines[gMeme.selectedLineIdx].pos.x < gMeme.lines[gMeme.selectedLineIdx].originalPos.x - 60) return
  gMeme.lines[gMeme.selectedLineIdx].pos.x -= 30
}
function centerLine() {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = gMeme.lines[gMeme.selectedLineIdx].originalPos.x
}

function copyMeme(meme) {
  var newMeme= {
    selectedImgId: meme.selectedImgId,
    selectedLineIdx: meme.selectedLineIdx,
    lines: {
      txt: meme.lines[meme.selectedLineIdx].txt,
      size: meme.lines[meme.selectedLineIdx].size,
      color: meme.lines[meme.selectedLineIdx].color,
      borderColor: meme.lines[meme.selectedLineIdx].borderColor,
      pos: meme.lines[meme.selectedLineIdx].pos,
      originalPos: meme.lines[meme.selectedLineIdx].originalPos,
    }
  }
  document.querySelector('.text-line').value=newMeme.lines.txt
}
function isLineClicked(clickedPos) {

	const { pos } = gMeme.lines[gMeme.selectedLineIdx]

    var txt=gMeme.lines[gMeme.selectedLineIdx].txt
    var widthLine=gCtx.measureText(txt).width

    var size=gMeme.lines[gMeme.selectedLineIdx].size*gFontSize
	
    return(clickedPos.x >= pos.x && clickedPos.x<= pos.x+widthLine && clickedPos.y<=(pos.y+gpxPaddingBottom) && clickedPos.y>gpxPaddingBottom + (pos.y - size))

}
function setLineDrag(isDrag) {
	gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}
function moveLine(dx, dy) {
	gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
	gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}
function renderEmojiTotxt(btn){
gMeme.lines[gMeme.selectedLineIdx].txt +=btn.innerText
}