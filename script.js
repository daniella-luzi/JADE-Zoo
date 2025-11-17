const wrapper = document.getElementById("worldWrapper");
const frame = document.getElementById("frame");
const world = document.getElementById("world");
const floor = document.getElementById("floor");

const baseWidth = 1600;
const baseHeight = 900;

let tip = 0;
let tipChance = 1;
let ticketPrice = 0;

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

let locationLookup = {
  WoodenBench: ["top: -10px; left: 10px", "top: -10px; right: 10px"],
  BasicBench: ["top: -10px; left: 10px", "top: -10px; right: 10px"],
  PlantCatTree: ["top: 0; right: 50px", "top: 160px; left: 90px", "bottom: 15px; right: 85px"],
  BasicCatTree: ["top: -20px; right: 45px", "top: 140px; left: 30px", "bottom: 10px; right: 40px"],
  BasicWindow: ["bottom: 20px; left: 80px"],
  FlowerWindow: ["bottom: 20px; left: 80px"],
  BasicRug: ["top: 90px; left: 200px", "top: 90px; right: 200px"],
  FluffyBed: ["top: 30px; left: 80px"],
  CircleBed: ["top: 30px; left: 40px"],
  PillowBed: ["top: 10px; left: 80px"],
  backyardButton: [],
  BasicPlatform: ["bottom: 15px; right: 55px"], // platform1
  CatPainting: [],
  FlowerPainting: []
};

let allBreeds = {
  CommonRaccoon: {
    attributes: [()=>{addToTicketPrice(3)}, ()=>{addToTicketPrice(-3)}],
    attributeText: "+3 Ticket Price",
    entry: "These furry mammals are native to North America, but later spread to central Europe, the Caucasus, and Japan in the mid-20th century. They are nocturnal, meaning they sleep during the day. Raccoons are super intelligent; in fact, studies have shown that they can remember the solutions to tasks for at least 3 years! They originally lived in forests, but have adapted to live in urban areas, which is why you might find one digging through your trash. You may have noticed their dexterous paws. That's where they got their name! The word 'raccoon' was adopted into English from the native Powhatan term meaning 'animal that scratches with its hands'. Do NOT try to pet them.",
    src: "assets/animals/breeds/commonraccoon.png" //real picture
  },
  GoldenRaccoon: {
    attributes: [()=>{addToTicketPrice(50)}, ()=>{addToTicketPrice(-50)}],
    attributeText: "+50 Ticket Price",
    entry: "While not really a 'breed' per se, these little guys are inspired by albino raccoons, which are normal raccoons but with a rare gene mutation that removes their 'melanin', or the pigment that makes their fur and skin dark. As a result, their fur is white, their noses are pink, and their eyes are red. This mutation only occurs in about one in every 10,000-20,000 raccoons, making sightings extremely rare. There are also blonde raccoons, a rare color morph with light brown or golden fur. Their masks and tail rings are still visible but not nearly as pronounced.",
    src: "assets/animals/breeds/blonderaccoon.png"
  },
  VirginiaOpossum: {
    attributes: [()=>{addToTicketPrice(5)}, ()=>{addToTicketPrice(-5)}],
    attributeText: "+5 Ticket Price",
    entry: "These solitary marsupials, usually referred to as 'possums', can be found from Canada to Costa Rica. Like raccoons, they often roam around trash, compost, and gardens. Opossums have 'prehensile' tails, meaning they are used for grabbing and holding things. They have a whopping 50 teeth and opposable thumbs! Surprisingly, their brain is only 1/5 the size of a raccoon's. A mother opossum carries her children on her body, and newborn opossums are as tiny as a honeybee. When threatened by a predator, an opossum may 'play dead', or pretend to be dead or injured. But in some cases, opossums will absolutely fight back. DON'T pet them!",
    src: "assets/animals/breeds/virginiaopossum.png"
  },
  LaboradorRetriever: {
    attributes: [()=>{addToTicketPrice(30)}, ()=>{addToTicketPrice(-30)}],
    attributeText: "+30 Ticket Price",
    entry: "We all know and love these playful canines. This breed comes from Britain and was created to hunt and track game in the 19th century. Labs have historically been trained to become guide and service dogs, war dogs, rescue dogs, and even police dogs. They of course make wonderful companions, as they are a friendly, energetic, intelligent, and loyal breed. Labs are very widespread - in fact, you may have seen a few in your neighborhood! They vary a lot in color, with black, chocolate, and yellow variants - all equally adorable.",
    src: "assets/animals/breeds/lab.png"
  },
  CavalierKingCharlesSpaniel: {
    attributes: [()=>{addToTicketPrice(20)}, ()=>{addToTicketPrice(-20)}],
    attributeText: "+20 Ticket Price",
    entry: "This is a British breed of toy dog with four distinct color patterns, emerging in the 1920s. They are soft, snuggly, highly affectionate lap dogs that do great with children and other dogs. Cavaliers are not shy at all, and are highly adaptable. They are playful, active, and curious, and have been trained to become therapy dogs due to their sweet and gentle nature. Cavaliers often want to chase things, including vehicles, so they are not suited for off-leash walking, and they have a strong hunting instinct. They usually make terrible guard dogs because all strangers are friends to them.",
    src: "assets/animals/breeds/cavalier.png"
  },
  PersianCat: {
    attributes: [()=>{addToTicketPrice(30)}, ()=>{addToTicketPrice(-30)}],
    attributeText: "+30 Ticket Price",
    entry: "Persian Longhairs are thought to have emerged in the 19th century. Selective breeding has caused them to have flat faces over time which cause health problems, but traditional Persians actually had normal muzzles. Persians are quiet cats that adapt well to indoor life, and are close and affectionate with their owners. They can be friendly towards strangers, and like to keep themselves clean, although require regular brushing to maintain their beautiful coats.",
    src: "assets/animals/breeds/persian.png"
  },
  RagdollCat: {
    attributes: [()=>{addToTicketPrice(40)}, ()=>{addToTicketPrice(-40)}],
    attributeText: "+40 Ticket Price",
    entry: "Ragdolls originated around 1963 and have colorpoint coats, which means the colder the fur is over time, the darker it will become. Their fur looks like a heat map of their bodies! They are super affectionate and docile cats, and are even called 'ragdolls' because they can be completely limp and relaxed when picked up, just like a ragdoll. They are dog-like cats because they follow people around, are easily handled, are not typically aggressive towards other animals, can be super playful, want attention constantly, and are intelligent and trainable. They make wonderful family pets.",
    src: "assets/animals/breeds/ragdoll.png"
  }
}


