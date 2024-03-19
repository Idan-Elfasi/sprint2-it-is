'use strict'
var gGallery=document.querySelector('.gallery')
function renderGallery() {
    var getImgs = ""
    getImgs = `<img onclick="onImgSelect (this)"  src="img/2.jpg">`
    gGallery.innerHTML += getImgs

}
function onImgSelect (img){
    setImg(img)
    console.log(gImgs);
    renderMeme()
    editorPage()
}


 