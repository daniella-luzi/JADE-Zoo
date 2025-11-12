const wrapper = document.getElementById("worldWrapper");
const frame = document.getElementById("frame");
const world = document.getElementById("world");
const floor = document.getElementById("floor");

const baseWidth = 1600;
const baseHeight = 900;

let tip = 0;
let tipChance = 1;


// A list of all the item names (WITHOUT SPACES) and their corresponding attribute functions.
let attributeLookup = {
  "WoodenBench": [()=>{addToTip(3)}, ()=>{addToTip(-3)}],
  "PlantCatTree": [()=>{changeTipChance(5)}, ()=>{changeTipChance(-5)}],
  "BasicWindow": [()=>{addToTip(1)}, ()=>{addToTip(-1)}],
  "FlowerWindow": [()=>{addToTip(5)}, ()=>{addToTip(-5)}],
  "BasicBench": [()=>{addToTip(1)}, ()=>{addToTip(-1)}],
  "BasicCatTree": [()=>{changeTipChance(1)}, ()=>{changeTipChance(-1)}],
  "FlowerPainting": [()=>{changeTipChance(2)}, ()=>{changeTipChance(-2)}],
  "CatPainting": [()=>{changeTipChance(1)}, ()=>{changeTipChance(-1)}]
};


// This is all the DEFAULT furniture. May change later.
let jsonData = {
  furniture: [
    {
      id: "bench",
      name: "Wooden Bench",
      src: "assets/furniture/benches/bench.png",
      bottom: 220,
      left: 0,
    },
    {
      id: "catTree",
      name: "Plant Cat Tree",
      src: "assets/furniture/cat trees/plant cat tree.png",
      bottom: 220,
      left: 1200,
    },
    {
      id: "window",
      name: "Basic Window",
      src: "assets/furniture/wall/windows/window.png",
      bottom: 500,
      left: 800,
    },
    {
      id: "rug",
      name: "Basic Rug",
      src: "assets/furniture/rugs/rug.png",
      bottom: 0,
      left: 350,
    },
    {
      id: "bed1",
      name: "Fluffy Bed",
      src: "assets/furniture/beds/fluffy bed.png",
      bottom: 50,
      left: 50,
    },
    {
      id: "bed2",
      name: "Circle Bed",
      src: "assets/furniture/beds/circle bed.png",
      bottom: 220,
      left: 500,
    },
    {
      id: "bed3",
      name: "Pillow Bed",
      src: "assets/furniture/beds/pillow bed.png",
      bottom: 220,
      left: 800,
    },
    {
      id: "backyardButton",
      name: "backyardButton",
      src: "assets/UI/backyard_button.png",
      bottom: 420,
      left: 1530,
    },
    {
      id: "platform1",
      name: "Basic Platform",
      src: "assets/furniture/wall/platforms/platform.png",
      bottom: 350,
      left: 830,
    },
    {
      id: "platform2",
      name: "Basic Platform",
      src: "assets/furniture/wall/platforms/platform.png",
      bottom: 520,
      left: 50,
    },
    {
      id: "platform3",
      name: "Basic Platform",
      src: "assets/furniture/wall/platforms/platform.png",
      bottom: 420,
      left: 430,
    },
    {
      id: "painting1",
      name: "Cat Painting",
      src: "assets/furniture/wall/paintings/painting.png",
      bottom: 600,
      left: 400,
    },
  ],
};

// makes the furniture appear on screen using their respective coordinates from the JSON data
function loadFurniture() {
  if(!localStorage.getItem("currentDecorations")){
    console.log("filling local with decorations");
    localStorage.setItem("currentDecorations", JSON.stringify(jsonData));
  }
  jsonData = JSON.parse(localStorage.getItem("currentDecorations"));
  let currentDecorations = JSON.parse(localStorage.getItem("currentDecorations")).furniture;
  console.log("currentDecorations in loadFurniture: ", currentDecorations);
  for (let i of currentDecorations) {
    const item = document.createElement("img");
    item.id = i.id;
    item.alt = i.name;
    item.src = i.src;
    item.style.position = "absolute";
    item.style.bottom = i.bottom + "px";
    item.style.left = i.left + "px";
    if (item.id == "backyardButton") {
      item.className = "navItem";
      item.addEventListener("click", () => {
        window.location.href = "Backyard//SoftwareProject/index.html";
      });
    }
    world.appendChild(item);
  }
}

//resizes the world dynamically
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


