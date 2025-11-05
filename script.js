const wrapper = document.getElementById('worldWrapper');
const frame = document.getElementById('frame');
const world = document.getElementById('world');
const floor = document.getElementById('floor');

const baseWidth = 1600;
const baseHeight = 900;

let jsonDataText = "{" +
  '"furniture":[' +
    '{"id": "bench", "name": "bench", "src": "assets/furniture/benches/bench.png", "bottom": 220, "left": 0},' +
    '{"id": "catTree", "name": "plant cat tree", "src": "assets/furniture/cat trees/plant cat tree.png", "bottom": 220, "left": 1200},' +
    '{"id": "window", "name": "window", "src": "assets/furniture/wall/windows/window.png", "bottom": 500, "left": 800},' +
    '{"id": "rug", "name": "rug", "src": "assets/furniture/rugs/rug.png", "bottom": 0, "left": 350},' +
    '{"id": "bed1", "name": "fluffy bed", "src": "assets/furniture/beds/fluffy bed.png", "bottom": 50, "left": 50},' +
    '{"id": "bed2", "name": "circle bed", "src": "assets/furniture/beds/circle bed.png", "bottom": 220, "left": 500},' +
    '{"id": "bed3", "name": "pillow bed", "src": "assets/furniture/beds/pillow bed.png", "bottom": 220, "left": 800},' +
    '{"id": "backyardButton", "name": "backyardButton", "src": "assets/UI/backyard_button.png", "bottom": 420, "left": 1530},' +
    '{"id": "platform1", "name": "platform", "src": "assets/furniture/wall/platforms/platform.png", "bottom": 350, "left": 830},' +
    '{"id": "platform2", "name": "platform", "src": "assets/furniture/wall/platforms/platform.png", "bottom": 520, "left": 50},' +
    '{"id": "platform3", "name": "platform", "src": "assets/furniture/wall/platforms/platform.png", "bottom": 420, "left": 430},' +
    '{"id": "painting1", "name": "cat painting", "src": "assets/furniture/wall/paintings/painting.png", "bottom": 600, "left": 400}' +
  ']' +
'}';

let jsonData = JSON.parse(jsonDataText);

// makes the furniture appear on screen using their respective coordinates from the JSON data
function loadFurniture(){
  for(let i of jsonData.furniture){
    console.log(i);
    const item = document.createElement("img");
    item.id = i.id;
    item.alt = i.name;
    item.src = i.src;
    item.style.position = "absolute";
    item.style.bottom = i.bottom + "px";
    item.style.left = i.left + "px";
    if(item.id == "backyardButton"){
      item.addEventListener("click", ()=>{
        window.location.href = 'backyard/index.html';
      });
    }
    world.appendChild(item);
  }
}

function resizeWorld() {
  const availableW = wrapper.clientWidth;
  const availableH = wrapper.clientHeight;

  const scaleW = availableW / baseWidth;
  const scaleH = availableH / baseHeight;

  const scale = Math.min(scaleW, scaleH);

  // scale the world
  world.style.transform = `scale(${scale})`;

  // resize the frame to match scaled world
  frame.style.width = `${baseWidth * scale}px`;
  frame.style.height = `${baseHeight * scale}px`;
}



window.addEventListener('resize', resizeWorld);
window.addEventListener('load', loadFurniture);
resizeWorld();

//Encyclopedia stuff
const encyclopedia_container = document.querySelector("#encyclopedia-container");
const creaturesButton = document.querySelector("#creaturesButton");
const closeEncyclopediaBtn = document.querySelector("#closeEncyclopediaBtn");
const descImage = document.querySelector("#descImage");
const descTitle = document.querySelector("#descTitle");
const description = document.querySelector("#description");
const dogPage = document.querySelector("#dog");
const catPage = document.querySelector("#cat");
const ratPage = document.querySelector("#rat");


creaturesButton.addEventListener("click", openEncyclopedia);
closeEncyclopediaBtn.addEventListener("click", closeEncyclopedia);

dogPage.addEventListener("click", showDogPage);
catPage.addEventListener("click", showCatPage);
ratPage.addEventListener("click", showRatPage);


//Open and close the Encyclopedia
function openEncyclopedia(){
    encyclopedia_container.classList.add("show");
    descImage.style.opacity = 0;
    descTitle.textContent = "";
    description.textContent = "";
}
function closeEncyclopedia(){
    encyclopedia_container.classList.remove("show");
}

//Change which page is visible
function showDogPage(){
    descImage.style.opacity = 1;
    descImage.src = "assets/animals/dog.jpeg";
    descTitle.textContent = "Dog";
    description.textContent = "Is a dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showCatPage(){
    descImage.style.opacity = 1;
    descImage.src = "assets/animals/cat.jpg";
    descTitle.textContent = "Cat";
    description.textContent = "Is a cat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showRatPage(){
    descImage.style.opacity = 1;
    descImage.src = "assets/animals/rat.jpeg";
    descTitle.textContent = "Rat";
    description.textContent = "Is a rat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}