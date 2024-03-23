'use strict'

var gSaveSection=document.querySelector('.gallery-saved-memes')
function renderSavedMems(){
     var idx=getCurrIdxSavedmeme()
    var strHtmls= `
     <div onclick="onOpenMemeInEditor(${idx})" class="saved-meme-canvas">
    <canvas class="canvas-${idx}" width="200" height="200" ></canvas>
</div>`
gSaveSection.innerHTML += strHtmls
  gSavedMems.forEach((meme,idxArr) =>renderSave(idxArr)) 

 }
 function renderAfterLoad(){
    gSavedMems=loadFromStorage('savedMemes')
    var strHtmls=gSavedMems.map((meme,idx)=>`
    <div onclick="onOpenMemeInEditor(${idx})" class="saved-meme-canvas">
   <canvas class="canvas-${idx}" width="300" height="300" ></canvas>
</div>`)
gSaveSection.innerHTML += strHtmls
gSavedMems.forEach((meme,idxArr) =>renderSave(idxArr)) 

 }
 function renderSave(idx){
     let elCanvasSaved = document.querySelector(`.canvas-${idx}`)
     let ctxSaved = elCanvasSaved.getContext('2d')
     
     var meme=gSavedMems[idx]
     var imgObject = getImgbyId(meme.selectedImgId)
     
     const img = new Image()
     img.src = imgObject.url
     img.onload = function () {
         ctxSaved.drawImage(img, 0, 0,elCanvasSaved.width,elCanvasSaved.height)
         
         meme.lines.forEach(line => {
             const txt = line.txt
             const textSize = line.size
             var { x, y } = line.pos
             
             ctxSaved.fillStyle = line.color
             ctxSaved.strokeStyle = line.borderColor
             ctxSaved.font = `${textSize}em Regular `
             
             ctxSaved.strokeText(txt,x,y)
             ctxSaved.fillText(txt, x, y)
            } )
        }
    }
    function onSave(){
     saveMeme()
     renderSavedMems()
    //  renderSave()
    //  renderMeme()
     savePage()
    }

 function onOpenMemeInEditor(idx){
    openMemeInEditor(idx)
    renderMeme()
    editorPage()
 }