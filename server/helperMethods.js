function getRandomEntries (maze) {
    const start  = {};
    const finish = {};

    const height = maze.length;
    const width = maze[0].length;

    const startSide  = Math.floor(1 + Math.random() * 4);
    const finishSide = Math.floor(1 + Math.random() * 4);

    if (startSide % 2 == 0) {
        // left or right
        const randomY = Math.round(1 + Math.random() * (height - 2 - 1));
        start.x = startSide === 2 ? 0 : width - 1;         
        start.y = randomY;
    } else {
        // top or bottom
        const randomX = Math.round(1 + Math.random() * (width - 2 - 1));
        start.x = randomX;
        start.y = startSide === 1 ? 0 : height - 1;         
    }

    // если на одной стороне
    if (startSide === finishSide) {
        let _x;
        let _y;
        switch(finishSide) {
            case 1:
                finish.y = 0;
                _x = Math.round(1 + Math.random() * (width - 2 - 1));
                while (Math.abs(_x - start.x) < 2)
                    _x = Math.round(1 + Math.random() * (width - 2 - 1));
                finish.x = _x;
                break;

            case 2:
                finish.x = 0;
                _y = Math.round(1 + Math.random() * (height - 2 - 1));
                while (Math.abs(_y - start.y) < 2)
                    _y = Math.round(1 + Math.random() * (height - 2 - 1));
                finish.y = _y;
                break;
            
        
            case 3:
                finish.y = height - 1;
                _x = Math.round(1 + Math.random() * (width - 2 - 1));
                while (Math.abs(_x - start.x) < 2)
                    _x = Math.round(1 + Math.random() * (width - 2 - 1));
                finish.x = _x;
                break;

            case 4:
                finish.x = width - 1;
                _y = Math.round(1 + Math.random() * (height - 2 - 1));
                while (Math.abs(_y - start.y) < 2)
                    _y = Math.round(1 + Math.random() * (height - 2 - 1));
                finish.y = _y;
                break;
        }
    } else if (Math.abs(startSide - finishSide) === 2) {
        switch (finishSide) {
            case 1:
                finish.y = 0;
                finish.x = Math.round(1 + Math.random() * (width - 2 - 1));
                break;

            case 2:
                finish.x = 0;
                finish.y = Math.round(1 + Math.random() * (height - 2 - 1));
                break;

            case 3:
                finish.y = height - 1;
                finish.x = Math.round(1 + Math.random() * (width - 2 - 1));
                break;

            case 4:
                finish.x = width - 1;
                finish.y = Math.round(1 + Math.random() * (height - 2 - 1));
                break;
        }
    } else {
        if (startSide === 1 && finishSide === 2 && start.x === 1) {
            finish.x = 0;
            finish.y = Math.round(3 + Math.random() * (height - 2 - 1));
        } else if (startSide === 1 && finishSide === 2 && start.x === 2) {
            finish.x = 0;
            finish.y = Math.round(3 + Math.random() * (height - 2 - 1));
        } else if (startSide === 1 && finishSide === 4 && start.x === width - 2) {
            finish.x = width - 1;
            finish.y = Math.round(3 + Math.random() * height - 2 - 1);
        } else if (startSide === 1 && finishSide === 4 && start.x === width - 3) {
            finish.x = 0;
            finish.y = Math.round(3 + Math.random() * (height - 2 - 1));
        } else if (startSide === 2 && finishSide === 1 && start.y === 1) {
            finish.y = 0;
            finish.x = Math.round(3 + Math.random() * (width - 2 - 1))
        } else if (startSide === 2 && finishSide === 1 && start.y === 2) {
            finish.y = 0;
            finish.x = Math.round(3 + Math.random() * (width - 2 - 1))
        } else if (startSide === 2 && finishSide === 3 && start.y === height - 2) {
            finish.y = height - 1;
            finish.x = Math.round(3 + Math.random() * (width - 2 - 1))
        } else if (startSide === 2 && finishSide === 3 && start.y === height - 3) {
            finish.y = height - 1;
            finish.x = Math.round(3 + Math.random() * (width - 2 - 1))
        } else if (startSide === 3 && finishSide === 4 && start.x === width - 2) {
            finish.y = width - 1;
            finish.x = Math.round(1 + Math.random() * (height - 4 - 1));
        } else if (startSide === 3 && finishSide === 4 && start.x === width - 3) {
            finish.y = width - 1;
            finish.x = Math.round(1 + Math.random() * (height - 4 - 1));
        } else if (startSide === 3 && finishSide === 2 && start.x === 1) {
            finish.x = 0;
            finish.y = Math.round(1 + Math.random() * (height - 4 - 1))
        } else if (startSide === 3 && finishSide === 2 && start.x === 2) {
            finish.x = 0;
            finish.y = Math.round(1 + Math.random() * (height - 4 - 1))
        } else if (startSide === 4 && finishSide === 3 && start.x === width - 2) {
            finish.y = height - 1;
            finish.y = Math.round(1 + Math.random() * (width - 4 - 1));
        } else if (startSide === 4 && finishSide === 3 && start.x === width - 3) {
            finish.y = height - 1;
            finish.y = Math.round(1 + Math.random() * (width - 4 - 1));
        } else if (startSide === 4 && finishSide === 1 && start.y === 1) {
            finish.y = 0;
            finish.x = Math.round(1 + Math.random() * (width - 4 - 1));
        } else if (startSide === 4 && finishSide === 1 && start.y === 2) {
            finish.y = 0;
            finish.x = Math.round(1 + Math.random() * (width - 4 - 1));
        } else {
            switch(finishSide) {
                case 1:
                    finish.x = Math.round(1 + Math.random() * (width - 2 - 1));
                    finish.y = 0;
                    break;

                case 2:
                    finish.y = Math.round(1 + Math.random() * (height - 2 - 1));
                    finish.x = 0;
                    break;

                case 3:
                    finish.x = Math.round(1 + Math.random() * (width - 2 - 1));
                    finish.y = height - 1;
                    break;

                case 4:
                    finish.y = Math.round(1 + Math.random() * (height - 2 - 1));
                    finish.x = width - 1;
                    break;
            }
        }
    }

    return {
        start: start,
        finish: finish
    };
}

module.exports = {
    getRandomEntries
}