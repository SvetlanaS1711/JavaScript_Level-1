'use strict';

/*
1. Доработать модуль корзины.
a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
*/

/*
 * Объект каталога товаров
 * Инициализация catalog
 * Переход в catalogBlock
 * Переход в cart
 * Переход в render()
 *      Отрисовка catalog 
 *      getCatalogListLength() => list.length => Return value: 5
 *      renderCatalogList() => catalogBlock => renderCatalogItem(item) => отрисовка catalog (пробегает 5 раз)
 * Переход в cart.init
 *      init(cartBlockClass, clrCartButton, catalogList)
 *          render() => getCartGoodsLength => goods.length => Return value: 1 => renderCartList => item: {id_product: 77777, good_Name: "Ноутбук", price: 52500, quantity: 2} => отрисовка содержимого корзины
 * 
 * Клик на кнопку В корзину addEventHandlers() => addToBasket(event) => !event.target.classList.contains => event: MouseEvent {isTrusted: true} => +event.target.dataset.id_product => id_product: 11111 => cart.addToBasket(id_product)
 *      addToBasket(id_product) => findProductInCatalog(id_product) => catalogList.find(product => product.id_product === id_product) => Return value: true => findInBasket = this.goods.find(({id_product}) => product.id_product === id_product) (сравниваем есть ли в корзине) => Return value: false => goods.push({...product, quantity: 1}) => getCartGoodsLength() => Return value: 2 => renderCartList() => отрисовка содержимого корзины (добавление в корзину)
 * Очистить корзину dropCart (пустой массив товаров)=> render() => renderEmptyCart()
 *      
 */
const catalog = {
    catalogBlock: null,
    cart: {},
    list: [
        {
            id_product: 11111,
            good_Name: 'Процессор',
            price: 16000
        },
        {
            id_product: 22222,
            good_Name: 'Видеокарта',
            price: 30000
        },
        {
            id_product: 33333,
            good_Name: 'Жесткий диск',
            price: 3000
        },
        {
            id_product: 44444,
            good_Name: 'Оперативная память',
            price: 2500
        },
        {
            id_product: 55555,
            good_Name: 'Материнская плата',
            price: 8000
        }
    ],

    /*
     * Инициальзация каталога.
     * catalogBlockClass - класс блока каталога
     * cart - корзина
     */

    init(catalogBlockClass, cart) {
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.cart = cart;
        this.render();
        this.addEventHandlers();
    },

    /*
     * Отрисовка каталога
     * Если в каталоге что-то есть (т.е. больше 0), значит отражаем содержимое каталога, в противном случае - выводим пустой каталог
     */
    render() {
        if (this.getCatalogListLength() > 0) {
            this.renderCatalogList();
        } else {
            this.renderEmptyCatalog();
        }
    },

    /*
     * Добавляем обработку событий
     * Ждем клика на кнопку Добавить в корзину
     */
    addEventHandlers() {
        this.catalogBlock.addEventListener('click', event => this.addToCart(event));
    },

    /*
     * Метод добавления в корзину
     * Свойство target объекта Event ссылается на объект, который отправил событие
     */
    addToCart(event) {
        if (!event.target.classList.contains('product__add-to-cart')) return;
        const id_product = +event.target.dataset.id_product;
        this.cart.addToCart(id_product);
    },

    /*
     * Метод получения количества товаров в каталоге
     * @returns {number}
     */
    getCatalogListLength() {
        return this.list.length;
    },

    /*
     * Отрисовка списка товаров
     */
    renderCatalogList() {
        this.catalogBlock.innerHTML = '';
        this.list.forEach(item => {
            this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },

    /**
     * Отрисовка отдельного товара из списка
     * item - товар
     */
    renderCatalogItem(item) {
        return `<div class="product">
                <p><b><i>Наименование товара:</i></b><br>${item.good_Name}</p>
                <p><b><i>Стоимость товара:</i></b><br>${item.price} руб.</p>
                <button class="product__add-to-cart" data-id_product="${item.id_product}">Добавить в корзину</button><hr>
            </div>`;
    },

    /*
     * Отрисовка пустого каталога
     */
    renderEmptyCatalog() {
        this.catalogBlock.innerHTML = '';
        this.catalogBlock.insertAdjacentHTML('beforeend', `Каталог товаров пуст.`);
    },
};

/*
 *  Объект корзины
 */
const cart = {
    cartBlock: null,
    clearCartButton: null,
    catalogList: [],
    goods: [
        {
            id_product: 77777,
            good_Name: 'Ноутбук',
            price: 52500,
            quantity: 2,
        },
    ],

    /*
     * Метод инициальзации корзины
     *cartBlockClass - класс блока корзины
     *clearCartButton - класс кнопки очистки корзины
     *catalogList - список товаров в каталоге
     */
    init(cartBlockClass, clearCartButton, catalogList) {
        this.cartBlock = document.querySelector(`.${cartBlockClass}`);
        this.clearCartButton = document.querySelector(`.${clearCartButton}`);
        this.catalogList = catalogList;

        this.addEventHandlers();
        this.render();
    },

    /*
     * Метод установки обработчиков событий
     */
    addEventHandlers() {
        this.clearCartButton.addEventListener('click', this.dropCart.bind(this));
    },

    /*
     * Метод очистки корзины
     */
    dropCart() {
        this.goods = [];
        this.render();
    },

    /*
     * Отрисовка корзины
     * Если в корзине что-то есть (т.е. длина больше 0, отрисовка содержимого корзины, в противном случае вывод корзина пуста)
     */
    render() {
        if (this.getCartGoodsLength() > 0) {
            this.renderCartList();
        } else {
            this.renderEmptyCart();
        }
    },

    findProductInCatalog(id_product) {
        return this.catalogList.find(product => product.id_product === id_product);
    },
    /*
     * Добавить товар
     */
    addToCart(id_product) {
        const product = this.findProductInCatalog(id_product);

        if (product) {
            const findInBasket = this.goods.find(({ id_product }) => product.id_product === id_product);
            if (findInBasket) {
                findInBasket.quantity++;
            } else {
                this.goods.push({ ...product, quantity: 1 });
            }
            this.render();
        } else {
            alert('Ошибка добавления!');
        }
    },

    /*
     * Получение количества товаров в корзине
     */
    getCartGoodsLength() {
        return this.goods.length;
    },

    /*
     * Отрисовка пустой корзины
     */
    renderEmptyCart() {
        this.cartBlock.innerHTML = '';
        this.cartBlock.insertAdjacentHTML('beforeend', 'Корзина пуста.');
    },

    /*
     * Отрисовка списка товаров в корзине
     */
    renderCartList() {
        this.cartBlock.innerHTML = '';
        this.goods.forEach(item => {
            this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(item));
        });
    },

    /*
     * Отрисовка отдельного товара в корзине
     * item - товар
     */
    renderCartItem(item) {
        return `<div>
                <p><b><i>Наименование товара:</i></b><br>${item.good_Name}</p>
                <p><b><i>Стоимость товара:</i></b><br>${item.price} руб.</p>
                <p><b><i>Количество:</i></b><br>${item.quantity} шт.</p>
                <hr>
            </div>`;
    },
};

/*
 * Подключение каталога и корзины
 */
catalog.init('catalog', cart);
cart.init('cart', 'clear-cart', catalog.list);
