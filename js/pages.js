const gEditPage = document.querySelector('.editor')
const gGalleryPage = document.querySelector('.gallery')
const gSavedPage = document.querySelector('.saved')

function editorPage() {
    gEditPage.style.display = 'block'
    gGalleryPage.style.display = 'none'
    gSavedPage.style.display = 'none'
}
function galleryPage() {
    gEditPage.style.display = 'none'
    gGalleryPage.style.display = 'block'
    gSavedPage.style.display = 'none'
}
function  savePage(){
    gEditPage.style.display = 'none'
    gGalleryPage.style.display = 'none'
    gSavedPage.style.display = 'block' 
}