// This is all the DEFAULT furniture. May change later.
let jsonData = {
  furniture: [
    {
      id: "bench",
      name: "Wooden Bench",
      src: "assets/furniture/benches/bench.png",
      bottom: 220,
      left: 0
    },
    {
      id: "catTree",
      name: "Plant Cat Tree",
      src: "assets/furniture/cat trees/plant cat tree.png",
      bottom: 220,
      left: 1200
    },
    {
      id: "window",
      name: "Basic Window",
      src: "assets/furniture/wall/windows/window.png",
      bottom: 500,
      left: 800
    },
    {
      id: "rug",
      name: "Basic Rug",
      src: "assets/furniture/rugs/rug.png",
      bottom: -20,
      left: 350
    },
    {
      id: "bed1",
      name: "Fluffy Bed",
      src: "assets/furniture/beds/fluffy bed.png",
      bottom: 50,
      left: 50
    },
    {
      id: "bed2",
      name: "Circle Bed",
      src: "assets/furniture/beds/circle bed.png",
      bottom: 220,
      left: 500
    },
    {
      id: "bed3",
      name: "Pillow Bed",
      src: "assets/furniture/beds/pillow bed.png",
      bottom: 220,
      left: 800
    },
    {
      id: "backyardButton",
      name: "backyardButton",
      src: "assets/UI/backyard_button.png",
      bottom: 420,
      left: 1530
    },
    {
      id: "platform1",
      name: "Basic Platform",
      src: "assets/furniture/wall/platforms/platform.png",
      bottom: 350,
      left: 830
    },
    {
      id: "platform2",
      name: "Basic Platform",
      src: "assets/furniture/wall/platforms/platform.png",
      bottom: 520,
      left: 50
    },
    {
      id: "platform3",
      name: "Basic Platform",
      src: "assets/furniture/wall/platforms/platform.png",
      bottom: 420,
      left: 430
    },
    {
      id: "painting1",
      name: "Cat Painting",
      src: "assets/furniture/wall/paintings/painting.png",
      bottom: 600,
      left: 400
    }
  ]
};

