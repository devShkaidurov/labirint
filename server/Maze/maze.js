class Maze {
    constructor () {

    }


    generate(n, m) {
        // generate empty map
        let map = new Array(n);
        for (let i = 0; i < n; i++) {
            map[i] = new Array(m);
            for (let j = 0; j < m; j++) {
                map[i][j] = { isWall: true }
            }
        }
    
        // get random point
        const randomRow = Math.floor(Math.random() * n);
        const randomColumn = Math.floor(Math.random() * m);

        map[randomRow][randomColumn] = { isWall: false };

        return map;
    }


}

module.exports = Maze;