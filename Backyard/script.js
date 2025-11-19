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

    decorContainer.style.backgroundColor = "blue";

    const itemPopUp = document.createElement("div"); //container for the pop up
    itemPopUp.className = "itemPopUp";

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
resizeWorld();