'use strict';
/*
4*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
4.1. Создать массив товаров (сущность Product);
4.2. При загрузке страницы на базе данного массива генерировать вывод из него. HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
*/


const catalogBlock = {
    render(good) { //Внутри render() вы возвращаете описание того, что вы хотите отобразить на странице (грубо говоря, какую вёрстку вы хотите вывести) / (свойство-функция, которая используется для динамического определения того, что необходимо отрисовать).
        return `<div class="good"> 
                    <div><b><i>Артикул товара</i></b>: ${good.good_Id}.</div>
                    <div><b><i>Наименование товара</i></b>: ${good.good_Name}.</div>
                    <div><b><i>Цена за единицу</i></b>: ${good.price} руб.</div>
                </div>`; //
    }
}

const catalog = {
    catalogList: null,
    catalogBlock,
    products: [
        {
            good_Id: 11111,
            good_Name: 'Процессор',
            price: 16000
        },
        {
            good_Id: 22222,
            good_Name: 'Видеокарта',
            price: 30000
        },
        {
            good_Id: 33333,
            good_Name: 'Жесткий диск',
            price: 3000
        },
        {
            good_Id: 44444,
            good_Name: 'Оперативная память',
            price: 2500
        },
        {
            good_Id: 55555,
            good_Name: 'Материнская плата',
            price: 8000
        }
    ],

    outputCatalog() {
        this.catalogList = document.querySelector('.catalog');
        this.render();
    },

    render() {
        if (this.products.length) {
            this.products.forEach(good => {
                this.catalogList.insertAdjacentHTML('beforeend', this.catalogBlock.render(good));
            })
        }
    }
};

catalog.outputCatalog();
