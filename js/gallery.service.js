var gImgs = [{ id: 1, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/3.jpg', keywords: ['animals', 'cute'], },
{ id: 3, url: 'img/4.jpg', keywords: ['funny', 'animals', 'cute'] },
{ id: 4, url: 'img/5.jpg', keywords: ['animals'] },
{ id: 5, url: 'img/6.jpg', keywords: ['funny', 'sad', 'cute'] },
{ id: 6, url: 'img/7.jpg', keywords: ['funny', 'crazy'] },
{ id: 7, url: 'img/8.jpg', keywords: ['funny', 'sarcastic'] },
{ id: 8, url: 'img/9.jpg', keywords: ['happy', 'sarcastic'] },
{ id: 9, url: 'img/10.jpg', keywords: ['funny', 'happy', 'cute'] },
{ id: 10, url: 'img/11.jpg', keywords: ['happy'] },
{ id: 11, url: 'img/12.jpg', keywords: ['guilty'] },
{ id: 12, url: 'img/13.jpg', keywords: ['success'] },
{ id: 13, url: 'img/14.jpg', keywords: ['guilty'] },
{ id: 14, url: 'img/15.jpg', keywords: [] },
{ id: 15, url: 'img/16.jpg', keywords: ['happy'] },
{ id: 16, url: 'img/17.jpg', keywords: ['guilty'] },
{ id: 17, url: 'img/18.jpg', keywords: ['happy', 'sad'] }]


function getImgbyId(id) {
  var img = gImgs.find(img => img.id === id)
  return img
}
function randomMeme() {
  var meme = getMeme()
  meme.lines.splice(1)
  
  var imgNum = getRandomIntInclusive(1, 17)
  var txt = makeLorem(2)
  document.querySelector('.text-line').value=txt
  
  setImg(imgNum)
  SetOtherText(txt)


}