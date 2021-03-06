'use strict';

/*
1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

Натуральное число, большее 1, называется простым, если оно ни на что не делится, кроме себя и 1.
Другими словами, n > 1– простое, если при делении на любое число от 2 до n‐1 есть остаток.
*/

/*
let num = 100;
findPrime:
for (let i = 2; i <= num; i++) { // для всех чисел в заданном промежутке (Внешний цикл for повторяет все числа от 2 до num)
    for (let j = 2; j < i; j++) {// проверка - делится ли проверяемое число на предыдущие значения (проверить, делится ли число i на какое‐либо из чисел до него) (Внутренний перебирает все числа от 2 до j . Если он достигает числа, которое равномерно делится на j, то он вырывается из внутреннего цикла.)
        if (i % j === 0) continue findPrime; // не подходит, берем следующее (если делится, то это i не подходит, берем следующее; если не делится, то i‐простое число)
    }
    console.log(i);
}
*/

let i = 0;
while (i < 100) {
    if (isPrimeNumber(i)) {
        console.log(i);
    }
    i++;
}

//Функция проверяет является ли число простым.
function isPrimeNumber(number) {
    if (i < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}


/*
2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

const cart = [
    ['Процессор', 16000, 2],
    ['Видеокарта', 30000, 4],
    ['Жесткий диск', 3000, 8],
    ['Оперативная память', 2500, 4],
    ['Материнская плата', 8000, 1],
]; // наименование/стоимость/количество


function totalCartPrice(cart) {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i][1] * cart[i][2];
    }
    return totalPrice;
}
console.log(totalCartPrice(cart));

/*
function totalCartPrice(cart) {
    return cart.reduce((totalPrice, cart) => totalPrice + cart[1] * cart[2], 0);
} //Метод reduce() применяет функцию reducer к каждому элементу массива (слева-направо), возвращая одно результирующее значение.


*/

/*
3.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
*/


for (let i = 0; i <= 9; console.log(i++)) { };


/*
4. *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
x
xx
xxx
xxxx
xxxxx
*/

for (let i = 0, pyramid = 'x'; i < 20; i++, pyramid += 'x') {
    console.log(pyramid);
}

