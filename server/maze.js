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

    generateBT (_x,_y,_startX,_startY,_finishX,_finishY) {
        const x = parseInt(_x);
        const y = parseInt(_y);
        const startX = parseInt(_startX);
        const startY = parseInt(_startY);
        const finishX = parseInt(_finishX);
        const finishY = parseInt(_finishY);
        // Размеры лабиринта
        console.log(x,y);
        const rows = parseInt(x)-2; // размер поля без стен
        const cols = parseInt(y)-2;

        console.log(rows,cols);
        // Создаем пустой лабиринт
        const maze = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ isWall: true }))
        );

        // Начальные координаты (левый верхний угол)
        const startRow = 0;
        const startCol = 0;

        // Вызываем функцию для генерации лабиринта
        generateMaze(startRow, startCol);

        // Функция для проверки, что координаты находятся в пределах лабиринта
        function isValidCell(row, col) {
        return row >= 0 && col >= 0 && row < rows && col < cols;
        }

        // Функция для генерации лабиринта с использованием алгоритма бектрекинга
        function generateMaze(row, col) {
        // Помечаем текущую ячейку как проходимую
        maze[row][col].isWall = false;

        // Список направлений (вверх, вправо, вниз, влево)
        const directions = [
            { row: -2, col: 0 },
            { row: 0, col: 2 },
            { row: 2, col: 0 },
            { row: 0, col: -2 }
        ];

        // Перемешиваем направления случайным образом
        directions.sort(() => Math.random() - 0.5);

        // Проходимся по каждому направлению
        for (const dir of directions) {
            const newRow = row + dir.row;
            const newCol = col + dir.col;

            // Проверяем, что новая ячейка в пределах лабиринта и не посещена
            if (isValidCell(newRow, newCol) && maze[newRow][newCol].isWall) {
            // Помечаем промежуточные ячейки как проходимые
            maze[row + dir.row / 2][col + dir.col / 2].isWall = false;

            // Рекурсивный вызов для новой ячейки
            generateMaze(newRow, newCol);
            }
        }
        
    }

    
    const kart = new Array(x);
    for (let i = 0; i < x; i++) {
        kart[i] = new Array(y);
        for (let j = 0; j < y; j++) {
            kart[i][j] = { isWall: true }
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(maze[i][j].isWall==false){
                kart[i+1][j+1]={ isWall: false };
            }
            else{
                kart[i+1][j+1]={ isWall: true };
            }
        }
    }

    var ans=this.setNeighbourStartFinish(x,y,startX,startY,finishX,finishY);
    // console.log(ans);
    var nSx=ans[0][0];
    var nSy=ans[0][1];
        var nFx=ans[1][0];
    var nFy=ans[1][1];

    if(!kart[nSx][nSy].isWall && !kart[nFx][nFy].isWall)
    {
        console.log("готово");
        kart[startX][startY] = { isStart: true, isPath: true};
        kart[finishX][finishY] = { isFinish: true }
        return kart;
    }else{
        console.log("перезапуск");
        return this.generateBT(x,y,startX,startY,finishX,finishY);
    }
    
}
    


    setNeighbourStartFinish(x,y,startX,startY,finishX,finishY) {
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
    
    }

    
// Ввод
//     matrix - матрица заполненная 0 (стена) и 1 (пустота)
//     src - источник в формате (x, y)
//     dest - место назначения в формате (x, y)
// Вывод
//     длина кратчайшего пути от источника до пункта назначения


