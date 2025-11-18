let allBreeds = {
  CommonRaccoon: {
    attributeText: "+3 Ticket Price"
  },
  GoldenRaccoon: {
    attributeText: "+50 Ticket Price"
  },
  VirginiaOpossum: {
    attributeText: "+5 Ticket Price"
  },
  LaboradorRetriever: {
    attributeText: "+30 Ticket Price"
  },
  CavalierKingCharlesSpaniel: {
    attributeText: "+20 Ticket Price"
  },
  PersianCat: {
    attributeText: "+30 Ticket Price"
  },
  RagdollCat: {
    attributeText: "+40 Ticket Price"
  }
}

let inventory = {
  "decor": [
    {
      id: "bench",
      name: "Wooden Bench",
      src: "../assets/furniture/benches/bench.png",
      attribute: "Gives an extra $3 tip"
    },
    {
      id: "catTree",
      name: "Plant Cat Tree",
      src: "../assets/furniture/cat trees/plant cat tree.png",
      attribute: "+5% Tip Chance"
    },
    {
      id: "window",
      name: "Basic Window",
      src: "../assets/furniture/wall/windows/window.png",
      attribute: "Gives an extra $1 tip"
    },
    {
      id: "window",
      name: "Flower Window",
      src: "../assets/furniture/wall/windows/flowerWindow.png",
      attribute: "Gives an extra $5 tip"
    },
    {
      id: "bench",
      name: "Basic Bench",
      src: "../assets/furniture/benches/basicbench.png",
      attribute: "Gives an extra $1 tip"
    },
    {
      id: "catTree",
      name: "Basic Cat Tree",
      src: "../assets/furniture/cat trees/basic cat tree.png",
      attribute: "+1% Tip Chance"
    },
    {
      id: "painting1",
      name: "Flower Painting",
      src: "../assets/furniture/wall/paintings/flowerPainting.png",
      attribute: "+1% Tip Chance"
    }
  ],
  "animals": [
    {
      name: "Johnathan",
      breed: "PersianCat",
      src: "assets/animals/johnathan_cat.png",
      active: true
    },
    {
      name: "Kelsey",
      breed: "CavalierKingCharlesSpaniel",
      src: "assets/animals/cavalier_dog.png",
      active: false
    },
    {
      name: "Silly",
      breed: "LaboradorRetriever",
      src: "assets/animals/lab_puppy.png",
      active: false
    }
  ]
}

function loadAnimalInventory(){
  const animalInventory = document.querySelector("#animalInventory")
  inventory.animals.forEach((item)=>{
    const newItemContainer = document.createElement("div");
    newItemContainer.className = "item";
    const newItemImg = document.createElement("img");
    newItemImg.src = item.src;
    newItemImg.alt = item.name;

    const itemName = document.createElement("span");
    itemName.className = "itemName";
    itemName.innerText = item.name;

    const itemAttribute = document.createElement("span");
    itemAttribute.className = "itemAttribute";
    itemAttribute.innerText = allBreeds[item.breed].attributeText;

    newItemContainer.appendChild(newItemImg);
    newItemContainer.appendChild(itemName);
    newItemContainer.appendChild(itemAttribute);
    newItemContainer.addEventListener("click", ()=>{
      pickAnimal(item);
    });
    animalInventory.appendChild(newItemContainer);
  })
}

function pickAnimal(itemObject){
  localStorage.setItem("animalChoice", JSON.stringify(itemObject));
  window.location.href = "index.html";
}

window.addEventListener("load", ()=>{
  if(localStorage.getItem("ownedCreatures")){
    inventory.animals = JSON.parse(localStorage.getItem("ownedCreatures"))
  }
  loadAnimalInventory();
});