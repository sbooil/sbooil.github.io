var grid = [];
var boardSize = 0;
var player = 1;
var direction = [0, 0]
var GameOver = false

function Genboard(N, array){
    for(var i=0;i<N;i++){
        array.push([])
        for(var j=0;j<N;j++)
            array[i].push(0);
    }
    return array
}

function clearMap(N, arr){
    for (var i=0;i<N;i++){
        for(var j=0;j<N;j++){ 
            arr[i][j] = 0;
            var cell = document.getElementById(i + "_" + j);
            cell.setAttribute("class","empty");
        }
    }
}

function createTable(rows, cols) {
    var gridContainer = document.getElementById('gridContainer');
    var table = document.querySelector("table");
    
    if(table) table.remove();
    table = document.createElement("table");
    
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "empty");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler() {
    var pos = this.id.split("_");
    var classes = this.getAttribute("class");

    if(GameOver == false){
        if(classes === "empty") {
            direction[0] = Number(pos[0])
            direction[1] = Number(pos[1])
            grid[pos[0]][pos[1]] = player;        
            if(player == 1) this.setAttribute("class", "black");
            else            this.setAttribute("class", "white");
            GameOver = checkall(grid, boardSize, direction)
            if(GameOver){
                var par = document.getElementById("message")
                if(player == 1)     winner = "black"
                else                winner = "white"
                par.innerHTML = "<h3> The " + winner + " is winner. </h3>"
            }
            player = -player;
        } 
    }
}

function boundary_range(Size, Location){
    if((Location + 4) >= Size)
        return [Location - 4, Size - 1]
    else if((Location - 4) <= 0)
        return [0, Location + 4]
    return [Location - 4, Location + 4]
}

function hor(board, Size, Location) {
    var range = boundary_range(Size, Location[1])
    var connect = 0;
	for (var i=range[0];i<=range[1];i++) {
		if (board[Location[0]][i] == player) {
			connect++;
			if (connect == 5) break;
		}
		else    connect = 0;
	}
	if (connect >= 5) return true;
	return false;
}

function ver(board, Size, Location) {	//檢查y軸方向上是否連成五子
    var range = boundary_range(Size, Location[0])
    var connect = 0;
	for (var i=range[0];i<=range[1];i++) {
		if (board[i][Location[1]] === player) {
			connect++;
			if (connect === 5) break;
		}
		else    {
            connect = 0;
        }
	}
	if (connect >= 5) return true;
	return false;
}

function inverse_slope(board, Size, Location) {	//檢查函數y=-x的影象所在直線方向上是否連成五子
    var xrange = boundary_range(Size, Location[1])
    var yrange = [Location[0] - (Location[1] - xrange[0]), Location[0] - (Location[1] - xrange[1])]

    if(yrange[0] < 0){
        xrange[0] -= yrange[0]
        yrange[0] = 0
    }
    else if(yrange[1] > Size){
        xrange[1] -= yrange[1] - Size
        yrange[1] = Size 
    }

    var connect = 0;
	for (var i = yrange[0], j = xrange[0]; i < yrange[1]; i++, j++) {
		if (board[i][j] === player) {
			connect++;
			if (connect === 5) break;
		}
		else    connect = 0;
	}
	if (connect >= 5) return true;
	return false;
}

function slope(board, Size, Location) {	//檢查函數y=x的影象所在直線方向上是否連成五子
	var xrange = boundary_range(Size, Location[1])
    var yrange = [Location[0] + (Location[1] - xrange[0]), Location[0] + (Location[1] - xrange[1])]

    if(yrange[1] < 0){
        xrange[1] += yrange[1]
        yrange[1] = 0
    }
    else if(yrange[0] >= Size){
        xrange[0] += yrange[0] - Size + 1
        yrange[0] = Size - 1
    }

    var connect = 0;
	for (var i = yrange[0], j = xrange[0]; j <= xrange[1]; i--, j++) {
		if (board[i][j] == player) {
			connect++;
			if (connect === 5) break;
		}
		else    connect = 0;
	}
	if (connect >= 5) return true;
	return false;
}

function checkall(board, Size, Location){
    var func = [hor, ver, slope, inverse_slope]
    
    for(var i=0;i<func.length;i++){
        var result = func[i](board, Size, Location)
        if(result)
            return true
    }
    return false   
}

function GenButtonHandler(){
    boardSize = Number((document.getElementById("Number")).value);
    if(boardSize <=3)    boardSize = 3;
    grid = Genboard(boardSize,grid);
    createTable(boardSize, boardSize);
    document.getElementById('ButtonContainer').hidden = false;
}

function ClearButtonHandler(){
    clearMap(boardSize, grid);
    player = 1;

    var par = document.getElementById("message")
    par.innerHTML = ""
    GameOver = false;
}


var Genbutton = document.getElementById('Genbutton');
Genbutton.onclick = GenButtonHandler;

var Clear = document.getElementById('Restart');
Clear.onclick = ClearButtonHandler;