leeAlgorithm (matrix, x, y, startX, startY, finishX, finishY) {

    
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

    console.dir("=== params ===")
    console.dir(x);
    console.dir(y);
    console.dir(startX);
    console.dir(startY);
    console.dir(finishX);
    console.dir(finishY);
    console.dir("======")

    var neighbor = this.setNeighbourStartFinish(x,y,startX,startY,finishX,finishY)
    // let [srcX, srcY] = src;
    // let [destX, destY] = dest;
    let srcX = neighbor[0][0];
    let srcY = neighbor[0][1];

    let destX = neighbor[1][0];
    let destY = neighbor[1][1];

    // console.log(srcX,srcY,destX,destY);
    // console.log(matrix[srcX][srcY]);
    if (matrix[srcX][srcY] == 0 || matrix[destX][destY] == 0) {
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
    let q = [];
    let path = []

    visited[srcX][srcY] = true;

    queue.push([srcX, srcY, 0]);

    let minDist = Number.MAX_VALUE;
    
    while (queue.length != 0) {
        let [srcX, srcY, dist] = queue.shift();

        if (srcX == destX && srcY == destY) {
            minDist = dist;
            break;
        }

        for (let k = 0; k < row.length; k++) {
            if (checkValid(matrix, visited, srcX + row[k], srcY + col[k])) {
                visited[srcX + row[k]][srcY + col[k]] = true;
                q.push([srcX + row[k], srcY + col[k], dist + 1]);
                queue.push([srcX + row[k], srcY + col[k], dist + 1]);
            }
        }
    }
    q = q.reverse();
    q.push([srcX, srcY,0]);
    var lq = q.length-1;
    var inx;

    for(let i=0;i<lq;i++){
        if(q[i][0]==destX && q[i][1]==destY && q[i][2]==minDist){
            inx = i;
        }
    }
    q.splice(0,inx) //Вырезал лишнее, чтобы точка финиша была первая в массиве.
    lq--;

    let prev = undefined;
    const finallyPath = [];
    for (let i = 0; i < q.length; i++) {
        if (prev === undefined) {
            prev = q[i];
            finallyPath.push(q[i]);
        } else if (Math.abs(prev[0] - q[i][0]) + Math.abs(prev[1] - q[i][1]) === 1) {
            prev = q[i];
            finallyPath.push(q[i]);
        }
    }

    if (minDist != Number.MAX_VALUE) {
        return finallyPath;
    } else {
        return -1;
    }
}

OverlayLee(map,path) {
    var temp = path.length;
    for(let i=0;i<temp;i++){
        var x = path[i][0];
        var y = path[i][1];
        map[y][x].isPath = true;
    }
    return map;
}

checkOnValidMaze (maze) {
    const numRows = maze.length;
    const numCols = maze[0].length;
  
    // Помечаем все стены как непосещенные
    const visited = [];
    for (let i = 0; i < numRows; i++) {
      visited.push(new Array(numCols).fill(false));
    }
  
    // Выбираем случайную стартовую точку
    const startRow = Math.floor(Math.random() * (numRows - 2)) + 1;
    const startCol = Math.floor(Math.random() * (numCols - 2)) + 1;
  
    const stack = [];
    stack.push([startRow, startCol]);
    visited[startRow][startCol] = true;
  
    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop();
      const neighbors = getUnvisitedNeighbors(currentRow, currentCol);
  
      if (neighbors.length > 0) {
        stack.push([currentRow, currentCol]);
  
        // Выбираем случайного соседа и убираем стену между текущей ячейкой и соседом
        const [nextRow, nextCol] = neighbors[Math.floor(Math.random() * neighbors.length)];
        maze[Math.floor((currentRow + nextRow) / 2)][Math.floor((currentCol + nextCol) / 2)].isWall = false;
  
        // Помечаем соседа как посещенного
        visited[nextRow][nextCol] = true;
  
        // Переходим к соседу
        stack.push([nextRow, nextCol]);
        visited[nextRow][nextCol] = true;
      }
    }
  
    // Проверяем, что все ячейки лабиринта были посещены
    for (let i = 1; i < numRows - 1; i += 2) {
      for (let j = 1; j < numCols - 1; j += 2) {
        if (!visited[i][j]) {
          console.error("Лабиринт не идеальный. Некоторые ячейки не были посещены.");
          return false;
        }
      }
    }
  
    console.log("Лабиринт идеальный!");
    return true;
  
    // Вспомогательная функция для получения непосещенных соседей
    function getUnvisitedNeighbors(row, col) {
      const neighbors = [];
  
      if (row - 2 > 0 && !visited[row - 2][col]) neighbors.push([row - 2, col]);
      if (row + 2 < numRows - 1 && !visited[row + 2][col]) neighbors.push([row + 2, col]);
      if (col - 2 > 0 && !visited[row][col - 2]) neighbors.push([row, col - 2]);
      if (col + 2 < numCols - 1 && !visited[row][col + 2]) neighbors.push([row, col + 2]);
  
      return neighbors;
    }
  }

doStep (map, visited, cell) {
    console.dir(visited);
    const directions = [
        { x: 0,  y: 1},
        { x: 0,  y: -1},
        { x: -1, y: 0},
        { x: 1,  y: 0},
    ];

    directions.forEach(direction => {
        let newX = cell.x + direction.x; 
        let newY = cell.y + direction.y;
        let prevCell = undefined;
        while (this.pointInMaze(map, newX, newY) && map[newX][newY].isWall) {
            visited.push({ x: newX, y: newY });
            prevCell = { x: newX, y: newY };
            newX = newX + direction.x;
            newY = newY + direction.y;
        }

        if (prevCell && !visited.find(item => { return item.x === prevCell.x && item.y === prevCell.y}))
            this.doStep (map, visited, prevCell);
    })
}

isValidMove(maze, row, col) {
    const rows = maze.length;
    const cols = maze[0].length;
    return row >= 0 && col >= 0 && row < rows && col < cols && !maze[row][col].isWall;
}
// Функция для поиска выхода из лабиринта
findExit(maze, row, col) {
    console.dir("find")
    const rows = maze.length;
    const cols = maze[0].length;
    // Если достигнута выходная ячейка
    if (row === rows - 1 && col === cols - 1) {
        maze[row][col].isPath = true; // Помечаем выход
        console.log("Выход найден!");
        return maze;
    }

    console.dir("Is valid move: " + this.isValidMove(maze, row, col));
    // Если текущая ячейка проходима
    if (this.isValidMove(maze, row, col)) {
        maze[row][col].isPath = true; // Помечаем, что посетили эту ячейку
        console.log("+1");
        // Рекурсивный вызов для движения вверх, вправо, вниз и влево
        if (this.findExit(maze, row - 1, col) || this.findExit(maze, row, col + 1) || this.findExit(maze, row + 1, col) || this.findExit(maze, row, col - 1)) {
            return maze;
        }

        maze[row][col].isPath = false; // Отмечаем ячейку как непосещенную, если путь не найден
    }
    return maze;
}

  
}
module.exports = Maze;
















