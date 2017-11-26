'use strict';
document.querySelector('.open1 span').addEventListener('click', function () {
    this.textContent = this.textContent === '>>' ? '<<' : '>>';
    document.querySelector('#left-nav').style.display = document.querySelector('#left-nav').style.display == 'none' ? 'block' : 'none';

})
document.querySelector('.open2 span').addEventListener('click', function () {
    this.textContent = this.textContent === '>>' ? '<<' : '>>';
    document.querySelector('#right-nav').style.display = document.querySelector('#right-nav').style.display == 'none' ? 'block' : 'none';

})