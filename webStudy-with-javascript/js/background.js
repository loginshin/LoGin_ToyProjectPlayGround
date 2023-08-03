const images = ["0.jpg","1.jpg","2.jpg", "3.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img"); //img태그를 만들어낸다 : <img>
bgImage.src = `img/${chosenImage}`; //chosenImage로 랜던 사진을 뽑는 함수를 img/폴더에서 가져온다.

document.body.appendChild(bgImage);