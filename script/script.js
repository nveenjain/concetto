'use strict';

//Initially set the height and width of canvas
document.querySelector('canvas').width = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('width'));
document.querySelector('canvas').height = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('height'));

//Set its width and height according to screensize
window.addEventListener('resize',function resize_canvas() {
    document.querySelector('canvas').width = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('width'));
    draw_initial();
});

// Select all elements which open/close the given menu list
document.querySelector('.open1 span').addEventListener('click', function () {
    this.textContent = this.textContent === '>>' ? '<<' : '>>';
    document.querySelector('#left-nav').style.display = document.querySelector('#left-nav').style.display == 'none' ? 'block' : 'none';
    console.log(document.querySelector('canvas').width);

});
document.querySelector('.open2 span').addEventListener('click', function () {
    this.textContent = this.textContent === '>>' ? '<<' : '>>';
    document.querySelector('#right-nav').style.display = document.querySelector('#right-nav').style.display == 'none' ? 'block' : 'none';

});

//Initialize expanded element as null
var expanded;
//As soon as any element is clicked, then add it to expanded element variable
document.querySelectorAll('ul li').forEach(x=>x.addEventListener('click', ()=>{
    if (parseInt(window.getComputedStyle(x).getPropertyValue('flex')) === 3){
        x.style.flex = 7;
        x.querySelector('div').innerHTML = "This is gonna be best fest :)";
        if(expanded){
            expanded.querySelector('div').innerHTML = "";
            expanded.style.flex = 3;
        }
        expanded = x;
    }else{
        x.style.flex = 3;
        x.querySelector('div').innerHTML = "";
    }
}));

//Initialize pointer and declare other variables which will be represented by icon
var temp = Math.random() * document.querySelector('canvas').width;
var temp2 = Math.random() * document.querySelector('canvas').height;
let pointer = {
    x:temp,
    y:temp2
};
var x1,x2,y1,y2;
//Check for overflow of pointer image
if (pointer.x + 20 > document.querySelector('canvas').width)
    pointer.x = document.querySelector('canvas').width - 40;
else if (pointer.x - 20 < 0)
    pointer.x = document.querySelector('canvas').width + 40;
if (pointer.y + 20 > document.querySelector('canvas').height)
    pointer.y = document.querySelector('canvas').height - 40;
else if (pointer.y - 20 <= 48)
    pointer.y = document.querySelector('canvas').height + 50; 

//Initially draw every material on canvas (Circles and name)
function draw_initial(department, icon){
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    
    //Check for overflow of pointer image
    if (pointer.x + 20 > document.querySelector('canvas').width)
        pointer.x = width - 40;
    else if (pointer.x - 20 < 0)
        pointer.x = width + 40;
    if (pointer.y + 20 > document.querySelector('canvas').height)
        pointer.y = height - 40;
    else if (pointer.y - 20 <= 48)
        pointer.y = height + 50; 

    //Choose random position of coordinates for both the other arcs
    x1 = Math.random() * width;
    x2 = Math.random() * width;
    y1 = Math.random() * height;
    y2 = Math.random() * height;

    //Check for overflow of variables
    if(x1 + 20 > width)
        x1-=40;
    else if(x1- 20 < 0)
        x1 += 40;
    if (x2 + 20 > width)
        x2 -= 40;
    else if (x2 - 20 < 0)
        x2 += 40;
    if (y1 + 20 > height)
        y1 -= 40;
    else if (y1 - 20 <= 48)
        y1 += 50;
    if (y2 + 20 > height)
        y2 -= 40;
    else if (y2 - 20 <= 48)
        y2 += 50;

    //Check if any two doesn't collide initially
    if(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))<(40)){
        console.log("draw called");
        return draw_initial(department, icon);
    }
    if (Math.sqrt((pointer.x - x2) * (pointer.x - x2) + (pointer.y - y2) * (pointer.y - y2)) < (40)) {
        console.log("draw called");
        return draw_initial(department, icon);
    }
    if (Math.sqrt((pointer.x - x1) * (pointer.x - x1) + (pointer.y - y1) * (pointer.y - y1)) < (40)) {
        console.log("draw called");
        return draw_initial(department, icon);
    }

    draw(department, icon);
    

}

function draw(department, icon){
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x1, y1, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x2, y2, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(pointer.x, pointer.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    ctx.font = '48px Spectral SC';
    ctx.fillText('Hello World!', 10, 50);
}


draw_initial();
window.addEventListener('keydown',function move(e) {
    console.log(e.keyCode);
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    switch(e.keyCode){
        case 37:
            ctx.clearRect(0,0,canvas.width,canvas.height);
            (pointer.x>20)?pointer.x-=2:pointer.x;
            draw();
            break;
        case 38:
            ctx.clearRect(0, 0, canvas.width, canvas.height);        
            (pointer.y > 68) ? pointer.y-=2 : pointer.y;
            draw();
            break;
        case 39:
            ctx.clearRect(0, 0, canvas.width, canvas.height);                    
            (document.querySelector('canvas').width - pointer.x > 20) ? pointer.x+=2 : pointer.x;        
            draw();
            break;
        break;
        case 40:
            ctx.clearRect(0, 0, canvas.width, canvas.height);                
            (document.querySelector('canvas').height - pointer.y > 20) ? pointer.y+=2 : pointer.y;        
            draw();
            break;
    }
    
})