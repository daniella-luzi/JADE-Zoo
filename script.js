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
}


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
    console.log("filling local with decorations")
    localStorage.setItem("currentDecorations", JSON.stringify(jsonData));
  }
  jsonData = JSON.parse(localStorage.getItem("currentDecorations"));
  let currentDecorations = JSON.parse(localStorage.getItem("currentDecorations")).furniture;
  console.log("currentDecorations in loadFurniture: ", currentDecorations)
  for (let i of currentDecorations) {
    const item = document.createElement("img");
    item.id = i.id;
    item.alt = i.name;
    item.src = i.src;
    item.style.position = "absolute";
    item.style.bottom = i.bottom + "px";
    item.style.left = i.left + "px";
    if (item.id == "backyardButton") {
      item.className = "navItem"
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
  })
  document.querySelector(`#${itemObject.id}`).style.border = "4px solid magenta";
  const oldDecorationAlt = document.querySelector(`#${itemObject.id}`).alt;
  console.log(oldDecorationAlt);
  const oldDecorationSrc = document.querySelector(`#${itemObject.id}`).src;
  const deleteFunc = attributeLookup[oldDecorationAlt.replaceAll(" ", "")][1];
  const newDecoration = document.querySelector(`#${itemObject.id}`);
  newDecoration.alt = itemObject.name.replaceAll(" ", "");
  document.querySelector("#decorChoice").innerText = newDecoration.alt;
  newDecoration.src = itemObject.src;
  const addFunc = attributeLookup[newDecoration.alt][0];

  const placeDecorButton = document.querySelector("#placeDecor");
  const rejectDecorButton = document.querySelector("#rejectDecor");
  
  //runs if you choose to place down the item
  function placeDecor(){
    console.log("decor accepted :)");
    console.log("jsonData before placement: ", jsonData);
    const decorIndex = (jsonData.furniture.findIndex((i)=>{
      return (i.id == itemObject.id)
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
    })
    placeDecorButton.removeEventListener('click', placeDecor);
    rejectDecorButton.removeEventListener('click', rejectDecor);
  }


  //adds event listeners to the yes and no buttons onclick
  placeDecorButton.addEventListener("click", placeDecor);
  rejectDecorButton.addEventListener("click", rejectDecor)
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
  console.log("adding to tip: ", amt)
  tip += amt;
}

function changeTipChance(amt){
  console.log("adding to tip chance: ", amt)
  tipChance += amt;
}



















//Encyclopedia stuff
const encyclopedia_container = document.querySelector(
  "#encyclopedia-container"
);
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
function openEncyclopedia() {
  encyclopedia_container.classList.add("show");
  descImage.style.opacity = 0;
  descTitle.textContent = "";
  description.textContent = "";
}
function closeEncyclopedia() {
  encyclopedia_container.classList.remove("show");
}

//Change which page is visible
function showDogPage() {
  descImage.style.opacity = 1;
  descImage.src = "assets/animals/dog.jpeg";
  descTitle.textContent = "Dog";
  description.textContent =
    "Is a dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showCatPage() {
  descImage.style.opacity = 1;
  descImage.src = "assets/animals/cat.jpg";
  descTitle.textContent = "Cat";
  description.textContent =
    "Is a cat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showRatPage() {
  descImage.style.opacity = 1;
  descImage.src = "assets/animals/rat.jpeg";
  descTitle.textContent = "Rat";
  description.textContent =
    "Is a rat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
