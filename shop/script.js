let shoppingCart = {};

//loading the cart
window.addEventListener('load', () => {
  document.querySelector('#Wallet').style.visibility = "visible";
  if(localStorage.getItem("cart")){
    shoppingCart = JSON.parse(localStorage.getItem("cart"));

    Object.keys(shoppingCart).forEach((key)=>{

        document.querySelectorAll(`#${key}`).forEach((itemC)=>{

          const itemBadge = itemC.querySelector('.itemBadge');
          itemBadge.innerHTML = shoppingCart[key].quantity;
          itemBadge.style.visibility = "visible";

        })
    })
}
});

//object array of all items available in the shop
const allItems = {
  //Zoo items
  Zoo: [
    {
      id: "bench",
      name: "Wooden Bench",
      src: "../assets/furniture/benches/bench.png",
      price: 300,
      attribute: "Gives an extra $1 tip",
      category: "Benches",
    },
    {
      id: "bench",
      name: "Basic Bench",
      src: "../assets/furniture/benches/basicbench.png",
      price: 100,
      attribute: "Gives an extra $1 tip",
      category: "Benches",
    },
    {
      id: "bench",
      name: "Paw Bench",
      src: "../assets/furniture/benches/pawbench.png",
      price: 200,
      attribute: "Gives an extra $1 tip",
      category: "Benches",
    },




    {
      id: "catTree",
      name: "Plant Cat Tree",
      src: "../assets/furniture/cat trees/plant cat tree.png",
      price: 500,
      attribute: "+5% Tip Chance",
      category: "CatTrees",
    },
    {
      id: "catTree",
      name: "Basic Cat Tree",
      src: "../assets/furniture/cat trees/basic cat tree.png",
      price: 400,
      attribute: "+1% Tip Chance",
      category: "CatTrees",
    },




    {
      id: "window",
      name: "Basic Window",
      src: "../assets/furniture/wall/windows/window.png",
      price: 30,
      attribute: "Gives an extra $1 tip",
      category: "Windows",
    },
    {
      id: "window",
      name: "Flower Window",
      src: "../assets/furniture/wall/windows/flowerwindow.png",
      price: 400,
      attribute: "Gives an extra $5 tip",
      category: "Windows",
    },




    {
      id: "rug",
      name: "Basic Rug",
      src: "../assets/furniture/rugs/rug.png",
      price: 300,
      attribute: "Gives an extra $2 tip",
      category: "Rugs",
    },




    {
      id: "bed1",
      name: "Fluffy Bed",
      src: "../assets/furniture/beds/fluffy bed.png",
      price: 600,
      attribute: "+5% Tip Chance",
      category: "Beds",
      slotGroup: "bed"
    },

    {
      id: "bed1",
      name: "Circle Bed",
      src: "../assets/furniture/beds/circle bed.png",
      price: 300,
      attribute: "Gives an extra $1 tip",
      category: "Beds",
      slotGroup: "bed"
    },

    {
      id: "bed1",
      name: "Pillow Bed",
      src: "../assets/furniture/beds/pillow bed.png",
      price: 400,
      attribute: "Gives an extra $1 tip",
      category: "Beds",
      slotGroup: "bed"
    },



    {
      id: "platform",
      name: "Basic Platform",
      src: "../assets/furniture/wall/platforms/platform.png",
      price: 100,
      attribute: "+5% Tip Chance",
      category: "Platforms",
      slotGroup: "platform"
    },


    {
      id: "painting1",
      name: "Cat Painting",
      src: "../assets/furniture/wall/paintings/painting.png",
      price: 100,
      attribute: "Gives an extra $1 tip",
      category: "Paintings",
    },
    {
      id: "painting1",
      name: "Flower Painting",
      src: "../assets/furniture/wall/paintings/flowerPainting.png",
      price: 150,
      attribute: "+1% Tip Chance",
      category: "Paintings",
    }

  ],
  //Backyard items
  Backyard: [
    {
      id: "trashcan",
      name: "Trash Can",
      src: "../assets/furniture/backyard/trashcans/JADEtrashcan.png",
      price: 20,
      attribute: "30% Chance for Raccoons, 5% Chance for Possums",
      category: "byFurniture",
    },

    {
      id: "foodbowl",
      name: "Food Bowl",
      src: "../assets/furniture/backyard/foodbowls/foodbowl.png",
      price: 20,
      attribute: "30% Chance for Raccoons, 5% Chance for Possums",
      category: "Food",
    }
  ],
};

