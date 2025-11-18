const wrapper = document.getElementById("worldWrapper");
const frame = document.getElementById("frame");
const world = document.getElementById("world");
const floor = document.getElementById("floor");

const baseWidth = 1600;
const baseHeight = 900;

let chances = {
  CommonRaccoon: 1,
  GoldenRaccoon: 1,
  VirginiaOpossum: 1,
  LaboradorRetriever: 1,
  CavalierKingCharlesSpaniel: 1,
  PersianCat: 1,
  RagdollCat: 1
}


function changeChance(breed, modifier){
  chances[breed] += modifier;
}

// A list of all the item names (WITHOUT SPACES) and their corresponding attribute functions.
let attributeLookup = {
  "StandardTrashCan": [()=>{
    changeChance("CommonRaccoon", 30);
    changeChance("VirginiaOpossum", 5);
  }, ()=>{
    changeChance("CommonRaccoon", -30);
    changeChance("VirginiaOpossum", -5);
  }]
};


//Don't forget to clear localStorage! :)
let jsonData = {
  furniture: [
    {
      id: "trashcan",
      name: "Standard Trash Can",
      src: "JADEtrashcan.png",
      bottom: 100,
      left: 150
    },
    {
      id: "foodbowl",
      name: "Food Bowl",
      src: "foodbowl.png",
      bottom: 100,
      left: 500
    }
  ]
};

function loadFurniture() {

  if(!localStorage.getItem("backyardDecor")){
    console.log("filling backyard with local");
    localStorage.setItem("backyardDecor", JSON.stringify(jsonData));
  }
  //puts localstorage contents into variable jsondata
  jsonData = JSON.parse(localStorage.getItem("backyardDecor"));

  let backyardDecor = JSON.parse(localStorage.getItem("backyardDecor")).furniture;
  console.log("backyardDecor in loadFurniture: ", backyardDecor);

  for (let i of backyardDecor) {

    const decorContainer = document.createElement("div");

    const item = document.createElement("img");
    item.id = i.id;
    item.alt = i.name;
    item.src = i.src;

    decorContainer.style.position = "absolute";
    decorContainer.style.bottom = i.bottom + "px";
    decorContainer.style.left = i.left + "px";



    const itemPopUp = document.createElement("div"); //container for the pop up
    itemPopUp.className = "itemPopUp";
    itemPopUp.id = i + "item";
    const mainText = document.createElement("span"); //You found Larry the Raccoon!
    const attributeInfo = document.createElement("span"); //+5 Ticket Price
    const question = document.createElement("span"); //Take it in?

    mainText.innerText = `You found Placeholder the Placeholder!`;
    attributeInfo.innerText = `+NaN Placeholders`;
    question.innerText = `Take it in? Placeholder!`

    const animalButtons = document.createElement("div");
    animalButtons.className = "animalButtons";

    const acceptAnimal = document.createElement("button");
    acceptAnimal.id = "acceptAnimal";
    acceptAnimal.className = "animalButton";
    acceptAnimal.innerHTML = `&#10003`;

    const rejectAnimal = document.createElement("button");
    rejectAnimal.id = "rejectAnimal";
    rejectAnimal.className = "animalButton";
    rejectAnimal.innerText = `X`;
    animalButtons.appendChild(acceptAnimal);
    animalButtons.appendChild(rejectAnimal);

    itemPopUp.appendChild(mainText);
    itemPopUp.appendChild(attributeInfo);
    itemPopUp.appendChild(question);
    itemPopUp.appendChild(animalButtons);

    itemPopUp.style.position = "absolute";
    itemPopUp.style.right = "-50px";
    itemPopUp.style.top = "-200px";

    decorContainer.appendChild(item);
    decorContainer.appendChild(itemPopUp);
    world.appendChild(decorContainer);
  }
}

//runs whenever you pick something in the decor customization tab
function placeDecoration(itemObject){
  //shows the decor buttons, and hides the navigation buttons
  document.querySelector("#decorPopUp").style.display = "block";
  document.querySelectorAll(".navItem").forEach((el)=>{
    el.style.display = "none";
  });

  document.querySelector(`#${itemObject.id}`).style.border = "4px solid magenta";

  //saves the old decoration name and source image in case you decide not to use
  // the new decoration.
  const oldDecorationAlt = document.querySelector(`#${itemObject.id}`).alt;
  const oldDecorationSrc = document.querySelector(`#${itemObject.id}`).src;
  const oldKey = oldDecorationAlt.replaceAll(" ", "");
  const newKey = itemObject.name.replaceAll(" ", "");

  const oldEntry = attributeLookup[oldKey];
  const newEntry = attributeLookup[newKey];

  // if there is no entry, use a no-op function
  const deleteFunc = oldEntry ? oldEntry[1] : () => {};
  const addFunc = newEntry ? newEntry[0] : () => {};

  // newDecoration is the HTML element that corresponds to the itemObject id. This will replace the old decoration.
  const newDecoration = document.querySelector(`#${itemObject.id}`);
  newDecoration.alt = itemObject.name.replaceAll(" ", "");
  newDecoration.src = itemObject.src;

  //sets the text in the decor popup to reflect what you're currently placing
  document.querySelector("#decorChoice").innerText = itemObject.name;

  const placeDecorButton = document.querySelector("#placeDecor");
  const rejectDecorButton = document.querySelector("#rejectDecor");
  
  //runs if you choose to place down the item
  function placeDecor(){
    console.log("decor accepted :)");
    const decorIndex = (jsonData.furniture.findIndex((i)=>{
      return (i.id == itemObject.id);
    }));
    jsonData.furniture[decorIndex].id = itemObject.id;
    jsonData.furniture[decorIndex].name = itemObject.name;
    jsonData.furniture[decorIndex].src = itemObject.src;
    localStorage.setItem("backyardDecor", JSON.stringify(jsonData));
    deleteFunc();
    addFunc();
    document.querySelector(`#${itemObject.id}`).style.border = "none";
    localStorage.removeItem("decorChoice");
    cleanup();
    const itemParent = document.getElementById(itemObject.id).parentElement;
    const oldLocations = itemParent.querySelectorAll(`.animalLocation`);
    console.log(oldLocations);
    oldLocations.forEach((el)=>{
      console.log("removing old location")
      el.remove();
    })
    appendLocations(itemParent, itemObject.name.replaceAll(" ", ""));
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


window.addEventListener("resize", resizeWorld);
window.addEventListener("load", ()=>{
  loadFurniture();
  if(localStorage.getItem("decorChoice")){
    //if a decor item has been chosen in customization, run placeDecoration
    placeDecoration(JSON.parse(localStorage.getItem("decorChoice")));
  }
});





let countdown = 5;
let intervalId = null;

function updateDisplay() {
  document.getElementById("TTime").textContent = countdown;
}

function startTimer(onTimeout) {
  if (intervalId !== null) return; // Prevent multiple intervals

  updateDisplay();

  intervalId = setInterval(() => {
    countdown--;

    updateDisplay();

    if (countdown <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      onTimeout();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  countdown = 5;
  updateDisplay();
}



function trashTimeout() {
  (Math.random() < 0.5 ? possumAppear : raccoonAppear)();
}

function possumAppear() {
  document.querySelector("#possum").style.display = "block";
  
}

function raccoonAppear() {
  document.querySelector("#raccoon").style.display = "block";
}

function captureVisible() {
  document.querySelector("#question").style.display = "block";
  
}



resizeWorld();
startTimer(trashTimeout);