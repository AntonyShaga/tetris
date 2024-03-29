class Board {
    constructor() {
        this.piece = null;
    }

    // Сбрасывает игровое поле перед началом новой игры
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // Создает матрицу нужного размера, заполненную нулями
    getEmptyBoard() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        );
    }
    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y <= ROWS;
    }

// не занята ли клетка поля другими фигурками
    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }
    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 ||
                    (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y));
            });
        });
    }

    rotate(p){
        // Клонирование матрицы
        let clone = JSON.parse(JSON.stringify(p));

        // алгоритм вращения
        // Транспонирование матрицы тетрамино
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] =
                    [p.shape[y][x], p.shape[x][y]];
            }
        }

// Изменение порядка колонок
        p.shape.forEach(row => row.reverse());

        return clone;
    }

}
