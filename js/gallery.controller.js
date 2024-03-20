'use strict'
var gGallery=document.querySelector('.gallery')
function renderGallery() {
var strContStart=`<main class="gallery-container">`
var strContEnd=`</main>`
    var strHtmls = gImgs.map(img => `
    <article class="img">
        <img src="${img.url}" 
        alt="Image ${img.id}"
        onclick="onImgSelect(${img.id})">
    </article> 
    `)
gGallery.innerHTML +=  strContStart+strHtmls.join('')+strContEnd


}
function onImgSelect (id){
    setImg(id)
    renderMeme()
    editorPage()
}


 