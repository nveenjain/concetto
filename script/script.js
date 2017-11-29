'use strict';
//Initialize a flag variable to check whether to draw or not?
let flag = 0;

//Lazy load all the slogans of departments
let slogans = fetch('/data/dept_slogan.json')
                .then(data =>data.json());
let data, dept_avail=[],event_data=[];
//Initialize expanded element as null and current department as null
let expanded, dept;

//Initially set the height and width of canvas
document.querySelector('canvas').width = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('width'));
document.querySelector('canvas').height = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('height'));

//Set its width and height according to screensize
window.addEventListener('resize',function resize_canvas() {
    document.querySelector('canvas').width = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('width'));
    document.querySelector('canvas').height = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('height'));
    //If there is a department then only draw else don't draw
    if(dept)
    if(!flag){
        draw_initial();
    }else check_collision(pointer);
});


// Select all elements which open/close the given menu list
document.querySelector('.open1 span').addEventListener('click', function () {
    this.textContent = this.textContent === '>>' ? '<<' : '>>';
    document.querySelector('#left-nav').style.display = window.getComputedStyle(document.querySelector('#left-nav')).getPropertyValue('display') == 'none' ? 'block' : 'none';
    document.querySelector('canvas').width = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('width'));
    if(dept){
        if(!flag)
            draw();
    }
});
document.querySelector('.open2 span').addEventListener('click', function () {
    this.textContent = this.textContent === '>>' ? '<<' : '>>';
    document.querySelector('#right-nav').style.display = document.querySelector('#right-nav').style.display == 'none' ? 'block' : 'none';
    document.querySelector('canvas').width = parseFloat(window.getComputedStyle(document.querySelector('canvas')).getPropertyValue('width'));
    if(dept){
        if (!flag)
            draw();
    else
        check_collision(pointer);
    }

});


//As soon as any element is clicked, then add it to expanded element variable
document.querySelectorAll('#left-nav ul li').forEach(x=>x.addEventListener('click', async function check(){
    flag = 0;    
    if (parseInt(window.getComputedStyle(x).getPropertyValue('flex')) === 3){
        if(expanded){
            expanded.querySelector('div').innerHTML = "";
            expanded.style.flex = 3;
        }
        expanded = x;
        x.style.flex = 7;
        dept = x.dataset.department;
        canvas.getContext('2d').clearRect(0, 0, document.querySelector('canvas').width, document.querySelector('canvas').height);
        draw_initial();
        x.querySelector('div').innerHTML = "Loading";
        if(!data)
            data = await slogans.then(data=> data);
        x.querySelector('div').innerHTML = `${data[dept]}`;


    }else{
        x.style.flex = 3;
        x.querySelector('div').innerHTML = "";
    }
}));

