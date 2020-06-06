'use strict';

var product = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"];

var totalClick = 0;

//To calculate numbers of clicks and views
var lableChartClicks = [];
var lableChartViews = [];


var leftImage = document.querySelector('#leftImage');
var middleImage = document.querySelector('#centerImage');
var rigthImage = document.querySelector('#rigthImage');
var sectionImage = document.querySelector('#imageSection');



function Item(name) {
    this.itemName = name.split(".")[0];
    this.imagePath = `assets/${name}`;
    this.imageClick = 0;
    this.imageView = 0;

    Item.all.push(this);

}

Item.all = [];
for (var i = 0; i < product.length; i++) {
    new Item(product[i])
}



var leftItem;
var centerItem;
var rigthItem;

// Array for store images and prevent subsequent images
var UniqueImages = [];

// for view images
function renderProducts() {
    leftItem = Item.all[randImages(0, Item.all.length - 1)];
    centerItem = Item.all[randImages(0, Item.all.length - 1)];
    rigthItem = Item.all[randImages(0, Item.all.length - 1)];

    // For prevent the similarity images for the same click and  prevent subsequent images
    do {
        leftItem = Item.all[randImages(0, Item.all.length - 1)];
        centerItem = Item.all[randImages(0, Item.all.length - 1)];
        rigthItem = Item.all[randImages(0, Item.all.length - 1)];

    } while (leftItem === centerItem || leftItem === rigthItem || centerItem === rigthItem || UniqueImages.includes(leftItem) || UniqueImages.includes(centerItem) || UniqueImages.includes(rigthItem));


    UniqueImages[0] = leftItem;
    UniqueImages[1] = centerItem;
    UniqueImages[2] = rigthItem;


    leftImage.src = leftItem.imagePath;
    leftImage.alt = leftItem.itemName;
    leftImage.title = leftItem.itemName;


    middleImage.src = centerItem.imagePath;
    middleImage.alt = centerItem.itemName;
    middleImage.title = centerItem.itemName;


    rigthImage.src = rigthItem.imagePath;
    rigthImage.alt = rigthItem.itemName;
    rigthImage.title = rigthItem.itemName;


}

renderProducts();




// add event by mouse click
imageSection.addEventListener('click', mouseClick);

function mouseClick(event) {

    if (totalClick < 25) {
        if (event.target.id !== 'imageSection') {
            totalClick++;


            if (event.target.id === 'leftImage') {
                leftItem.imageClick++;

            }

            if (event.target.id === 'centerImage') {
                centerItem.imageClick++;
            }

            if (event.target.id === 'rigthImage') {
                rigthItem.imageClick++;
            }

            leftItem.imageView++;
            centerItem.imageView++;
            rigthItem.imageView++;



            renderProducts();
        }
    }
    else if (totalClick == 25) {
        totalClick++;
        setProduct()
        renderResult();
        addChartJs();

    }

}



// To add results as un-order list
function renderResult() {

    var ul1 = document.getElementById('listResults');
    for (var i = 0; i < Item.all.length; i++) {
        var li1 = document.createElement('li');

        // for count the number of clicks and views
        lableChartClicks.push(Item.all[i].imageClick);
        lableChartViews.push(Item.all[i].imageView);

        li1.textContent = `${Item.all[i].itemName} has ${Item.all[i].imageClick} clicks and ${Item.all[i].imageView} views`;
        ul1.append(li1);

    }


}



// chart.js code 
function addChartJs() {
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"],
            //labels: product,

            datasets: [{
                label: '# of Clicks',
                data: lableChartClicks,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',


                borderColor: 'rgba(255, 99, 132, 1)',


                borderWidth: 1,

            },
            {
                label: '# of Views',
                data: lableChartViews,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3,

            }


            ],

        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


}

// function for store data
function setProduct() {
    var productData = JSON.stringify(Item.all);
    localStorage.setItem("data", productData);
}

// function for retrieve data
function getProduct() {
    var productData = localStorage.getItem("data");
    if (productData) {
        Item.all = JSON.parse(productData);
        renderResult();
        addChartJs();
    }
}


//random images function
function randImages(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getProduct()












