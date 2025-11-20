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

let baseValue = 1;

if (!localStorage.getItem("trashBaseValue")) {
  localStorage.setItem("trashBaseValue", baseValue);
}
else {
  //update trash value in local store
  baseValue = JSON.parse(localStorage.getItem("trashBaseValue"));
}



// A list of all the item names (WITHOUT SPACES) and their corresponding attribute functions.
let attributeLookup = {
  "StandardTrashCan": [()=>{
    changeChance("CommonRaccoon", 30);
    changeChance("VirginiaOpossum", 5);
  }, ()=>{
    changeChance("CommonRaccoon", -30);
    changeChance("VirginiaOpossum", -5);
  }], "CoolerTrashCan": [()=> {
  
  changeBaseValue(10000);
    
  }, ()=> {
  
  changeBaseValue(-10000);
    
  } ]
  
};

let locationLookup = {
  StandardTrashCan: ["top: 0px; left: 50px"]
};

let allBreeds = {
  CommonRaccoon: {
    attributeText: "+1 Ticket Price",
    entry: "These furry mammals are native to North America, but later spread to central Europe, the Caucasus, and Japan in the mid-20th century. They are nocturnal, meaning they sleep during the day. Raccoons are super intelligent; in fact, studies have shown that they can remember the solutions to tasks for at least 3 years! They originally lived in forests, but have adapted to live in urban areas, which is why you might find one digging through your trash. You may have noticed their dexterous paws. That's where they got their name! The word 'raccoon' was adopted into English from the native Powhatan term meaning 'animal that scratches with its hands'. Do NOT try to pet them.",
    src: "assets/animals/breeds/commonraccoon.png" //real picture
  },
  GoldenRaccoon: {
    attributeText: "+15 Ticket Price",
    entry: "While not really a 'breed' per se, these little guys are inspired by albino raccoons, which are normal raccoons but with a rare gene mutation that removes their 'melanin', or the pigment that makes their fur and skin dark. As a result, their fur is white, their noses are pink, and their eyes are red. This mutation only occurs in about one in every 10,000-20,000 raccoons, making sightings extremely rare. There are also blonde raccoons, a rare color morph with light brown or golden fur. Their masks and tail rings are still visible but not nearly as pronounced.",
    src: "assets/animals/breeds/blonderaccoon.png"
  },
  VirginiaOpossum: {
    attributeText: "+1 Ticket Price",
    entry: "These solitary marsupials, usually referred to as 'possums', can be found from Canada to Costa Rica. Like raccoons, they often roam around trash, compost, and gardens. Opossums have 'prehensile' tails, meaning they are used for grabbing and holding things. They have a whopping 50 teeth and opposable thumbs! Surprisingly, their brain is only 1/5 the size of a raccoon's. A mother opossum carries her children on her body, and newborn opossums are as tiny as a honeybee. When threatened by a predator, an opossum may 'play dead', or pretend to be dead or injured. But in some cases, opossums will absolutely fight back. DON'T pet them!",
    src: "assets/animals/breeds/virginiaopossum.png"
  },
  LaboradorRetriever: {
    attributeText: "+2 Ticket Price",
    entry: "We all know and love these playful canines. This breed comes from Britain and was created to hunt and track game in the 19th century. Labs have historically been trained to become guide and service dogs, war dogs, rescue dogs, and even police dogs. They of course make wonderful companions, as they are a friendly, energetic, intelligent, and loyal breed. Labs are very widespread - in fact, you may have seen a few in your neighborhood! They vary a lot in color, with black, chocolate, and yellow variants - all equally adorable.",
    src: "assets/animals/breeds/lab.png"
  },
  CavalierKingCharlesSpaniel: {
    attributeText: "+2 Ticket Price",
    entry: "This is a British breed of toy dog with four distinct color patterns, emerging in the 1920s. They are soft, snuggly, highly affectionate lap dogs that do great with children and other dogs. Cavaliers are not shy at all, and are highly adaptable. They are playful, active, and curious, and have been trained to become therapy dogs due to their sweet and gentle nature. Cavaliers often want to chase things, including vehicles, so they are not suited for off-leash walking, and they have a strong hunting instinct. They usually make terrible guard dogs because all strangers are friends to them.",
    src: "assets/animals/breeds/cavalier.png"
  },
  PersianCat: {
    attributeText: "+3 Ticket Price",
    entry: "Persian Longhairs are thought to have emerged in the 19th century. Selective breeding has caused them to have flat faces over time which cause health problems, but traditional Persians actually had normal muzzles. Persians are quiet cats that adapt well to indoor life, and are close and affectionate with their owners. They can be friendly towards strangers, and like to keep themselves clean, although require regular brushing to maintain their beautiful coats.",
    src: "assets/animals/breeds/persian.png"
  },
  RagdollCat: {
    attributeText: "+4 Ticket Price",
    entry: "Ragdolls originated around 1963 and have colorpoint coats, which means the colder the fur is over time, the darker it will become. Their fur looks like a heat map of their bodies! They are super affectionate and docile cats, and are even called 'ragdolls' because they can be completely limp and relaxed when picked up, just like a ragdoll. They are dog-like cats because they follow people around, are easily handled, are not typically aggressive towards other animals, can be super playful, want attention constantly, and are intelligent and trainable. They make wonderful family pets.",
    src: "assets/animals/breeds/ragdoll.png"
  }
}





