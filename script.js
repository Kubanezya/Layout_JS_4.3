
function debounce(fn, ms){
    let timer;
    return function(...arg){
        clearTimeout(timer);
        timer =  setTimeout(()=>{
            fn.apply(this, arg)
        },ms)
    }
}
function start(){
    let a
    let input = document.querySelector('input')
     input.addEventListener('keyup', debounce (function(event) {
        a=  this.value
         console.log(a);
         if (a.length>0){
            github(a)}
        else{document.querySelector('ul').innerHTML ='';}
     },500))
}

start()
var data = [];


async function github(g) {
     
    const response = await fetch(`https://api.github.com/search/repositories?q=${g}`);
    const result = await response.json();  
    let elms=[];
    document.querySelector('ul').innerHTML ='';
    for (i=0;(i<result.items.length && i<5);i++){         
        let elm={}; 
        elm.name = result.items[i].name;
        elm.owner = result.items[i].owner.login;
        elm.stars = result.items[i].stargazers_count;
        elms.push(elm);
         
        li = document.createElement('li')
        li.innerHTML= result.items[i].name;
        document.querySelector('.autocom-box').appendChild(li);  
                      
    } 
    data = elms.slice();       
};

let id=0;

document.querySelector('.autocom-box').addEventListener('click', function (event) {
    let index= 0;
    for (j=0;j<data.length;j++){
        if (data[j].name == event.target.outerHTML.slice(4,-5)){
            index = j;
        }
    }
    
    const listItems = document.querySelector('.list-items');
    listItems.appendChild(document.createElement('li')).classList='list-item';        

    const listItem = document.querySelector('.list-item:last-child');
    listItem.id =id;

    listItem.appendChild(document.createElement('ul')).classList='list-item_data';
    listItem.appendChild(document.createElement('span')).classList='btn_cls';

    document.querySelector('.list-item:last-child .btn_cls').id =id;      

    const listItem_data = document.querySelector('.list-item:last-child .list-item_data');
    listItem_data.appendChild(document.createElement('li')).innerText = `Name: ${data[index].name}`;
    listItem_data.appendChild(document.createElement('li')).innerText = `Owner: ${data[index].owner}`;
    listItem_data.appendChild(document.createElement('li')).innerText = `Stars: ${data[index].stars}`;
    id++; 
})

const list = document.querySelector('.list')
const listItems = document.querySelector('.list-items')

list.addEventListener('click', function (event) {
   if (event.target.classList.value=='btn_cls'){
    del =  event.target.id;
    event.stopPropagation();    
    listItems.removeChild(document.getElementById(del));
   }
})

