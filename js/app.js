'use strict';

var product = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"];

var totalClick = 0;
var lableChartClicks = [];
var lableChartViews = [];
var UniqueImages = [];
Item.all = [];


var leftImage = document.querySelector('#leftImage');
var middleImage = document.querySelector('#centerImage');
var rigthImage = document.querySelector('#rigthImage');
var sectionImage = document.querySelector('#imageSection');


//var itemArray = [];
function Item(name) {
    this.itemName = name.split(".")[0];
    this.imagePath = `assets/${name}`;
    this.imageClick = 0;
    this.imageView = 0;
    //itemArray.push(this);
    Item.all.push(this);

}


for (var i = 0; i < product.length; i++) {
    new Item(product[i])
}





var leftItem;
var middleItem;
var rigthItem;

// for view images
function renderItem() {
    leftItem = Item.all[randImages(0, Item.all.length - 1)];
    middleItem = Item.all[randImages(0, Item.all.length - 1)];
    rigthItem = Item.all[randImages(0, Item.all.length - 1)];


    if (leftItem === middleItem || leftItem === rigthItem || rigthItem === middleItem) {
        renderItem();

    }
    leftImage.src = leftItem.imagePath;
    leftImage.alt = leftItem.itemName;
    leftImage.title = leftItem.itemName;

    middleImage.src = middleItem.imagePath;
    middleImage.alt = middleItem.itemName;
    middleImage.title = middleItem.itemName;

    rigthImage.src = rigthItem.imagePath;
    rigthImage.alt = rigthItem.itemName;
    rigthImage.title = rigthItem.itemName;
}

renderItem();
UniqueImages.push(leftItem, middleItem, rigthItem);


// add event by mouse click
imageSection.addEventListener('click', mouseClick);



function mouseClick(event) {

    if (totalClick < 25) {
        if (event.target.id !== 'imageSection') {
            totalClick++;
            //renderItem();


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

            //storeItem();
            renderItem();
        }
    }
    else if (totalClick == 25) {
        totalClick++;

        renderResult();
        addChartJs();
    }
}

// To add results
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

//random images function
function randImages(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

//getItem();

/* function storeItem() {
    var data = JSON.stringify(Item.all);
    localStorage.setItem('data', data);
    console.log(Item.all);
}

function getItem() {

    var data = localStorage.getItem('data');
    Item.all = JSON.parse(data)
    console.log(Item.all);

} */