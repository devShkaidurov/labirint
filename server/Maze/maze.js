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
        let counter = 0;
        if (this.pointInMaze(map, x - 2, y) && map[x - 2][y].isWall) {
            needToVisit.push({
                x: x - 2,
                y: y
            });
            map[x - 2][y] = { isWall: false };
            counter++;
        }

        if (this.pointInMaze(map, x + 2, y) && map[x + 2][y].isWall) {
            needToVisit.push({
                x: x + 2,
                y: y
            });
            map[x + 2][y] = { isWall: false };
            counter++;
        }

        
        if (this.pointInMaze(map, x, y + 2) && map[x][y + 2].isWall) {
            needToVisit.push({
                x: x,
                y: y + 2
            });
            map[x][y + 2] = { isWall: false };
            counter++;
        }

        if (this.pointInMaze(map, x, y - 2) && map[x][y - 2].isWall) {
            needToVisit.push({
                x: x,
                y: y - 2
            });
            map[x][y - 2] = { isWall: false };
            counter++;
        }
    }

    pointInMaze (map, x, y) {
        const width = map.length;
        const height = map[0].length;

        return (x > 0 && x < width && y > 0 && y < height);
    }

    shuffle (array) {
        for (let i = 0; i < array.length; i++) {
            let bufIndex = Math.floor(Math.random(0, array.length));
            if (bufIndex == i)
                continue;

            const bufX = array[bufIndex][0];
            const bufY = array[bufIndex][1];

            array[bufIndex][0] = array[i][0];
            array[bufIndex][0] = array[i][1];

            array[i][0] = bufX;
            array[i][1] = bufY;
        }
        return array;
    } 

    connect (map, x, y,needToVisit) {
        let directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ];

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
                console.dir(item);
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

    generate(x, y) {
        // generate empty map
        const map = new Array(x);
        const needToVisit = [];
        for (let i = 0; i < x; i++) {
            map[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                map[i][j] = { isWall: true }
            }
        }
    
        // get random point
        const randomColumn = this.randomEvenInt(0, x - 1);
        const randomRow    = this.randomEvenInt(0, y - 1);   

        map[randomColumn][randomRow] = { isWall: false };
        this.addToVisit(map, needToVisit, randomColumn, randomRow);

        while (needToVisit.length > 0) {
            const randomIndex = Math.floor(Math.random() * needToVisit.length);
            const x = needToVisit[randomIndex].x;
            const y = needToVisit[randomIndex].y;
            
            needToVisit.splice(randomIndex, 1);

            this.connect(map, x, y, needToVisit);
            this.addToVisit(map, needToVisit, x, y);
        }

        return map;
    }
}

module.exports = Maze;