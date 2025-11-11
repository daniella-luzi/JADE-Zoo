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
        window.location.href = 'Backyard//SoftwareProject/index.html';
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
const creatureTab = document.querySelector("#creatureTab");
const encyclopediaTab = document.querySelector("#encyclopediaTab");
const animalPage = document.querySelector(".animalPage");
const encyclopedia_container = document.querySelector("#encyclopedia-container");
const creaturesButton = document.querySelector("#creaturesButton");
const closeEncyclopediaBtn = document.querySelector("#closeEncyclopediaBtn");
const descImage = document.querySelector("#encycloDescImage");
const encycloDescTitle = document.querySelector("#encycloDescTitle");
const encycloDescription = document.querySelector("#encycloDescription");
const dogBtn = document.querySelector("#dog");
const catBtn = document.querySelector("#cat");
const raccoonBtn = document.querySelector("#raccoon");
const encycloBtn = document.querySelector("#encyclopediaTab_btn");
const creaturesTab_btn = document.querySelector("#creaturesTab_btn");
const ownedAnimal1 = document.querySelector("#ownedAnimal1");
const ownedAnimal2 = document.querySelector("#ownedAnimal2");
const ownedAnimal3 = document.querySelector("#ownedAnimal3");
const creatureDescTitle = document.getElementById("creatureDescTitle");
const creatureDescription = document.getElementById("creatureDescription");
const creatureDescImage = document.getElementById("creatureDescImage");


creaturesButton.addEventListener("click", openEncyclopedia);
closeEncyclopediaBtn.addEventListener("click", closeEncyclopedia);

dogBtn.addEventListener("click", showDogPage);
catBtn.addEventListener("click", showCatPage);
raccoonBtn.addEventListener("click", showRaccoonPage);
encycloBtn.addEventListener("click", showEncyclopediaPage);
creaturesBtn.addEventListener("click", showCreaturePage);

ownedAnimal1.addEventListener("click", showOwnedAnimalPage("cat", "Johnathan"));
ownedAnimal2.addEventListener("click", showOwnedAnimalPage("dog", "Johnathan"));
ownedAnimal3.addEventListener("click", showOwnedAnimalPage("raccoon", "Racket"));

//Open and close the Encyclopedia
function openEncyclopedia()
{
  encyclopedia_container.classList.add("show");
  showCatPage();
  showEncyclopediaPage();
}
function closeEncyclopedia()
{
  encyclopedia_container.classList.remove("show");
}


//Change which tab is shown
function showEncyclopediaPage()
{
  creatureTab.classList.remove("show");
  encyclopediaTab.classList.add("show");
  creaturesTab_btn.classList.remove("active");
  encycloBtn.classList.add("active");
}

function showCreaturePage()
{
  assignButtonImages();
  showOwnedAnimalPage("cat", "Johnathan");
  encyclopediaTab.classList.remove("show");
  creatureTab.classList.add("show");
  encycloBtn.classList.remove("active");
  creaturesTab_btn.classList.add("active");
}


//Change which encyclopedia page is visible
function showDogPage(){
  descImage.src = "assets/animals/dog.jpeg";
  encycloDescTitle.textContent = "Dog";
  encycloDescription.textContent = "Is a dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showCatPage(){
  descImage.src = "assets/animals/johnathan_cat.png";
  encycloDescTitle.textContent = "Cat";
  encycloDescription.textContent = "Is a cat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showRaccoonPage(){
  descImage.src = "assets/animals/racket_raccoon.png";
  encycloDescTitle.textContent = "Raccoon";
  encycloDescription.textContent = "Is a raccoon. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}

let totalBaseIncome = 0;
let incomeMod = 1;
function assignActive(Species)
{
  switch(species)
  {
    case "cat":
      totalBaseIncome += 10;
      incomeMod += 0.1;
      break;
    case "dog":
      totalBaseIncome += 8;
      incomeMod += 0.2;
      break;
    case "raccoon":
      totalBaseIncome += 5;
      break;
  }
}

let trueIncome;
//Math
function calcIncome()
{
  trueIncome = Math.floor(totalBaseIncome * incomeMod);
}

function assignButtonImages()
{
  ownedAnimal1.style.backgroundImage = 'url("assets/animals/johnathan_cat.png")';
  ownedAnimal2.style.backgroundImage = 'url("assets/animals/dog.jpeg")';
  ownedAnimal3.style.backgroundImage = 'url("assets/animals/racket_raccoon.png")';
}

function showOwnedAnimalPage(species, name)
{
  console.log("Clicked");
  const animalName = `${name} the ${species}`;
  creatureDescTitle.textContent = animalName;
  switch(species)
    {
      case "cat":
        creatureDescImage.src = "assets/animals/johnathan_cat.png";
        break;
      case "dog":
        creatureDescImage.src = "assets/animals/dog.jpeg";
        break;
      case "raccoon":
        creatureDescImage.src = "assets/animals/racket_raccoon.png";
        break;
    }
}