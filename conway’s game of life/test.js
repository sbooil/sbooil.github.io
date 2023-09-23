var grid = [];

lifeP = 0.2;

function GenLift(N, array){
    for(var i=0;i<N;i++){
        array.push([])
        for(var j=0;j<N;j++){
            //if(Math.random() < lifeP)   array[i].push(1);
            //else                        array[i].push(0);
            array[i].push(0);
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

GenLift(5, grid);
RandomMap(5,grid);
console.log(grid);