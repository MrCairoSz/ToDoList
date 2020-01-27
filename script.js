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
//musimy zadeklarować pusta tablicę do której wpiszemy aktualne li z funkcji addTask a nastepnie wykorzystamy w funkcji filtrującej. Inaczej jesli pobralibysmy li w funkcji filtrujacej searchTask gdybysmy z inputu search usuwali litery lista li by sie nie aktualizowała
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
//Filter
const searchTask = function() {
    const input = event.target.value.toLowerCase();
    let newLi = [...actualLi]; //przypisujemy do newLi liste li ktorą pobralismy w addTask
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
    actualLi = document.querySelectorAll('li');
    //click delete icon
    document.querySelector('.fa-trash-alt').addEventListener('click', deleteTask);

    //click check icon
    document.querySelector('.fa-check-square').addEventListener('click', completed);

    //click up icon
    document.querySelector('.fa-arrow-alt-circle-up').addEventListener('click', upList);

    //click down icon
    document.querySelector('.fa-arrow-alt-circle-down').addEventListener('click', downList);
}

//search input search
searchInput.addEventListener('input', searchTask);

//call the function change size of input search
searchInput.addEventListener('focus', changeSize);
searchInput.addEventListener('blur', changeSize);

//call the function that add new task
btnAdd.addEventListener('click', addTask);