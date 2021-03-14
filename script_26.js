'use strict';

/*
2 *У товара может быть несколько изображений. Нужно:
a. Реализовать функционал показа полноразмерных картинок товара в модальном окне
b. Реализовать функционал перехода между картинками внутри модального окна ("листалка")
*/

/*
 * Объект каталога товаров    
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
     *
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




/*
*Объект с настройками галлереи.
*galleryWrapper__screen
*galleryWrapper__close обертка кнопки Закрыть
*galleryWrapper__next обертка кнопки Следующий
*galleryWrapper__back обертка кноки Предыдущий
*
* Сначала срабатывает .addEventListener('click', event) => event: MouseEvent {isTrusted: true} => containerClickHandler(event) => event.target.tagName !== 'IMG' => openedImageEl = event.target => src: "image/HDD1_max.jpg" =>  getScreenContainer() => galleryWrapperElement: null => createScreenContainer() + добавляем кнопки => galleryScreenElement => image =>. openImage(src)
*/

const gallery = {
    openedImageEl: null,

    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'image/close.png',
        openedImageNextBtnSrc: 'image/next.png',
        openedImageNextBtnClass: 'galleryWrapper__next',
        openedImageBackBtnSrc: 'image/back.png',
        openedImageBackBtnClass: 'galleryWrapper__back',
        imageNotFoundSrc: 'image/duck.gif',
    },

    /*
    * Инициация галлереи
    * Метод Object.assign() используется для копирования значений всех собственных перечисляемых свойств из одного или более исходных объектов в целевой объект. После копирования он возвращает целевой объект.
     */
    init(settings) {
        // Записываем настройки, которые передал пользователь в наши настройки.
        this.settings = Object.assign(this.settings, settings);

        // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент, при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте gallery и передадим туда событие MouseEvent, которое случилось.
        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));
    },

    /**
     * Обработчик события клика для открытия картинки.
     * event Событие клики мышью.
     * event.target Событие клики мышью.
     */

    containerClickHandler(event) {
        // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
        if (event.target.tagName !== 'IMG') {
            return;
        }

        // Записываем текущую картинку, которую хотим открыть.
        this.openedImageEl = event.target;

        // Открываем картинку.
        this.openImage(event.target.dataset.full_image_url);
    },

    /**
     * Открывает картинку.
     * src Ссылка на картинку, которую надо открыть.
     */

    openImage(src) {
        // Пробуем загрузить картинку, если картинка загружена - показываем картинку с полученным из целевого тега (data-full_image_url аттрибут), если картинка не загрузилась - показываем картинку-заглушку.
        // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
        // onload Обработчик для события загрузки объекта window.
        // onerror Обработчик события для ошибок среды Javascript.

        const openedImageEl = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
        const img = new Image();
        img.onload = () => openedImageEl.src = src;
        img.onerror = () => openedImageEl.src = this.settings.imageNotFoundSrc;
        img.src = src;
    },

    /*
     * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
     * returns {Element}
     */

    getScreenContainer() {
        // Получаем контейнер для открытой картинки.
        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
        // Если контейнер для открытой картинки существует - возвращаем его.
        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        // Возвращаем полученный из метода createScreenContainer контейнер.
        return this.createScreenContainer();
    },

    /*
     * Создает контейнер для открытой картинки.
     * returns {HTMLElement}
     */

    createScreenContainer() {
        // Создаем сам контейнер-обертку и ставим ему класс.
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        // Добавляем кнопку назад.
        const backBtn = new Image();
        backBtn.classList.add(this.settings.openedImageBackBtnClass);
        backBtn.src = this.settings.openedImageBackBtnSrc;
        galleryWrapperElement.appendChild(backBtn);

        // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
        backBtn.addEventListener('click', () => {
            this.openedImageEl = this.getPrevImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });

        // Добавляем кнопку вперед.
        const nextBtn = new Image();
        nextBtn.classList.add(this.settings.openedImageNextBtnClass);
        nextBtn.src = this.settings.openedImageNextBtnSrc;
        galleryWrapperElement.appendChild(nextBtn);

        // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
        nextBtn.addEventListener('click', () => {
            this.openedImageEl = this.getNextImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        // Добавляем контейнер-обертку в тег body.
        document.body.appendChild(galleryWrapperElement);

        // Возвращаем добавленный в body элемент, наш контейнер-обертку.
        return galleryWrapperElement;
    },

    /*
     * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере, если текущая открытая картинка последняя.
     *returns {Element} Следующую картинку от текущей открытой.
     */
    getNextImage() {
        // Получаем элемент справа от текущей открытой картинки.
        const nextSibling = this.openedImageEl.nextElementSibling;
        // Если элемент справа есть, его отдаем, если нет, то берем первый элемент в родительском контейнере.
        return nextSibling ? nextSibling : this.openedImageEl.parentElement.firstElementChild;
    },

    /*
     * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
     * если текущая открытая картинка первая.
     * returns {Element} Предыдущую картинку от текущей открытой.
     */
    getPrevImage() {
        // Получаем элемент слева от текущей открытой картинки.
        const prevSibling = this.openedImageEl.previousElementSibling;
        // Если элемент слева есть, его отдаем, если нет, то берем последний элемент в родительском контейнере.
        if (prevSibling) {
            return prevSibling;
        } else {
            return this.openedImageEl.parentElement.lastElementChild;
        }
    },

    /*
     * Закрывает (удаляет) контейнер для открытой картинки.
     */
    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({ previewSelector: '.galleryPreviewsContainer' });