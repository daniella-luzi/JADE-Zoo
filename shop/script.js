/*class ZooItem { //This is a "container" for ALL the items in the zoo!
    constructor(name, price, attribute) {
        this.name = name;
        this.price = price;
        this.attribute = attribute;
    }
    description() {
        return `${this.name} - $${this.price}\n${this.attribute}`
    }
}


class Bed extends ZooItem {
    static instances = [];

    constructor(name, price, attribute) {
        super(name, price, attribute);
        Bed.instances.push(this)
    }
    static getAllBeds() {
        return Bed.instances;
    }
}

class Painting extends ZooItem {
    constructor(name, price, attribute) {
        super(name, price, attribute);
    }
}



let smallBed = new Bed();
let smallBed2 = new Bed();
let smallBed3 = new Bed();
let smallBed4 = new Bed();
let smallBed5 = new Bed();
let smallBed6 = new Bed();
let smallBed7 = new Bed();
let smallBed8 = new Bed();
let smallBed9 = new Bed();

console.log(Bed)*/







// class Bed {
//     constructor(name, price, attribute){
//         this.name = name;
//         this.price = price;
//         this.attribute = attribute;
//     }
//     description() {
//         return `${this.name} - $${this.price}\n${this.attribute}`
//     }
// }

// let myBed = new Bed("S. Cat Bed", 10, "Gives an extra 20% tip");
// console.log(myBed.writeDescription());


/*Zoo and Backyard tabs are invisible, and shown when clicked*/
function openCategory(categoryID) {
    document.getElementById('Zoo').style.display = 'none';
    document.getElementById('Backyard').style.display = 'none';

    document.getElementById(categoryID).style.display = 'block';
    
    /*Hide all subcategories when Zoo tab is clicked, and ensure there are no duplicates*/
    if (categoryID === 'Zoo') {
        const zooSubcategories = [
            'Beds', 'Paintings', 'Toys', 'zooFurniture', 'zooMisc'
        ];
        zooSubcategories.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        document.getElementById('zooItems').style.display = 'block';
    }
    /*Hide all backyard subcategories when Backyard tab is clicked, and ensure there are no duplicates*/
    if (categoryID === 'Backyard') {
        const bySubcategories = [
            'byFurniture', 'Lights', 'Decorations', 'byMisc'
        ];
        bySubcategories.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        document.getElementById('byItems').style.display = 'block';
    }
}

/*Subcategory tabs are invisible, and shown when clicked*/
function openSubCategory(subcategoryID) {
    /*Hiding main zoo and by items*/
    document.getElementById('zooItems').style.display = 'none';
    document.getElementById('byItems').style.display = 'none';

    /*creating an array of subcategories*/
    const subcategories = [
        'Beds', 'Paintings', 'Toys', 'zooFurniture', 'zooMisc',
        'byFurniture', 'Lights', 'Decorations', 'byMisc'
    ];
    
    /*for each loop to go through all subcategories and hide them*/
    subcategories.forEach(category => {
        const element = document.getElementById(category);
        if (element) {
            element.style.display = 'none';
        }
    });

    /*if statement to show only the selected subcategory*/
    const selectedCategory = document.getElementById(subcategoryID);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }

}

function openCart(pageID) {
    document.getElementById('Zoo').style.display = 'none';
    document.getElementById('Backyard').style.display = 'none';
    document.getElementById('zooItems').style.display = 'none';
    document.getElementById('byItems').style.display = 'none';
    document.getElementById(pageID).style.display = 'block';

} /*attempting to create shopping cart button/page*/


/* show zoo items by default*/
openCategory('Zoo');