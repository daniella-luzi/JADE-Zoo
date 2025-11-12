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
const encyclopedia_container = document.querySelector("#encyclopedia-container");
const creaturesButton = document.querySelector("#creaturesButton");// For opening Encyclopedia
const closeEncyclopediaBtn = document.querySelector("#closeEncyclopediaBtn");
const animalPage = document.querySelector(".animalPage"); 


//Encyclopedia Tab Stuff
const encyclopediaTab_btn = document.querySelector("#encyclopediaTab_btn");
const encyclopediaTab = document.querySelector("#encyclopediaTab");//The Button Page
const encycloDescImage = document.querySelector("#encycloDescImage"); 
const encycloDescTitle = document.querySelector("#encycloDescTitle");
const encycloDescription = document.querySelector("#encycloDescription");
const dogBtn = document.querySelector("#dog");
const catBtn = document.querySelector("#cat");
const raccoonBtn = document.querySelector("#raccoon");
const entryGrid = document.getElementById("entryGrid");


//Creature Tab Stuff
const creaturesTab_btn = document.querySelector("#creaturesTab_btn");
const creatureTab = document.querySelector("#creatureTab"); //The Button Page
const ownedAnimal1 = document.querySelector("#ownedAnimal1");
const ownedAnimal2 = document.querySelector("#ownedAnimal2");
const ownedAnimal3 = document.querySelector("#ownedAnimal3");
const creatureDescTitle = document.getElementById("creatureDescTitle");
const creatureDescription = document.getElementById("creatureDescription");
const creatureDescImage = document.getElementById("creatureDescImage");
const creatureGrid = document.getElementById("creatureGrid");

creaturesButton.addEventListener("click", openEncyclopedia);
closeEncyclopediaBtn.addEventListener("click", closeEncyclopedia);

/*
dogBtn.addEventListener("click", showDogPage);
catBtn.addEventListener("click", showCatPage);
raccoonBtn.addEventListener("click", showRaccoonPage);
*/
encyclopediaTab_btn.addEventListener("click", showEncyclopediaPage);
creaturesTab_btn.addEventListener("click", showCreaturePage);

/*
ownedAnimal1.addEventListener("click", showDogPage); //showOwnedAnimalPage("cat", "Johnathan", 0, 0));
ownedAnimal2.addEventListener("click", showOwnedAnimalPage("dog", "Johnathan", 0, 0));
ownedAnimal3.addEventListener("click", showOwnedAnimalPage("raccoon", "Racket", 0, 0));
*/

//Open and close the Encyclopedia
function openEncyclopedia()
{
  encyclopedia_container.classList.add("show");
  showEncyclopediaPage();
  //showCatPage();
  resetAnimalBtns();
  resetEntryBtns();
 
  populateOwnedAnimalBtns();
  setEncycloBtns();
}
function closeEncyclopedia()
{
  encyclopedia_container.classList.remove("show");
}


//Change which tab is shown
function showEncyclopediaPage()
{
  showAnimalEntry("Cat", "assets/animals/johnathan_cat.png");
  creatureTab.classList.remove("show");
  encyclopediaTab.classList.add("show");
  
  //highlights active tab button
  creaturesTab_btn.classList.remove("active");
  encyclopediaTab_btn.classList.add("active");
}

let animalJSONText = '{' +
    '"animals":[' +
        '{"species": "Cat", "name": "Johnathan", "src": "assets/animals/johnathan_cat.png", "baseIncome": 10, "incomeModifier": 0.2},' +
        '{"species": "Common Raccoon", "name": "Geoffrey", "src": "assets/animals/racket_raccoon.png", "baseIncome": 5, "incomeModifier": 0},' +
        '{"species": "Virginia Possum", "name": "Caliban", "src": "assets/animals/virginia_possum.png", "baseIncome": 10, "incomeModifier": 0.2},' +
        '{"species": "Labrador Retriever", "name": "Norbit", "src": "assets/animals/lab_puppy.png", "baseIncome": 8, "incomeModifier": 0.1},'+
        '{"species": "Golden Raccoon", "name": "Kyle", "src": "assets/animals/golden_raccoon.png", "baseIncome": 10, "incomeModifier": 0},'+
        '{"species": "Golden Raccoon", "name": "Chartreuse", "src": "assets/animals/golden_raccoon.png", "baseIncome": 10, "incomeModifier": 0},'+
        '{"species": "Cavalier King Charles Spaniel", "name": "Emily", "src": "assets/animals/cavalier_dog.png", "baseIncome": 10, "incomeModifier": 0},'+
        '{"species": "Common Raccoon", "name": "Racket", "src": "assets/animals/racket_raccoon.png", "baseIncome": 10, "incomeModifier": 0}'+
    ']'+
