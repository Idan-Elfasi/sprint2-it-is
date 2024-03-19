'use strict'
var gIds=1
var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}] 
var gMeme = { 
selectedImgId: 1, 
selectedLineIdx: 0, 
lines: [ 
{ 
txt: 'Add text Here', 
size: 20, 
color: 'red' 
} 
] 
} 
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2} 
function getMeme(){
    return gMeme
}
function getImgbyId(id){
 var img= gImgs.find( img => img.id===id)
 return img
}
function setlineTxt(){
    const elTxtLine=document.querySelector('.text-line')
  gMeme.lines[gMeme.selectedLineIdx].txt =elTxtLine.value
  console.log( gMeme.lines[gMeme.selectedLineIdx].txt);
}
function setImg(img){
 var nextImag=addImg(img)
gMeme.selectedImgId=nextImag.id
}
function addImg(img){
  var Imgurl=img.getAttribute("src");
  console.log(Imgurl);
  var nextImage={id:gIds+1,url:Imgurl , keywords:[]}
  gImgs.push(nextImage)
  return nextImage
}
function Save(){
  saveToStorage('memeDb' ,gMeme )
   }
   function Load(){
  gMeme=loadFromStorage('memeDb')
   }