// makes the furniture appear on screen using their respective coordinates from the JSON data
function loadFurniture() {

  if(!localStorage.getItem("currentDecorations")){
    console.log("filling local with decorations");
    localStorage.setItem("currentDecorations", JSON.stringify(jsonData));
  }
  //puts localstorage contents into variable jsondata
  jsonData = JSON.parse(localStorage.getItem("currentDecorations"));

  let currentDecorations = JSON.parse(localStorage.getItem("currentDecorations")).furniture;
  console.log("currentDecorations in loadFurniture: ", currentDecorations);

  //for each decoration in the zoo, creates an image element with the same id, name, src, and coordinates.
  //If the decoration is the backyardButton (don't ask why), give it the class of "navItem"
  //   and add an event listener that takes you to the backyard.
  for (let i of currentDecorations) {

    const decorContainer = document.createElement("div");

    const item = document.createElement("img");
    item.id = i.id;
    item.alt = i.name;
    item.src = i.src;

    decorContainer.style.position = "absolute";
    decorContainer.style.bottom = i.bottom + "px";
    decorContainer.style.left = i.left + "px";
    // decorContainer.style.cssText += "background-color: blue";

    if (item.id != "backyardButton") {
      appendLocations(decorContainer, i.name.replaceAll(" ", ""));
    }
    else{
      item.className = "navItem";
      item.addEventListener("click", () => {
        goTo('Backyard/index.html');
      });
    }
    decorContainer.appendChild(item);
    world.appendChild(decorContainer);
  }
}

function appendLocations(decorContainer, itemName){
  locationLookup[itemName].forEach((location)=>{
    const newLocation = document.createElement("div");
    newLocation.className = "animalLocation";
    newLocation.style.position = "absolute";
    newLocation.style.cssText += location;
    newLocation.style.width = "150px";
    newLocation.style.height = "40px";
    newLocation.style.opacity = "0%";
    newLocation.style.boxSizing = "border-box";
    const transitionTime = "0.2s"
    newLocation.style.border = "6px solid white";
    newLocation.style.borderRadius = "40%";
    newLocation.style.boxShadow = "0 0 8px 4px white, 0 0 15px 8px white";
    newLocation.style.transition = `opacity ${transitionTime}`
    newLocation.addEventListener("mouseenter", ()=>{
      newLocation.style.opacity = "100%";
    })
    newLocation.addEventListener("mouseleave", ()=>{
      newLocation.style.opacity = "0%";
    })
    decorContainer.appendChild(newLocation);
  })
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
    localStorage.setItem("currentDecorations", JSON.stringify(jsonData));
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

function addToTicketPrice(amt){
  console.log("adding to ticketprice: ", amt);
  ticketPrice += amt;
}

function changeTipChance(amt){
  console.log("adding to tip chance: ", amt);
  tipChance += amt;
}



















//Encyclopedia stuff
/**************************
 * Encyclopedia Data
 **************************/




const defaultOwnedCreatures = [
  { id: "geoffrey", name: "Geoffrey", breedKey: "CommonRaccoon" },
  { id: "kyle",     name: "Kyle",     breedKey: "GoldenRaccoon" },
  { id: "caliban",  name: "Caliban",  breedKey: "VirginiaOpossum" },
  { id: "emily",    name: "Emily",    breedKey: "CavalierKingCharlesSpaniel" },
  { id: "norbit",   name: "Norbit",   breedKey: "LaboradorRetriever" },
  { id: "mochi",    name: "Mochi",    breedKey: "PersianCat" },
  { id: "pudding",  name: "Pudding",  breedKey: "RagdollCat" }
];

let ownedCreatures = [];

// Load from localStorage, or fall back to defaults
function loadOwnedCreatures() {
  const saved = localStorage.getItem("ownedCreatures");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        ownedCreatures = parsed;
        return;
      }
    } catch (e) {
      console.error("Failed to parse ownedCreatures from localStorage", e);
    }
  }

  // Fallback: copy defaults (deep copy)
  ownedCreatures = JSON.parse(JSON.stringify(defaultOwnedCreatures));
  saveOwnedCreatures();
}

function saveOwnedCreatures() {
  localStorage.setItem("ownedCreatures", JSON.stringify(ownedCreatures));
}



/**************************
 * Encyclopedia UI Logic
 **************************/

let currentCreature = null;

const encyclopediaContainer = document.getElementById("encyclopedia-container");
const closeEncyclopediaBtn = document.getElementById("closeEncyclopediaBtn");
const encyclopediaTabBtn = document.getElementById("encyclopediaTab_btn");
const creaturesTabBtn = document.getElementById("creaturesTab_btn");