//getting itemObject for all items
Object.keys(allItems).forEach((key)=>{
    allItems[key].forEach((itemObject)=>{
        itemObject.itemGroup = `${key}`;
    })
})

/**
 * Takes in an object representing ONE item (like the bench)
 * @param {object} itemObject
 */

//making the container for each item with the name, picture, price, attribute, and badge
function createItemContainer(itemObject) {
  const itemContainer = document.createElement("div");
  itemContainer.id = itemObject.id;
  const prettyName = itemObject.name.replaceAll(" ", "");
  itemContainer.className = `item-container ${itemObject.category} ${prettyName}`;
  itemContainer.innerHTML = `
        <div class="itemBadge">0</div>
        <img src="${itemObject.src}" alt="${prettyName}">
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

//makes the quantity and add to cart buttons appear in the item container
function createShopper(itemObject) {
    const shopper = document.createElement("div");
    const onclickText = `onclick='addToCart(${JSON.stringify(itemObject)})'`;
    shopper.className = "shopper";
    shopper.innerHTML = `<div class="quantity">
    <input type="number" class="input-box" value="1" min="1" max="10">
    </div>
    <button class="addtocartButton" ${onclickText}">Add to Cart!</button>`;
    return shopper;
}

//adding items to cart and updating the quantity on the badge
function addToCart(itemObject) {
  const prettyName = itemObject.name.replaceAll(" ", "");
    const inputBox = document.querySelector(`.${prettyName} > .shopper > .quantity > .input-box`);
    const itemBadges = document.querySelectorAll(`.${prettyName} > .itemBadge`);
    let value = parseInt(inputBox.value);
    if(!shoppingCart[prettyName]){
      if(!itemObject.slotGroup){
        itemObject.slotGroup = null;
      }
      shoppingCart[prettyName] = {
          "id": itemObject.id,
          "name": itemObject.name,
          "price": itemObject.price,
          "src": itemObject.src,
          "attribute": itemObject.attribute,
          "category": itemObject.category,
          "quantity": 0,
          "slotGroup": itemObject.slotGroup
      };
    }
    shoppingCart[prettyName].quantity += value;
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
    itemBadges.forEach((itemBadge)=>{
      itemBadge.style.visibility = "visible";
      itemBadge.innerHTML = shoppingCart[prettyName].quantity;
    })

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
      "Benches",
      "CatTrees",
      "Rugs",
      "Paintings",
      "Platforms",
      "Windows"
    ];
    zooSubcategories.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
    document.getElementById("zooItems").style.display = "block";
  }
  /*Hide all backyard subcategories when Backyard tab is clicked, and ensure there are no duplicates*/
  if (categoryID === "Backyard") {
    const bySubcategories = ["byFurniture", "Food", "Decorations", "Toys"];
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
    "Benches",
    "CatTrees",
    "Rugs",
    "Paintings",
    "Platforms",
    "Windows",
    "byFurniture",
    "Food",
    "Decorations",
    "Toys",
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

//getting the cart to display
function openCart(pageID) {
  document.getElementById("Zoo").style.display = "none";
  document.getElementById("Backyard").style.display = "none";
  document.getElementById("zooItems").style.display = "none";
  document.getElementById("backyardItems").style.display = "none";
  document.getElementById(pageID).style.display = "block";
}

//adding items to their containers for the shop
function addItem(itemObject){
    document.getElementById(`${itemObject.itemGroup.toLowerCase()}Items`).appendChild(createItemContainer(itemObject));
    document.getElementById(itemObject.category).appendChild(createItemContainer(itemObject));
}

//function to go to the cart page, if there are items in the cart
function goToCart(){
    if(localStorage.getItem("cart")){
        window.location.href = 'shoppingcart.html';
    }
}

/* show zoo items by default*/
openCategory("Zoo");

//getting all items to have an itemObject for the shop
Object.keys(allItems).forEach((key)=>{
    allItems[key].forEach((itemObject)=>{
        addItem(itemObject);
    })
})

//function to reset/clear the cart and reload the page
function resetCart(){
    localStorage.removeItem("cart");
    window.location.reload();
}


