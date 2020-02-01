//variables
const searchInput = document.querySelector('.input-search');
const btnAdd = document.querySelector('.input-button');
const trashIcon = '<i class="far fa-trash-alt"></i>';
const checkIcon = '<i class="far fa-check-square"></i>';
const upIcon = '<i class="far fa-arrow-alt-circle-up"></i>';
const downIcon = '<i class="far fa-arrow-alt-circle-down"></i>';

//declarate empty table to put inside actual li from addTask function, the we use it in Filter function
let actualLi =[];
const newUl = document.querySelector('ul');

//change size of input search
const changeSize = function() {
    this.classList.toggle('active');
}

//delete task
const deleteTask = function() {
    const actualLi = this.parentNode.parentNode;
    actualLi.remove();
}

//complete task
const completed = function() {
    this.classList.toggle('active');
}

//new position of li when we click up or down arrow icon
const changePositionList = function(value) {
    const actualList = [...document.querySelectorAll('ul li')];
    const ul = this.parentNode.parentNode.parentNode
    const li = this.parentNode.parentNode;
    //getting the current index of li
    let indexLi = actualList.indexOf(li);
    if(value === "up") {
        if(indexLi === 0) return;
        ul.insertBefore(li, ul.childNodes[--indexLi]);  
    }
    else {
        let newIndex = ++indexLi;
        if(newIndex == actualList.length) return;
        ul.insertBefore(li, ul.childNodes[++newIndex]); 
    }             
};

//Filter
const searchTask = function() {
    const input = event.target.value.toLowerCase();

    //assign to newLi a li-list which we download from addTAsk function 
    let newLi = [...actualLi]; 
    newLi = newLi.filter(a => a.textContent.toLowerCase().includes(input));
    newUl.textContent = "";
    newLi.forEach(a => newUl.appendChild(a));
};

//add new task
const addTask = function() {
    event.preventDefault();
    const addInput = document.querySelector('.input-add');
    if(addInput.value === "") return;
    const inputValue = addInput.value;
    const liItem = document.createElement('li');
    const textDiv = document.createElement('div');
    textDiv.textContent = inputValue;
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    iconDiv.innerHTML = trashIcon + checkIcon + upIcon + downIcon;
    const ul = document.querySelector('ul');
    ul.insertBefore(liItem, ul.childNodes[0]);
    liItem.appendChild(textDiv);
    liItem.appendChild(iconDiv);
    addInput.value = "";
    actualLi = document.querySelectorAll('li');
  
    //click delete icon
    document.querySelector('.fa-trash-alt').addEventListener('click', deleteTask);

    //click check icon
    document.querySelector('.fa-check-square').addEventListener('click', completed);
    const upBtnIcon = document.querySelector('.fa-arrow-alt-circle-up');
  
    //click up icon
    upBtnIcon.addEventListener('click', changePositionList.bind(upBtnIcon,"up"));
    const downBtnIcon = document.querySelector('.fa-arrow-alt-circle-down');
  
    //click down icon
    downBtnIcon.addEventListener('click', changePositionList.bind(downBtnIcon,"down"));
}

//search input search
searchInput.addEventListener('input', searchTask);

//call the function change size of input search
searchInput.addEventListener('focus', changeSize);
searchInput.addEventListener('blur', changeSize);

//call the function that add new task
btnAdd.addEventListener('click', addTask);