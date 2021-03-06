'use strict';
/*
1. Дан код Почему код даёт именно такие результаты?
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 Инкремент - добавляет единицу к своему операнду. Если используется в качестве префикса (++x), то возвращает значение операнда с добавленной к нему единицей => 1 + 1 = 2
d = b++; alert(d);           // 1 Инкремент - в случае применения в качестве окончания (x++) возвращает значение операнда перед добавлением к нему единицы => b++ вернет 1 и потом установит значение равным 2 (т.е. мы прибавляем единицу, но выводим предыдущее значение переменной)
c = (2+ ++a); alert(c);      // 5 в первом примере мы прибавили единицу в переменную а ее значение стало равно 2. В данном примере прибавляем еще единицу и а становится равно 3, соответственно, => 2 + (1 + 2) = 5
d = (2+ b++); alert(d);      // 4 во втором примере мы прибавили единицу в переменную b и ее значение стало равно 2. В данном примере прибавляем еще единицу и b становится равно 3, но т.к. в нашем случае постфиксная форма инкементирования - выводим значение операнда перед добавлением к нему единицы, т.е. 2, соответственно получаем, => 2 + 2 = 4
alert(a);                    // 3 добавили единицу в примерах 1 и 3 => 1 + 1 + 1 = 3
alert(b);                    // 3 добавили единицу в примерах 2 и 4 => 1 + 1 + 1 = 3
*/


/*
2. Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2); //5 => 1 + (2 * 2) = 1 + 4 = 5 (присваивание с умножением a *= 2 => a = a * 2)
*/

/*
3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму;
ноль можно считать положительным числом.
*/


var a = Math.floor((Math.random() - .5) * 200); // Сначала из Math.random() вычитаем 0.5. Интервал возвращаемых Math.random() значений включает значения от 0 до 1 Вычитая из результата 0.5, смещаем данный интервал до следующего: [-.5, .5]. Позже умножаем полученное число на 200 и интервал генерируемых значений содержит уже числа от -100 до +100 (не включительно).
console.log(a);
var b = Math.floor((Math.random() - .5) * 200); //
console.log(b);

if (a >= 0 && b >= 0) {
    c = a - b;
    console.log(c);
} else if (a < 0 && b < 0) {
    c = a * b;
    console.log(c);
} else {
    c = a + b;
    console.log(c);
}


/*
4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/


min = 0;
max = 15;
var a = Math.floor(Math.random() * (max - min + 1)) + min;
switch (a) {
    case 0:
        console.log(a++);
    case 1:
        console.log(a++);
    case 2:
        console.log(a++);
    case 3:
        console.log(a++);
    case 4:
        console.log(a++);
    case 5:
        console.log(a++);
    case 6:
        console.log(a++);
    case 7:
        console.log(a++);
    case 8:
        console.log(a++);
    case 9:
        console.log(a++);
    case 10:
        console.log(a++);
    case 11:
        console.log(a++);
    case 12:
        console.log(a++);
    case 13:
        console.log(a++);
    case 14:
        console.log(a++);
    case 15:
        console.log(a);
}


/*
5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/


//var a = Math.floor(Math.random() * 101);
//var b = Math.floor(Math.random() * 101);
//console.log(a);
//console.log(b);

var sum = function (a, b) {
    return a + b;
}

var difference = function (a, b) {
    return a - b;
}

var multiplication = function (a, b) {
    return a * b;
}

var division = function (a, b) {
    return a / b;
}

//console.log(sum(a, b), difference(a, b), multiplication(a, b), division(a, b));

/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции.В зависимости от переданного значения операции выполнить одну из арифметических операций(использовать функции из пункта 5) и вернуть полученное значение(использовать switch).
*/


var arg1 = Math.floor(Math.random() * 101);
var arg2 = Math.floor(Math.random() * 101);
console.log(arg1);
console.log(arg2);

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case '+':
            return sum(arg1, arg2);
        case '-':
            return difference(arg1, arg2);
        case '*':
            return multiplication(arg1, arg2);
        case '/':
            return division(arg1, arg2);
    }
}

console.log(mathOperation(arg1, arg2, '+'));
console.log(mathOperation(arg1, arg2, '-'));
console.log(mathOperation(arg1, arg2, '*'));
console.log(mathOperation(arg1, arg2, '/'));
console.log(mathOperation(arg1, arg2, '?'));


/*
7. *Сравнить null и 0. Попробуйте объяснить результат.
*/

console.log(null > 0); // false null преобразовано к 0 (абстрактный алгоритм сравнения для отношений). Значение +0 равно 0, в результате алгоритм возвращает false.
console.log(null < 0); // false null преобразовано к 0 (абстрактный алгоритм сравнения для отношений). Значение +0 равно 0, в результате алгоритм возвращает false.
console.log(null >= 0); // true null преобразовано к 0 Если null < 0 принимает значение false, то null >= 0 принимает значение true
console.log(null <= 0); // true null преобразовано к 0
console.log(null == 0); // false null равен лишь undefined (абстрактный алгоритм сравнения для равенств). Они равны null==undefined друг другу и не равны ничему ещё. В частности, не равны нулю.
console.log(null === 0); // false null равен лишь undefined (абстрактный алгоритм сравнения для равенств). Они равны null==undefined друг другу и не равны ничему ещё. В частности, не равны нулю. 


/*
8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.
*/


function power(val, pow) {
    if (pow != 1) {//пока pow!=1, сводить вычисление power (val,pow) к power (val, pow-1)
        return val * power(val, pow - 1);
    } else {
        return val;
    }
}
console.log(power(5, 3));
