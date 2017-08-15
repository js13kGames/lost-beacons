function coat(map, width, x) {
    for (let i = 0 ; i < width ; i++) {
        const rowTop = [];
        const rowBottom = [];
        for (let k = 0 ; k < map[0].length ; k++) {
            rowTop.push(x);
            rowBottom.push(x);
        }
        map.unshift(rowTop);
        map.push(rowBottom);
    }

    map.forEach(row => {
        for (let i = 0 ; i < width ; i++) {
            row.push(x);
            row.unshift(x);
        }
    });

    return map;
}

function generate() {
    const map = [];
    for (let i = 0 ; i < GRID_ROWS ; i++) {
        map.push([]);
        for (let j = 0 ; j < GRID_COLS ; j++) {
            map[i][j] = 0;
        }
    }

    function expand(row, col, n) {
        if (n > 0 && !isNaN(map[row] && map[row][col])) {
            map[row][col] = 1;

            if (random() < 0.5) {
                expand(row + (random() < 0.5 ? 1 : -1), col, n - 1);
            } else {
                expand(row, col + (random() < 0.5 ? 1 : -1), n - 1);
            }
        }
    }

    for (let i = 0 ; i < OBSTACLES ; i++) {
        expand(~~(random() * map.length), ~~(random() * map[0].length), OBSTACLE_EXPAND_ITERATIONS);
    }

    return coat(coat(map, 3, 0), 3, 1);
}
