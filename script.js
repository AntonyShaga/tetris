const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Устанавливаем размеры холста
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Устанавливаем масштаб
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board();

function play() {
    board.reset();
    // наглядное представление матрицы игрового поля
    let piece = new Piece(ctx);
    piece.draw();

    board.piece = piece;
    console.table(board.grid);
}


/*// В обработчике события keydown
if (event.keyCode === KEY.SPACE) {
    // Жесткое падение
    while (board.valid(p)) {
        board.piece.move(p);

        // стирание старого отображения фигуры на холсте
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        board.piece.draw();

        p = moves[KEY.DOWN](board.piece);
    }
} else if (board.valid(p)) {
    // ...
}*/


document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {
        // отмена действий по умолчанию
        event.preventDefault();

        // получение новых координат фигурки
        let p = moves[event.keyCode](board.piece);

        if (event.keyCode === KEY.SPACE) {
            // Жесткое падение
            while (board.valid(p)) {
                board.piece.move(p);

                // стирание старого отображения фигуры на холсте
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                board.piece.draw();

                p = moves[KEY.DOWN](board.piece);
            }
        }
        // проверка нового положения
        else if (board.valid(p)) {
            // реальное перемещение фигурки, если новое положение допустимо
            board.piece.move(p);

            // стирание старого отображения фигуры на холсте
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            board.piece.draw();
        }
    }
});

const moves = {
    [KEY.UP]: (p) => board.rotate(p),
    [KEY.SPACE]: p => ({...p, y: p.y + 1}),
    [KEY.LEFT]: p => ({...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
    [KEY.DOWN]: p => ({...p, y: p.y + 1})
};

play()