const encyclopediaListEl = document.getElementById("encyclopediaList");
const creaturesListEl = document.getElementById("creaturesList");

const encImage = document.getElementById("encImage");
const encTitle = document.getElementById("encTitle");
const encAttribute = document.getElementById("encAttribute");
const encBody = document.getElementById("encBody");

// === Open / Close ===
function openEncyclopedia() {
  encyclopediaContainer.classList.add("show");
  showEncyclopediaTab();
}

function closeEncyclopedia() {
  encyclopediaContainer.classList.remove("show");
}

closeEncyclopediaBtn.addEventListener("click", closeEncyclopedia);

// === Tabs switching ===
function showEncyclopediaTab() {
  encyclopediaTabBtn.classList.add("active");
  creaturesTabBtn.classList.remove("active");
  encyclopediaListEl.classList.remove("enc-hidden");
  creaturesListEl.classList.add("enc-hidden");

  // show body text on this tab
  encBody.style.display = "block";

  // Show first breed by default if any
  const breedKeys = Object.keys(allBreeds);
  if (breedKeys.length > 0) {
    showBreedDetails(breedKeys[0]);
  }
}

function showCreaturesTab() {
  encyclopediaTabBtn.classList.remove("active");
  creaturesTabBtn.classList.add("active");
  encyclopediaListEl.classList.add("enc-hidden");
  creaturesListEl.classList.remove("enc-hidden");

  // hide body text on this tab
  encBody.style.display = "none";

  // Show first owned creature by default if any
  if (ownedCreatures.length > 0) {
    showCreatureDetails(ownedCreatures[0]);
  }
}

encyclopediaTabBtn.addEventListener("click", showEncyclopediaTab);
creaturesTabBtn.addEventListener("click", showCreaturesTab);

// === Rendering lists ===
function renderBreedList() {
  encyclopediaListEl.innerHTML = "";
  Object.entries(allBreeds).forEach(([key, breed]) => {
    const btn = document.createElement("button");
    btn.className = "enc-list-item";
    btn.style.backgroundImage = `url(${breed.src})`;

    // image only
    btn.addEventListener("click", () => showBreedDetails(key));
    encyclopediaListEl.appendChild(btn);
  });
}

function renderCreatureList() {
  creaturesListEl.innerHTML = "";
  ownedCreatures.forEach(creature => {
    const breed = allBreeds[creature.breedKey];
    if (!breed) return;

    const btn = document.createElement("button");
    btn.className = "enc-list-item";
    btn.style.backgroundImage = `url(${breed.src})`;

    // image only
    btn.addEventListener("click", () => showCreatureDetails(creature));
    creaturesListEl.appendChild(btn);
  });
}

// === Details ===
function showBreedDetails(breedKey) {
  const breed = allBreeds[breedKey];
  if (!breed) return;

  currentCreature = null; // we’re on breed view now

  encImage.src = breed.src;
  encTitle.textContent = prettyBreedName(breedKey);
  encAttribute.textContent = breed.attributeText;
  encBody.textContent = breed.entry;
}

function showCreatureDetails(creature) {
  const breed = allBreeds[creature.breedKey];
  if (!breed) return;

  currentCreature = creature; // remember which creature is active

  const prettyName = prettyBreedName(creature.breedKey);

  encImage.src = breed.src;
  encTitle.textContent = `${creature.name} the ${prettyName}`;
  encAttribute.textContent = breed.attributeText;

  // no body text for creatures tab
  encBody.textContent = "";
}

// Utility: turn CommonRaccoon -> "Common Raccoon"
function prettyBreedName(key) {
  return key.replace(/([A-Z])/g, " $1").trim();
}

// === Rename on double-click (Creatures tab only) ===
encTitle.addEventListener("dblclick", () => {
  // Only allow rename on Creatures tab
  if (!creaturesTabBtn.classList.contains("active")) return;
  if (!currentCreature) return;

  const breed = allBreeds[currentCreature.breedKey];
  if (!breed) return;

  const prettyName = prettyBreedName(currentCreature.breedKey);
  const oldName = currentCreature.name;

  const newNameRaw = prompt("Rename your animal:", oldName);
  if (newNameRaw === null) return; // cancelled

  const newName = newNameRaw.trim();
  if (!newName) return; // ignore empty

  currentCreature.name = newName;
  encTitle.textContent = `${newName} the ${prettyName}`;

  saveOwnedCreatures();
});


// === Initial setup ===
loadOwnedCreatures();
renderBreedList();
renderCreatureList();