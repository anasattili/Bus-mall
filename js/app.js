'use strict';

var product = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"];

var totalClick = 0;
var lableChartClicks = [];
var lableChartViews = [];
// variables for unique images
var UniqueImages = [];
/* var middleUniqueImages = [];
var rigthUniqueImages = []; */

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
Item.all = [];

for (var i = 0; i < product.length; i++) {
    new Item(product[i])
}
//console.log(Item.all);


var leftItem;
var middleItem;
var rigthItem;

// for view images
function renderProducts() {
    leftItem = Item.all[randImages(0, Item.all.length - 1)];
        middleItem = Item.all[randImages(0, Item.all.length - 1)];
    rigthItem = Item.all[randImages(0, Item.all.length - 1)];
   
    
    if (leftItem === middleItem || leftItem === rigthItem || rigthItem === middleItem ) {
        renderProducts();
        UniqueImages.push(leftItem, middleItem, rigthItem);
         /* if(UniqueImages === leftItem || UniqueImages === middleItem || UniqueImages === rigthItem){
            renderProducts();}
         } */
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



// add event by mouse click
imageSection.addEventListener('click', mouseClick);
//var totalClick = 0;
function mouseClick(event) {
    //console.log(event);
    if (totalClick < 10) {
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
    else if (totalClick == 10) {
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






