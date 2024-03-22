'use strict'
var gTypeImages
var gGallery=document.querySelector('.gallery')

function renderGallery() {
// var strContStart=`<main class="gallery-container">`
// var strContEnd=`</main>`
const elMainGallery=document.querySelector('.gallery-container')
    var strHtmls = gImgs.map(img => `
    <article class="img">
        <img src="${img.url}" 
        alt="Image ${img.id}"
        onclick="onImgSelect(${img.id})">
    </article> 
    `)
// gGallery.innerHTML +=  strContStart+strHtmls.join('')+strContEnd
elMainGallery.innerHTML=strHtmls.join('')


}
function onImgSelect (id){
    setImg(id)
    renderMeme()
    editorPage()
}
function onRandomMeme(){
    randomMeme()
    renderMeme()
    editorPage()
}
function onSearchingGallery(ev,from){
    ev.preventDefault();
    var inputValue=from.querySelector('input').value
   var newImages= searchingGallery(inputValue)
    console.log(newImages);

const elMainGallery=document.querySelector('.gallery-container')
 var strHtmls = newImages.map(img => `
    <article class="img">
        <img src="${img.url}" 
        alt="Image ${img.id}"
        onclick="onImgSelect(${img.id})">
    </article> 
    `)
    elMainGallery.innerHTML=strHtmls.join('')
}


 