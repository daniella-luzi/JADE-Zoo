const encyclopedia_container = document.querySelector("#encyclopedia-container");
const openEncyclopediaBtn = document.querySelector("#openEncyclopediaBtn");
const closeEncyclopediaBtn = document.querySelector("#closeEncyclopediaBtn");
const descImage = document.querySelector("#descImage");
const descTitle = document.querySelector("#descTitle");
const description = document.querySelector("#description");
const dogPage = document.querySelector("#dog");
const catPage = document.querySelector("#cat");
const ratPage = document.querySelector("#rat");

openEncyclopediaBtn.addEventListener("click", openEncyclopedia);

closeEncyclopediaBtn.addEventListener("click", closeEncyclopedia);

dogPage.addEventListener("click", showDogPage);
catPage.addEventListener("click", showCatPage);
ratPage.addEventListener("click", showRatPage);


//Open and close the Encyclopedia
function openEncyclopedia(){
    encyclopedia_container.classList.add("show");
    descImage.style.opacity = 0;
    descTitle.textContent = "";
    description.textContent = "";
}
function closeEncyclopedia(){
    encyclopedia_container.classList.remove("show");
}

//Change which page is visible
function showDogPage(){
    descImage.style.opacity = 1;
    descImage.src = "images/dog.jpeg";
    descTitle.textContent = "Dog";
    description.textContent = "Is a dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showCatPage(){
    descImage.style.opacity = 1;
    descImage.src = "images/cat.jpg";
    descTitle.textContent = "Cat";
    description.textContent = "Is a cat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}
function showRatPage(){
    descImage.style.opacity = 1;
    descImage.src = "images/rat.jpeg";
    descTitle.textContent = "Rat";
    description.textContent = "Is a rat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
}