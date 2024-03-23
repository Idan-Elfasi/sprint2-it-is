'use strict'
var gTypeImages
var gGallery = document.querySelector('.gallery')

function renderGallery() {

    const elMainGallery = document.querySelector('.gallery-container')
    var strHtmls = gImgs.map(img => `
    <article class="img">
        <img src="${img.url}" 
        alt="Image ${img.id}"
        onclick="onImgSelect(${img.id})">
    </article> 
    `)
    elMainGallery.innerHTML = strHtmls.join('')
}
function onImgSelect(id) {
    setImg(id)
    renderMeme()
    editorPage()
}
function onRandomMeme() {
    randomMeme()
    renderMeme()
    editorPage()
}
function onSearchingGallery(ev, form) {
    ev.preventDefault();
    var inputValue = form.querySelector('input').value
    renderfilterGallery(inputValue)
    onIncreaseKey(inputValue)
}
function renderKeyWords() {
    const elKeywords = document.querySelector('.search-by-keywords')
    var names = Object.keys(gKeywordSearchCountMap)
    var likes=Object.values(gKeywordSearchCountMap)
    console.log(names);
    var strHtmls = names.map((keyWord,idx) => ` <div  onclick="onSearchKey('${keyWord}'); onIncreaseKey('${keyWord}')"  style="font-size:${likes[idx]+7}px;" class="keyWord btn font-size-btn  ">${keyWord}</div>
 ` )
    elKeywords.innerHTML = strHtmls.join('')
}

function onSearchKey(keyWord) {
    var inputValue = document.querySelector('input').value = keyWord
    console.log(inputValue);
    renderfilterGallery(inputValue)
}
function renderfilterGallery(inputValue) {
    var newImages = searchingGallery(inputValue)

    const elMainGallery = document.querySelector('.gallery-container')
    var strHtmls = newImages.map(img => `
    <article class="img">
        <img src="${img.url}" 
        alt="Image ${img.id}"
        onclick="onImgSelect(${img.id})">
    </article> 
    `)
    elMainGallery.innerHTML = strHtmls.join('')
}

function onIncreaseKey(keyWord) {
    increaseKey(keyWord)
    renderKeyWords()
    console.log(gKeywordSearchCountMap);
}