document.querySelectorAll('#right-nav ul li').forEach(x => x.addEventListener('click', async function check() {
    if (parseInt(window.getComputedStyle(x).getPropertyValue('flex')) === 3) {
        if (expanded) {
            expanded.querySelector('div').innerHTML = "";
            expanded.style.flex = 3;
        }
        expanded = x;
        x.style.flex = 7;

    } else {
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


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
//Initially draw every material on canvas (Circles and name)
function draw_initial(department, icon){
    if (flag)
        return;
    
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
        return draw_initial(department, icon);
    }
    if (Math.sqrt((pointer.x - x2) * (pointer.x - x2) + (pointer.y - y2) * (pointer.y - y2)) < (40)) {
        return draw_initial(department, icon);
    }
    if (Math.sqrt((pointer.x - x1) * (pointer.x - x1) + (pointer.y - y1) * (pointer.y - y1)) < (40)) {
        return draw_initial(department, icon);
    }

    //check for flag
        draw(department, icon);
    

}

function draw(department, icon){
    let width = canvas.width;
    let height = canvas.height;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.font = '10px Spectral SC';
    ctx.strokeText('Event 2',x1-20,y1);
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle="white";
    ctx.arc(x1, y1, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x2, y2, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = 'yellow';
    ctx.strokeText('Event 1', x2 - 20, y2);
    ctx.closePath();
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(pointer.x, pointer.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    ctx.font = '48px Spectral SC';
    ctx.fillText(`${dept}`, 10, 50);
}
//check collision
async function check_collision(pointer){
    // let height = canvas.height;
    // let width = canvas.width;
    let event_data_local = {}, dummy_data;
    if (dept_avail.indexOf(dept) != -1) {
        //We already loaded department
        event_data_local = event_data[dept_avail.indexOf(dept)];
    } else {
        dummy_data = await fetch(`/data/${dept}.json`).then(d => d.json());
        event_data_local[dept]= dummy_data;
        dept_avail.push(dept);
        let obj = {};
        obj[dept] = dummy_data;
        event_data.push(obj);
        console.log(dummy_data);
        //Need to load department
    }
    if (Math.sqrt((pointer.x - x2) * (pointer.x - x2) + (pointer.y - y2) * (pointer.y - y2)) < (35)) {
        // ctx.clearRect(0,0,width,height);
        // ctx.fillText(`${event_data_local[dept].event1.title}`, width*10/100 , height*10/100);
        let $modal = document.querySelector('.modal-frame');
        let $overlay = document.querySelector('.modal-overlay');
        $overlay.classList.add('state-show');
        $modal.classList.remove('state-leave');
        $modal.classList.add('state-appear');
        $modal.querySelector('.modal-body').innerHTML = `<h3>${event_data_local[dept].event1.title}</h3>
                <p>${event_data_local[dept].event1.abstract}
                    <br /> <b><em>Prize:-</em></b> ${event_data_local[dept].event1.prize}</p>
                <p class="ps">Co-ordinator:- ${event_data_local[dept].event1.coordinator}
                <br /> Organisers:- ${event_data_local[dept].event1.organisers}</p>`;        
        // ctx.font = "28px Spectral SC";
        // ctx.fillText(`${event_data_local[dept].event1.abstract}`, width*10/100 , height*10/100 + 60);
        flag = 1;
        
    }
    if (Math.sqrt((pointer.x - x1) * (pointer.x - x1) + (pointer.y - y1) * (pointer.y - y1)) < (35)) {
        // ctx.clearRect(0, 0, width, height);
        // ctx.fillText(`${event_data_local[dept].event2.title}`, width * 10 / 100, height * 10 / 100);
        let $modal = document.querySelector('.modal-frame');
        let $overlay = document.querySelector('.modal-overlay');
        $overlay.classList.add('state-show');
        $modal.classList.remove('state-leave');
        $modal.classList.add('state-appear');
        $modal.querySelector('.modal-body').innerHTML = `<h3>${event_data_local[dept].event2.title}</h3>
                <p>${event_data_local[dept].event2.abstract}
                    <br /> <b><em>Prize:-</em></b> ${event_data_local[dept].event2.prize}</p>
                <p class="ps">Co-ordinator:- ${event_data_local[dept].event2.coordinator}
                <br /> Organisers:- ${event_data_local[dept].event2.organisers}</p>`; 
        flag = 1;      
    }
}

function move(e) {
    if (e.keyCode === 27) {
        close_modal();  
    }
    if (!dept || flag)
        return;
    switch (e.keyCode) {
        case 37:
            if (!flag)
                (pointer.x > 20) ? pointer.x -= 2 : pointer.x;
            check_collision(pointer);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            break;
        case 38:
            if (!flag)
                (pointer.y > 68) ? pointer.y -= 2 : pointer.y;
            check_collision(pointer);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            break;
        case 39:
            if (!flag)
                (document.querySelector('canvas').width - pointer.x > 20) ? pointer.x += 2 : pointer.x;
            check_collision(pointer);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            break;
            break;
        case 40:
            if (!flag)
                (document.querySelector('canvas').height - pointer.y > 20) ? pointer.y += 2 : pointer.y;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            check_collision(pointer);
            //check for flag
            draw();
            break;
    }

};
// draw_initial();
window.addEventListener('keydown',move);


var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    flag = 0;
    modal.style.opacity = "0";
    modal.style.display = "none";
}

console.log(canvas.getBoundingClientRect());
canvas.addEventListener('click',function(e){
    let x = (e.clientX - canvas.getBoundingClientRect().x), y = (e.clientY - canvas.getBoundingClientRect().y);
    check_collision({x,y});
    console.log(x-pointer.x);
    
})

//code for modal starts here 


    let $modal = document.querySelector('.modal-frame');
    let $overlay = document.querySelector('.modal-overlay');

    /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
    $modal.addEventListener('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
        if ($modal.classList.contains('state-leave')) {
            $modal.classList.remove('state-leave');
        }
    });
function close_modal(){
        $overlay.classList.remove('state-show');
        $modal.classList.remove('state-appear');
        $modal.classList.remove('state-leave');
        flag = 0;
}
document.querySelector('.close').addEventListener('click', close_modal);
    
    // document.querySelector('.open').addEventListener('click', function () {
    // });
