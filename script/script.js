'use strict';
// Select all elements which open/close the given menu list
document.querySelector('.open1 span').addEventListener('click', function () {
    this.textContent = this.textContent === '>>' ? '<<' : '>>';
    document.querySelector('#left-nav').style.display = document.querySelector('#left-nav').style.display == 'none' ? 'block' : 'none';
    document.querySelector('canvas').width = document.querySelector('canvas').style.width;
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