'use strict';

var product = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"];
var totalClick = 0;

var leftImage = document.querySelector('#leftImage');
var middleImage = document.querySelector('#centerImage');
var rigthImage = document.querySelector('#rigthImage');
var sectionImage = document.querySelector('#imageSection');


//var itemArray = [];
function Items(name) {
    this.itemName = name.split(".")[0];
    this.imagePath = `assets/${name}`;
    this.imageClick = 0;
    this.imageView = 0;
    //itemArray.push(this);
    Items.all.push(this);

}
Items.all = [];

for (var i = 0; i < product.length; i++) {
    new Items(product[i])
}
//console.log(Items.all);

//var totalClick = 0;
var leftItem;
var middleItem;
var rigthItem;

function renderProducts() {
    leftItem = Items.all[randImages(0, Items.all.length - 1)];
    middleItem = Items.all[randImages(0, Items.all.length - 1)];
    rigthItem = Items.all[randImages(0, Items.all.length - 1)];

    if (leftItem === middleItem || leftItem === rigthItem || rigthItem === middleItem) {
        renderProducts();

    }

    leftImage.src = leftItem.imagePath;
    leftImage.alt = leftItem.itemName;
    leftImage.title = leftItem.itemName;
    //leftItem.imageView++;

    middleImage.src = middleItem.imagePath;
    middleImage.alt = middleItem.itemName;
    middleImage.title = middleItem.itemName;

    //middleItem.imageView++;
    rigthImage.src = rigthItem.imagePath;
    rigthImage.alt = rigthItem.itemName;
    rigthImage.title = rigthItem.itemName;
    //rigthItem.imageView++;

}
renderProducts();

imageSection.addEventListener('click', mouseClick);
//var totalClick = 0;
function mouseClick(event) {
    //console.log(event);
    if (totalClick < 25) {
        if (event.target.id !== 'imageSection') {
            totalClick++;
            //renderProducts();

            console.log(totalClick);

            if (event.target.id === 'leftImage') {
                leftItem.imageClick++;


            }
            if (event.target.id === 'centerImage') {
                middleItem.imageClick++;

            }
            if (event.target.id === 'rigthImage') {
                rigthItem.imageClick++;

            }
            leftItem.imageView++;
            middleItem.imageView++;
            rigthItem.imageView++;



            renderProducts();
        }
    }
    else if (totalClick == 25) {
        totalClick++;
        renderResult();

    }

}



// To add results
function renderResult() {
    var ul1 = document.getElementById('listResults');
    for (var i = 0; i < Items.all.length; i++) {
        var li1 = document.createElement('li');

        li1.textContent = `${Items.all[i].itemName} has ${Items.all[i].imageClick} clicks and ${Items.all[i].imageView} views`;
        ul1.append(li1);
    }


}






//random images function
function randImages(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





