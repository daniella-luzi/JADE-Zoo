console.log(localStorage)
let shoppingCart = {}; //{id: quantity}

// after all elements have loaded, set up quantity buttons
window.addEventListener('load', () => {
    // get all elements with the `.quantity` class  
    const quantityContainers = document.querySelectorAll(".quantity");
    
    // set up event listeners for each of the selected elements
    quantityContainers.forEach(
    // Quantity Button Code (from CodePen)
      (quantityContainer) => {
  
      const minusBtn = quantityContainer.querySelector(".minus");
      const plusBtn = quantityContainer.querySelector(".plus");
      const inputBox = quantityContainer.querySelector(".input-box");
  
      updateButtonStates();
  
      quantityContainer.addEventListener("click", handleButtonClick);
      inputBox.addEventListener("input", handleQuantityChange);
  
      function updateButtonStates() {
        const value = parseInt(inputBox.value);
        minusBtn.disabled = value <= 1;
        plusBtn.disabled = value >= parseInt(inputBox.max);
      }
  
      function handleButtonClick(event) {
        if (event.target.classList.contains("minus")) {
          decreaseValue();
        } else if (event.target.classList.contains("plus")) {
          increaseValue();
        }
      }
  
      function decreaseValue() {
        let value = parseInt(inputBox.value);
        value = isNaN(value) ? 1 : Math.max(value - 1, 1);
        inputBox.value = value;
        updateButtonStates();
        handleQuantityChange();
      }
  
      function increaseValue() {
        let value = parseInt(inputBox.value);
        value = isNaN(value) ? 1 : Math.min(value + 1, parseInt(inputBox.max));
        inputBox.value = value;
        updateButtonStates();
        handleQuantityChange();
      }
  
      function handleQuantityChange() {
        let value = parseInt(inputBox.value);
        value = isNaN(value) ? 1 : value;
  
        // Execute your code here based on the updated quantity value
        console.log("Quantity changed:", value);
      }
    }
  );
  if(localStorage.getItem("cart")){
    shoppingCart = JSON.parse(localStorage.getItem("cart"));
    Object.keys(shoppingCart).forEach((key)=>{
        const itemBadge = document.querySelector(`#${key} > .itemBadge`);
        itemBadge.innerHTML = `${shoppingCart[key].quantity}`;
        itemBadge.style.visibility = "visible";
    })
}
});

const allItems = {
  Zoo: [
    {
      id: "bench",
      name: "Wooden Bench",
      src: "../assets/furniture/benches/bench.png",
      price: 30,
      attribute: "Gives an extra $1 tip",
      category: "zooFurniture",
    },

    {
      id: "catTree",
      name: "Plant Cat Tree",
      src: "../assets/furniture/cat trees/plant cat tree.png",
      price: 50,
      attribute: "+5% Tip Chance",
      category: "zooFurniture",
    },

    {
      id: "window",
      name: "Basic Window",
      src: "../assets/furniture/wall/windows/window.png",
      price: 30,
      attribute: "Gives an extra $1 tip",
      category: "zooMisc",
    },

    {
      id: "rug",
      name: "Basic Rug",
      src: "../assets/furniture/rugs/rug.png",
      price: 30,
      attribute: "Gives an extra $2 tip",
      category: "zooFurniture",
    },

    {
      id: "fluffyBed",
      name: "Fluffy Bed",
      src: "../assets/furniture/beds/fluffy bed.png",
      price: 30,
      attribute: "+5% Tip Chance",
      category: "Beds",
    },

    {
      id: "circleBed",
      name: "Circle Bed",
      src: "../assets/furniture/beds/circle bed.png",
      price: 15,
      attribute: "Gives an extra $1 tip",
      category: "Beds",
    },

    {
      id: "pillowBed",
      name: "Pillow Bed",
      src: "../assets/furniture/beds/pillow bed.png",
      price: 15,
      attribute: "Gives an extra $1 tip",
      category: "Beds",
    },

    {
      id: "platform",
      name: "Basic Platform",
      src: "../assets/furniture/wall/platforms/platform.png",
      price: 60,
      attribute: "+5% Tip Chance",
      category: "zooMisc",
    },

    {
      id: "cat painting",
      name: "Cat Painting",
      src: "../assets/furniture/wall/paintings/painting.png",
      price: 10,
      attribute: "Gives an extra $1 tip",
      category: "Paintings",
    },
  ],
  Backyard: [
    {
      id: "trashcan",
      name: "Trash Can",
      src: "images/trashcan.jpg",
      price: 20,
      attribute: "30% Chance for Raccoons, 5% Chance for Possums",
      category: "byFurniture",
    },

    {
      id: "fairylights",
      name: "Fairy Lights",
      src: "images/fairylights.jpg",
      price: 60,
      attribute: "+1% Chance for Rare Breeds",
      category: "Lights",
    },
  ],
};

