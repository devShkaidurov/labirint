class Maze {
    constructor () {

    }

    map = null;

    // n, m - размеры лабиринта
    // x, y - координаты точки, которую нужно проверить
    checkOnValidSell (n, m, x, y) {
        if (x == 0 || x == n || x % 2 == 1)
            return false;
        
        if (y == 0 || y == m || y % 2 == 1)
            return false;
    
        return true;
    }
    randomEvenInt(min, max){
        let v  = Math.round(min + Math.random() * (max - min));
        return v % 2 != 0 ? v : this.randomEvenInt(min, max);
    }

    addToVisit (map, needToVisit, x, y) {
        if (this.pointInMaze(map, x - 2, y) && map[x - 2][y].isWall) {
            needToVisit.push({
                x: x - 2,
                y: y
            });
            map[x - 2][y] = { isWall: false };
        }

        if (this.pointInMaze(map, x + 2, y) && map[x + 2][y].isWall) {
            needToVisit.push({
                x: x + 2,
                y: y
            });
            map[x + 2][y] = { isWall: false };
        }

        
        if (this.pointInMaze(map, x, y + 2) && map[x][y + 2].isWall) {
            needToVisit.push({
                x: x,
                y: y + 2
            });
            map[x][y + 2] = { isWall: false };
        }

        if (this.pointInMaze(map, x, y - 2) && map[x][y - 2].isWall) {
            needToVisit.push({
                x: x,
                y: y - 2
            });
            map[x][y - 2] = { isWall: false };
        }
    }


    pointInMaze (map, x, y) {
        const width = map.length;
        const height = map[0].length;

        return (x > 0 && x < width && y > 0 && y < height);
    }
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    connect (map, x, y,needToVisit) {
        var directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ];
        directions.sort(() => Math.random() - 0.5);
        directions.sort(() => Math.random() - 0.5);
        let isFind = false;
        directions.forEach(item => {
            if (isFind)
                return;
            const neighborX = x + item.x * 2;
            const neighborY = y + item.y * 2;

            if (this.pointInMaze(map, neighborX, neighborY) && !map[neighborX][neighborY].isWall && !this.overlap(needToVisit, {x: neighborX, y: neighborY})) {
                const connectX = x + item.x;
                const connectY = y + item.y;
                map[connectX][connectY] = { isWall: false };
                isFind = true;
            }
        });
    }
    overlap (array, second) {
        let isOverlap = false;
        array.forEach(first => {
            if (first.x === second.x && first.y === second.y) {
                isOverlap = true;
            }
        });
        return isOverlap;
    }
    setStartFinish (map) {
        const width = map.length - 1;
        const height = map[0].length - 1;

        const sides = [
            {x1: 0, y1: 1, x2: 0, y2: height - 1},
            {x1: 1, y1: 0, x2: width - 1, y2: 0},
            {x1: width, y1: 1, x2: width, y2: height - 1},
            {x1: 1, y1: height, x2: width - 1, y2: height},
        ];

        const directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ];

        let okStart = false;
        let okFinish = false;
        let side;
        let startX;
        let startY;
        let finishX;
        let finishY;

        while(!okStart || !okFinish) {
            side = sides[Math.round(Math.random() * 3)];            // get random side
            startX = this.randomIntFromInterval(side.x1, side.x2)   // get random x in side
            startY = this.randomIntFromInterval(side.y1, side.y2)   // get random y in side

            // check start cell on valid
            directions.forEach(direct => {
                if (this.pointInMaze(map, startX + direct.x, startY + direct.y) && !map[startX + direct.x][startY + direct.y].isWall) {
                    okStart = true;
                }
            });

                
            // calculate finish
            finishX = width - startX;
            finishY = height - startY;

            // check finish cell on valid
            directions.forEach(direct => {
                if (this.pointInMaze(map, finishX + direct.x, finishY + direct.y) && !map[finishX + direct.x][finishY + direct.y].isWall) {
                    okFinish = true;
                }
            });
        }

        map[startX][startY] = { isStart: true};
        map[finishX][finishY] = { isFinish: true };
    }
    randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    generatePrime(_x, _y,_startX,_startY,_finishX,_finishY) {
        const x = parseInt(_x);
        const y = parseInt(_y);
        const startX = parseInt(_startX);
        const startY = parseInt(_startY);
        const finishX = parseInt(_finishX);
        const finishY = parseInt(_finishY);

        // generate empty map
        const map = new Array(x);
        const needToVisit = [];
        for (let i = 0; i < x; i++) {
            map[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                map[i][j] = { isWall: true }
            }
        }

        const ans = this.setNeighbourStartFinish(x, y, startX, startY, finishX, finishY);
        const nSx=ans[0][0];
        const nSy=ans[0][1];
        const nFx=ans[1][0];
        const nFy=ans[1][1];

        map[startX][startY] = { isStart: true};
        needToVisit.push({
            x: nSx,
            y: nSy
        }) 


        while (needToVisit.length > 0) {
            const randomIndex = Math.floor(Math.random() * needToVisit.length);
            const x = needToVisit[randomIndex].x;
            const y = needToVisit[randomIndex].y;
            
            needToVisit.splice(randomIndex, 1);

            this.connect(map, x, y, needToVisit);
            this.addToVisit(map, needToVisit, x, y);
        }

        
        //console.log(map);
        if(map[nFx][nFy].isWall){
            return this.generatePrime(x, y,startX,startY,finishX,finishY);
        }else{
           // console.log(map);
            map[finishX][finishY] = { isFinish: true };
            return map;
        }

    } 

    generateAnaloguePrime (x, y, tractorsNumber = 1,startX,startY,finishX,finishY) {
        const columnsNumber = parseInt(x)-2;
        const rowsNumber = parseInt(y)-2;
        startX = parseInt(startX)
        startY =parseInt(startY)
        finishX =parseInt(finishX)
        finishY =parseInt(finishY)

        const map = []
        const tractors = []

        for (let y = 0; y < rowsNumber; y++) {
            const row = []

            for (let x = 0; x < columnsNumber; x++) {
                row.push('wall')
            }

            map.push(row)
        }

        const _startX = getRandomFrom(Array(columnsNumber).fill(0).map((item, index) => index).filter(x => isEven(x)))
        const _startY = getRandomFrom(Array(rowsNumber).fill(0).map((item, index) => index).filter(x => isEven(x)))

        // создаем тракторы
        for (let i = 0; i < tractorsNumber; i++) {
            tractors.push({ x: _startX, y: _startY })
        }

        // сделаем ячейку, в которой изначально стоит трактор, пустой
        setField(_startX, _startY, 'space')

        // если лабиринт ещё не готов, рисовать трактор и регистрировать функцию tick() ещё раз
        while (!isMaze()) {
            moveTractors()
        }
        const kart = new Array(columnsNumber+2);

        for (let i = 0; i < columnsNumber+2; i++) {
            kart[i] = new Array(rowsNumber+2);
            for (let j = 0; j < rowsNumber+2; j++) {
                kart[i][j] = { isWall: true }
            }
        }
        for (let i = 0; i < columnsNumber; i++) {
            for (let j = 0; j < rowsNumber; j++) {
                if(map[i][j]=='space'){
                    kart[i+1][j+1]={ isWall: false };
                }
            }
        }
        console.log(startX,startY,finishX,finishY);
        var ans=setNeighbourStartFinish(startX,startY,finishX,finishY);
        // console.log(ans);
        var nSx=ans[0][0];
        var nSy=ans[0][1];
        var nFx=ans[1][0];
        var nFy=ans[1][1];

        if(!kart[nSx][nSy].isWall && !kart[nFx][nFy].isWall)
        {
            console.log("готово");
            kart[startX][startY] = { isStart: true};
            kart[finishX][finishY] = { isFinish: true }
            return kart;
        }else{
            console.log("перезапуск");
            return this.generateAnaloguePrime(x, y, tractorsNumber = 1,startX,startY,finishX,finishY);
        }



        // получить значение из матрицы
        function getField (x, y) {
            if (x < 0 || x > columnsNumber || y < 0 || y > rowsNumber) {
                return null
            }

            return map[y][x]
        }

        // записать значение в матрицу
        function setField (x, y, value) {
            if (x < 0 || x > columnsNumber || y < 0 || y > rowsNumber) {
                return null
            }

            map[y][x] = value
        }

        // функция возвращает случайный элемент из переданного ей массива
        function getRandomFrom (array) {
            // получаем случайным образом индекс элемента массива
            // число будет в диапазоне от 0 до количества элементов в массиве - 1
            const index = Math.floor(Math.random() * array.length)
            // возвращаем элемент массива с полученным случайным индексом
            return array[index]
        }

        /*
            функция проверяет четное число или нет
            если возвращает true - четное
        */
        function isEven (n) {
            return n % 2 === 0
        }

        // функция проверяет, готов лабиринт или ещё нет
        // возвращает true, если лабиринт готов, false если ещё нет
        function isMaze () {
            for (let x = 0; x < columnsNumber; x++) {
                for (let y = 0; y < rowsNumber; y++) {
                    if (isEven(x) && isEven(y) && getField(x, y) === 'wall') {
                        return false
                    }
                }
            }

            return true
        }

        /*
            функция заставляет трактора двигаться
            трактор должен двигаться на 2 клетки
            если вторая клетка со стеной, то нужно очистить первую и вторую
        */
        function moveTractors () {
            for (const tractor of tractors) {
                // массив с возможными направлениями трактора
                const directs = []

                if (tractor.x > 0) {
                    directs.push('left')
                }

                if (tractor.x < columnsNumber - 2) {
                    directs.push('right')
                }

                if (tractor.y > 0) {
                    directs.push('up')
                }

                if (tractor.y < rowsNumber - 2) {
                    directs.push('down')
                }

                // случайным образом выбрать направление, в котором можно пойти
                const direct = getRandomFrom(directs)

                switch (direct) {
                    case 'left':
                        if (getField(tractor.x - 2, tractor.y) === 'wall') {
                            setField(tractor.x - 1, tractor.y, 'space')
                            setField(tractor.x - 2, tractor.y, 'space')
                        }
                        tractor.x -= 2
                        break
                    case 'right':
                        if (getField(tractor.x + 2, tractor.y) === 'wall') {
                            setField(tractor.x + 1, tractor.y, 'space')
                            setField(tractor.x + 2, tractor.y, 'space')
                        }
                        tractor.x += 2
                        break
                    case 'up':
                        if (getField(tractor.x, tractor.y - 2) === 'wall') {
                            setField(tractor.x, tractor.y - 1, 'space')
                            setField(tractor.x, tractor.y - 2, 'space')
                        }
                        tractor.y -= 2
                        break
                    case 'down':
                        if (getField(tractor.x, tractor.y + 2) === 'wall') {
                            setField(tractor.x, tractor.y + 1, 'space')
                            setField(tractor.x, tractor.y + 2, 'space')
                        }
                        tractor.y += 2
                        break
                }
            }
        }

        function setNeighbourStartFinish(startX,startY,finishX,finishY) {
            
            var ans = [];
            if(startX==0 && startY!=0){
                ans.push([1,startY])
            }
            if(startX===x-1 && startY!=0){
                ans.push([startX-1,startY]);
            }

            if(startY==0 && startX!=0){
                ans.push([startX,1])
            }
            if(startY==y-1 & startX!=0){
                ans.push([startX,startY-1])
            }
            

            if(finishX==0 && finishY!=0){
                ans.push([1,finishY])
            }
            if(finishX==x-1 && finishY!=0){
                ans.push([finishX-1,finishY]);
            }

            if(finishY==0 && finishX!=0){
                ans.push([finishX,1])
            }
            if(finishY==y-1 && finishX!=0){
                ans.push([finishX,finishY-1])
            }
            console.log(ans);
            console.log(x,y);
            return ans;
        }
    }

    generateBT (_x, _y,_startX,_startY,_finishX,_finishY) { // корректно работает если задать нечетное положение входов и выходов
        const x = parseInt(_x);
        const y = parseInt(_y);
        const startX = parseInt(_startX);
        const startY = parseInt(_startY);
        const finishX = parseInt(_finishX);
        const finishY = parseInt(_finishY);

        const map = new Array(x);
        const matrix = new Array(x);

        for (let i = 0; i < x; i++) {
            map[i] = new Array(y);
            matrix[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                map[i][j] = { isWall: true }
                matrix[i][j] = 0;
            }
        }
        const WIDTH = x; // Width of the maze (must be odd).
        const HEIGHT = y; // Height of the maze (must be odd).
        
        // Use these characters for displaying the maze:
        const EMPTY = " ";
        const MARK = "@";
        const WALL = "█"; // Character 9608 is ′█′
        const [NORTH, SOUTH, EAST, WEST] = ["n", "s", "e", "w"];
        
        // Create the filled-in maze data structure to start:
        let maze = {};
        for (let i = 0; i < WIDTH; i++) {
            for (let j = 0; j < HEIGHT; j++) {
                maze[[i, j]] = WALL; // Every space is a wall at first.
            }
        }
        function visit(x, y) {
            map[x][y] = { isWall: false }
            matrix[x][y] = 1;
            maze[[x, y]] = EMPTY; // "Carve out" the space at x, y.
        
            while (true) {
                // Check which neighboring spaces adjacent to
                // the mark have not been visited already:
                let unvisitedNeighbors = [];
                if (y > 1 && !JSON.stringify(hasVisited).includes(JSON.stringify([x, y - 2]))){
                    unvisitedNeighbors.push(NORTH);
                }
                if (y < HEIGHT - 2 &&
                !JSON.stringify(hasVisited).includes(JSON.stringify([x, y + 2]))) {
                    unvisitedNeighbors.push(SOUTH);
                }
                if (x > 1 &&
                !JSON.stringify(hasVisited).includes(JSON.stringify([x - 2, y]))) {
                    unvisitedNeighbors.push(WEST);
                }
                if (x < WIDTH - 2 &&
                !JSON.stringify(hasVisited).includes(JSON.stringify([x + 2, y]))) {
                    unvisitedNeighbors.push(EAST);
                }
        
                if (unvisitedNeighbors.length === 0) {
                    // BASE CASE
                    // All neighboring spaces have been visited, so this is a
                    // dead end. Backtrack to an earlier space:
                    return;
                } else {
                    // RECURSIVE CASE
                    // Randomly pick an unvisited neighbor to visit:
                    let nextIntersection = unvisitedNeighbors[
                    Math.floor(Math.random() * unvisitedNeighbors.length)];
        
                    // Move the mark to an unvisited neighboring space:
                    let nextX, nextY;
                    if (nextIntersection === NORTH) {
                        nextX = x;
                        nextY = y - 2;
                        maze[[x, y - 1]] = EMPTY; // Connecting hallway.
                        map[x][y-1] = { isWall: false }
                        matrix[x][y-1]=1;
                    } else if (nextIntersection === SOUTH) {
                        nextX = x;
                        nextY = y + 2;
                        maze[[x, y + 1]] = EMPTY; // Connecting hallway.
                        matrix[x][y+1]=1;
                        map[x][y+1] = { isWall: false }
                    } else if (nextIntersection === WEST) {
                        nextX = x - 2;
                        nextY = y;
                        map[x-1][y] = { isWall: false }
                        maze[[x - 1, y]] = EMPTY; // Connecting hallway.
                        matrix[x-1][y]=1;
                    } else if (nextIntersection === EAST) {
                        nextX = x + 2;
                        nextY = y;
                        map[x+1][y] = { isWall: false }
                        maze[[x + 1, y]] = EMPTY; // Connecting hallway.
                        matrix[x+1][y]=1;
                    }
                    hasVisited.push([nextX, nextY]); // Mark space as visited.
                    visit(nextX, nextY); // Recursively visit this space.
                }
            }
        }

        let neighborStartFinish = this.setNeighbourStartFinish(x,y,startX,startY,finishX,finishY);
        let hasVisited = neighborStartFinish ; 
        visit(neighborStartFinish[0][0],neighborStartFinish[0][1]);

        map[parseInt(startX)][parseInt(startY)] = { isStart: true};
        map[parseInt(finishX)][parseInt(finishY)] = { isFinish: true }

        let nFx = neighborStartFinish[1][0];
        let nFy = neighborStartFinish[1][1];

        if (map[nFx][nFy].isWall) {
            console.log('!');
            return this.generateBT(x, y,startX,startY,finishX,finishY);
        } else {
            return map;
        }
        
    }
    


    setNeighbourStartFinish(x,y,startX,startY,finishX,finishY) {
        console.dir(startX);
        console.dir(startY);

        console.dir(x);
        console.dir(y);
        var ans = [];
        if (startX==0 && startY!=0){
            ans.push([1,startY])
        } 
         if(startX===x-1 && startY!=0){
            ans.push([startX-1,startY]);
        } 
         if(startY==0 && startX!=0){
            ans.push([startX,1])
        } 
         if(startY==y-1 & startX!=0){
            ans.push([startX,startY-1])
        }
        

        if (finishX==0 && finishY!=0){
            ans.push([1,finishY])
        } 
         if(finishX==x-1 && finishY!=0){
            ans.push([finishX-1,finishY]);
        } 
         if(finishY==0 && finishX!=0){
            ans.push([finishX,1])
        } 
         if(finishY==y-1 && finishX!=0){
            ans.push([finishX,finishY-1])
        }
        console.dir(ans);
        return ans;
    }

    WawePath(obj,startX,startY,finishX,finishY){
        var {matrix,map} = obj;
        let x = matrix.length;
        let y = matrix[0].length;
        var neig = this.setNeighbourStartFinish(x,y,startX,startY,finishX,finishY)
        var src = [neig[0][0],neig[0][1]];
        var dest = [neig[1][0],neig[1][1]];
       

        // var matrix =[
        //     [0,0,0,0,0,0,0],
        //     [0,1,1,0,0,0,0],
        //     [0,0,1,1,1,1,0],
        //     [0,0,0,0,0,1,0],
        //     [0,1,0,0,0,1,0],
        //     [0,1,1,1,1,1,0],
        //     [0,0,0,0,0,0,0],
        //     ];

        //     var src = [1,1];
        //     var dest = [4,1];
    // Список возможных направлений
    let row = [-1, 0, 0, 1];
    let col = [0, -1, 1, 0];
    // Ввод
    //     matrix - матрица заполненная 0 (стена) и 1 (пустота)
    //     visited - посещенные ячейки
    //     row - ряд
    //     col - колонка
    // Вывод
    //     возможно ли переместиться на позицию
    function checkValid(matrix, visited, row, col) {
        let isValid = row >= 0 && row < matrix.length;
        isValid = isValid && col >= 0 && col < matrix[0].length;
        return isValid && matrix[row][col] == 1 && !visited[row][col];
    }
    // Ввод
    //     matrix - матрица заполненная 0 (стена) и 1 (пустота)
    //     src - источник в формате (x, y)
    //     dest - место назначения в формате (x, y)
    // Вывод
    //     длина кратчайшего пути от источника до пункта назначения
    function leeAlgorithm(matrix, src, dest) {
        let [srcX, srcY] = src;
        let [destX, destY] = dest;

        if (matrix[srcX][srcY] == 0 || matrix[destX][destY] == 0) {// начинает с самих точек старта и конца, а нужно с соседей ихих
            return -1;
        }
        let height = matrix.length, width = matrix[0].length;
        let visited = [];
        for (let destY = 0; destY < height; destY++) {
            let buff = [];
            for (let destX = 0; destX < width; destX++) {
                buff.push(false);
            }
            visited.push(buff);
        }
        let queue = [];
        visited[srcX][srcY] = true;
        queue.push([srcX, srcY, 0,[[srcX,srcY]]]);
        let minDist = Number.MAX_VALUE;
        let soul;
        let paths = [];
        let i=0;
        while (queue.length != 0 && i<15) {
            
            let [srcX, srcY, dist,path] = queue.shift();
            console.log(path);

            if (srcX == destX && srcY == destY) {
                minDist = dist;
                soul = path;
                break;
            }
            for (let k = 0; k < row.length; k++) {
                if (checkValid(matrix, visited, srcX + row[k], srcY + col[k])) {
                    visited[srcX + row[k]][srcY + col[k]] = true;
                    path.push([srcX + row[k],srcY + col[k]]);
                    queue.push([srcX + row[k], srcY + col[k], dist + 1,path]);
                }else{
                    // map[srcX][srcY] = { isStart: true};
                }
            }
            paths.push(path);
            i++;
        }
    
        if (minDist != Number.MAX_VALUE) {
            return soul;
        } else {
            return -1;
        }
    }

    let path = (leeAlgorithm(matrix, src, dest)); // правильный путь
    for(let i=0;i<path.length;i++){  // отображение правильного пути
        let [x,y]=path[i];
        map[x][y] = { isStart: true};
    }
    map[neig[1][0]][neig[1][1]] = {isStart: true}
    return {map:map,matrix:matrix}
    }

    
        
    }
module.exports = Maze;