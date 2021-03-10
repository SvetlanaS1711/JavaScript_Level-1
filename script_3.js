'use strict';
/*
3. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
3.1. Пустая корзина должна выводить строку «Корзина пуста»;
3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
*/


const cartBlock = {
    render(good) { //Внутри render() вы возвращаете описание того, что вы хотите отобразить на странице (грубо говоря, какую вёрстку вы хотите вывести) / (свойство-функция, которая используется для динамического определения того, что необходимо отрисовать).
        return `<div class="good"> 
                    <div><b><i>Артикул товара</i></b>: ${good.good_Id}.</div>
                    <div><b><i>Наименование товара</i></b>: ${good.good_Name}.</div>
                    <div><b><i>Цена за единицу</i></b>: ${good.price} руб.</div>
                    <div><b><i>Количество</i></b>: ${good.quantity} шт.</div>
                    <div><b><i>Стоимость</i></b>: ${good.quantity * good.price} руб.</div>
                </div>`; //
    }
}

const cart = {
    cartList: null,
    cartClearButton: null,
    cartBlock,
    goods: [
        {
            good_Id: 11111,
            good_Name: 'Процессор',
            price: 16000,
            quantity: 2
        },
        {
            good_Id: 22222,
            good_Name: 'Видеокарта',
            price: 30000,
            quantity: 4
        },
        {
            good_Id: 33333,
            good_Name: 'Жесткий диск',
            price: 3000,
            quantity: 6
        },
        {
            good_Id: 44444,
            good_Name: 'Оперативная память',
            price: 2500,
            quantity: 8
        },
        {
            good_Id: 55555,
            good_Name: 'Материнская плата',
            price: 8000,
            quantity: 10
        }
    ],
    checkCart() { //Document метод querySelector() возвращает первый элемент (Element) документа, который соответствует указанному селектору или группе селекторов. Если совпадений не найдено, возвращает значение null.
        this.cartList = document.querySelector('.cart-list');
        this.cartClearButton = document.querySelector('.cart-btn');
        this.cartClearButton.addEventListener('click', this.clearCart.bind(this));

        //Метод EventTarget.addEventListener() регистрирует определенный обработчик события, вызванного на EventTarget. addEventListener() для наблюдения за щелчками мышкой по элементу.
        //Метод bind() создаёт новую функцию, которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение. В метод также передаётся набор аргументов, которые будут установлены перед переданными в привязанную функцию аргументами при её вызове.

        this.render();
    },
    render() {
        if (this.goods.length) {
            this.goods.forEach(good => {
                this.cartList.insertAdjacentHTML('beforeend', this.cartBlock.render(good));
            });
            this.cartList.insertAdjacentHTML('beforeend', `В корзине <b>${this.goods.length}</b> позиций(а) общей стоимостью <b>${this.totalCartPrice()} руб.</b>`);
        } else {
            this.cartList.textContent = 'Корзина пуста';
        }
    },

    //insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет полученные узлы (nodes) в DOM дерево в указанную позицию.
    //textContent позволяет задавать или получать текстовое содержимое элемента и его потомков.

    totalCartPrice() {
        return this.goods.reduce(function (price, good) {
            return price + good.price * good.quantity;
        }, 0);
    },
    clearCart() {
        this.goods = [];
        this.render();
    },
};

cart.checkCart();