'}';
let parsedAnimals = JSON.parse(animalJSONText);

function showCreaturePage()
{
  //sets default page TBR
  showOwnedAnimalPage("Cat", "Johnathan", 10, 0.2);
  
  //Sets active tab
  encyclopediaTab.classList.remove("show");
  creatureTab.classList.add("show");
  
  //highlights active tab button
  encyclopediaTab_btn.classList.remove("active");
  creaturesTab_btn.classList.add("active");
}


//Change which encyclopedia page is visible
function showAnimalEntry(species, src)
{
  encycloDescImage.src = src;
  encycloDescTitle.textContent = species;
  encycloDescription.textContent = `Is a ${species}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;
}


//Function to show creature Tab descriptions.
function showOwnedAnimalPage(species, name, baseIncome, incomeMod)
{
  const animalName = `${name} the ${species}`;
  creatureDescTitle.textContent = animalName;
  switch(species)
    {
      case "Cat":
        creatureDescImage.src = "assets/animals/johnathan_cat.png";
        break;
      case "Lab":
        creatureDescImage.src = "assets/animals/lab_puppy.png";
        break;
      case "Common Raccoon":
        creatureDescImage.src = "assets/animals/racket_raccoon.png";
        break;
      case "Golden Raccoon":
        creatureDescImage.src = "assets/animals/golden_raccoon.png";
        break;
      case "Cavalier King Charles Spaniel":
        creatureDescImage.src = "assets/animals/cavalier_dog.png";
        break;
    }
  creatureDescription.textContent = `Base Income: ${baseIncome} 
          \nIncome Modifier: ${1+incomeMod}x`;
}



function populateOwnedAnimalBtns()
{
  /*
  for(let count of parsedAnimals.animals)
  {
    const animal = document.createElement("button");
    animal.id = `ownedAnimal${count}`;
    animal.style.backgroundImage = `url(${count.src})`;
    animal.classList.add("animalBtn");
    animal.onclick = () => showOwnedAnimalPage(
      count.species,
      count.name,
      count.baseIncome,
      count.incomeModifier
    );
    
    creatureGrid.appendChild(animal);
    
    if(count == parsedAnimals.animals.length)
    {
      break;
    }
  }
  */
  for (let i = 0; i < parsedAnimals.animals.length; i++) 
  {
    const animalData = parsedAnimals.animals[i];
    const animal = document.createElement("button");

    animal.id = `ownedAnimal${i}`;
    animal.style.backgroundImage = `url(${animalData.src})`;
    animal.classList.add("animalBtn");

    animal.onclick = () => showOwnedAnimalPage(
      animalData.species,
      animalData.name,
      animalData.baseIncome,
      animalData.incomeModifier
    );
    
    creatureGrid.appendChild(animal);
  }
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

function resetAnimalBtns()
{
  while (creatureGrid.lastChild)
    {
      creatureGrid.removeChild(creatureGrid.lastChild);
    }
}

function setEncycloBtns()
{
  const animalSpeciesArray = new Array(parsedAnimals.animals.length);
  for(let i =0; i < parsedAnimals.animals.length;i++)
    {
      const entryData = parsedAnimals.animals[i];
      animalSpeciesArray[i] = entryData.species;
      console.log(entryData.species);
    }
  const uniqueAnimals = [...new Set(animalSpeciesArray)];
  
  for (let i = 0; i < uniqueAnimals.length; i++) 
  {
    const entryData = parsedAnimals.animals[i];
    const entry = document.createElement("button");
    console.log(entryData.species);
    
    entry.id = `animalEntry{i}`;
    entry.style.backgroundImage = `url(${entryData.src})`;
    entry.classList.add("animalBtn");

    entry.onclick = () => showAnimalEntry(
      entryData.species,
      entryData.src
    );
    
    entryGrid.appendChild(entry);
  }
  
}
function resetEntryBtns()
{
  while (entryGrid.lastChild)
  {
     entryGrid.removeChild(entryGrid.lastChild);
  }
}


