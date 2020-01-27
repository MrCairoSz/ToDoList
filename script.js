//variables
const searchInput = document.querySelector('.input-search');
const btnAdd = document.querySelector('.input-button');
const trashIcon = '<i class="far fa-trash-alt"></i>';
const checkIcon = '<i class="far fa-check-square"></i>';
const upIcon = '<i class="far fa-arrow-alt-circle-up"></i>';
const downIcon = '<i class="far fa-arrow-alt-circle-down"></i>';
const task = {
  complete:  [],
}


//change size of input search
const changeSize = function() {
    this.classList.toggle('active');
}

//delete task
const deleteTask = function() {
    const actualLi = this.parentNode.parentNode;
    actualLi.remove();
    // actualLiValue = actualLi.textContent;
    // console.log(actualLiValue);
    // task.complete = task.complete.filter(function(a){
    //    return a !==actualLiValue;
    // })
    
}

//complete task
const completed = function() {
    this.classList.toggle('active');
}

//up task on list
const upList = function(value) {
    const actualList = [...document.querySelectorAll('ul li')];
    const ul = this.parentNode.parentNode.parentNode
    const li = this.parentNode.parentNode;
    //getting the current index of li
    let indexLi = actualList.indexOf(li);
        if(indexLi === 0) return;
        ul.insertBefore(li, ul.childNodes[--indexLi]);     
};

//down task on list
const downList = function() {
    const actualList = [...document.querySelectorAll('ul li')];
    const ul = this.parentNode.parentNode.parentNode
    const li = this.parentNode.parentNode;
    //getting the current index of li
    let indexList = actualList.indexOf(li);
    let newIndex = ++indexList;
   
    if(newIndex === actualList.length) return;
    
    ul.insertBefore(li, ul.childNodes[++newIndex]); 
    
   
};

//add new task
const addTask = function() {
    event.preventDefault();
    const addInput = document.querySelector('.input-add');
    if(addInput.value === "") return;
    const inputValue = addInput.value;
    task.complete.push(inputValue);
    const liItem = document.createElement('li');
    const textDiv = document.createElement('div');
    for(let i = 0; i <task.complete.length; i++) {
        textDiv.textContent = task.complete[i];
    }
    
    
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    iconDiv.innerHTML = trashIcon + checkIcon + upIcon + downIcon;
    const ul = document.querySelector('ul');
    ul.insertBefore(liItem, ul.childNodes[0]);
    liItem.appendChild(textDiv);
    liItem.appendChild(iconDiv);
    addInput.value = "";

    //click delete icon
    document.querySelector('.fa-trash-alt').addEventListener('click', deleteTask);

    //click check icon
    document.querySelector('.fa-check-square').addEventListener('click', completed);

    //click up icon
    document.querySelector('.fa-arrow-alt-circle-up').addEventListener('click', upList);

    //click down icon
    document.querySelector('.fa-arrow-alt-circle-down').addEventListener('click', downList);
}

//call the function change size of input search
searchInput.addEventListener('focus', changeSize);
searchInput.addEventListener('blur', changeSize);

//call the function that add new task
btnAdd.addEventListener('click', addTask);