'use strict';

/*
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.

2*. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п.,
*/

const chess = {
    gameContainerEl: document.getElementById('game'), // Контейнер игры

    figures: [
        { name: 'p', color: 'w', pos: 'A2' },
        { name: 'p', color: 'w', pos: 'B2' },
        { name: 'p', color: 'w', pos: 'C2' },
        { name: 'p', color: 'w', pos: 'D2' },
        { name: 'p', color: 'w', pos: 'E2' },
        { name: 'p', color: 'w', pos: 'F2' },
        { name: 'p', color: 'w', pos: 'G2' },
        { name: 'p', color: 'w', pos: 'H2' },
        { name: 'R', color: 'w', pos: 'A1' },
        { name: 'N', color: 'w', pos: 'B1' },
        { name: 'B', color: 'w', pos: 'C1' },
        { name: 'Q', color: 'w', pos: 'D1' },
        { name: 'K', color: 'w', pos: 'E1' },
        { name: 'B', color: 'w', pos: 'F1' },
        { name: 'N', color: 'w', pos: 'G1' },
        { name: 'R', color: 'w', pos: 'H1' },

        { name: 'p', color: 'b', pos: 'A7' },
        { name: 'p', color: 'b', pos: 'B7' },
        { name: 'p', color: 'b', pos: 'C7' },
        { name: 'p', color: 'b', pos: 'D7' },
        { name: 'p', color: 'b', pos: 'E7' },
        { name: 'p', color: 'b', pos: 'F7' },
        { name: 'p', color: 'b', pos: 'G7' },
        { name: 'p', color: 'b', pos: 'H7' },
        { name: 'R', color: 'b', pos: 'A8' },
        { name: 'N', color: 'b', pos: 'B8' },
        { name: 'B', color: 'b', pos: 'C8' },
        { name: 'Q', color: 'b', pos: 'D8' },
        { name: 'K', color: 'b', pos: 'E8' },
        { name: 'B', color: 'b', pos: 'F8' },
        { name: 'N', color: 'b', pos: 'G8' },
        { name: 'R', color: 'b', pos: 'H8' },
    ], // Шахматные фигуры на доске

    figureHtml: {
        pw: '&#9817;',
        Bw: '&#9815;',
        Nw: '&#9816;',
        Rw: '&#9814;',
        Qw: '&#9813;',
        Kw: '&#9812;',

        pb: '&#9823;',
        Bb: '&#9821;',
        Nb: '&#9822;',
        Rb: '&#9820;',
        Qb: '&#9819;',
        Kb: '&#9818;',
    }, // Содержит информацию о том, как отобразить фигуры на поле.


    //Отображает карту (игровое поле).
    createChessMap() {
        const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0]; // Строки
        const cols = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 0]; // Столбцы

        for (let row = 0; row < rows.length; row++) {
            const tr = document.createElement('tr');
            this.gameContainerEl.appendChild(tr); // // Создаем элемент строки.


            for (let col = 0; col < cols.length; col++) {
                const td = document.createElement('td');
                tr.appendChild(td); //  // Добавляем ячейку в строку.

                // Добавляем каждому полю data аттрибуты о номере колонки и номере строки.
                // toString() позволяет преобразовать и объединить все элементы массива в одно строковое значение
                td.dataset.row = rows[row].toString();
                td.dataset.col = cols[col].toString();

                // Задаем границы игрового поля
                if (rows[row] === 0 && cols[col] !== 0) {
                    td.innerHTML = cols[col];
                } else if (cols[col] === 0 && rows[row] !== 0) {
                    td.innerHTML = rows[row].toString();
                }

                if (this.isCellIsBlack(row, col)) {
                    td.style.backgroundColor = 'grey';
                }
            }
        }
    },


    isCellIsBlack(rowNum, colNum) {
        if (rowNum === 0 || colNum === 0 || rowNum === 9 || colNum === 9) {
            return false;
        }

        // Определяем по четности/нечетности строки и колонки.
        return (rowNum + colNum) % 2 === 1;
    },

    createFigures() {
        // Перебираем все фигуры, которые есть в массиве.
        for (const figure of this.figures) {
            // Получаем колонку и строку, где стоит фигура.
            // Метод charAt() возвращает указанный символ из строки.
            const col = figure.pos.charAt(0);
            const row = figure.pos.charAt(1);
            // Находим нужную ячейку, ставим ей innerHTML взятый из объекта this.figureHtml,
            // ключ - это два символа, имя фигуры и цвет, в итоге получим символ фигуры.
            document.querySelector(`[data-col='${col}'][data-row='${row}']`).innerHTML =
                this.figureHtml[figure.name + figure.color];
        }
    }
};

chess.createChessMap();

chess.createFigures();