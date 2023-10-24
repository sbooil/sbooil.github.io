const lifeP = 0.2;

var grid = [];
var newgrid = [];
var playing = true;
var Size = 0;
var Complete = true;
var timer;

function GenSingalLight(){
    var cell = []
    var N = 5
    for(var i=0;i<N;i++){
        cell.push([])
        for(var j=0;j<N;j++){
            cell[i].push(0)
        }
    }
    cell[2][1] = 1
    cell[2][2] = 1
    cell[2][3] = 1
    return cell
}

function GenLift(N, array){
    for(var i=0;i<N;i++){
        array.push([])
        for(var j=0;j<N;j++)
            array[i].push(0);
    }
    return array
}

function copyMap(N,  arr1, arr2){
    for (var i=0;i<N;i++){
        for(var j=0;j<N;j++){ 
            arr1[i][j] = arr2[i][j];
        }
    }
}

function clearMap(N, arr){
    for (var i=0;i<N;i++){
        for(var j=0;j<N;j++){ 
            arr[i][j] = 0;
        }
    }
}

function RandomMap(N, arr){
    for (var i=0;i<N;i++){
        for(var j=0;j<N;j++){ 
            if(Math.random() < lifeP)   arr[i][j] = 1;
            else                        arr[i][j] = 0;
            
        }
    }
}

function CheckLife(N, cell ,newcell){
    for (var i=0;i<N;i++){
        for(var j=0;j<N;j++){       
            var check = (cell[(i+N-1) % N][(j+N-1) % N] + cell[(i+N-1) % N][j] + cell[(i+N-1) % N][(j + 1 ) % N] + 
                    cell[i][(j+N-1) % N] + cell[i][(j + 1 ) % N] + 
                    cell[(i + 1) % N][(j+N-1) % N] + cell[(i + 1) % N][j] + cell[(i + 1) % N][(j + 1 ) % N])
            if (cell[i][j]){
                if (check > 3 || check < 2) newcell[i][j] = 0;
                else                        newcell[i][j] = 1;
            }        
            else {
                if (check == 3)             newcell[i][j] = 1; 
            }
            if(cell[i][j] != newcell[i][j])
                Complete = false;
        }
    }
    copyMap(N, cell, newcell) 
}

function createTable(rows,cols) {
    var gridContainer = document.getElementById('gridContainer');
    var table = document.querySelector("table");
    
    if(table){
        grid = [];
        newgrid = [];
        console.log("remove");
        table.remove();
    }
       
    var newtable = document.createElement("table");
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {//
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        newtable.appendChild(tr);
    }
    gridContainer.appendChild(newtable);
}

function cellClickHandler() {
    var pos = this.id.split("_");
    var classes = this.getAttribute("class");
    
    if(classes === "live") {
        this.setAttribute("class", "dead");
        grid[pos[0]][pos[1]] = 0;
    } 
    else {
        this.setAttribute("class", "live");
        grid[pos[0]][pos[1]] = 1;
    }
}

function boardupdata(N, array){
    for(var i=0;i<N;i++){
        for(var j=0;j<N;j++){
            var cell = document.getElementById(i + "_" + j);
            if(array[i][j])    cell.setAttribute("class","live");
            else               cell.setAttribute("class", "dead");
        }
    }
}

function GenButtonHandler(){
    Size = Number((document.getElementById("Number")).value);
    if(Size <=3)
    Size = 3;
    createTable(Size, Size);
    grid = GenLift(Size,grid);
    newgrid = GenLift(Size,newgrid);
    document.getElementById('ButtonContainer').hidden = false;
}

function StartButtonHandler(){
    if(playing){
        this.innerHTML = "Pause";
        timer = setInterval(runlife,500);
        playing = false;
    }
        
    else {
        this.innerHTML = "Cotinue";
        clearInterval(timer);
        playing = true;
    }
}

function ClearButtonHandler(){
    if(timer)
        clearInterval(timer);
    clearMap(Size, grid);
    clearMap(Size, newgrid);
    boardupdata(Size, grid);
    playing = true;
    Start.innerHTML = "Start";
}

function RandomButtonHandler(){
    if(timer)
        clearInterval(timer);
    RandomMap(Size,grid);
    copyMap(Size, newgrid, grid);
    boardupdata(Size, grid);
    playing = true;
    Start.innerHTML = "Start";
}

function runlife(){
    CheckLife(Size, grid, newgrid);
    boardupdata(Size, grid);
    if(Complete){
        if(timer)   
            clearInterval(timer);
        alert("lift end");
        playing = true;
        Start.innerHTML = "Start";
    }
    Complete = true;
        
}

var Genbutton = document.getElementById('Genbutton');
Genbutton.onclick = GenButtonHandler;

var Start = document.getElementById('start');
Start.onclick = StartButtonHandler;

var Clear = document.getElementById('clear');
Clear.onclick = ClearButtonHandler;

var Random = document.getElementById('Random');
Random.onclick = RandomButtonHandler;