//runs whenever you pick something in the decor customization tab
function placeDecoration(itemObject){
  document.querySelector("#decorPopUp").style.display = "block";
  document.querySelectorAll(".navItem").forEach((el)=>{
    el.style.display = "none";
  });
  document.querySelector(`#${itemObject.id}`).style.border = "4px solid magenta";
  const oldDecorationAlt = document.querySelector(`#${itemObject.id}`).alt;
  console.log(oldDecorationAlt);
  const oldDecorationSrc = document.querySelector(`#${itemObject.id}`).src;
  const deleteFunc = attributeLookup[oldDecorationAlt.replaceAll(" ", "")][1];
  const newDecoration = document.querySelector(`#${itemObject.id}`);
  newDecoration.alt = itemObject.name.replaceAll(" ", "");
  document.querySelector("#decorChoice").innerText = itemObject.name;
  newDecoration.src = itemObject.src;
  const addFunc = attributeLookup[newDecoration.alt][0];

  const placeDecorButton = document.querySelector("#placeDecor");
  const rejectDecorButton = document.querySelector("#rejectDecor");
  
  //runs if you choose to place down the item
  function placeDecor(){
    console.log("decor accepted :)");
    console.log("jsonData before placement: ", jsonData);
    const decorIndex = (jsonData.furniture.findIndex((i)=>{
      return (i.id == itemObject.id);
    }));
    jsonData.furniture[decorIndex].id = itemObject.id;
    jsonData.furniture[decorIndex].name = itemObject.name;
    jsonData.furniture[decorIndex].src = itemObject.src;
    console.log("jsonData after placement: ", jsonData);
    console.log("localStorage before placement: ", localStorage);
    localStorage.setItem("currentDecorations", JSON.stringify(jsonData));
    console.log("localStorage after placement: ", localStorage);
    deleteFunc();
    addFunc();
    document.querySelector(`#${itemObject.id}`).style.border = "none";
    localStorage.removeItem("decorChoice");
    console.log("jsonData after placement: ", jsonData);
    cleanup();
  }
  
  //runs if you don't want to place down the item
  function rejectDecor() {
    console.log("decor rejected :(");
    newDecoration.alt = oldDecorationAlt;
    newDecoration.src = oldDecorationSrc;
    document.querySelector(`#${itemObject.id}`).style.border = "none";
    localStorage.removeItem("decorChoice");
    
    cleanup();
  }
  
  //a cleanup function hiding the decor buttons and putting the nav bar back on screen, as well as removing the event listeners
  function cleanup() {
    document.querySelector("#decorPopUp").style.display = "none";
    document.querySelectorAll(".navItem").forEach((el)=>{
      el.style.display = "block";
    });
    placeDecorButton.removeEventListener('click', placeDecor);
    rejectDecorButton.removeEventListener('click', rejectDecor);
  }


  //adds event listeners to the yes and no buttons onclick
  placeDecorButton.addEventListener("click", placeDecor);
  rejectDecorButton.addEventListener("click", rejectDecor);
}


window.addEventListener("resize", resizeWorld);
window.addEventListener("load", ()=>{
  loadFurniture();
  if(localStorage.getItem("decorChoice")){
    //if a decor item has been chosen in customization, run placeDecoration
    placeDecoration(JSON.parse(localStorage.getItem("decorChoice")));
  }
});
resizeWorld();


function addToTip(amt){
  console.log("adding to tip: ", amt);
  tip += amt;
}

function changeTipChance(amt){
  console.log("adding to tip chance: ", amt);
  tipChance += amt;
}



















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

encyclopediaTab_btn.addEventListener("click", showEncyclopediaPage);
creaturesTab_btn.addEventListener("click", showCreaturePage);


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
        '{"species": "Cavalier King Charles Spaniel", "name": "Emily", "src": "assets/animals/cavalier_dog.png", "baseIncome": 10, "incomeModifier": 0},'+
        '{"species": "Golden Raccoon", "name": "Chartreuse", "src": "assets/animals/golden_raccoon.png", "baseIncome": 10, "incomeModifier": 0},'+
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
      case "Labrador Retriever":
        creatureDescImage.src = "assets/animals/lab_puppy.png";
        break;
      case "Virginia Possum":
        creatureDescImage.src = "assets/animals/virginia_possum.png";
        break;
    }
  creatureDescription.textContent = `Base Income: ${baseIncome} 
          \nIncome Modifier: ${1+incomeMod}x`;
}



function populateOwnedAnimalBtns()
{
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