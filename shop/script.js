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
        // Show the Wallet and Exit Button when switching to Backyard tab
        document.getElementById('Wallet').style.display = 'block';
        document.getElementById('ExitButton').style.display = 'block';
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
    
    // Show the Wallet and Exit Button for both Zoo and Backyard sections
    document.getElementById('Wallet').style.display = 'block';
    document.getElementById('ExitButton').style.display = 'block';

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