Object.keys(allItems).forEach((key)=>{
    allItems[key].forEach((itemObject)=>{
        itemObject.itemGroup = `${key}`;
    })
})

/**
 * Takes in an object representing ONE item (like the bench)
 * @param {object} itemObject
 */
function createItemContainer(itemObject) {
  const itemContainer = document.createElement("div");
  itemContainer.id = itemObject.id;
  itemContainer.className = `item-container ${itemObject.category}`;
  itemContainer.innerHTML = `
        <div class="itemBadge">0</div>
        <img src="${itemObject.src}" alt="${itemObject.name}">
        <div class="item-description">
            <div class="itemName">
                <span>${itemObject.name} - <img id="shopGem" src="./images/gem.png">${itemObject.price}</span>
            </div>
            <div class="itemAttribute">
                <span>${itemObject.attribute}</span>
            </div>
        </div>`;

  itemContainer.appendChild(createShopper(itemObject));
  return itemContainer;
}

function createShopper(itemObject) {
    const shopper = document.createElement("div");
    const onclickText = `onclick='addToCart(${JSON.stringify(itemObject)})'`;
    shopper.className = "shopper";
    shopper.innerHTML = `<div class="quantity">
    <button class="minus" aria-label="Decrease">&minus;</button>
    <input type="number" class="input-box" value="1" min="1" max="10">
    <button class="plus" aria-label="Increase">&plus;</button>
    </div>
    <button class="addtocartButton" ${onclickText}">Add to Cart!</button>`;
    return shopper;
}

function addToCart(itemObject) {
    const inputBox = document.querySelector(`#${itemObject.id} > .shopper > .quantity > .input-box`);
    const itemBadge = document.querySelector(`#${itemObject.id} > .itemBadge`);
    let value = parseInt(inputBox.value);
    if(!shoppingCart[itemObject.id]){
        shoppingCart[itemObject.id] = {
            "name": `${itemObject.name}`,
            "price": `${itemObject.price}`,
            "quantity": 0
        };
    }
    shoppingCart[itemObject.id].quantity += value;
    itemBadge.style.visibility = "visible";
    itemBadge.innerHTML = shoppingCart[itemObject.id].quantity;
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
    console.log(localStorage);

}

/* Zoo and Backyard tabs are invisible, and shown when clicked */
function openCategory(categoryID) {
  document.getElementById("Zoo").style.display = "none";
  document.getElementById("Backyard").style.display = "none";

  document.getElementById(categoryID).style.display = "block";

  /* Hide all subcategories when Zoo tab is clicked, and ensure there are no duplicates */
  if (categoryID === "Zoo") {
    const zooSubcategories = [
      "Beds",
      "Paintings",
      "Toys",
      "zooFurniture",
      "zooMisc",
    ];
    zooSubcategories.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
    document.getElementById("zooItems").style.display = "block";
  }
  /*Hide all backyard subcategories when Backyard tab is clicked, and ensure there are no duplicates*/
  if (categoryID === "Backyard") {
    const bySubcategories = ["byFurniture", "Lights", "Decorations", "byMisc"];
    bySubcategories.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
    document.getElementById("backyardItems").style.display = "block";
  }
}

/*Subcategory tabs are invisible, and shown when clicked*/
function openSubCategory(subcategoryID) {
  /*Hiding main zoo and by items*/
  document.getElementById("zooItems").style.display = "none";
  document.getElementById("backyardItems").style.display = "none";

  /*creating an array of subcategories*/
  const subcategories = [
    "Beds",
    "Paintings",
    "Toys",
    "zooFurniture",
    "zooMisc",
    "byFurniture",
    "Lights",
    "Decorations",
    "byMisc",
  ];

  /*for each loop to go through all subcategories and hide them*/
  subcategories.forEach((category) => {
    const element = document.getElementById(category);
    if (element) {
      element.style.display = "none";
    }
  });

  /*if statement to show only the selected subcategory*/
  const selectedCategory = document.getElementById(subcategoryID);
  if (selectedCategory) {
    selectedCategory.style.display = "block";
  }
}

function openCart(pageID) {
  document.getElementById("Zoo").style.display = "none";
  document.getElementById("Backyard").style.display = "none";
  document.getElementById("zooItems").style.display = "none";
  document.getElementById("backyardItems").style.display = "none";
  document.getElementById(pageID).style.display = "block";
} /*attempting to create shopping cart button/page*/

function addItem(itemObject){
    document.getElementById(`${itemObject.itemGroup.toLowerCase()}Items`).appendChild(createItemContainer(itemObject));
    document.getElementById(itemObject.category).appendChild(createItemContainer(itemObject));
}

function goToCart(){
    if(localStorage.getItem("cart")){
        window.location.href = 'shoppingcart.html';
    }
}

/* show zoo items by default*/
openCategory("Zoo");

Object.keys(allItems).forEach((key)=>{
    allItems[key].forEach((itemObject)=>{
        addItem(itemObject);
    })
})