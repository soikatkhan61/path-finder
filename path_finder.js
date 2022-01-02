// globals
let editmode = 'start';
let startPoint = null;
let endPoint = null;
let walls = new Set();

// defining node
class Node {
    constructor(element){
        this.element = element;
        this.parent = null;
    }
}

// starter function
document.addEventListener('DOMContentLoaded',()  =>{
    loadgrid();
    document.querySelector('#start-button').addEventListener('click',()=>{editmode = 'start';console.log(editmode);});
    document.querySelector('#end-button').addEventListener('click',()=>{editmode = 'end';console.log(editmode);});
    document.querySelector('#block-button').addEventListener('click',()=>{editmode = 'wall';console.log(editmode);});
    document.querySelector('#start-search-button').addEventListener('click',()=> startSearch());
    document.querySelector('#reset-button').addEventListener('click',()=> loadgrid());
})

// load grid function 
function loadgrid(){
    console.log(editmode)
    main =document.querySelector('#main');
    main.innerHTML = '';
    startPoint = null;
    endPoint = null;
    walls.clear();
    editmode = 'start';

    let i =0;
    for (i = 0;i <800;i++) {
        let grid_div = document.createElement('div')
        grid_div.id = `hive_${i}`;
        //grid_div.innerHTML = i
        grid_div.classList = 'block';
        grid_div.addEventListener('click',() => addToList(grid_div));
        main.append(grid_div);
    }

}


// grid construction function
function addToList(grid_div){
    let item = parseInt(grid_div.id.split('_')[1]);
    let message = document.querySelector('#messages');
    let status ;
    console.log(editmode);
    console.log(item);
    if (editmode === 'start') {
        if (startPoint === null) {
            if (walls.has(item)) {
                message.innerHTML = 'start  point cannot be a wall.';                        
            } else {
                grid_div.classList.toggle('block-closed-start');
                message.innerHTML = 'start point set.';
                startPoint = item;
                status = 'start point set'
                success_alert(status);
            }            
        } else if (startPoint === item ) {
            message.innerHTML = 'start point removed!';
            grid_div.classList.toggle('block-closed-start');
            startPoint = null;

        } else {
            message.innerHTML = 'start point already set!'
        }
    } else if (editmode === 'end') {
        if (endPoint === null) {
            if (walls.has(item)) {
                message.innerHTML = 'end point cannot be a wall.';
            } else {
                grid_div.classList.toggle('block-closed-end');
                message.innerHTML = 'end  point set.'
                endPoint = item;
                status = 'end  point set.'
                success_alert(status);
            }
        }  else if (endPoint === item ) {
            message.innerHTML = 'end point removed!';
            grid_div.classList.toggle('block-closed-end');
            endPoint = null;

        } else {
            message.innerHTML = 'end  point already set!!'
        } 
    } else {
        if (item === startPoint || item === endPoint){
            message.innerHTML = 'start or end point cannot be a wall!';
        } else if (walls.has(item)) {
            grid_div.classList.toggle('block-closed-wall');
            console.log(grid_div.classList)
            walls.delete(item);
        } else {
            grid_div.classList.toggle('block-closed-wall');
            console.log(grid_div.classList)

            walls.add(item);
        }
        
        console.log(walls);
    }
}

// check function 
function checkRequirements(){
    if (startPoint === null || endPoint === null) {
        return false;
    } else {
        return true;
    }
}

// neighbour finders
function neightbors(x){
    let neigh = [];
    // up
    if (x-40 > -1) {
        neigh.push(x-40);
    }
    // down
    if (x+40 < 800){
        neigh.push(x+40);
    }

    // left
    if (parseInt((x+1)/40) === parseInt(x/40) && ((x+1) > -1 && (x+1) < 800)){
        neigh.push(x+1);
    }

    // right
    if (parseInt((x-1)/40) === parseInt(x/40) && ((x-1) > -1 && (x-1) < 800)){
        neigh.push(x-1);
    }

    return neigh;

}

// dfs search function
function  startDFS(){
    let que = [];
    let visited  = new Set();
    let start = new Node(startPoint);
    que.push(start);
    visited.add(startPoint)
    let sol = null
    while (que.length !==  0) {
        let e = que.shift();
        if (e.element === endPoint ){
            sol = e;
            break;
        } 
        let nig = neightbors(e.element);
        nig.forEach(element => { 
            if (!visited.has(element) && !walls.has(element)){
                let z = new Node(element);
                z.parent = e;
                que.push(z);
                visited.add(element);
            } 
        })

    } 
    if (sol !== null){
        printSOl(sol)
    } else {        
        console.log('no path found');
        document.querySelector('#messages').innerHTML = 'No possible path found';

    }
    
}

// path printer function
function printSOl(sol){
    document.querySelector('#messages').innerHTML = 'Path found!!';
    status = 'Path Found!'
    success_alert(status)
    let solution = [];
    while(sol.parent !== null) {
        solution.push(sol.element);
        sol = sol.parent;

    }

    solution.reverse();
    console.log(solution);
    let i;
    for (i= 0;i < solution.length;i++) {
        document.querySelector(`#hive_${solution[i]}`).classList = 'path';     
    }
    document.querySelector(`#hive_${endPoint}`).classList = 'block-closed-end';

}

// old path clearing function
function clearoldpath(){
    let i = 0;
    for (i=0;i < 800; i++){
        if (i == startPoint || i == endPoint ){
            continue;
        } else {
            document.querySelector(`#hive_${i}`).classList = 'block';
        }
    }
    let s = Array.from(walls);
    for (let d = 0;d < s.length; d++){
        document.querySelector(`#hive_${s[d]}`).classList.toggle('block-closed-wall');
        console.log(document.querySelector(`#hive_${s[d]}`).classList)
    }

    document.querySelector(`#hive_${endPoint}`).classList = 'block-closed-end';
}
  
// search driver function.
function startSearch(){
    if (checkRequirements() === true) {
        clearoldpath();
        document.querySelector('#messages').innerHTML = 'Working';
        startDFS();
    } else {
        
        let message = document.querySelector('#messages');
        message.innerHTML = 'for search to function , the bot needs a starting  and ending point!!';
        return;
    }

}