function changeChance(breed, modifier){
  chances[breed] += modifier;
}




function changeBaseValue(amount) {
baseValue = baseValue + amount;
localStorage.setItem("trashBaseValue", baseValue);
}


//Don't forget to clear localStorage! :)
let jsonData = {
  furniture: [
    {
      id: "trashcan",
      name: "Standard Trash Can",
      src: "../assets/furniture/backyard/trashcans/JADEtrashcan.png",
      bottom: 100,
      left: 150
    },
    {
      id: "foodbowl1",
      name: "Food Bowl",
      src: "../assets/furniture/backyard/foodbowls/foodbowl.png",
      bottom: 100,
      left: 500
    }
  ]
};

function loadFurniture() {

  if(!localStorage.getItem("backyardDecor")){
    localStorage.setItem("backyardDecor", JSON.stringify(jsonData));
  }
  //puts localstorage contents into variable jsondata
  jsonData = JSON.parse(localStorage.getItem("backyardDecor"));

  let backyardDecor = JSON.parse(localStorage.getItem("backyardDecor")).furniture;

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
    question.innerText = `Take it in? Placeholder!`;

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
    itemPopUp.style.right = "-100%";
    itemPopUp.style.top = `-200px`;
    itemPopUp.style.visibility = "hidden";

    decorContainer.addEventListener("click",()=>{
      decorContainer.querySelector(".itemPopUp").style.visibility = "visible";
    })
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
      console.log("removing old location");
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









let countdown2 = 10;
let intervalId2 = null;

function updateDisplay2() {
  document.getElementById("TTTime").textContent = countdown2;
}

function startTimer2(onTimeout) {
  if (intervalId2 !== null) return; // Prevent multiple intervals

  updateDisplay2();

  intervalId2 = setInterval(() => {
    countdown2--;

    updateDisplay2();

    if (countdown2 <= 0) {
      clearInterval(intervalId2);
      intervalId2 = null;
      onTimeout();
    }
  }, 1000);
}

function resetTimer2() {
  clearInterval(intervalId2);
  intervalId2 = null;
  countdown2 = 10;
  updateDisplay2();
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


var currentAnimalType;
var currentAnimalName;
var currentAnimalBaseMoney;
var currentAnimalTipPer;
var currentAnimalTipVal;

function captureVisible(AnimalElement) {
  // Asks if you want to capture or not. 
  if (inMenu == true) {
    return;
  }

  inMenu = true;
  document.querySelector(".action-buttons-container").style.display = "flex";
  
  document.querySelector("#question").style.display = "block";
  document.querySelector("#animalType").style.display = "block";
  // Uses the alt text of the image to display the message
  
  document.querySelector("#baseValue").style.display = "flex";
  document.querySelector("#tipChance").style.display = "flex";
  document.querySelector("#tipValue").style.display = "flex";


  const animalName = AnimalElement.alt;  //animal type
  document.querySelector("#animalType").textContent = "What a cute " + animalName + "!";
  currentAnimalType = animalName;
  
  
  var animalsFirstName = getRandomName();      //animal name, sorry for confusion
  document.querySelector("#question").textContent = "You found " + animalsFirstName + "!";
  currentAnimalName = animalsFirstName;

  
  
  //if you have diffrent trash can, logic would be here.
  
  currentAnimalBaseMoney = Math.floor(Math.random() * 4) + baseValue;
  currentAnimalTipPer =    Math.floor(Math.random() * 5) + 1;
  currentAnimalTipVal =    Math.floor(Math.random() * 7) + 4;
  
  
  document.querySelector("#baseValue").textContent = "+$" + currentAnimalBaseMoney + " per second";
  document.querySelector("#tipChance").textContent = currentAnimalTipPer + "% tip chance";
  document.querySelector("#tipValue").textContent = "+$" + currentAnimalTipPer + " per tip";
  
}


function captureVisible2(AnimalElement) {
  // Asks if you want to capture or not. 
  if (inMenu == true) {
    return;
  }

  inMenu = true;
  document.querySelector(".action-buttons-container2").style.display = "flex";
  document.querySelector("#question2").style.display = "block";
  document.querySelector("#animalType2").style.display = "block";
  // Uses the alt text of the image to display the message
  
  document.querySelector("#baseValue2").style.display = "flex";
  document.querySelector("#tipChance2").style.display = "flex";
  document.querySelector("#tipValue2").style.display = "flex";


  const animalName = AnimalElement.alt;  //animal type
  document.querySelector("#animalType2").textContent = "What a cute " + animalName + "!";
  currentAnimalType = animalName;
  
  
  var animalsFirstName = getRandomName();      //animal name, sorry for confusion
  document.querySelector("#question2").textContent = "You found " + animalsFirstName + "!";
  currentAnimalName = animalsFirstName;

  
  
  //if you have diffrent pet bowl, logic would be here.
  
  currentAnimalBaseMoney = Math.floor(Math.random() * 4) + 1;
  currentAnimalTipPer =    Math.floor(Math.random() * 5) + 1;
  currentAnimalTipVal =    Math.floor(Math.random() * 7) + 4;
  
  
  document.querySelector("#baseValue2").textContent = "+$" + currentAnimalBaseMoney + " per second";
  document.querySelector("#tipChance2").textContent = currentAnimalTipPer + "% tip chance";
  document.querySelector("#tipValue2").textContent = "+$" + currentAnimalTipPer + " per tip";
  
}


var inMenu = false;

// var currentAnimalType;
// var currentAnimalName;
// var currentAnimalBaseMoney;
// var currentAnimalTipPer;
// var currentAnimalTipVal;

let breedImages = {
  "VirginiaOpossum": "assets/animals/virginia_possum.png",
  "CommonRaccoon": "assets/animals/racket_raccoon.png",
  "PersianCat": "assets/animals/johnathan_cat.png",
}

function keep() {
  console.log("currentAnimalType: ", currentAnimalType)
  if(currentAnimalType == "Possum"){
    currentAnimalType = "VirginiaOpossum";
  }
  if(currentAnimalType == "Raccoon"){
    currentAnimalType = "CommonRaccoon";
  }
  if(currentAnimalType == "Cat"){
    currentAnimalType = "PersianCat";
  }
  const newAnimal = {
    name: currentAnimalName,
    breed: currentAnimalType,

    baseMoney: currentAnimalBaseMoney,
    tipChance: currentAnimalTipPer,
    tipValue: currentAnimalTipVal,

    attributeText:
  `+$${currentAnimalBaseMoney} per second\n` +
  `+${currentAnimalTipPer}% tip chance\n` +
  `+$${currentAnimalTipVal} per tip`,

    src: breedImages[currentAnimalType.replaceAll(" ", "")],
    active: false
  };


  const currentownedCreatures = JSON.parse(localStorage.getItem("ownedCreatures"));
  currentownedCreatures.push(newAnimal);
  console.log(currentownedCreatures);
  localStorage.setItem("ownedCreatures", JSON.stringify(currentownedCreatures));
  console.log(localStorage.getItem("ownedCreatures"));
  alert("Good job! You saved the animal!");
  window.location.href = "index.html";
}

function release() {
  inMenu = false;
  document.querySelector("#question").style.display = "none";
  document.querySelector("#animalType").style.display = "none";
  document.querySelector(".action-buttons-container").style.display = "none";

  document.querySelector("#baseValue").style.display = "none";
  document.querySelector("#tipValue").style.display = "none";
  document.querySelector("#tipChance").style.display = "none";
  
  resetTimer();
  startTimer(trashTimeout);
  
  document.querySelector("#raccoon").style.display = "none";
  document.querySelector("#possum").style.display = "none";
  
}


function keep2() {
  keep();
}

function release2() {
  inMenu = false;
  document.querySelector("#question2").style.display = "none";
  document.querySelector("#animalType2").style.display = "none";
  document.querySelector(".action-buttons-container2").style.display = "none";

  document.querySelector("#baseValue2").style.display = "none";
  document.querySelector("#tipValue2").style.display = "none";
  document.querySelector("#tipChance2").style.display = "none";
  
  resetTimer2();
  startTimer2(petTimeout);
  
  document.querySelector("#Cat").style.display = "none";
  document.querySelector("#Dog").style.display = "none";
  
}




document.getElementById("keepBtn").addEventListener("click", keep);
document.getElementById("releaseBtn").addEventListener("click", release);

document.getElementById("keepBtn2").addEventListener("click", keep2);
document.getElementById("releaseBtn2").addEventListener("click", release2);








function getRandomName() {
  const names = ["Rocky", "Larry", "Max", "Cheese", "Sunshine", "Tubs", "Nina", "Holly", "Fluffy", "Rockey", "Cookie", "Crumb", "Cuddle"]; // array of names
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

function petTimeout() {
  (Math.random() < 0.5 ? CatAppear : DogAppear)();
}

function CatAppear() {
  document.querySelector("#Cat").style.display = "block";
  
}

function DogAppear() {
  document.querySelector("#Dog").style.display = "block";
}



resizeWorld();
startTimer(trashTimeout);
startTimer2(petTimeout);