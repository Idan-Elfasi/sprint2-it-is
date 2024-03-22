const gEditPage = document.querySelector('.editor')
const gGalleryPage = document.querySelector('.gallery')
const gSavedPage = document.querySelector('.saved')

function editorPage() {
    gEditPage.classList.remove('hidden')
    gGalleryPage.classList.add('hidden')
    gSavedPage.classList.add('hidden')
 
}
function galleryPage() {
    gEditPage.classList.add('hidden')
    gGalleryPage.classList.remove('hidden')
    gSavedPage.classList.add('hidden')
}
function  savePage(){
    gEditPage.classList.add('hidden') 
    gGalleryPage.classList.add('hidden') 
    gSavedPage.classList.remove('hidden') 

}