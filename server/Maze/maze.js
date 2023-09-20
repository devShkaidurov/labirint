class Maze {
    constructor () {

    }

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

            // map[x - 2][y] = { isWall: true, visit: true}
        }

        if (this.pointInMaze(map, x + 2, y) && map[x + 2][y].isWall) {
            needToVisit.push({
                x: x + 2,
                y: y
            });
            // map[x + 2][y] = { isWall: true, visit: true}
        }

        
        if (this.pointInMaze(map, x, y + 2) && map[x][y + 2].isWall) {
            needToVisit.push({
                x: x,
                y: y + 2
            });
            // map[x][y + 2] = { isWall: true, visit: true}
        }

        if (this.pointInMaze(map, x, y - 2) && map[x][y - 2].isWall) {
            needToVisit.push({
                x: x,
                y: y - 2
            });
            // map[x][y - 2] = { isWall: true, visit: true}
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

    connect (map, x, y) {
        let directions = [
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: -1, y: 0},
            {x: 1, y: 0}
        ];

        directions = this.shuffle(directions);

        for (let i = 0; i < directions.length; i++) {
            const neighborX = x + directions[i].x * 2;
            const neighborY = y + directions[i].y * 2;

            if (this.pointInMaze(map, neighborX, neighborY) && !map[neighborX][neighborY].isWall) {
                const connectX = x + directions[i].x;
                const connectY = y + directions[i].y;
                map[connectX][connectY] = { isWall: false };
                console.log("X: " + connectX, " | Y: " + connectY);
                console.log(directions[i]);
                return;
            }
        }
    }

    generate(n, m) {
        // generate empty map
        const map = new Array(n);
        const needToVisit = [];
        for (let i = 0; i < n; i++) {
            map[i] = new Array(m);
            for (let j = 0; j < m; j++) {
                map[i][j] = { isWall: true }
            }
        }
    
        // get random point
        const randomRow = this.randomEvenInt(0, n - 1);
        const randomColumn = this.randomEvenInt(0, m - 1);

        map[randomRow][randomColumn] = { isWall: false };
        console.log("X: " + randomRow, " | Y: " + randomColumn);

        this.addToVisit(map, needToVisit, randomRow, randomColumn);

        let k = 2;
        while (needToVisit.length > 0) {
            const randomIndex = Math.floor(Math.random() * needToVisit.length);
            const x = needToVisit[randomIndex].x;
            const y = needToVisit[randomIndex].y;
            
            map[x][y] = { isWall: false };
            console.log("X: " + x, " | Y: " + y);
            this.connect(map, x, y);

            needToVisit.splice(randomIndex, 1);
            this.addToVisit(map, needToVisit, x, y);
            k--;
        }

        return map;
    }

    


}

module.exports = Maze;