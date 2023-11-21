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
        const directions = [
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

        map[startX][startY] = { isStart: true, isCurrent: true};
        map[finishX][finishY] = { isFinish: true };
    }
    randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    generatePrime(x, y) {
        console.dir(x);
        console.dir(y);
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

        this.setStartFinish(map);
        console.log(map);
        return map;
    }

    generateBT (x, y) {
        const map = new Array(x);

        for (let i = 0; i < x; i++) {
            map[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                map[i][j] = { isWall: true }
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
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                maze[[x, y]] = WALL; // Every space is a wall at first.
            }
        }
        
        
        function visit(x, y) {
            map[x][y] = { isWall: false }
            maze[[x, y]] = EMPTY; // "Carve out" the space at x, y.
        
            while (true) {
                // Check which neighboring spaces adjacent to
                // the mark have not been visited already:
                let unvisitedNeighbors = [];
                if (y > 1 && !JSON.stringify(hasVisited).includes(JSON.stringify([x, y - 2]))) {
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
                    } else if (nextIntersection === SOUTH) {
                        nextX = x;
                        nextY = y + 2;
                        maze[[x, y + 1]] = EMPTY; // Connecting hallway.
                        map[x][y+1] = { isWall: false }
                    } else if (nextIntersection === WEST) {
                        nextX = x - 2;
                        nextY = y;
                        map[x-1][y] = { isWall: false }
                        maze[[x - 1, y]] = EMPTY; // Connecting hallway.
                    } else if (nextIntersection === EAST) {
                        nextX = x + 2;
                        nextY = y;
                        map[x+1][y] = { isWall: false }
                        maze[[x + 1, y]] = EMPTY; // Connecting hallway.
                    }
                    hasVisited.push([nextX, nextY]); // Mark space as visited.
                    visit(nextX, nextY); // Recursively visit this space.
                }
            }
        }
        
        
        // Carve out the paths in the maze data structure:
        let hasVisited = [[1, 5],[14,19]]; // Start by visiting the top-left corner.
        visit(1, 5);

        console.log(map);
        map[0][5] = { isStart: true, isCurrent: true};
        map[14][20] = { isFinish: true };//y,x
        return map;
        
            
    }
    
}
module.exports = Maze;