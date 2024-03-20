'use strict'
var gGallery=document.querySelector('.gallery')
function renderGallery() {
    var getImgs = ""
    getImgs = `<img onclick="onImgSelect (this)"  src="img/2.jpg">`
    gGallery.innerHTML += getImgs
    // var strHtmls = gImgs.map(img => `
    // // <article class="img">
    // //     <img src="${img.url}" 
    // //     alt="Image ${img.id}"
    // //     onclick="onImgSelect(${img})">
    // // </article> 
    // // `)


}
function onImgSelect (img){
    setImg(img)
    console.log(gImgs);
    renderMeme()
    editorPage()
}


 